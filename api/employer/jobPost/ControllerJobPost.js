const mongoose	=	require('mongoose');
const mongodb	=	require('mongodb');
const Jobs 		=	require('./ModelJobPost.js');

exports.insertJobs = (req, res, next)=>{

		const jobsData = new Jobs({
			
			"_id" 			: 	new mongoose.Types.ObjectId(),
			
			"company_id"	: 	req.body.company_id,
			
			"jobBasicInfo" 	: 	{
									"jobTitle"				: req.body.jobTitle,
									"jobLocationCity"		: req.body.jobLocationCity,
									"jobLocationCountry" 	: req.body.jobLocationCountry,
									/*"industryId"			: req.body.industryId,*/
									/*"functionalAreaId" 		: req.body.functionalAreaId,*/
									"functionalArea" 		: req.body.functionalArea,
									/*"subFunctionalAreaId"	: req.body.subFunctionalAreaId,*/
									"subFunctionalArea" 	: req.body.subFunctionalArea,
									"role"					: req.body.role,
									"gender"				: req.body.gender,
									"workFromHome" 			: req.body.workFromHome,
									"contactPersonName" 	: req.body.contactPersonName,
									"contactPersonEmail" 	: req.body.contactPersonEmail,
									"contactPersonPhone" 	: req.body.contactPersonPhone,
									"jobType" 				: req.body.jobType,
									"jobTime" 				: req.body.jobTime,
									"lastDateOfAppl" 		: new Date(req.body.lastDateOfAppl),
									"jobDesc" 				: req.body.jobDesc,
								},
			
			"ctcOffered" 	: 	{
									"minSalary" 	: req.body.minSalary,
									"minSalPeriod" 	: req.body.minSalPeriod,
									"maxSalary" 	: req.body.maxSalary,
									"maxSalPeriod" 	: req.body.maxSalPeriod,
								},
			
			"eligibility" 	: 	{
									"minEducation" 	: req.body.minEducation,
									"minExperience" : req.body.minExperience,
								},
			
			"requiredSkills": 	{
									"primarySkills" 	: req.body.primarySkills,
									"minPrimExp"		: req.body.minPrimExp,
									"secondarySkills" 	: req.body.secondarySkills,
									"minSecExp"			: req.body.minSecExp,
									"otherSkills"		: req.body.otherSkills,
									"minOtherExp" 	  	: req.body.minOtherExp,
									"preferredSkills" 	: req.body.preferredSkills,
								},
			
			"createdAt" 	: 	new Date(),
			"createdBy" 	: 	req.body.user_id,
			"updateLog" 	: 	[
									{"updatedBy": req.body.user_id, "updatedAt":new Date(), "remark":req.body.remark }
								]
			});
		
		jobsData.save()
				
				.then(jobsData=> {
					res.status(200).json({
											jobsData : jobsData,							
											message	 : "Job details Inserted Successfully",
										});
								  })
				
				.catch(error=> {
					console.log(error);
					res.status(500).json({
											error 	: error,
											message : "Some issue occurred during Insert Jobs."
										});
								});	
	}

exports.getJob = (req,res,next)=>{
	var job_id = req.params.job_id;

	Jobs.findOne({_id : job_id})
		
		.then(jobsData=> {
							res.status(200).json({	
								jobsData 	: jobsData,
								message	: "Job Details Found",
							});			
						})
		
		.catch(error=> {
			console.log(error);
			res.status(500).json({
									error 	: error,
									message : "Some issue occurred finding Job Details"
								});
						});
}

exports.getJobList = (req,res,next)=>{
	
	Jobs.find({company_id: req.body.company_id})
		
		.then(jobList=> {
							res.status(200).json({	
								jobList  : jobList,
								message	 : "Jobs Found",
						});			
					})
		.catch(error=> {
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
					{$set 	: 	{
									"company_id"	: 	req.body.company_id,
									"jobBasicInfo" 	:   {
															"jobTitle"			: req.body.jobTitle,
															"jobLocationCity"	: req.body.jobLocationCity,
															"jobLocationCountry": req.body.jobLocationCountry,
															"functionalArea"	: req.body.functionalArea,
															"subFunctionalArea"	: req.body.subFunctionalArea,
															"role"				: req.body.role,	
															"gender"            : req.body.gender,
															"workFromHome" 		: req.body.workFromHome,
															"jobGeoLocation" 	: 	{
																						"lat": req.body.lat,
																						"long": req.body.long,
																				    },
															"contactPersonName" : req.body.contactPersonName,
															"contactPersonEmail": req.body.contactPersonEmail,
															"contactPersonPhone": req.body.contactPersonPhone,
															"jobType" 			: req.body.jobType,
															"jobTime" 			: req.body.jobTime,
															"lastDateOfAppl" 	: new Date(req.body.lastDateOfAppl),
															"jobDesc" 			: req.body.jobDesc,
														},
						
									"CTCOffered" 	:   {
															"minSalary" 	: req.body.minSalary,
															"minSalPeriod" 	: req.body.minSalPeriod,
															"maxSalary" 	: req.body.maxSalary,
															"maxSalPeriod" 	: req.body.maxSalPeriod,
														},
						
									"eligibility" 	: 	{
															"minEducation" 	: req.body.minEducation,
															"minExperience" : req.body.minExperience,
														},
						
									"requiredSkills": 	{
															"primarySkills" 	: req.body.primarySkills,
															"minPrimExp" 	    : req.body.minPrimExp,
															"secondarySkills" 	: req.body.secondarySkills,
															"minSecExp" 		: req.body.minSecExp,
															"otherSkills"		: req.body.otherSkills,
															"minOtherExp"		: req.body.minOtherExp,
															"preferredSkills" 	: req.body.preferredSkills,
														},
						
									"updateLog" : 	[
														{"updatedBy": req.body.user_id, "updatedAt":new Date(), "remark":req.body.remark }
													]
					}}
				)
				
		.then(data=> {
			res.status(200).json({
									data : data,
									message : "Job details updated Successfully!"
								});
					  })
		
		.catch(error=> {
			console.log(error);
			res.status(500).json({
									error : error,
									message : "Some issue occurred while updating Job details!"
								})
					  	});
	}

exports.deleteJob = (req, res, next)=>{
	console.log("req.body - ", req.body);
	var job_id = req.params.job_id;
	Jobs.deleteOne({"_id" : job_id})	
				.then(data=> {
					res.status(200).json({
											data : data,
											message : "Job details deleted Successfully!"
										});
							  })
				
				.catch(error=> {
					res.status(500).json({
											error : error,
											message : "Some issue occurred while deleting job details!"
										})
							  	});
}

exports.getSearchList = (req,res,next)=>{
	const searchTxt = req.params.searchTxt;
	if(searchTxt !== ""){
		const pattern = new RegExp("^"+searchTxt) ;
		const selector1 = {/*elem.jobBasicInfo.*/jobTitle : {$regex: pattern, $options: "i" }  };
		/*const selector2 = {companyName : {$regex: pattern, $options: "i" }  };*/

		const selector = {$or: [selector1]};

		console.log("selector = ", selector);

		Jobs.find(selector)
					.then(jobList => {
						res.status(200).json({
							jobList : jobList
						})
					})
					.catch(error=>{
						res.status(500).json({
							error : error,
							message : "Some issue occurred during Get List!"
						})
					});
	}
}