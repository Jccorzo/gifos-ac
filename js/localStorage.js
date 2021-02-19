const setItem = (key, value) => {
    localStorage.setItem(key, value)
}

const getItem = (key) => localStorage.getItem(key)

const saveGif = (id) => {
    const gifs = getItem('gifs')
    if (gifs) {
        setItem("gifs", gifs + "," + id)
    } else {
        setItem("gifs", id)
    }
}

const saveFavorites = (gif) => {
    const gifs = getItem('favorites')
    if (gifs) {
        setItem("favorites", JSON.stringify([...JSON.parse(gifs), gif]))
    } else {
        setItem("favorites", JSON.stringify([gif]))
    }
}

const getFavorites = () => {
    const favorites = getItem("favorites")
    if (favorites) {
        return JSON.parse(favorites)
    } else {
        return null
    }
}