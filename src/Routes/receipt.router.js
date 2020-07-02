const express = require('express');
const ReceiptModel = require('../Models/receipt.model');
const router = express.Router();
const AuthCheck = require('../helpers/AuthCheck');

router.get('/', AuthCheck.loggedIn, (req,res,next) => {
    ReceiptModel.find({user: req.user}).exec((err, result) => {
        if(err) {
            next({});
        } else {
            console.log(result);
            res.send(result);
        }
    });
});

router.get('/:id', (req, res, next) => {
    ReceiptModel.findById(req.params.id).exec((err, result) => {
        if(err) {
            next({});
        } else {
            res.send(result);
        }
    })
});

router.put('/:id', (req, res, next) => {
    ReceiptModel.findOneAndUpdate({'_id': req.params.id}, req.body, (err, doc) => {
        if (err) {
            next({});
        } else {
            res.json({"message" : "Receipt has been updated!"});
        }
    });
});

router.delete('/:id', (req, res, next) => {
    ReceiptModel.findByIdAndDelete({'_id': req.params.id}, (err) => {
        if (err) {
            next({});
        } else {
            res.json({"message" : "Receipt has been deleted!"});
        }
    });
});

router.post('/add', (req, res, next) => {
    const receipt = new ReceiptModel({
        name: req.body.name,
        description: req.body.description,
        image_url: req.body.image_url,
        price: req.body.price,
        purchase_date: req.body.purchase_date,
        user: req.user
    });
    receipt.save().then(() => {
        res.send({message: "Receipt Added! 🧾🎉"});
    }).catch(() => {
        next({});
    });
});

module.exports = router;