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
document.addEventListener('DOMContentLoaded', function () {
    const galleryContainer = document.getElementById('dogs-gallery');
    const modal = document.getElementById('dog-modal');
    const modalDetails = document.getElementById('dog-details');
    const closeBtn = document.querySelector('.close-btn');
    const cookieConsentModal = document.getElementById('cookie-consent-modal');
    const acceptCookiesBtn = document.getElementById('accept-cookies');
    const rejectCookiesBtn = document.getElementById('reject-cookies');

    // Check for cookie consent
    if (!localStorage.getItem('cookieConsent')) {
        cookieConsentModal.style.display = 'block';
    }

    acceptCookiesBtn.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        cookieConsentModal.style.display = 'none';
    });

    rejectCookiesBtn.addEventListener('click', () => {
        window.location.href = 'https://www.google.com';
    });

    ss
    // Dodaj event kliknięcia, aby pokazać szczegóły psa
    dogCard.addEventListener('click', () => {
        modalDetails.innerHTML = `
                                <h2 class="text-2xl font-bold mb-4">${dog.name}</h2>
                                <img 
                                    src="${dog.photo}" 
                                    alt="${dog.name}" 
                                    class="w-full h-96 object-cover rounded-lg mb-4"
                                />
                                <div class="space-y-2 relative">
                                    <p><strong>Rasa:</strong> ${dog.race}</p>
                                    <p><strong>Kolor:</strong> ${dog.color}</p>
                                    <p><strong>Numer ID:</strong> ${dog.number}</p>
                                    <p><strong>Choroby:</strong> ${dog.illnesses || 'Zdrowy'}</p>
                                    <button class="absolute bottom-0 right-0 bg-blue-600 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-700">Dodaj do koszyka</button>
                                    <button id="heartButton" class="absolute bottom-20 right-0 px-4 py-2 rounded-lg mt-4">
                                        <img id="heartImage" src="${localStorage.getItem('heart-' + dog.number) === 'true' ? '/serce1.png' : '/serce2_b.png'}" alt="Serce" class="w-8 h-auto">
                                    </button>
                                </div>
                            `;
        modal.style.display = 'block';
        // Zapisz stan polubienia psa w localStorage
        document.getElementById('heartButton').addEventListener('click', function () {
            var heartImage = document.getElementById('heartImage');
            var isLiked = localStorage.getItem('heart-' + dog.number) === 'true';
            var favouriteAnimals = JSON.parse(localStorage.getItem('favouriteAnimals')) || [];
            addFavoriteAnimal(dog.number);
            if (isLiked) {
                heartImage.src = '/serce2_b.png';
                localStorage.setItem('heart-' + dog.number, 'false');
                favouriteAnimals = favouriteAnimals.filter(function (animal) {
                    return animal !== dog.number;
                });
            } else {
                heartImage.src = '/serce1.png';
                localStorage.setItem('heart-' + dog.number, 'true');
                if (!favouriteAnimals.includes(dog.number)) {
                    favouriteAnimals.push(dog.number);
                }
            }

            localStorage.setItem('favouriteAnimals', JSON.stringify(favouriteAnimals));
        });
    });

    galleryContainer.appendChild(dogCard);
});

// Zamknij modal po kliknięciu przycisku zamknięcia
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Zamknij modal po kliknięciu poza nim
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
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

