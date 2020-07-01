// Checks if user is logged in
authCheck = (req,res,next) => {
    if(req.user) {
        console.log(req.session);
        next();
    } else {
        res.status(401).send("Not logged in");
    }
}

module.exports = authCheck;