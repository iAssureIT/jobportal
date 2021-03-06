const mongoose = require('mongoose');

const wishlistSchema = mongoose.Schema({
	_id			          : mongoose.Schema.Types.ObjectId,
    candidate_id          : { type: mongoose.Schema.Types.ObjectId, ref: 'candidatemasters' },
    job_id                : { type: mongoose.Schema.Types.ObjectId, ref: 'entitymasters' },
    entity_id             : { type: mongoose.Schema.Types.ObjectId, ref: 'jobmasters' },
    appliedDate           : Date,
    status                : String,
    applicationViewed     : Boolean,
    createdBy             : String,
    createdAt             : Date
});

module.exports = mongoose.model('candidateappliedjoblist',wishlistSchema);