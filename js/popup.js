// popup.js
/*

javascript for the extension popup

*/


document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.local.get("studentData", (result) => {
        if (result.studentData) {
            document.getElementById("output").textContent = JSON.stringify(result.studentData, null, 2);
        } else {
            document.getElementById("output").textContent = "No data found.";
        }

        console.log(result.studentData);
    });
});