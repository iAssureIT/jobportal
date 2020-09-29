const mongoose = require('mongoose');

const paymentTermsSchema = mongoose.Schema({
    _id                         : mongoose.Schema.Types.ObjectId,
    paymentTerms                : String,
    createdAt                   : Date,
    updateLog                   : [
                                    {
                                        updatedAt    : Date,
                                        updatedBy    : { type: mongoose.Schema.Types.ObjectId, ref: 'users' } 
                                    }
                                  ]
});

module.exports = mongoose.model('paymentterm',paymentTermsSchema);