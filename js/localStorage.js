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

const saveFavorites = (id) => {
    const gifs = getItem('favorites')
    if (gifs) {
        setItem("gifs", gifs + "," + id)
    } else {
        setItem("gifs", id)
    }
}