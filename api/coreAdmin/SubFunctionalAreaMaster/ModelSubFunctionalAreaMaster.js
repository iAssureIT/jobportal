const mongoose = require('mongoose');

const subfunctionalAreaSchema = mongoose.Schema({
    _id                       : mongoose.Schema.Types.ObjectId,
    functionalarea_id         : { type: mongoose.Schema.Types.ObjectId, ref: 'functionalareamaster' },
    subfunctionalArea         : String,  
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

module.exports = mongoose.model('subfunctionalareamaster',subfunctionalAreaSchema);