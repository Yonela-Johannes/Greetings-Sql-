import express from 'express'
import mysql from 'mysql'
import bodyParser from 'body-parser'
import cors from 'cors'
import handlebars from 'express-handlebars'
import { Greet } from './app.js'
const PORT = process.env.PORT || 8000
const app = express()

const greet = Greet()

// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '123456',
//     database: 'sampledb',
//     port: PORT
// })

// db.connect((err) => {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log('MySql Connected...')
//     }
// })

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
// Home 
app.get('/', (req, res) => {
    // db.query("SELECT * FOM mySampleTable", (err, rows, files) => {
    //     if (err) {
    //         console.log(err)
    //     } else {
    //         console.log('success')
    //     }
    // })
    res.render('index', {
        allUsers: greet.getUsers(),
    }

    )
})

app.post('/', (req, res) => {
    res.render('index', {
        setname: greet.setName(req.body.name),
        setLanguage: greet.setLanguage(req.body.languages),
        name: greet.getName(),
        language: greet.getLanguage(),
        languageError: greet.getLanguageError(),
        setUserLanguage: greet.setSelectedLanguage(),
        nameError: greet.getNameError(),
        mapper: greet.mapper(),
        count: greet.getCounter(),
        allUsers: "Users",
    }
    )
}
)

app.get('/user/:id', (req, res) => {
    res.render('userDetails',
        {
            setUser: greet.setUserDetails(req.params.id),
            userdetails: greet.getUserDetails(),
            counter: greet.getCounter() ? greet.getCounter() : "",
            noDataError: greet.getCounter() ? '' : "There is no data here!",
            name: greet.getName(),
            userLanguage: greet.getSelectedLanguage(),
            back: "< back",
            home: "home",
        }
    )
})

app.get('/users', (req, res) => {
    res.render('users', {
        back: "< back",
        allUsers: greet.getUsers(),
    })
})



app.listen(PORT, () => {
    console.log('Your app is running on port: ', PORT)
})