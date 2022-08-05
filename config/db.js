const pgp = require('pg-promise')({});
const connection = 'postgres://postgres:juanesse123@localhost:5432/';
const port = process.env.PORT || connection
const db = pgp(port)

// getting users
const getusers = async () => {
    const rows = await db.query('SELECT * FROM greetings;')
    return rows
}

// getting user by user name
const getuser_byname = async (name) => {
    const rows = await db.query(`SELECT * FROM greetings WHERE name = $1;`, [name])
    return rows[0]?.['name']
}
// geting user by id
const getuser_by_name = async (name) => {
    const rows = await db.query(`SELECT * FROM greetings WHERE name = $1;`, [name])
    return rows
}

// geting user by id and name
const getuser = async (id) => {
    const [rows] = await db.query(`SELECT * FROM greetings WHERE id = $1;`, [id])
    return rows
}
// insert user
const insertuser = async (name, language, greet, count) => {
    const result = await db.query(`INSERT INTO greetings (name, language, greet, count) VALUES ($1, $2, $3, $4);`, [name, language, greet, count])
    const id = result.insertId
    return getuser(id)
}
// update user
const updateuser = async (name) => {
    const result = await db.query('UPDATE greetings SET count = count + 1 WHERE name = $1;', [name])
    return result

}
// delete user
const deleteuser = async (id) => {
    const result = await db.query('DELETE FROM greetings WHERE id = $1;', [id])
    return result
}
// delete users
const deleteusers = async (id) => {
    await db.query('DELETE FROM greetings WHERE id > 0;')
}

module.exports = {
    getusers,
    getuser_byname,
    getuser_by_name,
    getuser,
    insertuser,
    updateuser,
    deleteuser,
    deleteusers
}