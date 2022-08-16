const express = require('express')
const { GreetingsDb } = require('../config/db.js')
const { Greet } = require('../app.js');
let router = express.Router()
const greet = Greet()
const greetingsDb = GreetingsDb()
router.route('/')
    .get(async (req, res) => {
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
    })
    .post(async (req, res) => {
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
    })
module.exports = router