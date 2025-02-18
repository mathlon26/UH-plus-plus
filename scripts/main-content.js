// main-content.js
/*

javascript used specifically on mijnstudentendossier.uhasselt.be/*

*/
const topBar = document.getElementById("Top1_lblTop");
const topBarUrl = chrome.runtime.getURL("html/components/topBar.html");
const cssUrl = chrome.runtime.getURL("css/styles.css");
const bottomBar = document.getElementById("Bottom1_lblBottom");
const scriptUrl = chrome.runtime.getURL("js/tailwind.min.js");

(() => {
    let studentData = null;

    console.log(topBarUrl);

    function removeDefaultStyle() {
        const linkToRemove = "https://cdn.uhasselt.be/ISALayout/2015_1/styles/intra.css";
        const links = document.querySelectorAll('link[rel="stylesheet"]');
        links.forEach(link => {
            if (link.href === linkToRemove) {
                link.parentNode.removeChild(link); // Remove the <link> element
            }
        });
    }

    function removeTopBar() {
        topBar.innerHTML = "";
    }

    function removeBottomBar() {
        bottomBar.innerHTML = "";
    }

    function loadCustomTopBar() {
        chrome.runtime.sendMessage({ action: 'getTopBarHTML' }, (response) => {
            if (response.html) {
                topBar.innerHTML = response.html;
            } else {
                console.error("Error loading HTML:", response.error);
            }
        });
    }

    function injectCSS_JS() {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.type = "text/css";
        link.href = cssUrl;
        document.head.appendChild(link);

        const script = document.createElement("script");
        script.src = scriptUrl;
        script.type = "text/javascript";
        script.async = true;
        document.head.appendChild(script);
    }


    chrome.storage.local.get("studentData", (result) => {
        if (result.studentData) {
            document.getElementById("output").textContent = JSON.stringify(result.studentData, null, 2);
        } else {
            document.getElementById("output").textContent = "No data found.";
        }


        studentData = result.studentData;

    });



    injectCSS_JS();

    // TODO: execute following functions based on user's settings

    removeDefaultStyle();
    removeTopBar();
    removeBottomBar();
    loadCustomTopBar();
    
})();
