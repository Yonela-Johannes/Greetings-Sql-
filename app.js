let nameInput = ''
let language = ''
let userLanguage = ""
let count = 0
export const Greet = () => {
    const setName = (setname) => nameInput = setname.trim().replace(/[^a-z, ^A-Z]/g, '').toLocaleLowerCase()
    const setLanguage = (lang) => language = lang
    const getNameError = () => !nameInput ? "Please enter your name!" : ''
    const getLanguageError = () => !language ? "Please select language!" : ''

    const getName = () => language ? nameInput.slice(0, 1).toUpperCase() + nameInput.slice(1).toLowerCase() : ''
    const getLanguage = () => nameInput ? language : ''

    const getCount = () => nameInput && language ? count + 1 : count
    const setSelectedLanguage = () => {
        if (language === 'Hello') {
            userLanguage = 'English'
        } else if (language === 'Hallo') {
            userLanguage = 'Afrikaans'
        } else if (language === 'Molo') {
            userLanguage = 'isiXhosa'
        } else if (language === 'Sawubona') {
            userLanguage = 'isiZulu'
        } else if (language === 'isiXhosa') {
            userLanguage = 'Lumela'
        } else {
            userLanguage = ''
        }
    }
    const getSelectedLanguage = () => nameInput && language ? userLanguage : ''
    return {
        setName,
        setLanguage,
        setSelectedLanguage,
        getLanguage,
        getNameError,
        getName,
        getLanguageError,
        getCount,
        getSelectedLanguage,
    }

}
