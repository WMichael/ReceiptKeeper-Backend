const express = require('express');
const UserModel = require('../Models/user.model');
const router = express.Router();
const AuthCheck = require('../helpers/AuthCheck');
const ReceiptModel=require('../Models/receipt.model');

router.get('/self', AuthCheck.loggedIn, (req, res) => {
    UserModel.findOne({_id: req.user.id}).then(result => {
        ReceiptModel.find({user: req.user.id}).then(receipts => {
            res.send({username: result.username, createdAt: result.createdAt, receipts: receipts.length});
        });
    });
});

module.exports = router;