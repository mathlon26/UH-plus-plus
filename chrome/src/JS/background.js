// background.js

let currentTab = "home";
const DEBUG = true;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action == "GET::custom_html") {
    var url =
      message.lang == "04"
        ? "src/pages/custom_en.html"
        : "src/pages/custom_nl.html";
    var taal = message.lang == "04" ? "english" : "dutch";
    fetch(chrome.runtime.getURL(url))
      .then((response) => response.text())
      .then((html) => sendResponse({ html: html, lang: taal }))
      .catch((err) => sendResponse({ error: err }));
    return true;
  } else if (message.action == "GET::html") {
    let lang = message.lang || "nl";
    let page = message.page;
    let url = `src/pages/content/${lang}/${page}.html`;
    fetch(chrome.runtime.getURL(url))
      .then((response) => response.text())
      .then((html) => sendResponse({ html: html }))
      .catch((err) => sendResponse({ error: err }));
    return true;
  } else if (message.action == "POST::updateCurrentTab") {
    currentTab = message.data;
  } else if (message.action == "GET::currentTab") {
    sendResponse({ currentTab: currentTab });
    return false;
  } else if (message.action == "POST::settings") {
    // save settings
    var key = message.key;
    var value = message.value;

    if (key && value) {
      chrome.storage.local.get("settings", (result) => {
        const settings = result.settings || {}; // make sure settings is an object
        settings[key] = value; // Update the setting
        chrome.storage.local.set({ settings: settings });
        sendResponse({ status: 200 });
      });
    }
    return true;
  } else if (message.action == "POST::settingsFull") {
    // post a full json instead of just a single setting
    const settings = message.data;
    if (settings) {
      chrome.storage.local.set({ settings: settings });
      sendResponse({ status: 200 });
    }
    return true;
  } else if (message.action == "GET::settings") {
    // lees settings
    chrome.storage.local.get("settings", (result) => {
      const settings = result.settings || {}; // make sure settings is an object
      if (settings) {
        if (message.key != undefined) {
          sendResponse({ [message.key]: settings[message.key] });
        } else {
          sendResponse({ settings: settings });
        }
      }
    });
    return true;
  } else if (message.action == "GET::profile_data") {
    fetch("https://mijnstudentendossier.uhasselt.be/sdsstudentenkaart.aspx", {
        credentials: "include"
    })
    .then((response) => {
        return response.text();
    })
    .then((html) => {
      sendResponse({ 
        src: html.match(/<img[^>]*name=["']student["'][^>]*src=["]([^"]+)["']/i)[1].trim(),
        dob: html.match(/<span[^>]*id=["']lblGebDat["'][^>]*>([^<]+)<\/span>/i)[1].trim(),
        uh: html.match(/<span[^>]*id=["']lbltagId["'][^>]*>([^<]+)<\/span>/i)[1].trim(),
        barcode: html.match(/<span[^>]*id=["']lblbarcode["'][^>]*>([^<]+)<\/span>/i)[1].trim(),
        barcode_src: "https://mijnstudentendossier.uhasselt.be/sdsStudentenkaartBarcode.ashx"
      });
    })
    .catch((err) => {
        sendResponse({ error: err.message });
    });
    return true;
  }

  return false;
});


