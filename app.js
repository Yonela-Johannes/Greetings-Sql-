let nameInput = ''
let language = ''
let user_language = ""
let count = 1

// filtering name format 
const Greet = () => {
    const setName = (setname) => nameInput = typeof setname !== 'string' ? '' : setname.trim().replace(/[^a-z, ^A-Z]/g, '').toLocaleLowerCase().trim()
    const setLanguage = (lang) => language = lang
    const getNameError = () => !nameInput ? "Please enter your name!" : ''
    const getLanguageError = () => !language ? "Please select language!" : ''

    // retuning language
    const setGreeting = (set_language) => {
        if (set_language === 'English') {
            user_language = 'Hello'
        } else if (set_language === 'Afrikaans') {
            user_language = 'Hallo'
        } else if (set_language === 'isiXhosa') {
            user_language = 'Molo'
        }
    }
    const getSelectedLanguage = () => nameInput && language ? user_language : ''
    const getLanguage = () => nameInput && user_language ? language : ''
    const getName = () => language && user_language ? nameInput.slice(0, 1).toUpperCase() + nameInput.slice(1).toLowerCase() : ''
    const getGreeting = () => nameInput && language ? user_language : ''

    const getCount = () => nameInput && language && user_language ? count++ : count = 0
    return {
        setName,
        setLanguage,
        setGreeting,

        getGreeting,
        getLanguage,
        getNameError,
        getName,
        getLanguageError,
        getSelectedLanguage,
        getCount,
    }

}

module.exports = {
    Greet
}
