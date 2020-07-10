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
<<<<<<< HEAD
    authCheck: (requester, requestedID) => {
        if (requester.role == 'admin') {
            return true;
        } else {
            return requester.id == requestedID;
        }
=======
    authCheck: (requesterID, idToCheck) => { 
       // TODO: Sort out auth check
       return true;
>>>>>>> 421048e79c7b70dbc1d7ad2d087bd46fe6bbca5b
    }
} 
module.exports = AuthCheck;