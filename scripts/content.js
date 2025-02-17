// content.js
/*

common javascript used on all subdomains

*/

(() => {
    function disableStyleManipulation() {
        // Override functions that modify styles
        const nullFunction = () => {};
        const emptyObject = {};

        window.skm_applyStyleInfoToElement = nullFunction;
        window.skm_styleInfo = function () { return emptyObject; };
        window.skm_mousedOverMenu = nullFunction;
        window.skm_mousedOverClickToOpen = nullFunction;
        window.skm_mousedOverSpacer = nullFunction;
        window.skm_mousedOutMenu = nullFunction;
        window.skm_mousedOutSpacer = nullFunction;
        window.skm_closeSubMenus = nullFunction;
        window.skm_shimSetVisibility = nullFunction;
        window.skm_doTick = nullFunction;
        window.skm_stopTick = nullFunction;
        window.preloadimages = nullFunction;
        window.setimage = nullFunction;

        // Remove any inline styles applied via JavaScript
        document.querySelectorAll('*').forEach((el) => {
            el.removeAttribute('style');
        });

        console.log("Disabled all style modifications.");
    }

    function extractHiddenInputs() {
        const jsonData = {};

        // Select all hidden input fields that match the pattern
        document.querySelectorAll('input[type="hidden"]').forEach(input => {
            if (input.name.startsWith("Top1$ih")) {
                jsonData[input.name.replace("Top1$ih", "")] = input.value || null;
            }
        });

        // Send extracted data to the background script
        chrome.runtime.sendMessage({ action: "storeExtractedData", data: jsonData });
    }


    disableStyleManipulation();
    extractHiddenInputs();

})();
