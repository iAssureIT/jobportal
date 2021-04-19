const mongoose = require('mongoose');
mongoose.pluralize(null);

const jobsSchema = mongoose.Schema({
	_id 			: 	mongoose.Schema.Types.ObjectId,
	jobID 			: 	Number,
	company_id 		: 	{ type: mongoose.Schema.Types.ObjectId, ref: 'entitymasters' },
	jobBasicInfo 	: 	{ 
							jobTitle				: String,
							industry_id 		 	: { type: mongoose.Schema.Types.ObjectId, ref: 'industrymasters' },
							functionalarea_id 	 	: { type: mongoose.Schema.Types.ObjectId, ref: 'functionalareamasters' },
							subfunctionalarea_id 	: { type: mongoose.Schema.Types.ObjectId, ref: 'subfunctionalareamasters' },
							jobrole_id				: { type: mongoose.Schema.Types.ObjectId, ref: 'jobrolemasters' },
							gender              	: String,
							workFromHome 			: Boolean,
							jobsector_id 			: { type: mongoose.Schema.Types.ObjectId, ref: 'jobsectormasters' },
							jobtype_id 				: { type: mongoose.Schema.Types.ObjectId, ref: 'jobtypemasters' },
							jobshift_id 			: { type: mongoose.Schema.Types.ObjectId, ref: 'jobshiftmasters' },
							jobtime_id 				: { type: mongoose.Schema.Types.ObjectId, ref: 'jobtimemasters' },
							jobcategory_id			: { type: mongoose.Schema.Types.ObjectId, ref: 'jobcategorymasters' },
							positions 				: Number,
							jobDesc 				: String,
							lastDateOfAppl 			: Date,
							contactPersonName 		: String,
							contactPersonEmail 		: String,
							contactPersonPhone 		: String,	
						},
	location 		: 	{
							address 			    : String,			
							area 					: String,
							cityVillage  			: String,
							district 				: String,
							state 					: String,
							stateCode 				: String,	
							country 				: String,
							countryCode 			: String,
							pincode 	 			: String, 	
						},
	ctcOffered  	: 	{
							minSalary 	 			: Number,
							minSalPeriod 			: String,
							maxSalary 	 			: Number,
							maxSalPeriod 			: String
				 		},
	
	eligibility 	: 	{
							mineducation_id 		: { type: mongoose.Schema.Types.ObjectId, ref: 'qualificationmasters' },
							minExperience   		: Number,
				  		}, 
	
	requiredSkills  : 	{
							primarySkills 			: [{
								skill_id : { type: mongoose.Schema.Types.ObjectId, ref: 'skillmasters' }
							}],
							minPrimExp				: String,
							secondarySkills 		: [{
								skill_id : { type: mongoose.Schema.Types.ObjectId, ref: 'skillmasters' }
							}],
							minSecExp 				: String,
							otherSkills				: [{
								skill_id : { type: mongoose.Schema.Types.ObjectId, ref: 'skillmasters' }
							}],
							minOtherExp 			: String,
							preferredSkills 		: [{
								skill_id : { type: mongoose.Schema.Types.ObjectId, ref: 'skillmasters' }
							}],
					 	},
	status			: 	String,
	applicantStatistics :
						{

							male 		: Number,
							female 		: Number,
							other 		: Number,
							district 	: Number,
							state 		: Number,
							country 	: Number,
							exp0to2 	: Number,
							exp2to6 	: Number,
							exp6to10 	: Number,
							total 		: Number
						},
	createdAt 		: 	Date,
	createdBy 		: 	String,
	fileName        : 	String,
    uploadTime      : 	Date,
	updateLog 		: 	[
							{updatedBy: String, updatedAt:Date, remark:String}
						]
});

module.exports = mongoose.model("jobs", jobsSchema);
