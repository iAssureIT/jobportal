const mongoose = require('mongoose');

const modelSchema = mongoose.Schema({
    _id                       : mongoose.Schema.Types.ObjectId,
    categoryId                : { type: mongoose.Schema.Types.ObjectId, ref: 'categorymasters' },
    brand                     : String,  
    brandId                   : { type: mongoose.Schema.Types.ObjectId, ref: 'brandmasters' },
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

module.exports = mongoose.model('categoryBrandmasters',modelSchema);