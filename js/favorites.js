const loadFavorites = () => {
    const favorites = getItem('favorites');
    const favoritesContainer = document.getElementById('favoritesContainer');
    if(isArrAndEmpty(favorites)){

    } else {
        favoritesContainer.innerHTML = `
            <div>
                <img src="../images/favorites/icon-fav-sin-contenido.svg" alt="icon fav sin contenido">
                <h2>¡Guarda tu primer GIFO en Favoritos para que se muestre aquí!</h2>
            </div>
        `
    }
}

loadFavorites()