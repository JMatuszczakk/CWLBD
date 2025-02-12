// frontend_public/src/script2.js

document.addEventListener('DOMContentLoaded', function () {
    const settingsButton = document.getElementById('settings-image');
    const settingsPopup = document.getElementById('settings-popup');
    const favoriteAnimalsModal = document.getElementById('favorite-animals-modal'); // Corrected ID
    const closeBtns = document.querySelectorAll('.close-btn');


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

        if (event.target === document.getElementById('login-modal')) { // Make sure we have a login modal
            document.getElementById('login-modal').style.display = 'none';
        }
    });


    window.addEventListener('click', function (event) {
        if (event.target === document.getElementById('login-modal')) { // Make sure we have a login modal
            document.getElementById('login-modal').style.display = 'none';
        }
    });
});