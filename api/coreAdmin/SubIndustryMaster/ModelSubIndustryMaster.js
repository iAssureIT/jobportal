const mongoose = require('mongoose');

const subindustrySchema = mongoose.Schema({
    _id                       : mongoose.Schema.Types.ObjectId,
    industry_id               : { type: mongoose.Schema.Types.ObjectId, ref: 'industryMaster' },
    subindustry               : String,  
    createdBy                 : { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    createdAt                 : Date,
    fileName                  :String,
    updateLog                 : [
                                {
                                    updatedAt           : Date,
                                    updatedBy           : { type: mongoose.Schema.Types.ObjectId, ref: 'users' } 
                                }
                                ]
});

module.exports = mongoose.model('subindustryMaster',subindustrySchema);