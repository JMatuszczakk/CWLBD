// frontend_public/src/script2.js

document.addEventListener('DOMContentLoaded', function () {
    const settingsButton = document.getElementById('settings-image');
    const settingsPopup = document.getElementById('settings-popup');
    const favoriteAnimalsModal = document.getElementById('favorite-animals-modal'); // Moved inside DOMContentLoaded
    const closeBtns = document.querySelectorAll('.close-btn');
    const favoriteAnimalsList = document.getElementById('favorite-animals-list'); // Correct element ID

    settingsButton.addEventListener('click', function () {
        settingsPopup.style.display = (settingsPopup.style.display === 'none' || settingsPopup.style.display === '') ? 'block' : 'none';
    });

    // Close the popup when clicking outside of it
    window.addEventListener('click', function (event) {
        if (event.target !== settingsButton && !settingsPopup.contains(event.target)) {
            settingsPopup.style.display = 'none';
        }
    });
    closeBtns.forEach(btn => {  //close buttons
        btn.addEventListener('click', function () {
            favoriteAnimalsModal.style.display = 'none';
        });
    });

    window.addEventListener('click', function (event) { //closing modal for favourites
        if (event.target === favoriteAnimalsModal) {
            favoriteAnimalsModal.style.display = 'none';
        }
    });


});