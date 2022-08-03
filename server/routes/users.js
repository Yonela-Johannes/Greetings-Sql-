import { Greet } from '../../app.js'
const greet = Greet()
import express from 'express'
const router = express.Router()
import { view } from '../controllers/userController.js'

router.get('/users', userController.view)

module.exports = router