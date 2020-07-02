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
    authCheck: (requesterID, idToCheck) => { 
       // TODO: Sort out auth check
       return true;
    }
} 
module.exports = AuthCheck;