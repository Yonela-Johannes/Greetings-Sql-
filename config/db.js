const db = require("./connect.js")
// getting users
const GreetingsDb = () => {
    const getUsers = async () => {
        const rows = await db.any('SELECT * FROM greeting;')
        return rows
    }
    const countUsers = async () => {
        const rows = await db.any('SELECT name FROM greeting;')
        return rows.length
    }
    // getting user by user name
    const getUserByName = async (name) => {
        const rows = await db.any(`SELECT * FROM greeting WHERE name = $1;`, [name])
        return rows[0]?.['name']
    }
    const storeName = async (name, language, greet) => {
        const rows = await db.any(`SELECT name FROM greeting WHERE name = $1;`, [name])
        if (rows.length === 0) {
            await db.any(`INSERT INTO greeting (name, language, greet, count) VALUES ($1, $2, $3, $4);`, [name, language, greet, 1])
        } else {
            await db.any('UPDATE greeting  SET language=$2, greet=$3, count = count + 1 WHERE name = $1;', [name, language, greet])
        }
    }
    // geting user by id and name
    const getUser = async (id) => {
        const [rows] = await db.any(`SELECT * FROM greeting WHERE id = $1;`, [id])
        return rows
    }
    // insert user
    const insertUser = async (name, language, greet) => {
        const result = await db.any(`INSERT INTO greeting (name, language, greet, count) VALUES ($1, $2, $3, $4);`, [name, language, greet, 1])
        const id = result.insertId
        return getUser(id)
    }
    const deleteUser = async (id) => {
        const result = await db.any('DELETE FROM greeting WHERE id = $1;', [id])
        return result
    }
    // delete users
    const deleteUsers = async (id) => {
        await db.any('DELETE FROM greeting WHERE id > 0;')
    }

    return {
        getUsers,
        countUsers,
        storeName,
        getUserByName,
        getUser,
        insertUser,
        deleteUser,
        deleteUsers
    }
}
module.exports = {
    GreetingsDb
}
