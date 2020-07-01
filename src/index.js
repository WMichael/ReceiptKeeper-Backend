// Dependencies
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoose = require('mongoose');
const ReceiptRouter = require('./Routes/receipt.router');
const UserRouter = require('./Routes/user.router');
const AuthRouter = require('./Routes/auth.router');
const cors = require('cors');
const path = require('path');
const passport = require('passport');
const cookieSession = require('cookie-session');
require('dotenv').config();
require('./config/passport-setup');

const app = express();

// Setup cookie session
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY]
}));

app.use(cors());
app.use(morgan("common"));
app.use(helmet())
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/build')));

// Setup Passport
app.use(passport.initialize());
app.use(passport.session());

const port = process.env.PORT || 8081;

// Routes
app.use('/receipts', ReceiptRouter);
app.use('/users', UserRouter);
app.use('/auth', AuthRouter);

// Connect to DB
mongoose.connect(process.env.DB, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'DB connection error!'));
db.once('open', () => {
    app.listen(port, () => console.log(`Listening at localhost:${port} 🎉`));
}); 

// Server frontend pages
app.get('/*', (req,res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Error handling
app.use(function (err, req, res, next) {
    res.status(err.status ? err.status : 500).send(err.message ? err.message : "Opps an error has occured! 🔧");
});