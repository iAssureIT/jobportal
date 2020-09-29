const mongoose = require('mongoose');

const invoicemasterSchema = mongoose.Schema({
    _id                         : mongoose.Schema.Types.ObjectId,
    invoiceNumber               : String,
    company_id                  : { type: mongoose.Schema.Types.ObjectId, ref: 'entitymasters' },
    department_id               : String,
    employee_id                 : String,
    invoices                    : Array, 
    qty                         : Number,    
    amount                      : Number,
    totalAmount                 : Number, 
    payableAmount               : Number, 
    tax                         : Number,
    CGSTtax                     : Number,
    SGSTtax                     : Number,
    discount                    : Number,
    payment                     : Number,
    roundingOff                 : Number,
    status                      : String,
    startDate                   : Date,
    endDate                     : Date,
    createdBy                   : { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    createdAt                   : Date,
    updateLog                   : [{
                                    updatedAt           : Date,
                                    updatedBy           : { type: mongoose.Schema.Types.ObjectId, ref: 'users' } 
                                }]

                                                 
}); 

module.exports = mongoose.model('masterinvoice',invoicemasterSchema);
