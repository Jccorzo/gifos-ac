const getFavorites = () => {
    const favorites = getItem("favorites")
    if (favorites) {
        return JSON.parse(favorites)
    } else {
        return null
    }
}

const saveFavorites = (gif) => {
    const gifs = getItem('favorites')
    if (gifs) {
        const currentGifs = [...JSON.parse(gifs)]
        const findGif = currentGifs.find(value => value.id === gif.id)
        if (!findGif) {
            setItem("favorites", JSON.stringify([...currentGifs, gif]))
        }
    } else {
        setItem("favorites", JSON.stringify([gif]))
    }
}

const deleteFavorites = (gif) => {
    const gifs = getItem('favorites')
    setItem("favorites", JSON.stringify([...JSON.parse(gifs)].filter(currentGif => currentGif.id !== gif.id)))
}