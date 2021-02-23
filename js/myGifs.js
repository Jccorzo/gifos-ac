const showMoreButton = document.getElementById("showMore");
let initialOffset = 12;
let myUploadedGifs = [];

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
