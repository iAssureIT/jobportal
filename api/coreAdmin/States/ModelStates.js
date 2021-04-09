const mongoose = require('mongoose');

const stateSchema = mongoose.Schema({
    _id                       : mongoose.Schema.Types.ObjectId,
    countryID                 : { type: mongoose.Schema.Types.ObjectId, ref: 'countries' },
    stateName                 : String,
    stateCode                 : String,    
    fileName                  : String,
});

module.exports = mongoose.model('states',stateSchema);