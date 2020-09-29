const mongoose = require('mongoose');

const vendorMappingSchema = mongoose.Schema({
    _id         : mongoose.Schema.Types.ObjectId,
    city        : String,
    vendor      : [
                    {
                        vendorID          : { type: mongoose.Schema.Types.ObjectId, ref: 'entitymasters' },
                        ID                : String,
                        assignedPercent   : Number,
                        total             : Number
                    }
                ],
    createdBy   : { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    createdAt   : Date,
    updateLog   : [
                {
                    updatedAt           : Date,
                    updatedBy           : { type: mongoose.Schema.Types.ObjectId, ref: 'users' } 
                }
                ]
});

module.exports = mongoose.model('vendorallocation',vendorMappingSchema);