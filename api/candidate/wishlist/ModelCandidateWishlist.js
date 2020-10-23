const mongoose = require('mongoose');

const wishlistSchema = mongoose.Schema({
	_id			          : mongoose.Schema.Types.ObjectId,
    candidateID           : { type: mongoose.Schema.Types.ObjectId, ref: 'candidatemasters' },
    wishlistItems         : [{ jobID:{ type: mongoose.Schema.Types.ObjectId, ref: 'jobmasters' }}],
    createdBy             : String,
    createdAt             : Date
});

module.exports = mongoose.model('candidatewishlist',wishlistSchema);