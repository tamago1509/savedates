const User = require('../models/userSchema');
const passport = require('passport')

module.exports.registerForm = (req, res) => {
    res.render('user/register');
}
module.exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    const user = new User({ username, email });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err, next) => {
        if (err) {
            next(err);
        }
        // console.log(registeredUser);
        return res.redirect('/');
    })


}
module.exports.loginForm = (req, res) => {
    res.render('user/login')
}
module.exports.login = (req, res) => {
    res.redirect('/');

}