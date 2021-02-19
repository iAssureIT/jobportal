const mongoose = require('mongoose');

const stateSchema = mongoose.Schema({
    _id                       : mongoose.Schema.Types.ObjectId,
    countryID                 : String,
    stateName                 : String,
    stateCode                 : String,    
    fileName                  : String,
});

module.exports = mongoose.model('states',stateSchema);