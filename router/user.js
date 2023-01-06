const express = require('express');
const router = express.Router();
const user = require('../controller/user');
const passport = require('passport');

router.get('/register', user.registerForm);
router.post('/register', user.registerUser);
router.get('/login', user.loginForm);
router.post('/login', passport.authenticate('local', { failureRedirect: '/error', keepSessionInfo: true }), user.login);


module.exports = router;