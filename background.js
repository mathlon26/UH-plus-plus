// background.js

var STUDENT = {}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "hello") {
        sendResponse("Hi from the background!");
    }
    else if (message.action == "storeExtractedData") {
        console.log("Received Data:", message.data);

        chrome.storage.local.set({ studentData: message.data }, () => {
            sendResponse("Saved studentData succesfully.");
        });
    }
    else if (message.action == "getCustomBodyHTML") {
        fetch(chrome.runtime.getURL("html/components/custom.html"))
            .then(response => response.text())
            .then(html => sendResponse({ html: html }))
            .catch(err => sendResponse({ error: err }));
        return true;
    }
    return false;
});
