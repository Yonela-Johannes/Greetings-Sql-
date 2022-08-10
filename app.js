let nameInput = ''
let language = ''
let user_language = ""
let count = 0

// filtering name format 
const Greet = () => {
    const setName = (setname) => nameInput = typeof setname !== 'string' ? '' : setname.trim().replace(/[^a-z, ^A-Z]/g, '').toLocaleLowerCase().trim()
    const getNameError = () => !nameInput ? "Please enter your name!" : ''
    // retuning language
    const setGreeting = (set_language) => {
        if (set_language === 'English') {
            user_language = 'Hello'
        } else if (set_language === 'Afrikaans') {
            user_language = 'Hallo'
        } else if (set_language === 'isiXhosa') {
            user_language = 'Molo'
        } else {
            user_language = ''
        }
        return language = set_language
    }
    const getLanguageError = () => !user_language ? "Please select language!" : ''
    const getLanguage = () => language
    const getName = () => language && user_language ? nameInput.slice(0, 1).toUpperCase() + nameInput.slice(1).toLowerCase() : ""
    const getGreeting = () => nameInput && language ? user_language : ''
    const getCount = () => nameInput && language && user_language ? count + 1 : count
    const result = () => nameInput && language && user_language ? true : false
    return {
        setName,
        setGreeting,
        getLanguageError,
        getGreeting,
        getLanguage,
        getNameError,
        getName,
        getCount,
        result
    }

}

module.exports = {
    Greet
}
