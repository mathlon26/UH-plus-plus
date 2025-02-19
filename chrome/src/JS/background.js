// background.js

let currentTab = "home";



chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    async function getContentPage(pageName) {
        console.log("GET content " + pageName);
        let url = `src/pages/content/${pageName}.html`;
        await fetch(chrome.runtime.getURL(url))
            .then(response => response.text())
            .then(html => sendResponse({ html: html}))
            .catch(err => sendResponse({ error: err }));

        return false;
    }


    if (message.action == "GET::custom_html") {
        console.log("test");
        var url = message.lang == "04" ? "src/pages/custom_en.html" : "src/pages/custom_nl.html";
        var taal = message.lang == "04" ? "english" : "dutch";
        fetch(chrome.runtime.getURL(url))
            .then(response => response.text())
            .then(html => sendResponse({ html: html, lang: taal}))
            .catch(err => sendResponse({ error: err }));
        return true;
    }
    else if (message.action == "POST::updateCurrentTab") {
        currentTab = message.data;
        console.log("POST set ", currentTab);
    }
    else if (message.action == "GET::currentTab"){
        console.log("GET get ", currentTab);
        sendResponse({ currentTab: currentTab });
        return false;
    }
    else if (message.action == "GET::contentPage") {
        getContentPage(message.page);
        return false;
    }



    return false;
});
