// background.js

let currentTab = "home";
const DEBUG = true;



chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    async function getContentPage(pageName) {
        console.log("GET content " + pageName);
        let url = `src/pages/content/${pageName}.html`;
        try {
            const response = await fetch(chrome.runtime.getURL(url));
            const html = await response.text();
            sendResponse({ html: html });
        } catch (err) {
            sendResponse({ error: err });
        }
        return true;
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
        return true; 
    }else if(message.action == "POST::settings"){ // save settings
        var key = message.key;
        var value = message.value;
        

        if (key && value)
        {

            chrome.storage.local.get('settings', (result) => {
                const settings = result.settings || {}; // make sure settings is an object
                settings[key] = value; // Update the setting
                chrome.storage.local.set({settings: settings});
                if(DEBUG)
                {
                    console.log("POST set ", key, value);
                }
            })
        }
        return true;
    }else if(message.action == "POST::settingsFull") //WARNING OVERWRITES ALL SETTINGS post a full json instead of just a single setting 
    {
        const settings = message.data
        if(settings)
        
            chrome.storage.local.set({settings: settings});
        }
    }
    else if (message.action == "GET::settings") {
        // lees settings
        chrome.storage.local.get("settings", (result) => {
            const settings = result.settings || {}; // make sure settings is an object
            if(DEBUG)
            {
                console.log("Settings: ", settings)
            }
            if (settings)
            {
                // reply with the settings
                sendResponse({settings: settings});
                //return true;
            }
        })
        return true;
    }



    return false;
});
