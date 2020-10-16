const mongoose = require('mongoose');
const mongodb = require('mongodb');


const Jobs 		= require('./ModelJobPost.js');

exports.insertJobs = (req, res, next)=>{
	

		const jobsData = new Jobs({
			"_id" : new mongoose.Types.ObjectId(),
			"company_id": req.body.company_id,
			"jobBasicInfo" : {
				"jobTitle"				: req.body.jobTitle,
				"jobLocationCity"		: req.body.jobLocationCity,
				"jobLocationCountry" 	: req.body.jobLocationCountry,
				"industryId"			: req.body.industryId,
				"functionalAreaId" 		: req.body.functionalAreaId,
				"subFunctionalAreaId"	: req.body.subFunctionalAreaId,
				"workFromHome" 			: req.body.workFromHome,
				"contactPersonName" 	: req.body.contactPersonName,
				"contactPersonEmail" 	: req.body.contactPersonEmail,
				"contactPersonPhone" 	: req.body.contactPersonPhone,
				"jobType" 				: req.body.jobType,
				"jobTime" 				: req.body.jobTime,
				"lastDateOfAppl" 		: new Date(),
				"jobDesc" 				: req.body.jobDesc,
			},
			"CTCOffered" : {
				"minCTC" 		: req.body.minCTC,
				"maxCTC" 		: req.body.maxCTC,
				"currency" 		: req.body.currency,
			},
			"eligibility" : {
				"minEducation" 	: req.body.minEducation,
				"minExperience" : req.body.minExperience,
			},
			"requiredSkills":{
				"primarySkills" 	: req.body.primarySkills,
				"primarySkillsExp" 	: req.body.primarySkillsExp,
				"secondarySkills" 	: req.body.secondarySkills,
				"secondarySkillsExp": req.body.secondarySkillsExp,
				"otherSkills"		: req.body.otherSkills,
				"otherSkillsExp" 	: req.body.otherSkillsExp,
				"preferredSkills" 	: req.body.preferredSkills,
			},
			"createdAt" : new Date(),
			"createdBy" : req.body.user_id,
			"updateLog" : [
				{"updatedBy": req.body.user_id, "updatedAt":new Date(), "remark":req.body.remark }
			]
			});
		

		jobsData.save()
				.then(data => {
				res.status(200).json({							
					message	: "Job details Inserted Successfully",
				});
			})
			.catch(error=>{
				console.log(error);
				res.status(500).json({
					error 	: error,
					message : "Some issue occurred during Insert Jobs."
				});
			});
		
}
exports.getJobs = (req,res,next)=>{
	var job_id = req.body.job_id;

	Jobs.findOne({_id : job_id})
		.then(job => {
			res.status(200).json({	
				job 	: job,
				message	: "Job Details Found",
			});			
		})
		.catch(error=>{
			console.log(error);
			res.status(500).json({
				error 	: error,
				message : "Some issue occurred finding Job Details"
			});
		});
}

exports.getJobList = (req,res,next)=>{
	Jobs.find({company_id: req.body.company_id})
		.then(jobList => {
			res.status(200).json({	
				jobList : jobList,
				message	 : "Jobs Found",
			});			
		})
		.catch(error=>{
			console.log(error);
			res.status(500).json({
				error 	: error,
				message : "Some issue occurred finding Job List"
			});
		});
}
exports.updateJob = (req,res,next)=>{
	console.log("req.body - ", req.body);
	Jobs.updateOne(
					{_id : req.body.job_id},
					{$set : {
						"company_id"		: req.body.company_id,
						"jobBasicInfo" 		: {
						"jobTitle"			: req.body.jobTitle,
						"jobLocationCity"	: req.body.jobLocationCity,
						"jobLocationCountry": req.body.jobLocationCountry,
						"jobGeoLocation" 	: {
												"lat": req.body.lat,
												"long": req.body.long,
										      },
							"workFromHome" 		: req.body.workFromHome,
							"contactPersonName" : req.body.contactPersonName,
							"contactPersonEmail": req.body.contactPersonEmail,
							"contactPersonPhone": req.body.contactPersonPhone,
							"jobType" 			: req.body.jobType,
							"jobTime" 			: req.body.jobTime,
							"jobDesc" 			: req.body.jobDesc,
						},
						"CTCOffered" 		: {
							"minCTC" 		: req.body.minCTC,
							"maxCTC" 		: req.body.maxCTC,
							"currency" 		: req.body.currency,
						},
						"eligibility" 		: {
							"minEducation" 	: req.body.minEducation,
							"minExperience" : req.body.minExperience,
						},
						"requiredSkills":{
							"primarySkills" 	: req.body.primarySkills,
							"primarySkillsExp" 	: req.body.primarySkillsExp,
							"secondarySkills" 	: req.body.secondarySkills,
							"minExperience" 	: req.body.minExperience,
							"otherSkills"		: req.body.otherSkills,
							"minExperience" 	: req.body.minExperience,
							"preferredSkills" 	: req.body.preferredSkills,
						},
						"updateLog" : [
							{"updatedBy": req.body.user_id, "updatedAt":new Date(), "remark":req.body.remark }
						]
			}}
	
				)
				.then(data => {
					res.status(200).json({
						data : data,
						message : "Job details updated Successfully!"
					});
				})
				.catch(error=>{
					console.log(error);
					res.status(500).json({
						error : error,
						message : "Some issue occurred while updating Job details!"
					})
				});
}

exports.deleteJob = (req,res,next)=>{
	console.log("req.body - ", req.body);
	StudentMaster.deleteOne({_id : req.body.job_id})
				.then(data => {
					res.status(200).json({
						data : data,
						message : "Job details deleted Successfully!"
					});
				})
				.catch(error=>{
					res.status(500).json({
						error : error,
						message : "Some issue occurred while deleting job details!"
					})
				});
}

