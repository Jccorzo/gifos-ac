const search = document.getElementById("search-input");
const searchIcon = document.getElementById("search-icon");
const leftSearch = document.getElementById("left-search");
const searchInputContainer = document.getElementById("search-input-container");
const suggestionsContainer = document.getElementById("suggestionsContainer");
const separator = document.getElementById("separator")

search.addEventListener("input", async () => {
   
    if(search.value.length > 0) {
        searchIcon.src = "../images/search/close.svg"
        leftSearch.style.visibility = "visible"
        const sugerencias = await autocomplete(search.value);
        console.log(sugerencias)
        if(sugerencias.data.length > 0){
            separator.style.display = "block"
            suggestionsContainer.innerHTML = ""
            sugerencias.data.forEach(suggest => {
                const newSuggest = document.createElement("div");
                newSuggest.setAttribute("class", "newSugest")
                newSuggest.setAttribute("id",suggest.name)
                newSuggest.innerHTML = `
                 <img src="../images/search/icon-search.svg" alt="search icon">
                 <p>${suggest.name}</p>
                `
                suggestionsContainer.appendChild(newSuggest)
                newSuggest.addEventListener("click", () => {
                    console.log(suggest.name)
                })
            });
        } else {
            separator.style.display = "none"
        }
        
    } else {
        searchIcon.src = "../images/search/icon-search.svg"
        leftSearch.style.visibility = "hidden"
        separator.style.display = "none"
        suggestionsContainer.innerHTML = ""
    }
})

search.addEventListener("submit", () => {
    console.log("SUBMIT")
})

searchIcon.addEventListener("click",() => {
    search.value = ""
    searchIcon.src = "../images/search/icon-search.svg"
    leftSearch.style.visibility = "hidden"
    separator.style.display = "none"
})