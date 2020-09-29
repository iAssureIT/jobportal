const mongoose = require('mongoose');

const invoiceNumberSchema = mongoose.Schema({
    _id                         : mongoose.Schema.Types.ObjectId,
    finantialYear               : String,
    invoiceNumber               : Number,    
    createdBy                   : { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    createdAt                   : Date
});

module.exports = mongoose.model('masterinvoicenumber',invoiceNumberSchema);
