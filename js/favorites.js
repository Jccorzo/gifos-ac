(() => {
    const favorites = getFavorites('favorites');
    const favoritesContainer = document.getElementById('favoritesContainer');
    if(favorites){
        favoritesContainer.setAttribute("style","display: grid;")
        fillGifs(favorites,"favoritesContainer")
    } else {
        favoritesContainer.innerHTML = `
            <div id="noResultsContainer">
                <img src="../images/favorites/icon-fav-sin-contenido.svg" alt="icon fav sin contenido">
                <h2 class="no-results">¡Guarda tu primer GIFO en Favoritos para que se muestre aquí!</h2>
            </div>
        `
    }
})()