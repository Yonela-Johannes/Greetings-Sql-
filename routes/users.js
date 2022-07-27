import { Greet } from '../app.js'
const greet = Greet()

export const user = (req, res) => {
    res.send('This is the users function')
}

export const users = (req, res) => {
    res.send('This is all the users functions')

}