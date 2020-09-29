const mongoose = require('mongoose');

const CountrySpecificConfigSchema = mongoose.Schema({
    _id             : mongoose.Schema.Types.ObjectId,
    country         : String,
    countryCode     : String,
    currency        : String,
    currencySymbol  : String,
    taxName         : String,
    createdBy       : { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    createdAt       : Date,
    updateLog       : [
                        {
                            updatedAt           : Date,
                            updatedBy           : { type: mongoose.Schema.Types.ObjectId, ref: 'users' } 
                        }
                    ]
                                                 
}); 

module.exports = mongoose.model('countrySpecificConfig',CountrySpecificConfigSchema);
