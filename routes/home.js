
const GreetRoute = (greetingsDb, greet) => {
    const homePost = async (req, res) => {
        const { name, languages } = req.body
        greet.setName(name)
        greet.setGreeting(languages)
        greet.result() && await greetingsDb.storeName(greet.getName(), greet.getLanguage(), greet.getGreeting())
        const counter = await greetingsDb.countUsers()
        res.render('index', {
            // getting errors
            nameError: greet.getNameError(),
            languageError: greet.getLanguageError(),
            // retrieving names
            getLanguage: greet.getGreeting(),
            greeting: greet.getGreeting(),
            name: greet.getName(),
            list_users: counter !== 0 ? `View ${greet.getName()} and more users...` : "There are no stored users.",
            count: counter
        })
    }
    const homeGet = async (req, res) => {
        const counter = await greetingsDb.countUsers()
        res.render('index', {
            list_users: greet.getName() ? `View ${greet.getName()} and more users...` : "View Users...",
            count: counter
        })
    }

    const getUsers = async (req, res) => {
        const all_users = await greetingsDb.getUsers()
        if (all_users.length > 0) {
            res.render('users', {
                all_users,
                name: 'All Users',
                back: "back",
            })
        } else {
            res.render('error', {
                name: "not found!",
                back: "back",
            })
        }
    }

    const getUser = async (req, res) => {
        const { id } = req.params
        const user = await greetingsDb.getUser(id)
        res.render('userDetails',
            {
                user,
                counter: user,
                name: user.name,
                back: "back",
                total_count: user.count > 1 ? user.name + ", you have been greeted " + user.count + ' times.' : user.name + ", you have been greeted " + user.count + ' time.',
            }
        )
    }
    const searchGet = async (req, res) => {
        const { search_name } = req.body
        const all_users = await greetingsDb.getUsers()
        const search_user = all_users.filter(user => user.name === search_name)

        if (search_user.length >= 1 && search_name) {
            res.render('search', {
                search_user: search_user[0],
                name: search_name,
                back: "back",
            })
        } else if (search_user.length < 1 || !search_name) {
            res.render('error', {
                name: search_name + " not found!",
                back: "back",
            })
        }
    }
    const deleteUser = async (req, res) => {
        const { id } = req.params
        await greetingsDb.deleteUser(id)
        res.redirect('/users')
    }

    const searchPost = async (req, res) => {
        const { search_name } = req.body
        const all_users = await greetingsDb.getUsers()
        const search_user = all_users.filter(user => user.name === search_name)
        if (search_user.length >= 1 && search_name) {
            res.render('search', {
                search_user: search_user[0],
                name: search_name,
                back: "back",
            })
        } else if (search_user.length < 1 || !search_name) {
            res.render('error', {
                name: search_name ? search_name + " not found!" : 'You have not entered name!',
                back: "back",
            })
        }
    }

    return {
        homeGet,
        homePost,
        getUsers,
        getUser,
        deleteUser,
        searchGet,
        searchPost
    }
}

module.exports = GreetRoute