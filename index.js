const express = require('express')
const pgp = require('pg-promise')();
const local = 'postgres://postgres:juanesse123@localhost:5432/';
const { Greet } = require('./app.js');
const bodyParser = require('body-parser')
const cors = require('cors')
const handlebars = require('express-handlebars')
const dotenv = require('dotenv')
const connectionString = process.env.DATABASE_URL || local

const config = {
    connectionString,
    max: 20,
    ssl: {
        rejectUnauthorized: false
    }
}

const db = pgp(config)

const { GreetingsDb } = require('./config/db.js')
const GreetRoute = require('./routes/home.js')

const greetingsDb = GreetingsDb(db)
const greet = Greet()
const greetRoute = GreetRoute(greetingsDb, greet)

// server port number
const app = express()
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
app.post('/', greetRoute.homePost)
app.get('/', greetRoute.homeGet)
app.get('/users', greetRoute.getUsers)
app.get('/users/:id', greetRoute.getUser)
app.get('/users/delete/:id', greetRoute.deleteUser)
app.get('/search', greetRoute.searchGet)
app.post('/search', greetRoute.searchPost)
const port = process.env.PORT || 3000
// displaying server in localhost
app.listen(port, () => {
    console.log('Your app is running on port: ', port)
})