// Dependencies
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoose = require('mongoose');
const ReceiptRouter = require('./Routes/receipt.router');
const UserRouter = require('./Routes/user.router');
const cors = require('cors');
const path = require('path');
const passport = require('passport');
const cookieSession = require('cookie-session');
require('dotenv').config();
require('./config/passport-setup');

const app = express();
app.use(cors());
app.use(morgan("common"));
app.use(helmet())
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'client/build')));

app.use(cookieSession({
    name: 'receiptkeeper-session',
    keys: ['key1','key2']
}));

// TODO: Extract to seperate file.
const isLoggedIn = (req, res, next) => {
    if(req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}

const port = process.env.PORT || 8081;

// Routes
app.use('/receipts', ReceiptRouter);
app.use('/users', UserRouter);

// Connect to DB
mongoose.connect(process.env.DB, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'DB connection error!'));
db.once('open', () => {
    app.listen(port, () => console.log(`Listening at localhost:${port} 🎉`));
});    

// OAuth
// TODO: Seperate OAuth to a seperate file.
app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/welcome');
}); 

app.get('/failed', (req, res) => res.send('Login failed! - Not logged in!'));
app.get('/welcome', isLoggedIn, (req, res) => { res.send(`Login successful! - Welcome ${req.user}`)});

app.get('/logout', (req,res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
})

// Server frontend pages
app.get('/*', (req,res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Error handling
app.use(function (err, req, res, next) {
    res.status(err.status ? err.status : 500).send(err.message ? err.message : "Opps an error has occured! 🔧");
});