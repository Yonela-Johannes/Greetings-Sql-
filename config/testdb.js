// getting users
const GreetingsDb = (db) => {
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
        const [rows] = await db.manyOrNone(`SELECT * FROM greeting WHERE name = $1;`, [name])
        return rows
    }

    const storeName = async (name, language, greet) => {
        const rows = await db.any(`SELECT name FROM greeting WHERE name = $1;`, [name])
        if (rows.length === 0) {
            await db.manyOrNone(`INSERT INTO greeting (name, language, greet, count) VALUES ($1, $2, $3, $4);`, [name, language, greet, 1])
        } else {
            await db.manyOrNone('UPDATE greeting  SET language=$2, greet=$3, count = count + 1 WHERE name = $1;', [name, language, greet])
        }
    }
    // geting user by id and name
    const getUser = async (id) => {
        const [rows] = await db.any(`SELECT * FROM greeting WHERE id = $1;`, [id])
        return rows
    }
    const deleteUser = async (id) => {
        const result = await db.any('DELETE FROM greeting WHERE id = $1;', [id])
        return result
    }
    const deleteUsers = async () => {
        const result = await db.any('DELETE FROM greeting')
        return result
    }

    return {
        getUsers,
        countUsers,
        storeName,
        getUserByName,
        getUser,
        deleteUser,
        deleteUsers
    }
}
module.exports = {
    GreetingsDb
}
