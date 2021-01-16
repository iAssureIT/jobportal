const mongoose = require('mongoose');

const languageSchema = mongoose.Schema({
    _id                       : mongoose.Schema.Types.ObjectId,
    language                  : { type: String, index: true, unique: true  },
    createdBy                 : { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    createdAt                 : Date,
    fileName                  : String,
    updateLog                 : [
                                {
                                    updatedAt           : Date,
                                    updatedBy           : { type: mongoose.Schema.Types.ObjectId, ref: 'users' } 
                                }
                                ]
});

module.exports = mongoose.model('languagemasters',languageSchema);