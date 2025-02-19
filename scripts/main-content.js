// main-content.js
/*

javascript used specifically on mijnstudentendossier.uhasselt.be/*

*/
const topBarUrl = chrome.runtime.getURL("html/components/topBar.html");
const cssUrl = chrome.runtime.getURL("css/styles.css");
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

    function hideBody() {
        const form = document.getElementById("form1");
        if (form) {
            form.classList.add('hidden');
        }
    }


    function loadCustomBody() {
        const customDiv = document.createElement('div');
        customDiv.id = 'customBody';
        document.body.appendChild(customDiv);

        const body = document.getElementById("customBody");

        chrome.runtime.sendMessage({ action: 'getCustomBodyHTML' }, (response) => {
            if (response.html) {
                body.innerHTML = response.html;
                console.log(studentData);
                document.getElementById("studentDataPre").textContent = JSON.stringify(studentData, null, 2);
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

    
    function fetchStudentData() {
        chrome.storage.local.get("studentData", (result) => {
            if (result.studentData) {
                studentData = result.studentData;
                console.log("Data retrieved:", studentData);
                
            } else {
                setTimeout(fetchStudentData, 1000); // Retry after 500ms
            }
        });
    }

    fetchStudentData();

    injectCSS_JS();

    // TODO: execute following functions based on user's settings

    hideBody();
    loadCustomBody();
    removeDefaultStyle();
    
})();


/**
 * 
 * <td class="unselectedMenuItem" id="Menu1-menuItem051" onclick="javascript:skm_closeSubMenus(document.getElementById('Menu1'));location.href='javascript: taal(\'01\');';" onmouseover="javascript:skm_mousedOverMenu('Menu1',this, document.getElementById('Menu1'), true, '');this.className='selectedMenuItem';" onmouseout="javascript:skm_mousedOutMenu('Menu1', this, '');this.className='unselectedMenuItem';">Nederlands</td>
 */