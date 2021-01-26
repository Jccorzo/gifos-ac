const goToFavorites = () => {
    validateSectionAndRemove('search', 'myGifs');
    const favorites = getItem('favorites');
    const main = document.getElementById('main');
    const trending = document.getElementById('trending');
    const favoritesContainer = document.createElement("div");
    favoritesContainer.setAttribute("id", "favorites");
    

    main.insertBefore(favoritesContainer,trending);

    if (isArrAndEmpty(favorites)) {

    }
}


const goToMyGifs = () => {
    validateSectionAndRemove('search', 'favorites')
    const myGifs = getItem('myGifs');
    const main = document.getElementById('main');
    const trending = document.getElementById('trending');
    const myGifsContainer = document.createElement("div");
    myGifsContainer.setAttribute("id", "myGifs");


    main.insertBefore(myGifsContainer,trending);

    if (isArrAndEmpty(myGifs)) {

    }

}

const goToCreateGif = () => {

}