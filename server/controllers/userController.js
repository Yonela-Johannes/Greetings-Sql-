export const view = (req, res) => {
    res.render('users', {
        back: "< back",
        user_names: greet.getUsers() ? 'List Users' : '',
        allUsers: greet.getUsers(),
    })
}