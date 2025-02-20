// settings.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const customizeButton = document.getElementById('customizeButton');
    const customizationModal = document.getElementById('customizationModal');
    const closeModal = document.getElementById('closeModal');
    const saveColors = document.getElementById('saveColors');
    const bgColorInput = document.getElementById('bgColor');
    const textColorInput = document.getElementById('textColor');
    


    // Load saved settings
    chrome.storage.sync.get(['theme', 'bgColor', 'textColor'], (data) => {
        if (data.theme) {
            themeSelect.value = data.theme;
        }
        bgColorInput.value = data.bgColor || '#ffffff'; // Default to white
        textColorInput.value = data.textColor || '#000000'; // Default to black
    });
    
    


    // Open customization modal
    customizeButton.addEventListener('click', () => {
        customizationModal.classList.remove('hidden');
    });

    // Close modal
    closeModal.addEventListener('click', () => {
        customizationModal.classList.add('hidden');
    });

    // Save color settings
    saveColors.addEventListener('click', () => {
                
    });
});



const themeSelect = document.getElementById('theme');
chrome.runtime.sendMessage({ action: "GET::settings" }, (response)=>{
    if (response)
    {
        const settings = response.settings;
        themeSelect.value = settings.theme

    }
})

function saveSettings()
{
      chrome.runtime.sendMessage({
          action: "POST::settings",
          key: "theme",
          value: themeSelect.value
      })   
}

document
      .getElementById("saveSettings")
      .addEventListener("click", function () {saveSettings()}); // save settings when pressing save

