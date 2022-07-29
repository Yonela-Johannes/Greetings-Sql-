import moment from 'moment'
const username = []
let usernames = []
let userDetailsName = ''
let users = []
let storedUsernames = []
let nameInput = ''
let language = ''
let userLanguage = ""
let userData;
let count = 1
let count_user = []

export function Greet() {
    const setName = (setname) => nameInput = setname.trim().replace(/[^a-z, ^A-Z]/g, '').toLocaleLowerCase()
    const setLanguage = (lang) => language = lang
    const getLanguage = () => nameInput && language ? language : language = ""
    const getName = () => language ? nameInput.slice(0, 1).toUpperCase() + nameInput.slice(1).toLowerCase() : ''
    const getNameError = () => !nameInput ? "Please enter your name!" : ''
    const getLanguageError = () => !language ? "Please select language!" : ''

    const getUsers = () => {
        let usernames = []

        for (let i = 0; i < users.length; i++) {
            storedUsernames.push(users[i].name)
        }

        for (let i = 0; i < storedUsernames.length; i++) {
            if (username.includes(storedUsernames[i])) {
                usernames = storedUsernames[i]
            } else {
                username.push(storedUsernames[i])
            }
        }
        return username
    }

    const setUserDetails = (name) => userDetailsName = name

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

    const getUserDetails = () => {
        userData = users.filter(user => user.name === userDetailsName)
        return userData && userData
    }
    const getSelectedLanguage = () => userLanguage

    const mapper = () => {
        const username = users.find(user => user.name === nameInput)
        const values = Object.values(username ? username : [])
        if (values[0] === userDetailsName, nameInput && language && userLanguage) {
            const updateUser = {
                name: nameInput,
                language: userLanguage,
                greet: language,
                time: moment().fromNow(),
                counter: 1,
            }
            users = [...users, updateUser]
        } else if (nameInput && language && userLanguage) {
            const user = {
                name: nameInput,
                language: userLanguage,
                greet: language,
                time: moment(new Date()).fromNow(),
                counter: 1,
            }
            users = [...users, user]
        }
    }

    const getCounter = () => {
        if (nameInput) {
            usernames = users.filter(user => user.name === nameInput)
            return username ? usernames.length : 0
        }
    }

    const getTotalCount = () => {
        count_user = users.filter(username => username.name === userDetailsName)
        if (count_user.length === 1) {
            return count_user.length + " time."
        } else {
            return count_user.length + " times."
        }
    }

    return {
        setName,
        getName,
        mapper,
        getUsers,
        setLanguage,
        getLanguage,
        getNameError,
        getLanguageError,
        setUserDetails,
        getUserDetails,
        getCounter,
        setSelectedLanguage,
        getSelectedLanguage,
        getTotalCount,
    }

}
