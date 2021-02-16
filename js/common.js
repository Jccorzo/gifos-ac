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

const maximizeGif = (gif) => {
    const body = document.getElementsByTagName("body")[0]
    const modal = document.createElement("div")
    modal.setAttribute("id","modal")
    modal.innerHTML = `
            <div class="modal-content">
            <span id="close" class="close">&times;</span>
            <img id="modalImage" src="${gif.images.original.url}" alt="${gif.title}">
            <div id="modalSubcontainer">
                <div id="modalInfoContainer">
                    <p id="modalUser">${gif.username}</p>
                    <p id="modalTitle">${gif.title}</p>
                </div>
                <div id="modalIconsContainer">
                    <img class="modalIcon" id="fav-${gif.id}-modal" src="../images/common/icon-fav-hover.svg" alt="fav">
                    <img class="modalIcon" id="down-${gif.id}-modal" src="../images/common/icon-download-hover.svg" alt="download">
                </div>
            </div>
        </div>
    `
    body.appendChild(modal)

    const favoriteButton = document.getElementById(`fav-${gif.id}-modal`);
    const downloadButton = document.getElementById(`down-${gif.id}-modal`);
    const close = document.getElementById("close");

    favoriteButton.addEventListener("click",() => {
        saveFavorites(gif.id)
    })

    downloadButton.addEventListener("click", async() => {
        const gifo = await getGif(gif.id)
        await downloadGif(gifo.data.images.downsized.url)
    })
    
    close.addEventListener("click",() => {
        modal.remove()
    })
    
}


const fillGifs = async (gifs, containerId) => {
    const gifsContainer = document.getElementById(containerId)
    gifs.data.forEach(gif => {
        const gifContainer = document.createElement("div")
        gifContainer.setAttribute("class", "gif")
        gifContainer.setAttribute("id", gif.id)
        gifContainer.innerHTML = `
        <img src="${gif.images.original.url}" alt="${gif.title}" class="trending-gif">
        <div class="card">
            <div class="optionsCard" >
                <img id="fav-${gif.id}" src="../images/common/icon-fav-hover.svg" alt="fav">
                <img id="down-${gif.id}" src="../images/common/icon-download-hover.svg" alt="download">
                <img id="max-${gif.id}" src="../images/common/icon-max-hover.svg" alt="max">
            </div>
            <div class="infoGifContainer">
                <p class="userGif">${gif.username}</p>
                <p class="userTitle">${gif.title}</p>
            </div>
        </div>
        `
        gifsContainer.appendChild(gifContainer)

        const favoriteButton = document.getElementById(`fav-${gif.id}`);
        const downloadButton = document.getElementById(`down-${gif.id}`);
        const maxButton = document.getElementById(`max-${gif.id}`);

        favoriteButton.addEventListener("click", () => {
            saveFavorites(gif.id)
        })

        downloadButton.addEventListener("click", async () => {
            const gifo = await getGif(gif.id)
            await downloadGif(gifo.data.images.downsized.url)
        })

        maxButton.addEventListener("click", () => {
            maximizeGif(gif)
        })

        gifContainer.addEventListener("click", () => {
            maximizeGif(gif)
        })

    })
}