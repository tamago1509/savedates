const express = require('express');
const { dirname } = require('path');
const app = express();
const path = require('path')
const mongoose = require("mongoose");
const UserRouter = require('./router/user');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const LocalStrategy = require('passport-local');
const User = require('./models/userSchema');
const passport = require('passport');

const sessionConfig = {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {

        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    },
}

app.use(session(sessionConfig));



app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


mongoose.connect("mongodb://localhost:27017/diary", {
    maxPoolSize: 50,
    wtimeoutMS: 2500,
    useNewUrlParser: true
}).then((res) => {
    console.log("MongoDB connected");
})

app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'ejs');
// app.use(express.urlencoded({ extended: true }));
// app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, "public")));

app.use('/users', UserRouter);
app.get('/', (req, res) => {
    res.render('diary/home');
})
app.get('/error', (req, res) => {
    res.render('diary/error');
})

app.listen('3000', () => {
    console.log("It is ready");
})