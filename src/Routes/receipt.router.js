const express = require('express');
const ReceiptModel = require('../Models/receipt.model');
const router = express.Router();
const authCheck = require('../helpers/AuthCheck');

router.get('/', authCheck, (req,res,next) => {
    ReceiptModel.find().exec((err, result) => {
        if(err) {
            next({});
        } else {
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
    const receipt = new ReceiptModel(req.body);
    receipt.save().then(() => {
        res.send({message: "Receipt Added! 🧾🎉"});
    }).catch(() => {
        next({});
    });
});

module.exports = router;