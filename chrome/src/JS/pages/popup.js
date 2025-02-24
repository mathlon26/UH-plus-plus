const DEBUG = true;
let settings_global = {};
let student_data = {};

(() => {
  function updateSettings(callback) {
    chrome.runtime.sendMessage({ action: "GET::settings" }, (response) => {
      settings_global = response.settings;
      student_data = response.settings.student_data;
      console.log(response);

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
        window.open("https://github.com/mathlon26/UH-plus-plus/issues/new");
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

  function setStudentCardPlaceholders() {
    document.getElementById("student-img").src = settings_global.student_card.src;
    document.getElementById("sc-birthdate").innerText = settings_global.student_card.bod;
    document.getElementById("sc-bottom").innerText = settings_global.student_card.uh;
    document.getElementById("barcode-img").src = settings_global.student_card.barcode_src;
    document.getElementById("barcode").innerText = settings_global.student_card.barcode;
  }

  function initStudentCard() {
    if (settings_global.student_card) {
      setStudentCardPlaceholders();
    } else {
      chrome.runtime.sendMessage({action: "GET::profile_data"}, (response) => {
        response.src = `https://mijnstudentendossier.uhasselt.be${response.src}`;
        chrome.runtime.sendMessage({action: "POST::settings", key: 'student_card', value: response});

        setStudentCardPlaceholders();
      });
    }

    document.getElementById("sc-name").innerText = `${student_data.Voornaam} ${student_data.Naam}`;
    document.getElementById("usernameDisplay").innerText = `${student_data.Voornaam} ${student_data.Naam}`;
    document.getElementById("sc-nummer").innerText = student_data.Stamnummer;

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
        initStudentCard();
      })
      .catch((error) => console.error("Error loading HTML:", error));
  }
  // Init the popup
  updateSettings(initPopup);
})();
