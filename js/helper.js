const isArrAndEmpty = (arr) => {
    if (Array.isArray(arr) && arr.length === 0) {
        return true
    } else {
        return false
    }
}

const validateSectionAndRemove = (...sections) => {
    sections.forEach((sectionId) => {
        const section = document.getElementById(sectionId);
        section && section.remove()
    })
}
