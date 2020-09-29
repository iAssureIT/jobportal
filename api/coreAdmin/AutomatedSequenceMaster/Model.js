const mongoose = require('mongoose');

const automatedSequenceSchema = mongoose.Schema({
    _id             : mongoose.Schema.Types.ObjectId,
    billTitle       : String,    
    sequence        : [
                        {
                            expenseTypeId       : { type: mongoose.Schema.Types.ObjectId, ref: 'expensetypemasters' },
                            expenseItemId       : { type: mongoose.Schema.Types.ObjectId, ref: 'expenseitemmasters' },
                            expenseItem         : String,
                            billingCode         : Number,
                            sequenceNum         : Number,
                        }
                     ], 
    createdBy       : { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    createdAt       : Date,
    updateLog       : [
                        {
                            updatedAt           : Date,
                            updatedBy           : { type: mongoose.Schema.Types.ObjectId, ref: 'users' } 
                        }
                      ]
});

module.exports = mongoose.model('automatedsequence',automatedSequenceSchema);