const mongoose = require('mongoose');
const ReceiptSchema = require('../Schemas/receipt.schema');

const ReceiptModel = mongoose.model('Receipt', ReceiptSchema);

module.exports = ReceiptModel;