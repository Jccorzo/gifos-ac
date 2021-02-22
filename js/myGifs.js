(async () => {
    const myGifs = getItem('gifs');
    const cloudGifs = await getGifs(myGifs)
    const gifsContainer = document.getElementById('myGifsContainer');
    if (cloudGifs.data.length > 0) {
        fillMyGifs(cloudGifs.data, "myGifsContainer")
    } else {
        gifsContainer.innerHTML = `
            <div id="noResultsContainer">
                <img src="../images/myGifs/icon-mis-gifos-sin-contenido.svg" alt="icon gifos sin contenido">
                <h2 class="no-results">¡Anímate a crear tu primer GIFO!</h2>
            </div>
        `
    }
})()