const express = require('express')
const { GreetingsDb } = require('../config/db.js')
const router = express.Router()
const greetingsDb = GreetingsDb()
router.route('/')
    .post(async (req, res) => {
        await greetingsDb.deleteUsers()
        const counter = await greetingsDb.countUsers()
        res.render('index', {
            greeting: 'All users cleared!',
            list_users: `No stored users...`,
            count: counter
        })
    })
    .get(async (req, res) => {
        const counter = await greetingsDb.countUsers()
        res.render('index', {
            greeting: 'All users cleared!',
            list_users: `No stored users...`,
            count: counter
        })
    })

module.exports = router