const DEBUG = true;

(() => {
    function initSettingsButton()
    {
        // setup button callback
        document.getElementById("settingsButton").addEventListener("click", function()
            {
                // open the settings page located in one above the javascript rootfolder
                window.open("../pages/settings.html");
            })
    }
    function initPopup()
    {
        // run popup functions
        initSettingsButton();
    }

    // Init the popup
    initPopup();
})();
