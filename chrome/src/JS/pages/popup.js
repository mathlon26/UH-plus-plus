const DEBUG = true;

(() => {
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

    function setSettingEnabled(_value) {
        chrome.runtime.sendMessage({ action: "POST::settings", key:"enabled", value: _value });
    }

    const btn = document.getElementById("onOffSwitch");
    const input = document.getElementById("onOffSwitch-input");

    chrome.runtime.sendMessage(
        { action: "GET::settings" },
        (response) => {
            if (response.settings) {
                if (!response.settings.enabled){
                    btn.click();
                }
            }
        }
    );

    btn.addEventListener("click", (event) => {
        console.log(input.getAttribute("checked"));
        if (input.getAttribute("checked")  === "true" )  {
            input.setAttribute("checked", "false");
            setSettingEnabled("false");
        } else {
            input.setAttribute("checked", "true");
            setSettingEnabled("true");
        }
    });
  }
  function initPopup() {
    // run popup functions
    initDisableButton();
    initSettingsButton();
    initBugreportButton();
  }

  // Init the popup
  initPopup();
})();
