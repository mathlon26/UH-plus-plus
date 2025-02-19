// background.js


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
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
    return false;
});
