document.addEventListener('DOMContentLoaded', function () {
    const addToCartButton = document.getElementById('add-to-cart');
    const cartImage = document.getElementById('cart-image');
    const dogModal = document.getElementById('dog-modal');
    const dogDetails = document.getElementById('dog-details');

    // Pobierz koszyk z localStorage lub utwórz nowy, jeśli nie istnieje
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Obsługa kliknięcia przycisku "Dodaj do koszyka"
    addToCartButton.addEventListener('click', function () {
        // Pobierz nazwę zwierzęcia (lub inne dane) z sekcji szczegółów
        const dogName = dogDetails.querySelector('h2').textContent; // Zakładam, że nazwa jest w <h2>
        const dogImage = dogDetails.querySelector('img').src; // Zakładam, że obraz jest w <img>

        // Sprawdź, czy zwierzę już jest w koszyku
        const isAlreadyInCart = cartItems.some(item => item.name === dogName);

        if (!isAlreadyInCart) {
            // Dodaj zwierzę do koszyka
            cartItems.push({ name: dogName, image: dogImage });
            localStorage.setItem('cartItems', JSON.stringify(cartItems));

            // Powiadom użytkownika
            alert(`${dogName} został dodany do koszyka!`);
        } else {
            alert(`${dogName} jest już w koszyku!`);
        }

        // Zaktualizuj ikonę koszyka (np. liczbę przedmiotów)
        updateCartIcon();
    });

    // Funkcja do aktualizacji ikony koszyka
    function updateCartIcon() {
        const cartItemCount = cartItems.length;
        if (cartItemCount > 0) {
            cartImage.setAttribute('data-count', cartItemCount); // Dodaj liczbę przedmiotów jako atrybut
        } else {
            cartImage.removeAttribute('data-count');
        }
    }

    // Inicjalizacja ikony koszyka przy ładowaniu strony
    updateCartIcon();
});