const UserModel = require('../Models/user.model');
const e = require('express');

AuthCheck = {
    loggedIn: (req,res,next) => {
        if(req.user) {
            next();
        } else {
            res.status(401).send("Not logged in");
        }
    },
    authCheck: (requester, requestedID) => {
        if (requester.role == 'admin') {
            return true;
        } else {
            return requester.id == requestedID;
        }
    }
} 
module.exports = AuthCheck;