// settings.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const themeSelect = document.getElementById('theme');
    const customizeButton = document.getElementById('customizeButton');
    const customizationModal = document.getElementById('customizationModal');
    const closeModal = document.getElementById('closeModal');
    const saveColors = document.getElementById('saveColors');
    const bgColorInput = document.getElementById('bgColor');
    const textColorInput = document.getElementById('textColor');

    // Load saved settings
    chrome.storage.sync .get(['theme', 'bgColor', 'textColor'], (data) => {
        if (data.theme) {
            themeSelect.value = data.theme;
        }
        bgColorInput.value = data.bgColor || '#ffffff'; // Default to white
        textColorInput.value = data.textColor || '#000000'; // Default to black
    });

    // Save settings on form submit
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const theme = themeSelect.value;
        const notifications = notificationsCheckbox.checked;

        chrome.storage.sync.set({ theme, notifications }, () => {
            alert('Settings saved!');
        });
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
        const bgColor = bgColorInput.value;
        const textColor = textColorInput.value;

        chrome.storage.sync.set({ bgColor, textColor }, () => {
            alert('Color settings saved!');
            customizationModal.classList.add('hidden');
        });
    });
});