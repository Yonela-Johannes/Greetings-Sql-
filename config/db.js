const pgp = require('pg-promise')();
const local = 'postgres://postgres:juanesse123@localhost:5432/';
const connectionString = process.env.DATABASE_URL || local
const config = {
    connectionString,
    max: 20,
    ssl: {
        rejectUnauthorized: false
    }
}
const db = pgp(config)

// getting users
const getUsers = async () => {
    const rows = await db.any('SELECT * FROM greeting;')
    return rows
}

// getting user by user name
const getUserByName = async (name) => {
    const rows = await db.any(`SELECT * FROM greeting WHERE name = $1;`, [name])
    return rows[0]?.['name']
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
// update user
const updateUser = async (name, language, greet) => {
    const result = await db.any('UPDATE greeting  SET language=$2, greet=$3, count = count + 1 WHERE name = $1;', [name, language, greet])
    return result

}
// delete user
const deleteUser = async (id) => {
    const result = await db.any('DELETE FROM greeting WHERE id = $1;', [id])
    return result
}
// delete users
const deleteUsers = async (id) => {
    await db.any('DELETE FROM greeting WHERE id > 0;')
}

module.exports = {
    getUsers,
    getUserByName,
    getUser,
    insertUser,
    updateUser,
    deleteUser,
    deleteUsers,
    db
}