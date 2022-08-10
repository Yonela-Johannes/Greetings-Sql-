const { Greet } = require('../app.js')
const { assert } = require('chai');
const { db } = require('../config/db.js')
describe('Greetings function Test', () => {
    beforeEach(async () => {
        await db.query("DELETE FROM greetings_test")
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
            assert.deepEqual([], await db.query('SELECT * FROM greetings_test;'))
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
            const count = greeting.getCount()
            const language = greeting.getLanguage()
            const result = greeting.result()
            const [getbased_name] = await db.query(`SELECT * FROM greetings_test WHERE name = $1;`, [name])
            if (result && getbased_name?.name !== name) {
                await db.query(`INSERT INTO greetings_test (name, language, greet, count) VALUES ($1, $2, $3, $4);`, [name, language, greet, count])
            }
            const [answer] = await db.query(`SELECT * FROM greetings_test WHERE name = $1;`, [name])
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
            const count = greeting.getCount()
            const language = greeting.getLanguage()
            const result = greeting.result()

            const [getbased_name] = await db.query(`SELECT * FROM greetings_test WHERE name = $1;`, [name])
            if (result && getbased_name?.name === name) {
                await db.query('UPDATE greetings_test  SET language=$2, greet=$3, count= count + 1 WHERE name = $1;', [name, language, greet])
            } else if (result && getbased_name?.name !== name) {
                await db.query(`INSERT INTO greetings_test (name, language, greet, count) VALUES ($1, $2, $3, $4);`, [name, language, greet, count])
            }
            const [answer] = await db.query(`SELECT * FROM greetings_test WHERE name = $1;`, [name])
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
    describe("Delete One User", () => {
        it('should delete only selected user.', async () => {
            const greeting = Greet()
            const username = 'Yonela'
            const languages = 'isiXhosa'
            greeting.setName(username)
            greeting.setGreeting(languages)
            const name = greeting.getName()
            const greet = greeting.getGreeting()
            const count = greeting.getCount()
            const language = greeting.getLanguage()
            const result = greeting.result()
            const [getbased_name] = await db.query(`SELECT * FROM greetings_test WHERE name = $1;`, [name])
            if (result && getbased_name?.name !== name) {
                await db.query(`INSERT INTO greetings_test (name, language, greet, count) VALUES ($1, $2, $3, $4);`, [name, language, greet, count])
            }
            const [answer] = await db.query(`SELECT * FROM greetings_test WHERE name = $1;`, [name])
            const id = answer.id
            await db.query('DELETE FROM greetings_test WHERE id = $1;', [id])
            assert.deepEqual([], await db.query("SELECT * FROM greetings_test;"))
        });
    });
    describe("Delete All Data", () => {
        it('should clear all data from database.', async () => {
            assert.deepEqual([], await db.query('DELETE FROM greetings_test '))
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
    describe("Name Count", () => {
        it('should not count when name is not set', () => {
            const greeting = Greet()
            const username = ''
            const languages = 'Afrikaans'
            greeting.setName(username)
            greeting.setGreeting(languages)
            assert.equal(0, greeting.getCount())
        });
    });
    describe("Language Count", () => {
        it('should not count when language is not set', () => {
            const greeting = Greet()
            const username = 'Yonela'
            const languages = 'Afrikaans'
            greeting.setName(username)
            greeting.setGreeting(languages)
            assert.equal(0, greeting.getCount())
        });
    })
});