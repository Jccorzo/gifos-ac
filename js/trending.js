const getTrendingGifs = async () => {
    const response = await fetch('https://api.giphy.com/v1/gifs/trending?api_key=8OeHZODT4rHrotAQ1SMXtD2uHmKocz1J&limit=3')
    const data = await response.json()
    console.log("DATA: ", data)
    return data;
}

const fillTrendings = async () => {
    const trendingGifs = await getTrendingGifs()
    const trendingsContainer = document.getElementById('trending-gif-container')
    trendingGifs.data.forEach(gif => {
        const trendindImage = document.createElement("img")
        trendindImage.setAttribute("src", gif.images.original.url)
        trendindImage.setAttribute("alt", gif.title)
        trendindImage.setAttribute("class", "trending-gif")
        trendingsContainer.appendChild(trendindImage)
    })
}

fillTrendings()