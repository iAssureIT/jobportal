const mongoose = require('mongoose');

const empVehicalSchema = mongoose.Schema({
    _id                       : mongoose.Schema.Types.ObjectId,
    empCategory               : String,  
    vehicalCategory           : Array,  
    company_Id                : String,  
    createdAt                 : Date,
    createdBy                 : { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    updateLog                 : [
                                {
                                    updatedAt           : Date,
                                    updatedBy           : { type: mongoose.Schema.Types.ObjectId, ref: 'users' } 
                                }
                                ]
});

module.exports = mongoose.model('empVehicalMaster',empVehicalSchema);