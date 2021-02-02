const mongoose = require('mongoose');
mongoose.pluralize(null);

const candidateSchema = mongoose.Schema({
	_id : mongoose.Schema.Types.ObjectId,
	basicInfo : {
		firstName		: String,
		middleName		: String,
		lastName 		: String,
		dob 			: Date,
		gender			: String,
		maritalStatus	: String,
		anniversaryDate	: Date,
		nationality 	: String,
		profilePicture  : String,
		resume 			: String,
		executiveSummary: String
	},
	languagesKnown		: [{
						language_id : { type: mongoose.Schema.Types.ObjectId, ref: 'languagemasters' }
						}],
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
	skills 	: [{ 	skill_id 	: {type: mongoose.Schema.Types.ObjectId, ref: 'skillmasters'}, 
					skillType 	: String,			
					rating  	: String 
			}],
	certifications : [{
		certName		: String,
		issuedBy   		: String,
		certifiedOn 	: Date,
		validTill		: Date,
		gradePercent	: String,
	}],
	workExperience:[{
		industry_id 	: { type: mongoose.Schema.Types.ObjectId, ref: 'industrymasters' },
		company_id 		: { type: mongoose.Schema.Types.ObjectId, ref: 'entitymasters' },
		countryCode     : String,
        country         : String,
        stateCode       : String,
        state           : String,
        district        : String,
		lastDegn		: String,
		department		: String,
		fromDate 		: Date, 
		toDate  		: Date,
		relevantExperience : Number,
		responsibilities			: String,
		reportingManager			: String,
		reportingManagerDegn  		: String,
	}],
	totalExperience 	: Number,
	noticePeriod    	: String,
	currentCTC 			: String,
	expectedCTC  		: String,
	user_id	  			: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
	createdAt 			: Date,
	createdBy 			: String,
	updateLog : [
		{updatedBy : String, updatedAt : Date, remark : String }
	]
});

module.exports = mongoose.model("candidatemasters", candidateSchema);