const DEBUG = true;
let settings_global = {};

(() => {
  function updateSettings(callback) {
    chrome.runtime.sendMessage({ action: "GET::settings" }, (response) => {
      settings_global = response.settings;
      callback();
    });
  }

  function initSettingsButton() {
    // setup button callback
    document
      .getElementById("settingsButton")
      .addEventListener("click", function () {
        // open the settings page located in one above the javascript rootfolder
        window.open("../pages/settings.html");
      });
  }
  function initBugreportButton() {
    // setup button callback
    document
      .getElementById("bugreportButton")
      .addEventListener("click", function () {
        window.open("https://github.com/mathlon26/UH-plus-plus/issues");
      });
  }

  function initDisableButton() {
    const toggle = document.getElementById("onOffSwitch-input");

    toggle.checked = settings_global.enabled == "true";

    function setSettingEnabled(_value) {
      chrome.runtime.sendMessage(
        { action: "POST::settings", key: "enabled", value: _value },
        (response) => {
          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length > 0) {
              chrome.tabs.reload(tabs[0].id);
            }
          });
        }
      );
    }

    toggle.addEventListener("click", () => {
      setSettingEnabled(toggle.checked.toString());
    });

    // todo
  }

  function initPopup() {
    const url = chrome.runtime.getURL(`src/pages/popup_${settings_global.lang}.html`);
    console.log(url);
    fetch(url)
      .then((response) => response.text())
      .then((html) => {
        document.body.innerHTML = html;
        initDisableButton();
        initSettingsButton();
        initBugreportButton();
      })
      .catch((error) => console.error("Error loading HTML:", error));
  }
  // Init the popup
  updateSettings(initPopup);
})();
