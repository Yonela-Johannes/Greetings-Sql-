import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import handlebars from 'express-handlebars'
import moment from 'moment'
import { Greet } from './app.js'
import { db, getusers, getuser, insertuser, getuser_byname, getuser_by_id, updateuser, deleteuser, deleteusers } from './config/db.js'
// server port number
const PORT = process.env.PORT || 8000
const app = express()
const greet = Greet()

// connect to sql
db.connect((err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('MySql Connected...')
    }
})


// allowing app to use external dependency and frameworks
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
    res.render('index', {
        list_users: "View Users...",
    })
})

// Making a post request to store users
app.post('/', async (req, res) => {
    // setting user details
    let users = await db.query('SELECT * FROM users');
    const { name, languages } = req.body
    let get_count = await db.query('SELECT COUNT(*) FROM users');
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
            count: users[0].count,
            list_users: `View ${greet.getName()} and more users...`,
        })

    const getbased_name = name ? await getuser_byname(name) : name
    const getbased_id = name ? await getuser_by_id(name) : name
    if (getbased_name === greet.getName()) {
        if (greet.getName(), greet.getLanguage(), greet.getSelectedLanguage(), greet.getCount()) {
            await updateuser(getbased_id)
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

// search user by name 
// render search page
app.get('/search', async (req, res) => {
    res.render('users', {
        all_users: 'You must search for a user.',
        back: "back",
    })
})
app.post('/search', async (req, res) => {
    const { search_name } = req.body
    const all_users = await getusers()
    const search_user = all_users.filter(user => user.name === search_name)
    res.render('users', {
        search_user,
        name: search_name,
        back: "back",
    })
})
// displaying server in localhost
app.listen(PORT, () => {
    console.log('Your app is running on port: ', PORT)
})