const mongoose = require('mongoose');
mongoose.pluralize(null);

const jobsSchema = mongoose.Schema({
	_id : mongoose.Schema.Types.ObjectId,
	company_id: String,
	jobBasicInfo : {
		jobTitle			: String,
		jobLocationCity		: String,
		jobLocationCountry 	: String,
		role				: String,
		gender              : String,
		functionalArea 		: String,
		subFunctionalArea 	: String,
		/*industryId		: String,*/
		/*functionalAreaId	: String,*/
		/*subFunctionalAreaId : String,
		workFromHome 		: Boolean,
		contactPersonName 	: String,
		contactPersonEmail 	: String,
		contactPersonPhone 	: String,*/
		jobType 			: String,
		jobTime 			: String,
		lastDateOfAppl 		: Date,
		jobDesc 			: String,
	},
	ctcOffered : {
		minSalary 	 : Number,
		minSalPeriod : String,
		maxSalary 	 : Number,
		maxSalPeriod : String
	},
	eligibility : {
		minEducation 	: String,
		minExperience   : String,
	},
	requiredSkills:{
		primarySkills 		: Array,
		minPrimExp			: String,
		secondarySkills 	: Array,
		minSecExp 			: String,
		otherSkills			: Array,
		minOtherExp 		: String,
		preferredSkills 	: Array,
	},
	/*createdAt : Date,
	createdBy : String,
	updateLog : [
		{updatedBy: String, updatedAt:Date, remark:String }
	]*/
});

module.exports = mongoose.model("jobs", jobsSchema);
