const mongoose = require('mongoose');
mongoose.pluralize(null);

const jobsSchema = mongoose.Schema({
	_id 			: 	mongoose.Schema.Types.ObjectId,
	company_id 		: 	{ type: mongoose.Schema.Types.ObjectId, ref: 'entitymasters' },
	jobBasicInfo 	: 	{ 
							jobTitle				: String,
							industry_id 		 	: { type: mongoose.Schema.Types.ObjectId, ref: 'industrymasters' },
							functionalarea_id 	 	: { type: mongoose.Schema.Types.ObjectId, ref: 'functionalareamasters' },
							subfunctionalarea_id 	: { type: mongoose.Schema.Types.ObjectId, ref: 'subfunctionalareamasters' },
							jobrole_id				: { type: mongoose.Schema.Types.ObjectId, ref: 'jobrolemasters' },
							gender              	: String,
							workFromHome 			: Boolean,
							jobtype_id 				: { type: mongoose.Schema.Types.ObjectId, ref: 'jobtypemasters' },
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
							minEducation 			: String,
							minExperience   		: String,
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
	
	createdAt 		: 	Date,
	createdBy 		: 	String,
	updateLog 		: 	[
							{updatedBy: String, updatedAt:Date, remark:String}
						]
});

module.exports = mongoose.model("jobs", jobsSchema);
