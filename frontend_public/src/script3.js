// frontend_public/src/script3.js
document.addEventListener('DOMContentLoaded', function () {
    const settingsButton = document.getElementById('settings-image');
    const settingsPopup = document.getElementById('settings-popup');
    const favoriteIcon = document.getElementById('favorite-icon');
    const favoriteAnimalsModal = document.getElementById('favorite-animals-modal');
    const favoriteAnimalsList = document.getElementById('favorite-animals-list');
    const loginButton = document.getElementById('login-image');  //for login
    const loginModal = document.getElementById('login-modal');
    const closeBtn = loginModal.querySelector('.close-btn');


    settingsButton.addEventListener('click', function () {
        settingsPopup.style.display = (settingsPopup.style.display === 'none' || settingsPopup.style.display === '') ? 'block' : 'none';
    });

    // Close the popup when clicking outside
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
            favoriteAnimalsModal.style.display = 'block'; // Show even if empty
            return;
        }


        // Fetch details for each favorite animal.  Use Promise.all for parallel fetching.
        Promise.all(favoriteAnimals.map(dogId =>
            fetch(`https://api.cwlbelchatow.nl/api/dogs`).then(response => response.json()).then(dogs => {
                const dog = dogs.find(d => d.id === dogId);
                return dog
            })
        ))
            .then(dogs => {
                dogs.forEach(dog => {
                    if (!dog) return; // Skip if dog data not found.

                    const animalItem = document.createElement('div');
                    animalItem.className = 'favorite-animal-item flex items-center p-2 border-b last:border-none'; // Added some basic styling
                    animalItem.innerHTML = `
                        <img src="${dog.photo}" alt="${dog.name}" class="w-16 h-16 object-cover rounded mr-4">
                        <div>
                            <h3 class="text-lg font-bold">${dog.name}</h3>
                            <p>${dog.race} | ${dog.color}</p>
                        </div>
                    `;
                    favoriteAnimalsList.appendChild(animalItem);
                });
                favoriteAnimalsModal.style.display = 'block';  // Show the modal *after* populating it
            })
            .catch(error => {
                console.error("Error fetching favorite animals:", error);
                favoriteAnimalsList.innerHTML = "<p>Error loading favorite animals.</p>";
                favoriteAnimalsModal.style.display = 'block'; //show modal

            });

    });



    // --- Login Modal ---
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
function getFavoriteAnimals() {
    const cookieValue = getCookie('favoriteAnimals');
    if (!cookieValue) {
        return [];
    }
    try {
        return JSON.parse(cookieValue);
    } catch (error) {
        console.error("Error parsing favoriteAnimals cookie:", error);
        return [];  // Return empty array on parse error
    }
}

function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/";  // Encode the value
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
            return decodeURIComponent(c.substring(cname.length, c.length)); // Decode the value
        }
    }
    return "";
}