var studentData = {};
const DEBUG = true;



(() => {
    function loadCustomPage(lang) {
        if (DEBUG) {
            document.getElementById("studentDataPre").textContent = JSON.stringify(studentData, null, 2);
        }

        function fillText() {
            var naam = studentData.Voornaam;
            var achternaam = studentData.Naam;
            var volNaam = `${naam} ${achternaam}`;

            document.getElementById("welkomVolNaam").innerText = volNaam;
        }

        function initNav() {
            let navWithLinks = document.getElementsByClassName("hasLinksNav");
            const navTab = document.getElementById("linksTab");

            let lastEl = null;
            let view = null;
        
            Array.from(navWithLinks).forEach(element => {
                element.addEventListener("mouseover", () => {
                navTab.classList.remove("h-0");
                navTab.classList.add("h-auto");
                element.classList.add("border-b-3", "border-red-500");
                view = document.getElementById(element.attributes.target.value);
                view.classList.remove("hidden");
                lastEl = element;
                });
        
                element.addEventListener("mouseleave", () => {
                    navTab.classList.remove("h-auto");
                    navTab.classList.add("h-0");
                    element.classList.remove("border-b-3", "border-red-500");
                    view.classList.add("hidden");
                    lastEl = element;
                });
            });

            navTab.addEventListener("mouseover", () => {
                navTab.classList.remove("h-0");
                navTab.classList.add("h-auto");
                view.classList.remove("hidden");
                lastEl.classList.add("border-b-3", "border-red-500");
            });
        
            navTab.addEventListener("mouseleave", () => {
                navTab.classList.remove("h-auto");
                navTab.classList.add("h-0");
                view.classList.add("hidden");
                lastEl.classList.remove("border-b-3", "border-red-500");
            });
        }
        
        fillText();
        initNav();
    }

    function loadCustomPageContent_DUTCH() {
        const default_taalButton = document.getElementById("Menu1-menuItem052");
        const taalButton = document.getElementById("langSwitch");

        
        
        function initButtons() {
            taalButton.addEventListener("click", (event) => {
                event.preventDefault();
                default_taalButton.click();
            });
        }

        initButtons();
        loadCustomPage("dutch");
    }

    function loadCustomPageContent_ENGLISH() {
        const default_taalButton = document.getElementById("Menu1-menuItem051");
        const taalButton = document.getElementById("langSwitch");

        function initButtons() {
            taalButton.addEventListener("click", (event) => {
                event.preventDefault();
                default_taalButton.click();
            });
        }

        initButtons();
        loadCustomPage("english");
    }



    function initDefaultWebFunctionality() {
        const nullFunction = () => {};
        const emptyObject = {};

        function loadStudentData() {
            document.querySelectorAll('input[type="hidden"]').forEach(input => {
                if (input.name.startsWith("Top1$ih")) {
                    var key = input.name.replace("Top1$ih", "");
                    var key = key.replace("Top", "");
                    studentData[key] = input.value || null;
                }
            });
        }

        function disableFunctions() {
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
        }

        function removeDefaultStyling() {
            // Remove style tags
            document.querySelectorAll('*').forEach((el) => {
                el.removeAttribute('style');
            });

            // Remove intra.css
            const linkToRemove = "https://cdn.uhasselt.be/ISALayout/2015_1/styles/intra.css";
            const links = document.querySelectorAll('link[rel="stylesheet"]');
            links.forEach(link => {
                if (link.href === linkToRemove) {
                    link.parentNode.removeChild(link); // Remove the <link> element
                }
            });
        }

        function hideBody() {
            const form = document.getElementById("form1");
            if (form) {
                form.classList.add('hidden');
            }
        }

        function loadRemixIcons() {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = "https://cdnjs.cloudflare.com/ajax/libs/remixicon/4.6.0/remixicon.css";
            link.integrity = "sha512-kJlvECunwXftkPwyvHbclArO8wszgBGisiLeuDFwNM8ws+wKIw0sv1os3ClWZOcrEB2eRXULYUsm8OVRGJKwGA==";
            link.crossOrigin = "anonymous";
            link.referrerPolicy = "no-referrer";
        
            document.head.appendChild(link);
        }

        function loadCustomBody() {
            const customDiv = document.createElement('div');
            customDiv.id = 'customBody';
            document.body.appendChild(customDiv);
            const body = document.getElementById("customBody");

            chrome.runtime.sendMessage({ action: 'GET::custom_html', lang: studentData.Taal }, (response) => {
                if (response.html) {
                    body.innerHTML = response.html;
                    if (response.lang == "dutch") {
                        loadCustomPageContent_DUTCH();
                    } else {
                        loadCustomPageContent_ENGLISH();
                    }
                }
            });
        }

        loadStudentData();
        disableFunctions();
        removeDefaultStyling();
        hideBody();
        loadRemixIcons();
        loadCustomBody();
    }
    // First: Remove the default styles and hide the websites content, replace it with the custom html
    initDefaultWebFunctionality();

    
})();

(() => {
    function DEBUG() {
        
        
    }

    DEBUG();
})();