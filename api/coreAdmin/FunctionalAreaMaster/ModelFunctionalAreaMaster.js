const mongoose = require('mongoose');

const functionalAreaSchema = mongoose.Schema({
    _id                       : mongoose.Schema.Types.ObjectId,
    industry_id               : { type: mongoose.Schema.Types.ObjectId, ref: 'industryMaster' },
    functionalArea            : String,  
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

module.exports = mongoose.model('functionalareamaster',functionalAreaSchema);