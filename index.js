const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const handlebars = require('express-handlebars')
const dotenv = require('dotenv')
const { Greet } = require('./app.js')
// server port number
const app = express()
const greet = Greet()
dotenv.config()

// allowing app to use xternal dependency and frameworks
app.use((err, req, res, next) => {
    res.status(500).send('Something broke!')
})

app.set('view engine', 'hbs')
app.engine('hbs', handlebars.engine({
    layoutsDir: `./views/layouts`,
    extname: 'hbs',
    defaultLayout: 'main',
}))
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(bodyParser.json())

// Making a post request to store users
app.post('/', async (req, res) => {
    const { name, languages } = req.body
    greet.setName(name)
    greet.setGreeting(languages)
    await greet.setNames()
    let users = await greet.getNames()
    const counter = users.length === 0 ? "No one have been greeted" : 'Total people greeted: ' + users.length
    res.render('index', {
        // getting errorrs
        nameError: greet.getNameError(),
        languageError: greet.getLanguageError(),
        // retrieving names
        getLanguage: greet.getGreeting(),
        greeting: greet.getGreeting(),
        name: greet.getName(),
        list_users: users.length !== 0 ? `View ${greet.getName()} and more users...` : "There are no stored users.",
        count: counter
    })
})

app.get('/', async (req, res) => {
    let users = await greet.getNames()
    const counter = users.length === 0 ? "No one have been greeted" : 'Total people greeted: ' + users.length
    res.render('index', {
        list_users: greet.getName() ? `View ${greet.getName()} and more users...` : "View Users...",
        count: counter


    })
})

// display all users
app.get('/users', async (req, res) => {
    const all_users = await greet.getNames()
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
})

// display user details
app.get('/user/:id', async (req, res) => {
    const { id } = req.params
    const user = await greet.getNameById(id)
    res.render('userDetails',
        {
            user,
            counter: user,
            name: user.name,
            back: "back",
            total_count: user.count > 1 ? user.name + ", you have been greeted " + user.count + ' times.' : user.name + ", you have been greeted " + user.count + ' time.',
        }
    )
})

// drop/delete individual user
app.get('/delete/:id', async (req, res) => {
    const { id } = req.params
    const user = await greet.removeUser(id)
    res.redirect('/users')
})
// delete all users
app.post('/clear', async (req, res) => {
    await greet.removeUsers()
    res.render('index', {
        greeting: 'All users cleared!',
        list_users: `No stored users...`,
        count: "No one have been greeted"
    })
})
app.get('/clear', async (req, res) => {
    await greet.removeUsers()
    res.render('index', {
        greeting: 'All users cleared!',
        list_users: `No stored users...`,
        count: "No one have been greeted"
    })
})


app.get('/search', async (req, res) => {
    const { search_name } = req.body
    const all_users = await greet.getNames()
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
})

app.post('/search', async (req, res) => {
    const { search_name } = req.body
    const all_users = await greet.getNames()
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
})

const port = process.env.PORT || 3000
// displaying server in localhost
app.listen(port, () => {
    console.log('Your app is running on port: ', port)
})