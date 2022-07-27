import { Greet } from '../app.js'
mocha.setup('bdd');
let assert = chai.assert;
mocha.checkLeaks();
mocha.run();

describe('Greetings function Test', () => {
    describe("Name Factory Function Test", () => {
        it('should not pass in empty values', () => {
            const greet = Greet()
            greet.setName('')
            assert.equal('enter name!', greet.getName())
        });
        it('should remove all numbers in alphanumeric string and return name', () => {
            const greet = Greet()
            greet.setName('56Z56e56zeth565u565')
            assert.equal('zezethu', greet.getName())
        });
        it('should remove all spaces in alphanumeric string and return name', () => {
            const greet = Greet()
            greet.setName('   2yo3ne5235564la   ')
            assert.equal('yonela', greet.getName())
        });
        it('should start name with an uppercase', () => {
            const greet = Greet()
            greet.setName('thamsangqa')
            assert.equal('thamsangqa', greet.getName())
        });
        it('should return error if numbers is entered', () => {
            const greet = Greet()
            greet.setName(12322)
            assert.equal('name should be alphabets only!', greet.getName())
        });
        it('should store names in list', () => {
            const greet = Greet()
            greet.setName('Yanga')
            greet.getNames()
            greet.setName('Anthony')
            greet.getNames()
            greet.setName('Lukhanyo')
            greet.getNames()
            assert.deepEqual(['yanga', 'anthony', 'lukhanyo'], greet.getStoredNames())
        });
        it('should not store duplicated names in the list', () => {
            const greet = Greet()
            greet.setName('Yanga')
            greet.getNames()
            greet.setName('Anthony')
            greet.getNames()
            greet.setName('Lukhanyo')
            greet.getNames()
            greet.setName('Yanga')
            greet.getNames()
            greet.setName('Yanga')
            greet.getNames()
            assert.deepEqual(['yanga', 'anthony', 'lukhanyo'], greet.getStoredNames())
        });
    });
    describe("Radio button selection test", () => {
        it('should false if language not checked/selected', () => {
            const greet = Greet()
            let languages = [{
                language: "English",
                checked: false,
                greeting: "Hello"
            },
            {
                language: "Afrikaans",
                checked: false,
                greeting: "Hallo"
            }, {
                language: "isiXhosa",
                checked: false,
                greeting: "Molo"
            }, {
                language: "isiZulu",
                checked: false,
                greeting: "Sawubona"
            }, {
                language: "seSotho",
                checked: false,
                greeting: "Lumela"
            }
            ]
            greet.selectLanguage(languages)
            assert.equal(false, greet.getLanguage())
        });
        it('should true if language is selected', () => {
            const greet = Greet()
            let languages = [{
                language: "English",
                checked: false,
                greeting: "Hello"
            },
            {
                language: "Afrikaans",
                checked: true,
                greeting: "Hallo"
            }, {
                language: "isiXhosa",
                checked: false,
                greeting: "Molo"
            }, {
                language: "isiZulu",
                checked: false,
                greeting: "Sawubona"
            }, {
                language: "seSotho",
                checked: false,
                greeting: "Lumela"
            }
            ]
            greet.selectLanguage(languages)
            assert.equal(true, greet.getCheckLang())
        });
        it('should select isiXhosa if is selected', () => {
            const greet = Greet()
            let languages = [{
                language: "English",
                checked: false,
                greeting: "Hello"
            },
            {
                language: "Afrikaans",
                checked: false,
                greeting: "Hallo"
            }, {
                language: "isiXhosa",
                checked: true,
                greeting: "Molo"
            }, {
                language: "isiZulu",
                checked: false,
                greeting: "Sawubona"
            }, {
                language: "seSotho",
                checked: false,
                greeting: "Lumela"
            }
            ]
            greet.selectLanguage(languages)
            assert.equal("isiXhosa", greet.getLanguage())
        });
        it('should display English if is selected', () => {
            const greet = Greet()
            let languages = [{
                language: "English",
                checked: true,
                greeting: "Hello"
            },
            {
                language: "Afrikaans",
                checked: false,
                greeting: "Hallo"
            }, {
                language: "isiXhosa",
                checked: false,
                greeting: "Molo"
            }, {
                language: "isiZulu",
                checked: false,
                greeting: "Sawubona"
            }, {
                language: "seSotho",
                checked: false,
                greeting: "Lumela"
            }
            ]
            greet.selectLanguage(languages)
            assert.equal("English", greet.getLanguage())
        });
        it('should select "Sawubona" if "isiZulu" is selected', () => {
            const greet = Greet()
            let languages = [{
                language: "English",
                checked: false,
                greeting: "Hello"
            },
            {
                language: "Afrikaans",
                checked: false,
                greeting: "Hallo"
            }, {
                language: "isiXhosa",
                checked: false,
                greeting: "Molo"
            }, {
                language: "isiZulu",
                checked: true,
                greeting: "Sawubona"
            }, {
                language: "seSotho",
                checked: false,
                greeting: "Lumela"
            }
            ]
            greet.selectLanguage(languages)
            assert.equal("Sawubona", greet.getGreeting())
        });
        it('should select "Lumela" if "Sesotho" is selected', () => {
            const greet = Greet()
            let languages = [{
                language: "English",
                checked: false,
                greeting: "Hello"
            },
            {
                language: "Afrikaans",
                checked: false,
                greeting: "Hallo"
            }, {
                language: "isiXhosa",
                checked: false,
                greeting: "Molo"
            }, {
                language: "isiZulu",
                checked: false,
                greeting: "Sawubona"
            }, {
                language: "Sesotho",
                checked: true,
                greeting: "Lumela"
            }
            ]
            greet.selectLanguage(languages)
            assert.equal("Lumela", greet.getGreeting())
        });
    });
    describe('Count', () => {
        it('should not count if username already exist in list', () => {
            const greet = Greet()
            greet.setName('Yanga')
            greet.getNames()
            greet.setName('Anthony')
            greet.getNames()
            greet.setName('Lukhanyo')
            greet.getNames()
            greet.setName('Lukhanyo')
            greet.getNames()
            greet.setName('Lukhanyo')
            greet.getNames()
            greet.setName('Lukhanyo')
            greet.getNames()
            greet.setName('Yonela')
            greet.getNames()
            greet.setCount()
            assert.deepEqual(4, greet.getCount())
        });
        it('should not count if there is no username', () => {
            const greet = Greet()
            greet.resetNames()
            greet.setCount()
            assert.deepEqual(0, greet.getCount())
        });
        it('should count if username do not exist in stored list', () => {
            const greet = Greet()
            greet.setName('Yanga')
            greet.getNames()
            greet.setName('Anthony')
            greet.getNames()
            greet.setName('Lukhanyo')
            greet.getNames()
            greet.setName('Yonela')
            greet.getNames()
            greet.setName('Zezethu')
            greet.getNames()
            greet.setName('Sapho')
            greet.getNames()
            greet.setCount()
            assert.deepEqual(6, greet.getCount())
        })
    });
    describe('Name and Count', () => {
        it('should not count if name is entered multiple times and it exist', () => {
            const greet = Greet()
            greet.resetNames()
            greet.setName('Yanga')
            greet.getNames()
            greet.setName('Yanga')
            greet.getNames()
            greet.setName('Yanga')
            greet.getNames()
            greet.setCount()
            assert.deepEqual(1, greet.getCount())
        });
        it('should count if name is entered and it does not exist in list', () => {
            const greet = Greet()
            greet.resetNames()
            greet.setName('Yonela')
            greet.getNames()
            greet.setName('Anthony')
            greet.getNames()
            greet.setName('Lukhanyo')
            greet.getNames()
            greet.setCount()
            assert.deepEqual(3, greet.getCount())
        });
    });
    describe('Display Name and Greeting', () => {
        it('should display "Hello" "name" if selected language is English', () => {
            const greet = Greet()
            greet.resetNames()
            let languages = [{
                language: "English",
                checked: true,
                greeting: "Hello"
            },
            {
                language: "Afrikaans",
                checked: false,
                greeting: "Hallo"
            }, {
                language: "isiXhosa",
                checked: false,
                greeting: "Molo"
            }, {
                language: "isiZulu",
                checked: false,
                greeting: "Sawubona"
            }, {
                language: "seSotho",
                checked: false,
                greeting: "Lumela"
            }
            ]
            greet.setName('Yanga')
            greet.getNames()
            greet.setName('Anthony')
            greet.getNames()
            greet.setName('Yonela')
            greet.getNames()
            greet.selectLanguage(languages)
            assert.equal("Hello yonela", `${greet.getGreeting()} ${greet.getName()}`)
        });
        it('should display "Molo" "name" if selected language is isiXhosa', () => {
            const greet = Greet()
            greet.resetNames()
            let languages = [{
                language: "English",
                checked: false,
                greeting: "Hello"
            },
            {
                language: "Afrikaans",
                checked: false,
                greeting: "Hallo"
            }, {
                language: "isiXhosa",
                checked: true,
                greeting: "Molo"
            }, {
                language: "isiZulu",
                checked: false,
                greeting: "Sawubona"
            }, {
                language: "seSotho",
                checked: false,
                greeting: "Lumela"
            }
            ]
            greet.setName('Yanga')
            greet.getNames()
            greet.setName('Anthony')
            greet.getNames()
            greet.setName('Yonela')
            greet.getNames()
            greet.selectLanguage(languages)
            greet.getLanguage()
            assert.equal("Molo yonela", `${greet.getGreeting()} ${greet.getName()}`)
        });
        it('should display "Hello" "name" if selected language is English', () => {
            const greet = Greet()
            greet.resetNames()
            let languages = [{
                language: "English",
                checked: false,
                greeting: "Hello"
            },
            {
                language: "Afrikaans",
                checked: false,
                greeting: "Hallo"
            }, {
                language: "isiXhosa",
                checked: true,
                greeting: "Molo"
            }, {
                language: "isiZulu",
                checked: false,
                greeting: "Sawubona"
            }, {
                language: "seSotho",
                checked: false,
                greeting: "Lumela"
            }
            ]
            greet.setName('Yanga')
            greet.getNames()
            greet.setName('Anthony')
            greet.getNames()
            greet.setName('Yonela')
            greet.getNames()
            console.log(greet.selectLanguage(languages))
            greet.setCount()
            console.log(greet.getCount())
            console.log(greet.getStoredNames())
            console.log(greet.getName())
            console.log(greet.getLanguage())
            const language = greet.getGreeting()
            assert.equal("Molo yonela", `${language} ${greet.getName()}`)
        });
    });
    describe('Display Name, Count and Greeting', () => {
        it('should display "Molo" "Name" and "Count" if 3 names and language is isiXhosa', () => {
            const greet = Greet()
            greet.resetNames()
            let languages = [{
                language: "English",
                checked: false,
                greeting: "Hello"
            },
            {
                language: "Afrikaans",
                checked: false,
                greeting: "Hallo"
            }, {
                language: "isiXhosa",
                checked: true,
                greeting: "Molo"
            }, {
                language: "isiZulu",
                checked: false,
                greeting: "Sawubona"
            }, {
                language: "seSotho",
                checked: false,
                greeting: "Lumela"
            }
            ]
            greet.setName('Yanga')
            greet.getNames()
            greet.setName('Anthony')
            greet.getNames()
            greet.setName('Yonela')
            greet.getNames()
            greet.selectLanguage(languages)
            greet.getLanguage()
            assert.equal("Molo yonela, count: 3", `${greet.getGreeting()} ${greet.getName()}, count: ${greet.getCount()}`)
        });
        it('should display "Hallo" "Name" and "Count" if 5 names and language is isiXhosa', () => {
            const greet = Greet()
            greet.resetNames()
            let languages = [{
                language: "English",
                checked: true,
                greeting: "Hello"
            },
            {
                language: "Afrikaans",
                checked: false,
                greeting: "Hallo"
            }, {
                language: "isiXhosa",
                checked: false,
                greeting: "Molo"
            }, {
                language: "isiZulu",
                checked: false,
                greeting: "Sawubona"
            }, {
                language: "seSotho",
                checked: false,
                greeting: "Lumela"
            }
            ]
            greet.setName('Yanga')
            greet.getNames()
            greet.setName('Anthony')
            greet.getNames()
            greet.setName('Yonela')
            greet.getNames()
            greet.setName('Lukhanyo')
            greet.getNames()
            greet.setName('Thamsangqa')
            greet.getNames()
            greet.setName('Phumza')
            greet.getNames()
            greet.setCount()
            greet.getStoredNames()
            greet.selectLanguage(languages)
            greet.getLanguage()
            assert.equal("Hello phumza, count: 6", `${greet.getGreeting()} ${greet.getName()}, count: ${greet.getCount()}`)
        });
    });
})