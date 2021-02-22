(async () => {
    const trendingGifs = await getTrendingGifs()
    fillTrending(trendingGifs.data, 'trending-gif-container')
})()
