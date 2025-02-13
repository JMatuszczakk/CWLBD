// frontend_public/src/script3.js

document.addEventListener('DOMContentLoaded', function () {
    const settingsButton = document.getElementById('settings-image');
    const settingsPopup = document.getElementById('settings-popup');
    const favoriteIcon = document.getElementById('favorite-icon');
    const favoriteAnimalsModal = document.getElementById('favorite-animals-modal');
    const closeBtns = document.querySelectorAll('.close-btn');
    const favoriteAnimalsList = document.getElementById('favorite-animals-list');
    const loginButton = document.getElementById('login-image');
    const loginModal = document.getElementById('login-modal');
    const closeBtn = loginModal.querySelector('.close-btn');

    // --- Settings Popup ---
    settingsButton.addEventListener('click', function () {
        settingsPopup.style.display = (settingsPopup.style.display === 'none' || settingsPopup.style.display === '') ? 'block' : 'none';
    });

    window.addEventListener('click', function (event) {
        if (event.target !== settingsButton && !settingsPopup.contains(event.target)) {
            settingsPopup.style.display = 'none';
        }
        if (event.target === favoriteAnimalsModal) {
            favoriteAnimalsModal.style.display = 'none';
        }
        if (event.target === loginModal) {
            loginModal.style.display = 'none';
        }
    });

    // --- Favorites Modal Logic ---

    async function showFavoriteAnimals() {
        const favoriteAnimalsList = document.getElementById('favorite-animals-list');
        favoriteAnimalsList.innerHTML = '';

        let favorites = getCookie("favorites");
        let favoritesArray = favorites ? favorites.split(',') : [];

        if (favoritesArray.length === 0) {
            favoriteAnimalsList.innerHTML = '<p>Brak ulubionych zwierząt.</p>';
            favoriteAnimalsModal.style.display = 'block';
            return;
        }

        const favoriteDogs = dogsData.filter(dog => favoritesArray.includes(String(dog.id)));

        if (favoriteDogs.length === 0) {
            favoriteAnimalsList.innerHTML = '<p>Brak ulubionych zwierząt.</p>';
        } else {
            favoriteDogs.forEach(dog => {
                const dogItem = document.createElement('div');
                dogItem.classList.add('favorite-dog-item', 'mb-4', 'p-4', 'border', 'rounded', 'shadow');
                dogItem.innerHTML = `
                    <img src="${dog.photo}" alt="${dog.name}" class="w-full h-48 object-cover rounded-t mb-2">
                    <h3 class="text-lg font-bold">${dog.name}</h3>
                    <p class="text-sm">Rasa: ${dog.race}, Kolor: ${dog.color}</p>
                    <button class="remove-favorite-btn bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2" data-dog-id="${dog.id}">Usuń z ulubionych</button>
                `;
                favoriteAnimalsList.appendChild(dogItem);
            });
        }

        const removeButtons = favoriteAnimalsList.querySelectorAll('.remove-favorite-btn');
        removeButtons.forEach(button => {
            button.addEventListener('click', function () {
                const dogId = this.dataset.dogId;
                removeFavorite(dogId); // Uses functions now in script1.js
                showFavoriteAnimals();
                updateHeartIconsInList(); // Uses function now in script1.js
            });
        });

        favoriteAnimalsModal.style.display = 'block';
    }

    // --- Event Listeners ---
    favoriteIcon.addEventListener('click', showFavoriteAnimals);

    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            favoriteAnimalsModal.style.display = 'none';
            settingsPopup.style.display = 'none';
        });
    });

    loginButton.addEventListener('click', () => {
        loginModal.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        loginModal.style.display = 'none';
    });

    // --- Scroll Function (Top Bar) ---
    let prevScrollpos = window.pageYOffset;
    window.onscroll = function () { // Define onscroll *once*
        const currentScrollPos = window.pageYOffset;
        const bar = document.getElementById("top-bar");
        if (prevScrollpos > currentScrollPos) {
            bar.style.top = "0";
        } else {
            bar.style.top = "-80px";
        }
        prevScrollpos = currentScrollPos;
    };
    function updateHeartIconsInList() {
        const dogCards = document.querySelectorAll('.dog-card');
        dogCards.forEach(card => {
            const dogNameElement = card.querySelector('h2');
            if (dogNameElement) {
                const dog = dogsData.find(d => d.name === dogNameElement.textContent);
                if (dog) {
                    const heartImage = card.querySelector('#heartImage');
                    if (heartImage) {
                        heartImage.src = isFavorite(dog.id) ? '/serce1.png' : (getCookie('darkMode') === 'true' ? '/serce2_c.png' : '/serce2_b.png');
                    }
                }
            }
        });
    }

});