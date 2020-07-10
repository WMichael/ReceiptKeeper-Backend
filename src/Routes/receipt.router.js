const express = require('express');
const ReceiptModel = require('../Models/receipt.model');
const router = express.Router();
const AuthCheck = require('../helpers/AuthCheck');

router.get('/', AuthCheck.loggedIn, (req,res,next) => {
    ReceiptModel.find({user: req.user.id}).exec((err, result) => {
        if(err) {
            next({});
        } else {
            res.send(result);
        }
    });
});

router.get('/:id', AuthCheck.loggedIn, (req, res, next) => {
    ReceiptModel.findById(req.params.id).exec((err, result) => {
        if(err) {
            next({});
        } else {
            if(AuthCheck.authCheck(req.user,result.user)) {
                res.send(result);
            } else {
                res.sendStatus(401);
            }
        }
    })
});

router.put('/:id', AuthCheck.loggedIn, (req, res, next) => {
    ReceiptModel.findById(req.params.id).exec((err, result) => {
        if(AuthCheck.authCheck(req.user, result.user)) {
            result.updateOne(req.body).exec();
            res.json({"message" : "Receipt has been updated!"});
        } else {
            res.sendStatus(401);
        }
    });
});

router.delete('/:id', AuthCheck.loggedIn, (req, res, next) => {

    ReceiptModel.findById(req.params.id).exec((err, result) => {
        if (err) {
            next({});
        }
        else if (AuthCheck.authCheck(req.user, result.user)) {
            result.deleteOne((err) => {
                if(err) {
                    next({});
                }
                res.json({"message" : "Receipt has been deleted!"});
            });
        } else {
            res.sendStatus(401);
        }
    });
});

router.post('/add', AuthCheck.loggedIn, (req, res, next) => {
    const receipt = new ReceiptModel({
        name: req.body.name,
        description: req.body.description,
        image_url: req.body.image_url,
        price: req.body.price,
        purchase_date: req.body.purchase_date,
        user: req.user.id
    });
    receipt.save().then(() => {
        res.send({message: "Receipt Added! 🧾🎉"});
    }).catch(() => {
        next({});
    });
});

module.exports = router;