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
    function initBugreportButton()
    {
        // setup button callback
        document.getElementById("bugreportButton").addEventListener("click", function (){
            window.open("https://github.com/mathlon26/UH-plus-plus/issues");
        })
    }    
    function initPopup()
    {
        // run popup functions
        initSettingsButton();
        initBugreportButton();
    }

    // Init the popup
    initPopup();
})();
