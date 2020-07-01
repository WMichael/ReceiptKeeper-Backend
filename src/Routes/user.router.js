const express = require('express');
const UserModel = require('../Models/user.model');
const router = express.Router();
const authCheck = require('../helpers/AuthCheck');

router.get('/self', authCheck, (req, res) => {
    UserModel.findOne(req.user.id).then(result => {
        res.send(result);
    })
});

module.exports = router;