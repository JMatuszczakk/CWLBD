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
        favoriteAnimalsList.innerHTML = ''; // Clear previous content

        let favorites = getCookie("favorites");
        let favoritesArray = favorites ? favorites.split(',') : [];

        if (favoritesArray.length === 0) {
            favoriteAnimalsList.innerHTML = '<p class="text-center text-gray-600 dark:text-gray-400">Brak ulubionych zwierząt.</p>';
            favoriteAnimalsModal.style.display = 'block';
            return;
        }

        // Check if each favorite still exists and display accordingly
        favoritesArray.forEach(dogId => {
            const dog = dogsData.find(d => String(d.id) === dogId);

            if (dog) {
                // Dog exists, display the dog card
                const dogItem = document.createElement('div');
                dogItem.classList.add('flex', 'items-center', 'mb-4', 'p-4', 'border', 'border-gray-200', 'rounded-lg', 'shadow', 'bg-white', 'dark:bg-gray-800', 'dark:border-gray-700');

                dogItem.innerHTML = `
                    <img src="${dog.photo}" alt="${dog.name}" class="w-16 h-16 object-cover rounded-md mr-4">
                    <div class="flex-grow">
                        <h3 class="text-lg font-bold text-gray-900 dark:text-white">${dog.name}</h3>
                        <p class="text-sm text-gray-600 dark:text-gray-400">${dog.race} | ${dog.color}</p>
                    </div>
                    <button class="remove-favorite-btn bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" data-dog-id="${dog.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                `;
                favoriteAnimalsList.appendChild(dogItem);
            } else {
                // Dog no longer exists, display a message
                const removedItem = document.createElement('div');
                removedItem.classList.add('flex', 'items-center', 'mb-4', 'p-4', 'border', 'border-gray-200', 'rounded-lg', 'shadow', 'bg-gray-100', 'dark:bg-gray-700', 'dark:border-gray-600');
                removedItem.innerHTML = `
                    <div class="flex-grow">
                        <p class="text-sm text-gray-600 dark:text-gray-400">To zwierzę zostało usunięte.</p>
                    </div>
                    <button class="remove-favorite-btn bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" data-dog-id="${dogId}">
                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                `;
                favoriteAnimalsList.appendChild(removedItem);
            }
        });


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
    window.onscroll = function () {
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