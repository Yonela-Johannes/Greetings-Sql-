const { db, getUsers, getUser, insertUser, getUserByName, updateUser, deleteUser, deleteUsers } = require('./config/db.js')
let nameInput = ''
let language = ''
let user_language = ""
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
    const setNames = async () => {
        const getbased_name = await getUserByName(nameInput)
        if (getbased_name === nameInput && language && nameInput) {
            await updateUser(nameInput, language, user_language)
        } else if (getbased_name !== nameInput && language && nameInput) {
            await insertUser(nameInput, language, user_language)
        }
    }
    nameInput && language && user_language && setNames()
    const getLanguageError = () => !user_language ? "Please select language!" : ''
    const getLanguage = () => language
    const getName = () => language && user_language ? nameInput.slice(0, 1).toUpperCase() + nameInput.slice(1).toLowerCase() : ""
    const getGreeting = () => nameInput && language ? user_language : ''
    const getNameById = async (id) => getUser(id)
    const getNames = () => getUsers()
    const removeUser = async (id) => await deleteUser(id)
    const removeUsers = async () => deleteUsers()

    return {
        setName,
        setGreeting,
        getLanguageError,
        getGreeting,
        getLanguage,
        getNameById,
        getNameError,
        getName,
        setNames,
        getNames,
        removeUser,
        removeUsers,
    }

}

module.exports = {
    Greet
}
