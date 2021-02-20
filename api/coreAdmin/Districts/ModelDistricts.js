const mongoose = require('mongoose');

const districtSchema = mongoose.Schema({
    _id                       : mongoose.Schema.Types.ObjectId,
    countryID                 : String,
    stateID 				  : { type: mongoose.Schema.Types.ObjectId, ref: 'states' },		
    districtName              : String,    
    fileName                  : String,
});

module.exports = mongoose.model('districts',districtSchema);