const setInitTheme = () => {
    const theme = getItem('theme');

    if (theme === 'dark') {

    } else {
        setItem('theme', 'ligh')
    }
}

const changeTheme = () => {
    const theme = getItem('theme')
    if (theme === 'dark') {
        setItem('theme', 'ligh')
    } else {
        setItem('theme', 'dark')
    }
}