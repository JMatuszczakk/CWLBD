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

    const favoriteIcon = document.getElementById('favorite-icon');
    const favoriteAnimalsModal = document.getElementById('favorite-animals-modal');
    const closeBtns = document.querySelectorAll('.close-btn');
    const favoriteAnimalsList = document.getElementById('favorite-animals-list');

    favoriteIcon.addEventListener('click', function () {
        const favoriteAnimals = JSON.parse(localStorage.getItem('favoriteAnimals')) || [];

        favoriteAnimalsList.innerHTML = '';

        if (favoriteAnimals.length === 0) {
            favoriteAnimalsList.innerHTML = '<p>Brak ulubionych zwierząt.</p>';
        } else {
            favoriteAnimals.forEach(animal => {
                const animalItem = document.createElement('div');
                animalItem.textContent = animal;
                favoriteAnimalsList.appendChild(animalItem);
            });
        }

        favoriteAnimalsModal.style.display = 'block';
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
