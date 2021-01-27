const loadMyGifs = () => {
    const favorites = getItem('myGifs');
    const favoritesContainer = document.getElementById('myGifsContainer');
    if(isArrAndEmpty(favorites)){

    } else {
        favoritesContainer.innerHTML = `
            <div>
                <img src="../images/myGifs/icon-mis-gifos-sin-contenido.svg" alt="icon gifos sin contenido">
                <h2>¡Anímate a crear tu primer GIFO!</h2>
            </div>
        `
    }
}

loadMyGifs()