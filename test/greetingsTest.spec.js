const { Greet } = require('../app.js')
const { assert } = require('chai');
const { db,
    getusers,
    getuser,
    insertuser,
    getuser_byname,
    updateuser,
    deleteuser,
    deleteusers
} = require('../config/db.js')


describe('Greetings function Test', () => {
    describe("Empty Name Test", () => {
        it('should not pass in empty name', () => {
            before(async () => {
                await greetings.destroy({
                    where: {},
                    truncate: { cascade: true },
                })
            })
            const greet = Greet()
            const username = ''
            const languages = 'Afrikaans'

            greet.setName(username)
            greet.setLanguage(languages)
            greet.setGreeting(languages)
            // const getbased_name = username ? getuser_byname(username) : username
            // if (getbased_name === greet.getName()) {
            //     if (greet.getName(), greet.getLanguage(), greet.getSelectedLanguage(), greet.getCount()) {
            //         updateuser(getbased_name)
            //     }
            // } else {
            //     if (greet.getName(), greet.getLanguage(), greet.getSelectedLanguage(), greet.getCount()) {
            //         insertuser(greet.getName(), greet.getLanguage(), greet.getSelectedLanguage(), greet.getCount())
            //     }
            // }
            assert.equal("Please enter your name!", greet.getNameError())
        });
    });
    describe("Numbers Test", () => {
        it('should not pass in numbers', () => {
            before(async () => {
                await greetings.destroy({
                    where: {},
                    truncate: { cascade: true },
                })
            })
            const greet = Greet()
            const username = 5555
            const languages = 'Afrikaans'

            greet.setName(username)
            greet.setLanguage(languages)
            greet.setGreeting(languages)
            // const getbased_name = username ? getuser_byname(username) : username
            // if (getbased_name === greet.getName()) {
            //     if (greet.getName(), greet.getLanguage(), greet.getSelectedLanguage(), greet.getCount()) {
            //         updateuser(getbased_name)
            //     }
            // } else {
            //     if (greet.getName(), greet.getLanguage(), greet.getSelectedLanguage(), greet.getCount()) {
            //         insertuser(greet.getName(), greet.getLanguage(), greet.getSelectedLanguage(), greet.getCount())
            //     }
            // }
            assert.equal("Please enter your name!", greet.getNameError())
        });
    });
    describe("Empty Language Test", () => {
        it('should not pass in empty language', () => {
            before(async () => {
                await greetings.destroy({
                    where: {},
                    truncate: { cascade: true },
                })
            })
            const greet = Greet()
            const username = 'Yonela'
            const languages = ''

            greet.setName(username)
            greet.setLanguage(languages)
            greet.setGreeting(languages)

            // const getbased_name = username ? getuser_byname(username) : username
            // if (getbased_name === greet.getName()) {
            //     if (greet.getName(), greet.getLanguage(), greet.getSelectedLanguage(), greet.getCount()) {
            //         updateuser(getbased_name)
            //     }
            // } else {
            //     if (greet.getName(), greet.getLanguage(), greet.getSelectedLanguage(), greet.getCount()) {
            //         insertuser(greet.getName(), greet.getLanguage(), greet.getSelectedLanguage(), greet.getCount())
            //     }
            // }
            assert.equal("Please select language!", greet.getLanguageError())
        });
    });
    describe("isiXhosa", () => {
        it('should return name and selected language', () => {
            before(async () => {
                await greetings.destroy({
                    where: {},
                    truncate: { cascade: true },
                })
            })
            const greet = Greet()
            const username = 'Yonela'
            const languages = 'isiXhosa'

            greet.setName(username)
            greet.setLanguage(languages)
            greet.setGreeting(languages)

            // const getbased_name = username ? getuser_byname(username) : username
            // if (getbased_name === greet.getName()) {
            //     if (greet.getName(), greet.getLanguage(), greet.getSelectedLanguage(), greet.getCount()) {
            //         updateuser(getbased_name)
            //     }
            // } else {
            //     if (greet.getName(), greet.getLanguage(), greet.getSelectedLanguage(), greet.getCount()) {
            //         insertuser(greet.getName(), greet.getLanguage(), greet.getSelectedLanguage(), greet.getCount())
            //     }
            // }
            const result = `${greet.getGreeting()} ${greet.getName()}`
            assert.equal(result, 'Molo Yonela')
        });
    });
    describe("Afrikaans", () => {
        it('should return name and selected language', () => {
            before(async () => {
                await greetings.destroy({
                    where: {},
                    truncate: { cascade: true },
                })
            })
            const greet = Greet()
            const username = 'Yonela'
            const languages = 'Afrikaans'

            greet.setName(username)
            greet.setLanguage(languages)
            greet.setGreeting(languages)

            // const getbased_name = username ? getuser_byname(username) : username
            // if (getbased_name === greet.getName()) {
            //     if (greet.getName(), greet.getLanguage(), greet.getSelectedLanguage(), greet.getCount()) {
            //         updateuser(getbased_name)
            //     }
            // } else {
            //     if (greet.getName(), greet.getLanguage(), greet.getSelectedLanguage(), greet.getCount()) {
            //         insertuser(greet.getName(), greet.getLanguage(), greet.getSelectedLanguage(), greet.getCount())
            //     }
            // }
            const result = `${greet.getGreeting()} ${greet.getName()}`
            assert.equal(result, 'Hallo Yonela')
        });
    });
    describe("English", () => {
        it('should return name and selected language', () => {
            before(async () => {
                await greetings.destroy({
                    where: {},
                    truncate: { cascade: true },
                })
            })
            const greet = Greet()
            const username = 'Yonela'
            const languages = 'English'

            greet.setName(username)
            greet.setLanguage(languages)
            greet.setGreeting(languages)

            // const getbased_name = username ? getuser_byname(username) : username
            // if (getbased_name === greet.getName()) {
            //     if (greet.getName(), greet.getLanguage(), greet.getSelectedLanguage(), greet.getCount()) {
            //         updateuser(getbased_name)
            //     }
            // } else {
            //     if (greet.getName(), greet.getLanguage(), greet.getSelectedLanguage(), greet.getCount()) {
            //         insertuser(greet.getName(), greet.getLanguage(), greet.getSelectedLanguage(), greet.getCount())
            //     }
            // }
            const result = `${greet.getGreeting()} ${greet.getName()}`
            assert.equal(result, 'Hello Yonela')
        });
    });
    describe("Name Count", () => {
        it('should not count when name is not set', () => {
            before(async () => {
                await greetings.destroy({
                    where: {},
                    truncate: { cascade: true },
                })
            })
            const greet = Greet()
            const username = ''
            const languages = 'Afrikaans'

            greet.setName(username)
            greet.setLanguage(languages)
            greet.setGreeting(languages)

            // const getbased_name = username ? getuser_byname(username) : username
            // if (getbased_name === greet.getName()) {
            //     if (greet.getName(), greet.getLanguage(), greet.getSelectedLanguage(), greet.getCount()) {
            //         updateuser(getbased_name)
            //     }
            // } else {
            //     if (greet.getName(), greet.getLanguage(), greet.getSelectedLanguage(), greet.getCount()) {
            //         insertuser(greet.getName(), greet.getLanguage(), greet.getSelectedLanguage(), greet.getCount())
            //     }
            // }
            assert.equal(0, greet.getCount())
        });
    });
    describe("Language Count", () => {
        it('should not count when language is not set', () => {
            before(async () => {
                await greetings.destroy({
                    where: {},
                    truncate: { cascade: true },
                })
            })
            const greet = Greet()
            const username = 'Yonela'
            const languages = 'Afrikaans'

            greet.setName(username)
            greet.setLanguage(languages)
            greet.setGreeting(languages)

            // const getbased_name = username ? getuser_byname(username) : username
            // if (getbased_name === greet.getName()) {
            //     if (greet.getName(), greet.getLanguage(), greet.getSelectedLanguage(), greet.getCount()) {
            //         updateuser(getbased_name)
            //     }
            // } else {
            //     if (greet.getName(), greet.getLanguage(), greet.getSelectedLanguage(), greet.getCount()) {
            //         insertuser(greet.getName(), greet.getLanguage(), greet.getSelectedLanguage(), greet.getCount())
            //     }
            // }
            assert.equal(0, greet.getCount())
        });
    });
    describe("Count One", () => {
        it('should count when name and language is set', () => {
            before(async () => {
                await greetings.destroy({
                    where: {},
                    truncate: { cascade: true },
                })
            })
            const greet = Greet()
            const username = 'Yonela'
            const languages = 'Afrikaans'

            greet.setName(username)
            greet.setLanguage(languages)
            greet.setGreeting(languages)

            // const getbased_name = username ? getuser_byname(username) : username
            // if (getbased_name === greet.getName()) {
            //     if (greet.getName(), greet.getLanguage(), greet.getSelectedLanguage(), greet.getCount()) {
            //         updateuser(getbased_name)
            //     }
            // } else {
            //     if (greet.getName(), greet.getLanguage(), greet.getSelectedLanguage(), greet.getCount()) {
            //         insertuser(greet.getName(), greet.getLanguage(), greet.getSelectedLanguage(), greet.getCount())
            //     }
            // }
            assert.equal(1, greet.getCount())
        });
    });

    describe("Incremenent Count", () => {
        it('should increment count when name and language is set', () => {
            before(async () => {
                await greetings.destroy({
                    where: {},
                    truncate: { cascade: true },
                })
            })
            const greet = Greet()
            const username = 'Yonela'
            const languages = 'Afrikaans'

            greet.setName(username)
            greet.setLanguage(languages)
            greet.setGreeting(languages)

            // const getbased_name = username ? getuser_byname(username) : username
            // if (getbased_name === greet.getName()) {
            //     if (greet.getName(), greet.getLanguage(), greet.getSelectedLanguage(), greet.getCount()) {
            //         updateuser(getbased_name)
            //     }
            // } else {
            //     if (greet.getName(), greet.getLanguage(), greet.getSelectedLanguage(), greet.getCount()) {
            //         insertuser(greet.getName(), greet.getLanguage(), greet.getSelectedLanguage(), greet.getCount())
            //     }
            // }
            assert.equal(2, greet.getCount())
        });
    });
})