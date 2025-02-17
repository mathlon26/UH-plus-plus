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
    return false;
});
