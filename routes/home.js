const express = require('express')
const router = express.Router()
const { GreetingsDb } = require('../config/db.js')
const { Greet } = require('../app.js');

const greet = Greet()
const greetingsDb = GreetingsDb()

router.route('/')
    .post(async (req, res) => {
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
    })
    .get(async (req, res) => {
        let users = await greetingsDb.getUsers()
        const counter = await greetingsDb.countUsers()
        res.render('index', {
            list_users: greet.getName() ? `View ${greet.getName()} and more users...` : "View Users...",
            count: counter
        })
    })

module.exports = router