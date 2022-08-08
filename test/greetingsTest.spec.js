const { Greet } = require('../app.js')
const { assert } = require('chai');
const { db,
    updateuser,
} = require('../config/db.js')


describe('Greetings function Test', () => {
    describe("Empty Name Test", () => {
        it('should not pass in empty name', () => {
            before(async () => {
                await greetings_test.destroy({
                    where: {},
                    truncate: { cascade: true },
                })
            })
            const greeting = Greet()
            const username = ''
            const languages = 'Afrikaans'
            greeting.setName(username)
            greeting.setGreeting(languages)
            assert.equal("Please enter your name!", greeting.getNameError())
        });
    });
    describe("Get Names", () => {
        it('should get name from data base', async () => {
            before(async () => {
                await greetings_test.destroy({
                    where: {},
                    truncate: { cascade: true },
                })
                const greeting = Greet()
                const username = ''
                const languages = 'Afrikaans'
                greeting.setName(username)
                greeting.setGreeting(languages)
                const allUsers = await db.query('SELECT * FROM greetings_test;')
                assert.deepEqual([], allUsers)
            })
        });
    });

    describe("Empty Name Test", () => {
        it('should not pass in empty name', () => {
            before(async () => {
                await greetings_test.destroy({
                    where: {},
                    truncate: { cascade: true },
                })
            })
            const greeting = Greet()
            const username = ''
            const languages = 'Afrikaans'
            greeting.setName(username)
            greeting.setGreeting(languages)
            assert.equal("Please enter your name!", greeting.getNameError())
        });

    });
    describe("Numbers Test", () => {
        it('should not pass in numbers', () => {
            before(async () => {
                await greetings_test.destroy({
                    where: {},
                    truncate: { cascade: true },
                })
            })
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
            before(async () => {
                await greetings_test.destroy({
                    where: {},
                    truncate: { cascade: true },
                })
            })
            const greeting = Greet()
            const username = 'Yonela'
            const languages = ''

            greeting.setName(username)
            greeting.setGreeting(languages)
            // const getbased_name = username ? getuser_byname(username) : username
            // if (getbased_name === greeting.getName()) {
            //     if (greeting.getName(), greeting.getLanguage(), greeting.getSelectedLanguage(), greeting.getCount()) {
            //         updateuser(getbased_name)
            //     }
            // } else {
            //     if (greeting.getName(), greeting.getLanguage(), greeting.getSelectedLanguage(), greeting.getCount()) {
            //         insertuser(greeting.getName(), greeting.getLanguage(), greeting.getSelectedLanguage(), greeting.getCount())
            //     }
            // }
            assert.equal("Please select language!", greeting.getLanguageError())
        });
    });
    describe("isiXhosa", () => {
        it('should return name and selected language', () => {
            before(async () => {
                await greetings_test.destroy({
                    where: {},
                    truncate: { cascade: true },
                })
            })
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
            before(async () => {
                await greetings_test.destroy({
                    where: {},
                    truncate: { cascade: true },
                })
            })
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

            if (getbased_name === name) {
                if (result) {
                    await db.query('UPDATE greetings_test  SET language=$2, greet=$3, count= count + 1 WHERE name = $1;', [name, language, greet])
                } else {
                    if (result) {
                        await db.query(`INSERT INTO greetings_test (name, language, greet, count) VALUES ($1, $2, $3, $4);`, [name, language, greet, count])
                    }
                }
                const get_user = await db.query(`SELECT * FROM greetings_test WHERE name = $1;`, [name])
                const user = [{
                    id: 5,
                    name: 'Yonela',
                    language: 'isiXhosa',
                    greet: 'Molo',
                    count: 1
                }]

                assert.deepEqual(user, get_user)
            }
        });
    });
    describe("Update Database Name", () => {
        it('should get user and user info by name.', async () => {
            before(async () => {
                await greetings_test.destroy({
                    where: {},
                    truncate: { cascade: true },
                })
            })
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
            if (getbased_name === name) {
                if (result) {
                    await db.query('UPDATE greetings_test  SET language=$2, greet=$3, count= count + 1 WHERE name = $1;', [name, language, greet])
                }
            } else {
                if (result) {
                    await db.query(`INSERT INTO greetings_test (name, language, greet, count) VALUES ($1, $2, $3, $4);`, [name, language, greet, count])
                }
            }
            let counter = 1
            const [get_user] = await db.query(`SELECT * FROM greetings_test WHERE name = $1;`, [name])
            const user = {
                id: 11,
                name: 'Yonela',
                language: 'isiXhosa',
                greet: 'Molo',
                count: counter++
            }
            assert.deepEqual(user, get_user)
        }
        );
    });
    describe("Afrikaans", () => {
        it('should return name and selected language', () => {
            before(async () => {
                await greetings_test.destroy({
                    where: {},
                    truncate: { cascade: true },
                })
            })
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
            before(async () => {
                await greetings_test.destroy({
                    where: {},
                    truncate: { cascade: true },
                })
            })
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
            before(async () => {
                await greetings_test.destroy({
                    where: {},
                    truncate: { cascade: true },
                })
            })
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
            before(async () => {
                await greetings_test.destroy({
                    where: {},
                    truncate: { cascade: true },
                })
            })
            const greeting = Greet()
            const username = 'Yonela'
            const languages = 'Afrikaans'

            greeting.setName(username)
            greeting.setGreeting(languages)
            assert.equal(0, greeting.getCount())
        });
    });
})