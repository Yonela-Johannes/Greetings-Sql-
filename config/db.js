import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

// Setting up connection to database table/mysql
export const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT,
}).promise()

// getting users
export const getusers = async () => {
    const [rows] = await db.query('SELECT * FROM users')
    return rows
}

// getting user by user name
export const getuser_byname = async (name) => {
    const [rows] = await db.query(`SELECT * FROM users WHERE name = ?`, [name])
    return rows[0]?.['name']
}
// geting user by id
export const getuser_by_id = async (name) => {
    const [rows] = await db.query(`SELECT * FROM users WHERE name = ?`, [name])
    return rows[0]?.['id']
}
// geting user by id and name
export const getuser = async (id) => {
    const [rows] = await db.query(`SELECT * FROM users WHERE id = ?`, [id])
    return rows[0]
}
// insert user
export const insertuser = async (name, language, greet, count) => {
    const [result] = await db.query(`INSERT INTO users (name, language, greet, count) VALUES (?, ?, ?, ?)`, [name, language, greet, count])
    const id = result.insertId
    return getuser(id)
}
// update user
export const updateuser = async (getbased_id) => {
    const [result] = await db.query('UPDATE users SET count = count + 1 WHERE id = ?', [getbased_id])
    return result

}
// delete user
export const deleteuser = async (id) => {
    const [result] = await db.query('DELETE FROM users WHERE id = ?', [id])
    return result[0]
}
// delete users
export const deleteusers = async (id) => {
    const [result] = await db.query('DELETE FROM users')
    return result[0]
}