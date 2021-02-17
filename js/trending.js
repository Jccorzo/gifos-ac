(async () => {
    const trendingGifs = await getTrendingGifs()
    fillGifs(trendingGifs.data, 'trending-gif-container', true)
})()
