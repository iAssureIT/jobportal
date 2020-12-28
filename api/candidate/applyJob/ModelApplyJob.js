const mongoose = require('mongoose');

const wishlistSchema = mongoose.Schema({
	_id			          : mongoose.Schema.Types.ObjectId,
    candidateID           : { type: mongoose.Schema.Types.ObjectId, ref: 'candidatemasters' },
    jobID                 : { type: mongoose.Schema.Types.ObjectId, ref: 'entitymasters' },
    employerID            : { type: mongoose.Schema.Types.ObjectId, ref: 'jobmasters' },
    appliedDate           : Date,
    status                : String,
    applicationViewed     : Boolean,
    createdBy             : String,
    createdAt             : Date
});

module.exports = mongoose.model('candidateappliedjoblist',wishlistSchema);