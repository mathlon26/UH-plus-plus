// popup.js
/*

javascript for the extension popup

*/


const displayName = (voornaam, achternaam) => {
    document.getElementById("usernameDisplay").innerText = `${voornaam} ${achternaam}`;
}


document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.local.get("studentData", (result) => {
        if (result.studentData) {
            document.getElementById("output").textContent = JSON.stringify(result.studentData, null, 2);
        } else {
            document.getElementById("output").textContent = "No data found.";
        }


        const studentData = result.studentData;

        displayName(studentData.TopVoornaam, studentData.TopNaam);

    });
});


document.getElementById("settingsButton").addEventListener("click", () => {
    const settingsUrl = chrome.runtime.getURL("html/settings.html");
    window.open(settingsUrl, "_blank");  // Open the settings page in a new tab
});
