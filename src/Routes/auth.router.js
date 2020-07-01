const express = require('express');
const router = express.Router();
const passport = require('passport');
require('dotenv').config();

// TODO: Find better place to put this API_URL check.
const API_URL = process.env.NODE_ENV === 'production' ? '../..' : process.env.LOCAL_REACT_ADDRESS;

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
function(req, res) {
    res.redirect(`${API_URL}/profile`);
}); 

// Check user is logged in
router.get('/', (req, res) => {
    if(req.user) {
        res.status(200);
    } else {
        res.status(401);
    }
});

module.exports = router;