// Checks if user is logged in

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