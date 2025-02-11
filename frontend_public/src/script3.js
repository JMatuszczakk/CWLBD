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
});
function addFavoriteAnimal(animal) {
    const favoriteAnimals = JSON.parse(localStorage.getItem('favoriteAnimals')) || [];
    favoriteAnimals.push(animal);
    localStorage.setItem('favoriteAnimals', JSON.stringify(favoriteAnimals));
}

function getFavoriteAnimals() {
    return JSON.parse(localStorage.getItem('favoriteAnimals')) || []; //TODO: do zrobienia renderowanie całych obiektów
}

function printFavoriteAnimals() {
    const favoriteAnimals = getFavoriteAnimals();
    if (favoriteAnimals.length === 0) {
        console.log('Brak ulubionych zwierząt.');
    } else {
        console.log('Ulubione zwierzęta:');
        favoriteAnimals.forEach(animal => {
            console.log(animal);
        });
    }
}
document.addEventListener('DOMContentLoaded', function () {
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
window.onscroll = function () { scrollFunction() };
// document.getElementById("navbar").style.top = "0"

document.addEventListener('DOMContentLoaded', function () {
    const loginButton = document.getElementById('login-button');
    const loginModal = document.getElementById('login-modal');
    const closeBtn = loginModal.querySelector('.close-btn');

    loginButton.addEventListener('click', function () {
        loginModal.style.display = 'block';
    });

    closeBtn.addEventListener('click', function () {
        loginModal.style.display = 'none';
    });

    window.addEventListener('click', function (event) {
        if (event.target === loginModal) {
            loginModal.style.display = 'none';
        }
    });
});