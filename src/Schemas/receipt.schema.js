const { Mongoose } = require("mongoose");

const mongoose = require('mongoose');

const ReceiptSchema = new mongoose.Schema({
    name: String,
    description: String,
    image_url: String,
    price: Number,
    purchase_date: Date,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {collection: 'receipts'});

module.exports = ReceiptSchema;