const isArrAndEmpty = (arr) => {
    if (Array.isArray(arr) && arr.length === 0) {
        return true
    } else {
        return false
    }
}

const deleteElementById = (id) => {
    document.getElementById(id).remove()
}

const displayTwoZeros = (number) => {
    if (number >= 10) {
        return number
    } else {
        return `0${number}`
    }
}

const downloadGif = async (url) => {
    //const response = await fetch(`${url}?api_key=8OeHZODT4rHrotAQ1SMXtD2uHmKocz1J&limit=3`)
    const response = await fetch(url)
    const data = await response.blob()
    var url = window.URL.createObjectURL(data);
    var a = document.createElement('a');
    a.href = url;
    a.download = "myGif.gif";
    document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
    a.click();
    a.remove();
}

const getGif = async (id) => {
    const response = await fetch(`https://api.giphy.com/v1/gifs/${id}?api_key=8OeHZODT4rHrotAQ1SMXtD2uHmKocz1J&limit=3`)
    const data = await response.json()
    return data
} 