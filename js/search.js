const search = document.getElementById("search-input");
const searchIcon = document.getElementById("search-icon");
const leftSearch = document.getElementById("left-search");
const searchInputContainer = document.getElementById("search-input-container");
const suggestionsContainer = document.getElementById("suggestionsContainer");
const separator = document.getElementById("separator");
let initialOffset = 0;
let totalPages = 0;
let currentPage = 0;
const searchTrendingText = document.getElementById("search-trending-text");
const separator2 = document.getElementById("separator2");
const resultTitle = document.getElementById("resultTitle");
const resultGifs = document.getElementById("resultGifs");
const showMoreButton = document.getElementById("showMore");
const noResults = document.getElementById("noResults");
const resultsGifs = document.getElementById("resultGifs");

search.addEventListener("input", async () => {

    if (search.value.length > 0) {
        searchIcon.src = "../images/search/close.svg"
        leftSearch.style.visibility = "visible"
        const sugerencias = await autocomplete(search.value);
        if (sugerencias.data.length > 0) {
            separator.style.display = "block"
            suggestionsContainer.innerHTML = ""
            sugerencias.data.forEach(suggest => {
                const newSuggest = document.createElement("div");
                newSuggest.setAttribute("class", "newSugest")
                newSuggest.setAttribute("id", suggest.name)
                newSuggest.innerHTML = `
                 <img class="suggestImage" src="../images/search/icon-search.svg" alt="search icon">
                 <p class="suggestText" >${suggest.name}</p>
                `
                suggestionsContainer.appendChild(newSuggest)
                newSuggest.addEventListener("click", async () => {
                    search.value = suggest.name
                    cleanSearchInput()
                    await getResults(suggest.name)
                })
            });
        } else {
            separator.style.display = "none"
        }
    } else {
        cleanSearchInput()
    }
})

search.addEventListener("keyup", async (event) => {
    if (event.keyCode === 13) {
        cleanSearchInput()
        await getResults(search.value)
    }
})

searchIcon.addEventListener("click", () => {
    search.value = ""
    cleanSearchInput()
})

const cleanSearchInput = () => {
    searchIcon.src = "../images/search/icon-search.svg"
    leftSearch.style.visibility = "hidden"
    separator.style.display = "none"
    suggestionsContainer.innerHTML = ""
}

const calculatePages = (pagination) => {
    return Math.round(pagination.total_count / 12)
}

const getResults = async (term) => {
    separator2.style.display = "block"
    resultTitle.innerHTML = term
    const gifs = await searchByTerm(term, 0)
    if (gifs.data.length === 0) {
        noResults.style.display = "flex"
    } else {
        noResults.style.display = "none"
        resultsGifs.style.display = "grid"
        fillGifs(gifs.data, 'resultGifs', false)
    }
}

const showMore = async (term, offset) => {
    const results = await searchByTerm(term, offset)
    fillGifs(results.data, 'resultGifs')
}