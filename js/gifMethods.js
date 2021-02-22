const autocomplete = async (word) => {
    const response = await fetch(`https://api.giphy.com/v1/gifs/search/tags?api_key=8OeHZODT4rHrotAQ1SMXtD2uHmKocz1J&limit=3&limit=5&q=${word}`)
    const data = await response.json()
    return data
}

const searchByTerm = async (word, offset = 0) => {
    const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=8OeHZODT4rHrotAQ1SMXtD2uHmKocz1J&q=${word}&offset=${offset}&limit=12`)
    const data = await response.json()
    return data
}

const getTrendingGifs = async () => {
    const response = await fetch('https://api.giphy.com/v1/gifs/trending?api_key=8OeHZODT4rHrotAQ1SMXtD2uHmKocz1J&limit=3')
    const data = await response.json()
    return data;
}

const getTrending = async () => {
    const response = await fetch('https://api.giphy.com/v1/trending/searches?api_key=8OeHZODT4rHrotAQ1SMXtD2uHmKocz1J&limit=3')
    const data = await response.json()
    return data;
}

const uploadNewGif = async (form) => {
    const response = await fetch('https://upload.giphy.com/v1/gifs?api_key=8OeHZODT4rHrotAQ1SMXtD2uHmKocz1J&limit=3', {
        method: 'POST',
        body: form
    })
    const data = await response.json()
    return data
}

const downloadGif = async (url) => {
    const response = await fetch(url)
    const data = await response.blob()
    var url = window.URL.createObjectURL(data);
    var a = document.createElement('a');
    a.href = url;
    a.download = "myGif.gif";
    document.body.appendChild(a); 
    a.click();
    a.remove();
}

const getGif = async (id) => {
    const response = await fetch(`https://api.giphy.com/v1/gifs/${id}?api_key=8OeHZODT4rHrotAQ1SMXtD2uHmKocz1J&limit=3`)
    const data = await response.json()
    return data
} 

const getGifs = async (ids) => {
    const response = await fetch(`https://api.giphy.com/v1/gifs?ids=${ids}&api_key=8OeHZODT4rHrotAQ1SMXtD2uHmKocz1J&limit=3`)
    const data = await response.json()
    return data
} 