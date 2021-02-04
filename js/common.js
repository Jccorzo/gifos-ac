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
    if(number >= 10){
        return number
    } else {
        return `0${number}`
    }
}
