const search = document.getElementById("search-input");
const searchIcon = document.getElementById("search-icon");
const leftSearch = document.getElementById("left-search");
const searchInputContainer = document.getElementById("search-input-container");
const suggestionsContainer = document.getElementById("suggestionsContainer");
const separator = document.getElementById("separator");
let initialOffset = 0;
let totalPages = 0;
let globalTerm = "";
const searchTrendingText = document.getElementById("search-trending-text");
const separator2 = document.getElementById("separator2");
const resultTitle = document.getElementById("resultTitle");
const resultGifs = document.getElementById("resultGifs");
const showMoreButton = document.getElementById("showMore");
const noResults = document.getElementById("noResults");
const resultsGifs = document.getElementById("resultGifs");
const trendingSuggests = document.getElementById("trendingSuggests");
const changeThemeButton = document.getElementById("change-theme");

showMoreButton.addEventListener("click", async () => {
    await showMore(globalTerm,initialOffset)
})

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
    const gifs = await searchByTerm(term, 43)
    cleanContainer("resultGifs")
    if (gifs.data.length === 0) {
        noResults.style.display = "flex"
        initialOffset = 0;
        totalPages = 0;
    } else {
        initialOffset += 12;
        totalPages = calculatePages(gifs.pagination);
        globalTerm = term;
        noResults.style.display = "none"
        resultsGifs.style.display = "grid"
        fillGifs(gifs.data, 'resultGifs')
        if (gifs.pagination.count + gifs.pagination.offset < gifs.pagination.total_count) {
            showMoreButton.style.display = "block"
        }
    }
}

const showMore = async (term, offset) => {
    const results = await searchByTerm(term, offset)
    if (results.data.length > 0) {
        fillGifs(results.data, 'resultGifs')
    }
    
    if (results.pagination.count + results.pagination.offset <= results.pagination.total_count) {
        showMoreButton.style.display = "block"
    } else {
        showMoreButton.style.display = "none"
    }

    if(results.pagination.total_count - results.pagination.count > 12){
        initialOffset += 12;
    }

}

(async () => {
    const suggest = await getTrending()
    suggest.data.filter((_, index) => index < 5).forEach((value, index, array) => {
        const trend = document.createElement("p")
        trend.setAttribute("class", "trendSuggest")
        trend.innerHTML = value + (index == array.length - 1 ? "." : ", ")
        trendingSuggests.append(trend)
        trend.addEventListener("click", async () => {
            await getResults(value)
        })
    })
})()

const changeTheme = () => {
    const navContainer = document.getElementById("nav-link")
    navContainer.classList.toggle("backgroundGray")
    const lines = document.getElementsByClassName("top-line")
    for (let line of lines) {
        line.classList.toggle("backgroundDark");
    }
}

changeThemeButton.addEventListener("click", changeTheme)