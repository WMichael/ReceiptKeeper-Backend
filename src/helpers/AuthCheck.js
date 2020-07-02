// Checks if user is logged in

AuthCheck = {
    loggedIn: (req,res,next) => {
        if(req.user) {
            next();
        } else {
            res.status(401).send("Not logged in");
        }
    },
    authCheck: (requesterID, requestedID) => { 
        return true;
    }
} 
module.exports = AuthCheck;