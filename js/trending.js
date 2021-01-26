const getTrendingGifs = async () => {
    const response = await fetch('https://api.giphy.com/v1/gifs/trending?api_key=8OeHZODT4rHrotAQ1SMXtD2uHmKocz1J&limit=3')
    const data = await response.json()
    return data;
}

const fillTrendings = async () => {
    const trendingGifs = await getTrendingGifs()
    const trendingsContainer = document.getElementById('trending-gif-container')
    trendingGifs.data.forEach(gif => {
        const gifContainer = document.createElement("div")
        gifContainer.setAttribute("class", "gif")
        gifContainer.innerHTML= `<img src="${gif.images.original.url}" alt="${gif.title}" class="trending-gif">`
        trendingsContainer.appendChild(gifContainer)
    })
}

fillTrendings()