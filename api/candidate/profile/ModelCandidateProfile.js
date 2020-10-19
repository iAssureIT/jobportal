const mongoose = require('mongoose');
mongoose.pluralize(null);

const candidateprofileSchema = mongoose.Schema({
	_id : mongoose.Schema.Types.ObjectId,
	basicInfo : {
		firstName 			: String,	
		middleName 			: String,
		lastName 			: String,
		dob 				: Date,		
		age					: String,
		gender				: String,
		maritalStatus 		: String,
		anniversaryDate 	: Date,
		languagesKnown		: Array,
		nationality 		: String	
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

module.exports = mongoose.model("candidateprofile", candidateprofileSchema);
