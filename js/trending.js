(async () => {
    const trendingGifs = await getTrendingGifs()
    fillGifs(trendingGifs, 'trending-gif-container')
})()
