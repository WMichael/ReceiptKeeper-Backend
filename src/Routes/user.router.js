const express = require('express');
const UserModel = require('../Models/user.model');
const router = express.Router();

router.post('/add', (req, res, next) => {
    const user = new UserModel(req.body);
    user.save().then(() => {
        res.send({message: "User added! 🧾🎉"});
    }).catch(() => {
        next({});
    });
});

module.exports = router;