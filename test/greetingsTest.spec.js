const { Greet } = require('../app.js')
const assert = require('assert')
const pgp = require('pg-promise')();

const local = 'postgres://postgres:juanesse123@localhost:5432/greetings_tests';
const connectionString = process.env.DATABASE_URL || local
const config = {
    connectionString,
    max: 20
}

const db = pgp(config)
const { GreetingsDb } = require('../config/testdb')
const greetingsDb = GreetingsDb(db)
describe('Greetings function Test', () => {
    beforeEach(async () => {
        await greetingsDb.deleteUsers()
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
            await greetingsDb.deleteUsers()
            assert.deepEqual([], await greetingsDb.getUsers())
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
            await greetingsDb.storeName(name, language, greet)
            const [answer] = await db.any(`SELECT * FROM greeting WHERE name = $1;`, [name])
            const user = {
                id: answer.id,
                name: 'Yonela',
                language: 'isiXhosa',
                greet: 'Molo',
                count: answer.count
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
            await greetingsDb.storeName(name, language, greet)
            const answer = await greetingsDb.getUserByName(name)
            const user = {
                id: answer.id,
                name: 'Okuhle',
                language: 'Afrikaans',
                greet: 'Hallo',
                count: answer.count
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
            await greetingsDb.storeName(name, language, greet)
            const answer = await greetingsDb.getUserByName(name)
            const user = {
                id: answer.id,
                name: 'Okuhle',
                language: 'Afrikaans',
                greet: 'Hallo',
                count: answer.count
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
            await greetingsDb.storeName(name, language, greet)
            const answer = await greetingsDb.getUserByName(name)
            const id = answer.id
            await greetingsDb.deleteUser(answer.id)
            assert.deepEqual([], await greetingsDb.getUsers())
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