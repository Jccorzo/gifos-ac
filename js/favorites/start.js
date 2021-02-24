const showMoreButton = document.getElementById("showMore");
let initialOffset = 12;
const changeThemeButton = document.getElementById("change-theme");

const showMoreFavorites = () => {
    const favorites = getFavorites('favorites');
    const favoritesFilter = favorites.filter((_, index) => index >= initialOffset && index < initialOffset + 12)
    fillFavorites(favoritesFilter, "favoritesContainer")
    if (favorites.length > initialOffset + 12) {
        initialOffset += 12
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

const changeTheme = () => {

    if(changeThemeButton.textContent === "Modo Nocturno"){
        changeThemeButton.innerHTML = "Modo Diurno"
    }else {
        changeThemeButton.innerHTML = "Modo Nocturno"
    }
    const lines = document.getElementsByClassName("top-line")
    for (let line of lines) {
        line.classList.toggle("backgroundDark");
    }
    const ps = document.getElementsByTagName("p");
    for (let p of ps){
        p.classList.toggle("textDark")
    }
    const hs = document.getElementsByTagName("h1")
    for (let h1 of hs){
        h1.classList.toggle("textDark")
    }
    const as = document.getElementsByTagName("a")
    for (let a of as){
        a.classList.toggle("textDark")
    }

    const body = document.getElementById("body")
    body.classList.toggle("backgroundGray")
    const navContainer = document.getElementById("nav-link")
    navContainer.classList.toggle("backgroundNav")

    const trending = document.getElementById("trending")
    trending.classList.toggle("backgroundDark2")

    const buttons = document.getElementsByTagName("button")
    for(let button of buttons) {
        button.classList.toggle("buttonDark")
    }

    const changePageButton = document.getElementById("new-gift-button")
    changePageButton.classList.toggle("new-gift-button-dark")
}

changeThemeButton.addEventListener("click", changeTheme)
