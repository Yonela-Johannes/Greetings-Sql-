const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const handlebars = require('express-handlebars')
const dotenv = require('dotenv')
const moment = require('moment')
const pgp = require('pg-promise')({});
const { Greet } = require('./app.js')
const { db, getusers, getuser, insertuser, getuser_byname, getuser_by_name, updateuser, deleteuser, deleteusers } = require('./config/db.js')
// server port number
const app = express()
const greet = Greet()
dotenv.config()

// allowing app to use xternal dependency and frameworks
app.use((err, req, res, next) => {
    console.error(err.stack)
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

app.get('/', async (req, res) => {
    let users = await getusers()
    const username = await getuser_byname('Yonela')
    res.render('index', {
        list_users: "View Users...",
        count: users.length === 0 ? "No one have been greeted" : 'Total people greeted: ' + users.length,
    })
})

// Making a post request to store users
app.post('/', async (req, res) => {
    let users = await getusers()
    const { name, languages } = req.body
    greet.setName(name)
    greet.setLanguage(languages)

    greet.setSelectedLanguage(),
        res.render('index', {
            // getting errorrs
            nameError: greet.getNameError(),
            languageError: greet.getLanguageError(),
            // retrieving names
            getLanguage: greet.getSelectedLanguage(),
            language: greet.getLanguage(),
            name: greet.getName(),
            list_users: `View ${greet.getName()} and more users...`,
            count: users.length === 0 ? "No one have been greeted" : 'Total people greeted: ' + users.length,
        })

    const getbased_name = name ? await getuser_byname(name) : name
    if (getbased_name === greet.getName()) {
        if (greet.getName(), greet.getLanguage(), greet.getSelectedLanguage(), greet.getCount()) {
            await updateuser(getbased_name)
        }
    } else {
        if (greet.getName(), greet.getLanguage(), greet.getSelectedLanguage(), greet.getCount()) {
            await insertuser(greet.getName(), greet.getLanguage(), greet.getSelectedLanguage(), greet.getCount())
        }
    }
})
// display all users
app.get('/users', async (req, res) => {
    const all_users = await getusers()
    res.render('users', {
        all_users,
        name: 'All Users',
        time: moment(all_users.date, true).fromNow(),
        back: "back",
    })
})

// display user details
app.get('/user/:id', async (req, res) => {
    const { id } = req.params
    const user = await getuser(id)
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
app.get('/user/:id', async (req, res) => {
    const { id } = req.params
    const user = await getuser(id)
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
    const user = await deleteuser(id)
    res.redirect('/users')
})
// delet all users
app.post('/clear', async (req, res) => {
    await deleteusers()
    res.redirect('/')
})

app.get('/search', async (req, res) => {
    const { search_name } = req.body
    const all_users = await getusers()
    const search_user = all_users.filter(user => user.name === search_name)
    res.render('search', {
        search_user: search_user[0],
        name: search_name,
        back: "back",
    })
})

app.post('/search', async (req, res) => {
    const { search_name } = req.body
    const all_users = await getusers()
    const search_user = all_users.filter(user => user.name === search_name)
    res.render('search', {
        search_user: search_user[0],
        name: search_name,
        back: "back",
    })
})

const port = process.env.PORT || 3000
// displaying server in localhost
app.listen(port, () => {
    console.log('Your app is running on port: ', port)
})