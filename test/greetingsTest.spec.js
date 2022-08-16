const { Greet } = require('../app.js')
const assert = require('assert')
const db = require('../config/connectTest.js')

describe('Greetings function Test', () => {
    beforeEach(async () => {
        await db.query("DELETE FROM greeting")
    })
    describe("Empty Name Test", () => {
        it('should not pass in empty name', async () => {
            const greeting = Greet()
            const username = ''
            const languages = 'Afrikaans'
            greeting.setName(username)
            greeting.setGreeting(languages)
            assert.equal("Please enter your name!", greeting.getNameError())
        });
    });
    describe("Get All Data", () => {
        it('should get all data from data base', async () => {
            const greeting = Greet()
            const username = ''
            const languages = 'Afrikaans'
            greeting.setName(username)
            greeting.setGreeting(languages)
            assert.deepEqual([], await db.query('SELECT * FROM greeting;'))
        })
    });
    describe("Numbers Test", () => {
        it('should not pass in numbers', () => {
            const greeting = Greet()
            const username = 5555
            const languages = 'Afrikaans'
            greeting.setName(username)
            greeting.setGreeting(languages)
            assert.equal("Please enter your name!", greeting.getNameError())
        });
    });
    describe("Empty Language Test", () => {
        it('should not pass in empty language', () => {
            const greeting = Greet()
            const username = 'Yonela'
            const languages = ''

            greeting.setName(username)
            greeting.setGreeting(languages)
            assert.equal("Please select language!", greeting.getLanguageError())
        });
    });
    describe("isiXhosa", () => {
        it('should return name and selected language', () => {
            const greeting = Greet()
            const username = 'Yonela'
            const languages = 'isiXhosa'
            greeting.setName(username)
            greeting.setGreeting(languages)
            const result = `${greeting.getGreeting()} ${greeting.getName()}`
            assert.equal(result, 'Molo Yonela')
        });
    });
    describe("Set Database Name", () => {
        it('should get user and user info by name.', async () => {
            const greeting = Greet()
            const username = 'Yonela'
            const languages = 'isiXhosa'
            greeting.setName(username)
            greeting.setGreeting(languages)
            const name = greeting.getName()
            const greet = greeting.getGreeting()
            const language = greeting.getLanguage()
            const [getbased_name] = await db.any(`SELECT * FROM greeting WHERE name = $1;`, [name])
            if (getbased_name?.name !== name) {
                await db.none(`INSERT INTO greeting (name, language, greet, count) VALUES ($1, $2, $3, $4);`, [name, language, greet, 1])
            }
            const [answer] = await db.any(`SELECT * FROM greeting WHERE name = $1;`, [name])
            const user = {
                id: answer.id,
                name: 'Yonela',
                language: 'isiXhosa',
                greet: 'Molo',
                count: 1
            }
            assert.deepEqual(user, answer)
        });
    });
    describe("Update Database Name", () => {
        it('should get user and user info by name.', async () => {
            const greeting = Greet()
            const username = 'Okuhle'
            const languages = 'Afrikaans'
            greeting.setName(username)
            greeting.setGreeting(languages)
            const name = greeting.getName()
            const greet = greeting.getGreeting()
            const language = greeting.getLanguage()

            const [getbased_name] = await db.any(`SELECT * FROM greeting WHERE name = $1;`, [name])
            if (getbased_name?.name === name) {
                await db.query('UPDATE greeting  SET language=$2, greet=$3, count= count + 1 WHERE name = $1;', [name, language, greet])
            } else if (getbased_name?.name !== name) {
                await db.any(`INSERT INTO greeting (name, language, greet, count) VALUES ($1, $2, $3, $4);`, [name, language, greet, 1])
            }
            const [answer] = await db.any(`SELECT * FROM greeting WHERE name = $1;`, [name])
            const user = {
                id: answer.id,
                name: 'Okuhle',
                language: 'Afrikaans',
                greet: 'Hallo',
                count: 1
            }
            assert.deepEqual(user, answer)
        });
    });
    describe("Update User details", () => {
        it('should update user and details.', async () => {
            const greeting = Greet()
            const username = 'Okuhle'
            const languages = 'Afrikaans'
            greeting.setName(username)
            greeting.setGreeting(languages)
            const name = greeting.getName()
            const greet = greeting.getGreeting()
            const language = greeting.getLanguage()

            const [getbased_name] = await db.any(`SELECT * FROM greeting WHERE name = $1;`, [name])
            if (getbased_name?.name === name) {
                await db.query('UPDATE greeting  SET language=$2, greet=$3, count= count + 1 WHERE name = $1;', [name, language, greet])
            } else if (getbased_name?.name !== name) {
                await db.any(`INSERT INTO greeting (name, language, greet, count) VALUES ($1, $2, $3, $4);`, [name, language, greet, 2])
            }
            const [answer] = await db.any(`SELECT * FROM greeting WHERE name = $1;`, [name])
            const user = {
                id: answer.id,
                name: 'Okuhle',
                language: 'Afrikaans',
                greet: 'Hallo',
                count: 2
            }
            assert.deepEqual(user, answer)
        });
    });
    describe("Delete One User", () => {
        it('should delete only selected user.', async () => {
            const greeting = Greet()
            const username = 'Yonela'
            const languages = 'isiXhosa'
            greeting.setName(username)
            greeting.setGreeting(languages)
            const name = greeting.getName()
            const greet = greeting.getGreeting()
            const language = greeting.getLanguage()
            const [getbased_name] = await db.query(`SELECT * FROM greeting WHERE name = $1;`, [name])
            if (getbased_name?.name !== name) {
                await db.any(`INSERT INTO greeting (name, language, greet, count) VALUES ($1, $2, $3, $4);`, [name, language, greet, 1])
            }
            const [answer] = await db.any(`SELECT * FROM greeting WHERE name = $1;`, [name])
            const id = answer.id
            await db.query('DELETE FROM greeting WHERE id = $1;', [id])
            assert.deepEqual([], await db.any("SELECT * FROM greeting;"))
        });
    });
    describe("Delete All Data", () => {
        it('should clear all data from database.', async () => {
            assert.deepEqual([], await db.any('DELETE FROM greeting '))
        });
    });
    describe("Afrikaans", () => {
        it('should return name and selected language', () => {
            const greeting = Greet()
            const username = 'Yonela'
            const languages = 'Afrikaans'
            greeting.setName(username)
            greeting.setGreeting(languages)
            const result = `${greeting.getGreeting()} ${greeting.getName()}`
            assert.equal(result, 'Hallo Yonela')
        });
    });
    describe("English", () => {
        it('should return name and selected language', () => {
            const greeting = Greet()
            const username = 'Yonela'
            const languages = 'English'
            greeting.setName(username)
            greeting.setGreeting(languages)
            const result = `${greeting.getGreeting()} ${greeting.getName()}`
            assert.equal(result, 'Hello Yonela')
        });
    });
});