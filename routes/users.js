const { GreetingsDb } = require('../config/db.js')
const express = require('express')
let router = express.Router()

const greetingsDb = GreetingsDb()
router.route("/")
    .get(async (req, res) => {
        const all_users = await greetingsDb.getUsers()
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

router.route("/:id")
    .get(async (req, res) => {
        const { id } = req.params
        const user = await greetingsDb.getUser(id)
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

router.route("/delete/:id")
    .get(async (req, res) => {
        const { id } = req.params
        const user = await greetingsDb.deleteUser(id)
        res.redirect('/users')
    })

module.exports = router