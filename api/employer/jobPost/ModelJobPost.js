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
							role					: String,
							gender              	: String,
							workFromHome 			: Boolean,
							jobtype_id 				: String,
							jobtime_id 				: String,
							jobcategory_id			: String,
							positions 				: Number,
							jobDesc 				: String,
							lastDateOfAppl 			: Date,
							contactPersonName 		: String,
							contactPersonEmail 		: String,
							contactPersonPhone 		: String,
							
						},
	location 		: 	{
							address 				: String,
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
							primarySkills 			: Array,
							minPrimExp				: String,
							secondarySkills 		: Array,
							minSecExp 				: String,
							otherSkills				: Array,
							minOtherExp 			: String,
							preferredSkills 		: Array,
					 	},
	
	createdAt 		: 	Date,
	createdBy 		: 	String,
	updateLog 		: 	[
							{updatedBy: String, updatedAt:Date, remark:String}
						]
});

module.exports = mongoose.model("jobs", jobsSchema);
