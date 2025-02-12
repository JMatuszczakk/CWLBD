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

    // --- Cookie Helper Functions ---

    function setCookie(name, value, days) {
        const d = new Date();
        d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + d.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    function getCookie(name) {
        const cname = name + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(cname) == 0) {
                return c.substring(cname.length, c.length);
            }
        }
        return "";
    }

    function addFavorite(dogId) {
        let favorites = getCookie("favorites");
        let favoritesArray = favorites ? favorites.split(',') : [];
        if (!favoritesArray.includes(String(dogId))) {
            favoritesArray.push(String(dogId));
            setCookie("favorites", favoritesArray.join(','), 7);
        }
    }

    function removeFavorite(dogId) {
        let favorites = getCookie("favorites");
        let favoritesArray = favorites ? favorites.split(',') : [];
        favoritesArray = favoritesArray.filter(id => id !== String(dogId));
        setCookie("favorites", favoritesArray.join(','), 7);
    }

    function isFavorite(dogId) {
        let favorites = getCookie("favorites");
        let favoritesArray = favorites ? favorites.split(',') : [];
        return favoritesArray.includes(String(dogId));
    }

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
                removeFavorite(dogId);
                showFavoriteAnimals();
                updateHeartIconsInList();
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