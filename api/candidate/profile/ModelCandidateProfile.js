const mongoose = require('mongoose');
mongoose.pluralize(null);

const candidateSchema = mongoose.Schema({
	_id : mongoose.Schema.Types.ObjectId,
	basicInfo : {
		firstName		: String,
		middleName		: String,
		lastName 		: String,
		dob 			: Date,
		//age			: String,
		gender			: String,
		maritalStatus	: String,
		anniversaryDate	: Date,
		
		nationality 	: String,
		profilePicture  : String,
	},
	languagesKnown		: [{
						language_id : { type: mongoose.Schema.Types.ObjectId, ref: 'languagemasters' }
						}],
	panCard			: String,
	aadhaarCard		: String,
	address : [{
		addressType		: { type: mongoose.Schema.Types.ObjectId, ref: 'addresstypemasters' },
		houseNumber 	: String,
		address 		: String,
		area			: String,
		cityVillage 	: String,
		district 		: String,
		state			: String,
		country 		: String,
		pincode 		: Number,
		stateCode 		: String,
		countryCode 	: String,
	}],
	contact : {
		mobile 			: String,
		altMobile   	: String,
		emailId 		: String,
	},  
	academics:[{
		qualificationlevel_id : { type: mongoose.Schema.Types.ObjectId, ref: 'qualificationlevelmasters' },
		qualification_id  	  : { type: mongoose.Schema.Types.ObjectId, ref: 'qualificationmasters' },
		specialization 	: String,
		grade 			: String,
		mode			: String,
		passOutYear 	: String,
		admisionYear 	: String,
		//collegeSchool 	: { type: mongoose.Schema.Types.ObjectId, ref: 'collagemasters' },
		university_id   : { type: mongoose.Schema.Types.ObjectId, ref: 'universitymasters' },
		collegeSchool 	: String,			
		area 			: String,
		cityVillage  	: String,
		district 		: String,
		state 			: String,
		stateCode 		: String,	
		country 		: String,
		countryCode 	: String,
		pincode 	 	: String, 
	}],
	primarySkills 	: [{ 	skillID : {type: mongoose.Schema.Types.ObjectId, ref: 'skillmasters'}, 
								rating  : String  }],
	secondarySkills : [{ 	skillID : {type: mongoose.Schema.Types.ObjectId, ref: 'skillmasters'}, 
								rating  : String  }],							
	certifications : [{
		certName		: String,
		issuedBy   		: String,
		certifiedOn 	: Date,
		validTill		: Date,
		gradePercent	: String,
	}],
	workExperience:[{
		companyName  	: String,
		country 	    : String,
		city 			: String,
		state			: String,
		lastDegn		: String,
		department		: String,
		lastSalary 		: String,
		fromDate 		: Date,
		toDate  		: Date,
		noticePeriod    : String,
		expectedSalary  : String,
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

module.exports = mongoose.model("candidatemasters", candidateSchema);