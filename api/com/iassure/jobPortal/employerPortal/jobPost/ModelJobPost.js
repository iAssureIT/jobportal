const mongoose = require('mongoose');
mongoose.pluralize(null);

const jobsSchema = mongoose.Schema({
	_id : mongoose.Schema.Types.ObjectId,
	company_id: String,
	jobBasicInfo : {
		jobTitle			: String,
		jobLocationCity		: String,
		jobLocationCountry 	: String,
		jobGeoLocation 		: {
								lat: String,
								long: String,
						      },
		workFromHome 		: Boolean,
		contactPersonName 	: String,
		contactPersonEmail 	: String,
		contactPersonPhone 	: String,
		jobType 			: String,
		jobTime 			: String,
		lastDateOfAppl 		: Date,
		jobDesc 			: String,
	},
	CTCOffered : {
		minCTC 		: Number,
		maxCTC 		: Number,
		currency 	: String
	},
	eligibility : {
		minEducation 	: String,
		minExperience   : String,
	},
	requiredSkills:{
		primarySkills 		: Array,
		primarySkillsExp 	: String,
		secondarySkills 	: Array,
		minExperience 		: String,
		otherSkills			: Array,
		minExperience 		: String,
		preferredSkills 	: Array,
	},
	createdAt : Date,
	createdBy : String,
	updateLog : [
		{updatedBy: String, updatedAt:Date, remark:String }
	]
});

module.exports = mongoose.model("jobs", jobsSchema);
