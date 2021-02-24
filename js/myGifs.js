const showMoreButton = document.getElementById("showMore");
let initialOffset = 12;
let myUploadedGifs = [];
const changeThemeButton = document.getElementById("change-theme");

const showMore = () => {
    const myGifsFilter = myUploadedGifs.filter((_, index) => index >= initialOffset && index < initialOffset + 12)
    fillMyGifs(myGifsFilter, "myGifsContainer")
    if (myGifsFilter.length > initialOffset + 12) {
        initialOffset += 12
    } else {
        showMoreButton.style.display = "none"
    }
}

const deleteMyGif = (gif) => {
    const myGifs = getItem('gifs');
    const myGifsAsArray = myGifs
                            .split(",")
                            .filter(value => value !== gif.id)
                            .reduce((previous,current) => previous + "," + current,"")
    setItem("gifs", myGifsAsArray)
}

(async () => {
    const myGifs = getItem('gifs');
    const cloudGifs = await getGifs(myGifs)
    const gifsContainer = document.getElementById('myGifsContainer');
    if (cloudGifs.data.length > 0) {
        myUploadedGifs = cloudGifs.data
        gifsContainer.setAttribute("style", "display: grid;")
        fillMyGifs(cloudGifs.data, "myGifsContainer")
        if (cloudGifs.pagination.count > 12) {
            showMoreButton.style.display = "block"
            showMoreButton.addEventListener("click", showMore)
        }
    } else {
        gifsContainer.innerHTML = `
            <div id="noResultsContainer">
                <img src="../images/myGifs/icon-mis-gifos-sin-contenido.svg" alt="icon gifos sin contenido">
                <h2 class="no-results">¡Anímate a crear tu primer GIFO!</h2>
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
