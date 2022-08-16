const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const handlebars = require('express-handlebars')
const dotenv = require('dotenv')
const { Greet } = require('./app.js')
const GreetingsDb = require('./config/db.js')
const home = require('./routes/home.js')
const users = require('./routes/users.js')
const search = require('./routes/search.js')
const clear = require('./routes/clear.js')

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
app.use('/', home)
app.use('/search', search)
app.use('/users', users)
app.use('/clear', clear)

const port = process.env.PORT || 3000
// displaying server in localhost
app.listen(port, () => {
    console.log('Your app is running on port: ', port)
})