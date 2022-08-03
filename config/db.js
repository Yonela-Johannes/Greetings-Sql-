import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config()

export const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT,
}).promise()

export const getusers = async () => {
    const [rows] = await db.query('SELECT * FROM users')
    return rows
}

// get user
export const getuser_byname = async (name) => {
    const [rows] = await db.query(`SELECT * FROM users WHERE name = ?`, [name])
    return rows[0]?.['name']
}
export const getuser_by_id = async (name) => {
    const [rows] = await db.query(`SELECT * FROM users WHERE name = ?`, [name])
    return rows[0]?.['id']
}


export const getuser = async (id) => {
    const [rows] = await db.query(`SELECT * FROM users WHERE id = ?`, [id])
    return rows[0]
}

export const insertuser = async (name, language, greet, count) => {
    const [result] = await db.query(`INSERT INTO users (name, language, greet, count) VALUES(?, ?, ?, ?)`, [name, language, greet, count])
    const id = result.insertId
    return getuser(id)
}

export const updateuser = async (getbased_id) => {
    const [result] = await db.query('UPDATE users SET count = count + 1 WHERE id = ?', [getbased_id])
    return result

}

export const deleteuser = async (id) => {
    const [result] = await db.query('DELETE FROM users WHERE id = ?', [id])
    return result[0]
}

export const deleteusers = async (id) => {
    const [result] = await db.query('DELETE FROM users')
    return result[0]
}