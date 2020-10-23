const mongoose = require('mongoose');
mongoose.pluralize(null);

const stateJobsSchema = mongoose.Schema({
	_id : mongoose.Schema.Types.ObjectId,
	stateName: String,
	numberOfJobs:Number
});

module.exports = mongoose.model("stateJobs", stateJobsSchema);
