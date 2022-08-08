const pgp = require('pg-promise')({});
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
const getusers = async () => {
    const rows = await db.query('SELECT * FROM greeting;')
    return rows
}

// getting user by user name
const getuser_byname = async (name) => {
    const rows = await db.query(`SELECT * FROM greeting WHERE name = $1;`, [name])
    return rows[0]?.['name']
}

// geting user by id and name
const getuser = async (id) => {
    const [rows] = await db.query(`SELECT * FROM greeting WHERE id = $1;`, [id])
    return rows
}
// insert user
const insertuser = async (name, language, greet, count) => {
    const result = await db.query(`INSERT INTO greeting (name, language, greet, count) VALUES ($1, $2, $3, $4);`, [name, language, greet, count])
    const id = result.insertId
    return getuser(id)
}
// update user
const updateuser = async (name, language, greet) => {
    const result = await db.query('UPDATE greeting  SET language=$2, greet=$3, count= count + 1 WHERE name = $1;', [name, language, greet])
    return result

}
// delete user
const deleteuser = async (id) => {
    const result = await db.query('DELETE FROM greeting WHERE id = $1;', [id])
    return result
}
// delete users
const deleteusers = async (id) => {
    await db.query('DELETE FROM greeting WHERE id > 0;')
}

module.exports = {
    getusers,
    getuser_byname,
    getuser,
    insertuser,
    updateuser,
    deleteuser,
    deleteusers,
    db
}