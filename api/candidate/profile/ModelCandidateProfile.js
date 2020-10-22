const mongoose = require('mongoose');
mongoose.pluralize(null);

const candidateSchema = mongoose.Schema({
	_id : mongoose.Schema.Types.ObjectId,
	basicInfo : {
		firstName		: String,
		middleName		: String,
		lastName 		: String,
		dob 			: Date,
		age				: String,
		gender			: String,
		maritalStatus	: String,
		anniversaryDate	: Date,
		languagesKnown	: Array,
		nationality 	: String,
	},
	panCard			: String,
	aadhaarCard		: String,
	address : [{
		addressType		: { type: mongoose.Schema.Types.ObjectId, ref: 'addresstypemaster' },
		houseNumber 	: String,
		address 		: String,
		area			: String,
		cityVillage 	: String,
		district 		: String,
		state			: String,
		country 		: String,
		pincode 		: Number,
	}],
	contact : {
		mobile 			: String,
		altMobile   	: String,
		emailId 		: String,
	},  
	academics:[{
		qualificationLevel: { type: mongoose.Schema.Types.ObjectId, ref: 'qualificationlevelmaster' },
		qualification  	: { type: mongoose.Schema.Types.ObjectId, ref: 'qualificationmaster' },
		specialization 	: Array,
		grade 			: String,
		mode			: Array,
		passOutYear 	: String,
		collegeSchool 	: { type: mongoose.Schema.Types.ObjectId, ref: 'collagemaster' },
		universityBoard : { type: mongoose.Schema.Types.ObjectId, ref: 'universitymaster' },
		cityVillage 	: String,
		state			: String,
		country			: String,
	}],
	skillCertification : [{
		primarySkills 	: Array,
		secondarySkills : Array,
		otherSkills 	: Array,
		rating   		: Number,
		skilldesc   	: String,
		certName		: String,
		issuedBy   		: String,
		certifiedOn 	: Date,
		validTill		: Date,
		gradePercent	: String,
	}],
	workExperience:[{
		companyName  	: String,
		country 	    : String,
		city 			: Array,
		lastDegn		: String,
		department		: Array,
		lastSalary 		: String,
		fromDate 		: Array,
		toDate  		: String,
		responsibilities			: String,
		reportingManager			: String,
		reportingManagerDegn  		: String,
	}],
	user_id	  : { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
	createdAt : Date,
	createdBy : String,
	updateLog : [
		{updatedBy : String, updatedAt : Date, remark : String }
	]
});

module.exports = mongoose.model("candidatemaster", candidateSchema);