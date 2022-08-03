import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import handlebars from 'express-handlebars'
import moment from 'moment'
import { Greet } from './app.js'
import { db, getusers, getuser, insertuser, getuser_byname, getuser_by_id, updateuser, deleteuser, deleteusers } from './config/db.js'

const PORT = process.env.PORT || 8000
const app = express()
const greet = Greet()

db.connect((err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('MySql Connected...')
    }
})

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
    let users = await db.query('SELECT * FROM users');
    let date = await db.query('SELECT * FROM `users` ORDER BY users.date DESC')
    const fromDate = moment(date).fromNow()
    res.render('index', {
        list_users: "View Users...",
        count: users.length,
        date: fromDate
    })
})

app.post('/', async (req, res) => {
    let users = await db.query('SELECT * FROM users');
    const { name, languages } = req.body
    let get_count = await db.query('SELECT COUNT(*) FROM users');
    greet.setName(name)
    greet.setLanguage(languages)
    res.render('index', {
        name: greet.getName(),
        language: greet.getLanguage(),
        languageError: greet.getLanguageError(),
        setUserLanguage: greet.setSelectedLanguage(),
        getLanguage: greet.getSelectedLanguage(),
        nameError: greet.getNameError(),
        count: users.length,
        list_users: `View ${greet.getName()} and more users...`,
    })

    const getbased_name = name ? await getuser_byname(name) : name
    const getbased_id = name ? await getuser_by_id(name) : name
    if (getbased_name === greet.getName()) {
        console.log("We inside")
        await updateuser(getbased_id)
    } else {
        await insertuser(greet.getName(), greet.getLanguage(), greet.getSelectedLanguage(), greet.getCount())
    }
})

app.get('/users', async (req, res) => {
    // let all_users = await db.query('SELECT COUNT(*) FROM `users`');
    const all_users = await getusers()
    res.render('users', {
        all_users,
        back: "< back",
    })
})


app.get('/user/:id', async (req, res) => {
    const { id } = req.params
    console.log(id)
    const user = await getuser(id)
    res.render('userDetails',
        {
            user,
            counter: user,
            back: "< back",
            total_count: user.count > 1 ? user.name + ", you have been greeted " + user.count + ' times.' : user.name + ", you have been greeted " + user.count + ' time.',
        }
    )
})

app.get('/delete/:id', async (req, res) => {
    const { id } = req.params
    const user = await deleteuser(id)
    res.redirect('/users')
})

app.post('/clear', async (req, res) => {
    await deleteusers()
    res.redirect('/')
})
app.listen(PORT, () => {
    console.log('Your app is running on port: ', PORT)
})