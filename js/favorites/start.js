const showMoreButton = document.getElementById("showMore");
let initialOffset = 12;

const showMoreFavorites = () => {
    const favorites = getFavorites('favorites');
    const favoritesFilter = favorites.filter((_, index) => index >= initialOffset && index < initialOffset + 12)
    fillFavorites(favoritesFilter, "favoritesContainer")
    if (favorites.length > initialOffset + 12) {
        initialOffset += 24
    } else {
        showMoreButton.style.display = "none"
    }
}

(() => {
    const favorites = getFavorites('favorites');
    const favoritesContainer = document.getElementById('favoritesContainer');
    if (favorites && favorites.length > 0) {
        const totalPages = favorites.length / 12
        favoritesContainer.setAttribute("style", "display: grid;")
        fillFavorites(favorites.filter((_, index) => index <= 11), "favoritesContainer", false, true)
        if (totalPages > 1) {
            showMoreButton.style.display = "block"
            showMoreButton.addEventListener("click", showMoreFavorites)
        }
    } else {
        favoritesContainer.innerHTML = `
            <div id="noResultsContainer">
                <img src="../images/favorites/icon-fav-sin-contenido.svg" alt="icon fav sin contenido">
                <h2 class="no-results">¡Guarda tu primer GIFO en Favoritos para que se muestre aquí!</h2>
            </div>
        `
    }
})()