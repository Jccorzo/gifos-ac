const getTrendingGifs = async () => {
    const response = await fetch('https://api.giphy.com/v1/gifs/trending?api_key=8OeHZODT4rHrotAQ1SMXtD2uHmKocz1J&limit=3')
    const data = await response.json()
    return data;
}

const fillTrendings = async () => {
    const trendingGifs = await getTrendingGifs()
    const trendingsContainer = document.getElementById('trending-gif-container')
    console.log(trendingGifs)
    trendingGifs.data.forEach(gif => {
        const gifContainer = document.createElement("div")
        gifContainer.setAttribute("class", "gif")
        gifContainer.innerHTML = `
        <img src="${gif.images.original.url}" alt="${gif.title}" class="trending-gif">
        <div class="card">
            <div class="optionsCard" >
                <img id="fav-${gif.id}" src="../images/common/icon-fav-hover.svg" alt="fav">
                <img id="down-${gif.id}" src="../images/common/icon-download-hover.svg" alt="download">
                <img id="max-${gif.id}" src="../images/common/icon-max-hover.svg" alt="max">
            </div>
            <div class="infoGifContainer">
                <p class="userGif">${gif.username}</p>
                <p class="userTitle">${gif.title}</p>
            </div>
        </div>
        `
        trendingsContainer.appendChild(gifContainer)

        const favoriteButton = document.getElementById(`fav-${gif.id}`);
        const downloadButton = document.getElementById(`down-${gif.id}`);
        const maxButton = document.getElementById(`max-${gif.id}`);

        favoriteButton.addEventListener("click",() => {
            saveFavorites(gif.id)
        })

        downloadButton.addEventListener("click", async() => {
            const gifo = await getGif(gif.id)
            await downloadGif(gifo.data.images.downsized.url)
        })

        
    })
}

fillTrendings()