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