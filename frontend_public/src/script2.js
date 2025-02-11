document.addEventListener('DOMContentLoaded', function () {
    const settingsButton = document.getElementById('settings-image');
    const settingsPopup = document.getElementById('settings-popup');

    settingsButton.addEventListener('click', function () {
        if (settingsPopup.style.display === 'none' || settingsPopup.style.display === '') {
            settingsPopup.style.display = 'block';
        } else {
            settingsPopup.style.display = 'none';
        }
    });

    // Close the popup when clicking outside of it
    window.addEventListener('click', function (event) {
        if (event.target !== settingsButton && !settingsPopup.contains(event.target)) {
            settingsPopup.style.display = 'none';
        }
    });

    closeBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            favoriteAnimalsModal.style.display = 'none';
            settingsPopup.style.display = 'none';
        });
    });

    window.addEventListener('click', function (event) {
        if (event.target === favoriteAnimalsModal) {
            favoriteAnimalsModal.style.display = 'none';
        }
    });
});
