// frontend_public/src/script1.js

document.addEventListener('DOMContentLoaded', function () {
    const toggleImage = document.getElementById('toggle-image');
    const cartImage = document.getElementById('cart-image');
    const arrowImage = document.getElementById('arrow-image');
    const body = document.getElementById('body');
    const title = document.getElementById('title');
    const szczegoly = document.getElementById('dog-modal-details');
    const szczegoly_tekst = document.getElementById('dog-details');
    const ulubione_bg = document.getElementById('ulu-zwie');
    const ulubione_tekst = document.getElementById('ulu-zwie-tekst');
    const ulubione_tekst_maly = document.getElementById('favorite-animals-list');
    const leftSideNavbar = document.getElementById('left-side-navbar');
    const rightSideNavbar = document.getElementById('right-side-navbar');
    const settings = document.getElementById('settings-image');
    const settings_popup = document.getElementById('settings-popup');
    const filter = document.getElementById('filter-image');
    const filter_input = document.getElementById('filter-input');
    const loginImage = document.getElementById('login-image');
    const loginModal = document.getElementById('login-modal');
    const loginModalContent = document.querySelector('#login-modal .modal-content');
    const loginModal_username = document.getElementById('login-username');
    const loginModal_password = document.getElementById('login-password');

    // --- Helper Functions ---
    function setCookie(name, value, days) {
        const d = new Date();
        d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + d.toUTCString();
        document.cookie = name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/";
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
                return decodeURIComponent(c.substring(cname.length, c.length));
            }
        }
        return "";
    }

    function setDarkMode(isDarkMode) {
        if (isDarkMode) {
            applyDarkMode();
            setCookie('darkMode', 'true', 7); // Use setCookie
        } else {
            applyLightMode();
            setCookie('darkMode', 'false', 7); // Use setCookie
        }
    }

    function isDarkMode() {
        return getCookie('darkMode') === 'true'; // Use getCookie
    }

    function applyDarkMode() {
        const dogInfoElements = document.querySelectorAll('.dog-info');
        const dogInfoTextElements = document.querySelectorAll('.dog-info-text');
        toggleImage.src = '/zmiana_c.png';
        cartImage.src = '/wozek_c.png';
        arrowImage.src = '/strzalka_c.png';
        settings.src = '/settings_c.png';
        filter.src = '/filter_c.png';
        loginImage.src = '/account_d.png';
        body.style.backgroundColor = '#041C32';
        title.style.color = '#ECB365';
        leftSideNavbar.style.backgroundColor = '#333';
        rightSideNavbar.style.backgroundColor = '#333';
        dogInfoElements.forEach(element => {
            element.style.backgroundColor = '#064663';
            element.style.color = '#ECB365';
            element.classList.add('object-cover', 'rounded-b');
        });
        dogInfoTextElements.forEach(element => {
            element.style.color = '#a7732a';
        });
        szczegoly.style.backgroundColor = '#064663';
        szczegoly_tekst.style.color = '#ECB365';
        ulubione_bg.style.backgroundColor = '#064663';
        ulubione_tekst.style.color = '#ECB365';
        ulubione_tekst_maly.style.color = '#ECB365';
        filter_input.style.backgroundColor = '#333';
        settings_popup.style.backgroundColor = '#333';
        settings_popup.style.color = '#ECB365';
        loginModalContent.style.backgroundColor = '#064663';
        loginModalContent.style.color = '#ECB365';
        loginModal_username.style.backgroundColor = '#333';
        loginModal_password.style.backgroundColor = '#333';
        updateHeartIcons(); // Update heart icons when mode changes
    }

    function applyLightMode() {
        const dogInfoElements = document.querySelectorAll('.dog-info');
        const dogInfoTextElements = document.querySelectorAll('.dog-info-text');
        toggleImage.src = '/zmiana_b.png';
        cartImage.src = '/wozek.png';
        loginImage.src = '/account_w.png';
        arrowImage.src = '/strzalka_back.png';
        settings.src = '/settings_b.png';
        filter.src = '/filter_b.png';
        body.style.backgroundColor = '#dbeafe';
        title.style.color = '#1e3a8a';
        leftSideNavbar.style.backgroundColor = '#bad3f5';
        rightSideNavbar.style.backgroundColor = '#bad3f5';
        dogInfoElements.forEach(element => {
            element.style.backgroundColor = '#ffffff';
            element.style.color = 'black';
        });
        dogInfoTextElements.forEach(element => {
            element.style.color = 'gray';
            element.classList.remove('text-white');
            element.classList.add('text-gray-600');
        });
        szczegoly.style.backgroundColor = 'white';
        szczegoly_tekst.style.color = 'black';
        ulubione_bg.style.backgroundColor = 'white';
        ulubione_tekst.style.color = 'black';
        ulubione_tekst_maly.style.color = 'black';
        filter_input.style.backgroundColor = '#bad3f5';
        settings_popup.style.backgroundColor = '#bad3f5';
        settings_popup.style.color = 'black';
        loginModalContent.style.backgroundColor = 'white';
        loginModalContent.style.color = 'black';
        loginModal_username.style.backgroundColor = '#bad3f5';
        loginModal_password.style.backgroundColor = '#bad3f5';
        updateHeartIcons(); // Update heart icons when mode changes

    }

    function updateHeartIcons() {
        dogsData.forEach(dog => {
            const heartImage = document.getElementById(`heartImage-${dog.id}`);
            if (heartImage) {
                const favoriteAnimals = getFavoriteAnimals();
                const isLiked = favoriteAnimals.includes(dog.id);
                heartImage.src = isLiked ? '/serce1.png' : (isDarkMode() ? '/serce2_c.png' : '/serce2_b.png');
            }
        });
    }


    toggleImage.addEventListener('click', function () {
        setDarkMode(!isDarkMode());
    });

    const galleryContainer = document.getElementById('dogs-gallery');
    const modal = document.getElementById('dog-modal');
    const modalDetails = document.getElementById('dog-details');
    const closeBtn = document.querySelector('.close-btn');
    const cookieConsentModal = document.getElementById('cookie-consent-modal');
    const acceptCookiesBtn = document.getElementById('accept-cookies');
    const rejectCookiesBtn = document.getElementById('reject-cookies');

    // Check for cookie consent (using cookies, not localStorage)
    if (!getCookie('cookieConsent')) {
        cookieConsentModal.style.display = 'block';
    }

    acceptCookiesBtn.addEventListener('click', () => {
        setCookie('cookieConsent', 'accepted', 365); // Longer duration
        cookieConsentModal.style.display = 'none';
    });

    rejectCookiesBtn.addEventListener('click', () => {
        window.location.href = 'https://www.google.com';
    });

    let dogsData = [];

    function fetchAndDisplayDogs() {
        fetch('https://api.cwlbelchatow.nl/api/dogs')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(dogs => {
                dogsData = dogs;
                displayDogs(dogs);
                if (isDarkMode()) {
                    applyDarkMode();
                } else {
                    applyLightMode();
                }
            })
            .catch(error => {
                console.error('Błąd podczas wczytywania psów:', error);
                galleryContainer.innerHTML = `
                                <div class="col-span-full text-center text-red-600">
                                    Nie udało się wczytać psów. Prosimy spróbować ponownie później.
                                </div>
                            `;
            });
    }


    function getFavoriteAnimals() {
        const cookieValue = getCookie('favoriteAnimals');
        if (!cookieValue) {
            return [];
        }
        try {
            return JSON.parse(cookieValue);
        } catch (error) {
            console.error("Error parsing favoriteAnimals cookie:", error);
            return []; // Return an empty array on error
        }
    }


    function setFavoriteAnimals(animals) {
        setCookie('favoriteAnimals', JSON.stringify(animals), 365);
    }

    function displayDogs(dogs) {
        galleryContainer.innerHTML = '';
        dogs.forEach(dog => {
            const dogCard = document.createElement('div');
            dogCard.className = 'rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer dog-card';
            dogCard.innerHTML = `
                <div class="p-0">
                    <img src="${dog.photo}" alt="${dog.name}" class="w-full h-64 object-cover rounded-t"/>
                </div>
                <div class="p-4 dog-info rounded-b" style="background-color: ${isDarkMode() ? '#064663' : '#ffffff'};}">
                    <h2 class="text-xl font-bold">${dog.name}</h2>
                    <p class="text-gray-600 dog-info-text">${dog.race} | ${dog.color}</p>
                </div>
            `;

            dogCard.addEventListener('click', () => {
                const favoriteAnimals = getFavoriteAnimals();
                const isLiked = favoriteAnimals.includes(dog.id);

                modalDetails.innerHTML = `
                    <h2 class="text-2xl font-bold mb-4">${dog.name}</h2>
                    <img src="${dog.photo}" alt="${dog.name}" class="w-full h-96 object-cover rounded-lg mb-4 rounded-b-lg"/>
                    <div class="space-y-2 relative">
                        <p><strong>Rasa:</strong> ${dog.race}</p>
                        <p><strong>Kolor:</strong> ${dog.color}</p>
                        <p><strong>Numer ID:</strong> ${dog.number}</p>
                        <p><strong>Choroby:</strong> ${dog.illnesses || 'Zdrowy'}</p>
                        <button class="absolute bottom-0 right-0 bg-blue-600 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-700">Dodaj do koszyka</button>
                        <button id="heartButton-${dog.id}" class="absolute bottom-20 right-0 px-4 py-2 rounded-lg mt-4">
                            <img id="heartImage-${dog.id}" src="${isLiked ? '/serce1.png' : (isDarkMode() ? '/serce2_c.png' : '/serce2_b.png')}" alt="Serce" class="w-8 h-auto">
                        </button>
                    </div>
                `;
                modal.style.display = 'block';

                // Heart button event listener (inside the dogCard click handler)
                document.getElementById(`heartButton-${dog.id}`).addEventListener('click', function () {
                    const heartImage = document.getElementById(`heartImage-${dog.id}`);
                    let favoriteAnimals = getFavoriteAnimals();
                    const isLiked = favoriteAnimals.includes(dog.id);

                    if (isLiked) {
                        heartImage.src = isDarkMode() ? '/serce2_c.png' : '/serce2_b.png';
                        favoriteAnimals = favoriteAnimals.filter(id => id !== dog.id);
                    } else {
                        heartImage.src = '/serce1.png';
                        if (!favoriteAnimals.includes(dog.id)) {
                            favoriteAnimals.push(dog.id);  // Store the ID
                        }
                    }
                    setFavoriteAnimals(favoriteAnimals);

                });

            });
            galleryContainer.appendChild(dogCard);
        });
    }

    filter_input.addEventListener('input', function () {
        const filterText = filter_input.value.toLowerCase();
        const filteredDogs = dogsData.filter(dog =>
            dog.name.toLowerCase().includes(filterText) ||
            dog.race.toLowerCase().includes(filterText) ||
            dog.color.toLowerCase().includes(filterText)
        );
        displayDogs(filteredDogs);
        if (isDarkMode()) {
            applyDarkMode();
        }
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // --- Initial Load ---
    fetchAndDisplayDogs();  // Load and display dogs on page load
    if (isDarkMode()) {
        applyDarkMode();
    } else {
        applyLightMode();
    }
});


//Login
document.addEventListener('DOMContentLoaded', function () {

    async function getSession(username, password) {
        try {
            const response = await fetch('https://api.cwlbelchatow.nl/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: username, password: password }),
            });

            const data = await response.json();

            if (data.message === "Niepoprawne dane logowania!") {
                console.error('Błąd podczas logowania:', data.message);
                return "error";
            }
            console.log('Zalogowano pomyślnie:', data);

            setCookie('sessionKey', data.session_key, 7);

            return "success";
        } catch (error) {
            console.error('Błąd podczas logowania:', error);
            return "error";
        }
    }

    const loginButton = document.getElementById('login-submit');
    const loginModal = document.getElementById('login-modal');
    loginButton.addEventListener('click', async function () {
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        const result = await getSession(username, password);

        if (result === "success") {
            Swal.fire({
                icon: 'success',
                title: 'Zalogowano pomyślnie!',
                showConfirmButton: false,
                timer: 1500
            });
            loginModal.style.display = 'none';
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Błąd logowania!',
                text: 'Spróbuj ponownie.',
            });
        }
    });
});

