const mongoose	=	require('mongoose');
const mongodb	=	require('mongodb');
const Jobs 		=	require('./ModelJobPost.js');
var ObjectID 	= 	require('mongodb').ObjectID;

exports.insertJobs = (req, res, next)=>{

		const jobsData = new Jobs({
			
			"_id" 			: 	new mongoose.Types.ObjectId(),
			
			"company_id"	: 	req.body.company_id,
			
			"jobBasicInfo" 	: 	{
									"jobTitle"				: req.body.jobTitle,
									"industry_id"			: req.body.industry_id,
									"functionalarea_id" 	: req.body.functionalarea_id,
									"subfunctionalarea_id"	: req.body.subfunctionalarea_id,
									"role"					: req.body.role,
									"gender"				: req.body.gender,
									"workFromHome" 			: req.body.workFromHome,
									"jobtype_id" 			: req.body.jobtype_id,
									"jobtime_id" 			: req.body.jobtime_id,
									"jobcategory_id" 		: req.body.jobcategory_id,
									"positions" 			: req.body.positions,
									"jobDesc" 				: req.body.jobDesc,
									"lastDateOfAppl" 		: new Date(req.body.lastDateOfAppl),
									
									"contactPersonName" 	: req.body.contactPersonName,
									"contactPersonEmail" 	: req.body.contactPersonEmail,
									"contactPersonPhone" 	: req.body.contactPersonPhone,
								},
			"location" 		: 	{
									"address" 				: req.body.address,
									"area" 					: req.body.area,
									"cityVillage"  			: req.body.city,
									"district" 				: req.body.district,
									"state" 				: req.body.state,
									"stateCode" 			: req.body.stateCode,	
									"country" 				: req.body.country,
									"countryCode" 			: req.body.countryCode,
									"pincode" 	 			: req.body.pincode
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

	Jobs.aggregate([
        {$match:{"_id": ObjectID(req.params.job_id)} },
        
        {$lookup:{
                   from: "functionalareamaster",
                   localField: "jobBasicInfo.functionalArea",
                   foreignField: "_id",
                   as: "functionalAreas" } 
        },
        {$lookup:{
                   from: "subfunctionalareamaster",
                   localField: "jobBasicInfo.subFunctionalArea",
                   foreignField: "_id",
                   as: "subFunctionalAreas" } 
         },   
         {$lookup:{
                   from: "jobtypemaster",
                   localField: "jobBasicInfo.jobType",
                   foreignField: "_id",
                   as: "jobTypes" } 
         }
         ])
    	.exec()
		
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
	
	Jobs.aggregate([
		{$lookup:{
                   from: "industrymaster",
                   localField: "jobBasicInfo.industry_id",
                   foreignField: "_id",
                   as: "functionalAreas" } 
        },
        {$lookup:{
                   from: "functionalareamaster",
                   localField: "jobBasicInfo.functionalarea_id",
                   foreignField: "_id",
                   as: "functionalAreas" } 
        },
        {$lookup:{
                   from: "subfunctionalareamaster",
                   localField: "jobBasicInfo.subfunctionalarea_id",
                   foreignField: "_id",
                   as: "subFunctionalAreas" } 
        },   
        {$lookup:{
                   from: "jobtypemaster",
                   localField: "jobBasicInfo.jobtype_id",
                   foreignField: "_id",
                   as: "jobTypes" } 
        },
        {$lookup:{
                   from: "jobtypemaster",
                   localField: "jobBasicInfo.jobtime_id",
                   foreignField: "_id",
                   as: "jobTypes" } 
        },
        {$lookup:{
                   from: "jobtypemaster",
                   localField: "jobBasicInfo.jobcategory_id",
                   foreignField: "_id",
                   as: "jobTypes" } 
        }
        ])
    	.exec()
		.then(jobList=> {
							res.status(200).json(jobList);			
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
			
			"jobBasicInfo" 	: 	{
									"jobTitle"				: req.body.jobTitle,
									"industry_id"			: req.body.industry_id,
									"functionalarea_id" 	: req.body.functionalarea_id,
									"subfunctionalarea_id"	: req.body.subfunctionalarea_id,
									"role"					: req.body.role,
									"gender"				: req.body.gender,
									"workFromHome" 			: req.body.workFromHome,
									"jobtype_id" 			: req.body.jobtype_id,
									"jobtime_id" 			: req.body.jobtime_id,
									"jobcategory_id" 		: req.body.jobcategory_id,
									"positions" 			: req.body.positions,
									"jobDesc" 				: req.body.jobDesc,
									"lastDateOfAppl" 		: new Date(req.body.lastDateOfAppl),
									
									"contactPersonName" 	: req.body.contactPersonName,
									"contactPersonEmail" 	: req.body.contactPersonEmail,
									"contactPersonPhone" 	: req.body.contactPersonPhone,
								},
			"location" 		: 	{
									"address" 				: req.body.address,
									"area" 					: req.body.area,
									"cityVillage"  			: req.body.city,
									"district" 				: req.body.district,
									"state" 				: req.body.state,
									"stateCode" 			: req.body.stateCode,	
									"country" 				: req.body.country,
									"countryCode" 			: req.body.countryCode,
									"pincode" 	 			: req.body.pincode
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


exports.mapwiseJobs = (req, res, next)=>{
	console.log("req.body - ", req.body);
	var selector = {}; 
	var industry_ids = [];
    var funarea_ids = [];

    selector['$and']=[];
    selector["$and"].push({ "location.countryCode" :  req.body.countryCode   })
   	

    if (req.body.industry_id) {
    	req.body.industry_id.map(elem => {
    		industry_ids.push(ObjectID(elem.id))
    	})
    	selector["$and"].push({ "jobBasicInfo.industry_id" : { $in: industry_ids } });
    }
    if (req.body.funarea_id) {
    	req.body.funarea_id.map(elem => {
    		funarea_ids.push(ObjectID(elem.id))
    	})
    	selector["$and"].push({ "jobBasicInfo.functionalarea_id" : { $in: funarea_ids } });
    }
    console.log(JSON.stringify(selector))

    Jobs.aggregate([
    	{ $match 	: selector },
    	{ $sort 	: {createdAt : -1} },
    	{ $group 	: {_id: "$location.state", count: { $sum: 1}} },
    ])
    
    .exec()
    .then(data=>{
        res.status(200).json(data);
    })
    .catch(err =>{
    	console.log(err.response)
        res.status(500).json({
            error: err
        });
    });
}

exports.functonalAreaJobs = (req, res, next)=>{
	console.log("req.body - ", req.body);
	var selector = {}; 
    var industry_ids = [];
    var funarea_ids = [];

    selector['$and']=[];
    selector["$and"].push({ "location.countryCode" :  req.body.countryCode })
   	
    if (req.body.industry_id) {
    	req.body.industry_id.map(elem => {
    		industry_ids.push(ObjectID(elem.id))
    	})
    	selector["$and"].push({ "jobBasicInfo.industry_id" : { $in: industry_ids } });
    }
    if (req.body.funarea_id) {
    	req.body.funarea_id.map(elem => {
    		funarea_ids.push(ObjectID(elem.id))
    	})
    	selector["$and"].push({ "jobBasicInfo.functionalarea_id" : { $in: funarea_ids } });
    }
    

    console.log(JSON.stringify(selector))

    Jobs.aggregate([
    	{ $match 	: selector },
    	{ $sort 	: {createdAt : -1} },
    	{ $group 	: {_id: "$jobBasicInfo.functionalarea_id", count: { $sum: 1}} },
    	{ $lookup 	: {from: "functionalareamasters", localField: "_id", foreignField: "_id", as: "functionalarea"}}
    ])
	.exec()
    .then(data=>{
        res.status(200).json(data);
    })
    .catch(err =>{
    	console.log(err.response)
        res.status(500).json({
            error: err
        });
    });
}

exports.subfunctionalAreaJobs = (req, res, next)=>{
	console.log("req.body - ", req.body);
	var selector = {}; 
	var industry_ids = [];
    var funarea_ids = [];

    selector['$and']=[];
    selector["$and"].push({ "location.countryCode" :  req.body.countryCode })
   	
    console.log(JSON.stringify(selector))

    if (req.body.industry_id) {
    	req.body.industry_id.map(elem => {
    		industry_ids.push(ObjectID(elem.id))
    	})
    	selector["$and"].push({ "jobBasicInfo.industry_id" : { $in: industry_ids } });
    }
    if (req.body.funarea_id) {
    	req.body.funarea_id.map(elem => {
    		funarea_ids.push(ObjectID(elem.id))
    	})
    	selector["$and"].push({ "jobBasicInfo.functionalarea_id" : { $in: funarea_ids } });
    }
    
    Jobs.aggregate([
    	{ $match 	: selector },
    	{ $sort 	: {createdAt : -1} },
    	{ $group 	: {_id: "$jobBasicInfo.subfunctionalarea_id", count: { $sum: 1}} },
    	{ $lookup 	: {from: "subfunctionalareamasters", localField: "_id", foreignField: "_id", as: "subfunctionalarea"}}
    ])

    .sort({createdAt : -1})
    .exec()
    .then(data=>{
        res.status(200).json(data);
    })
    .catch(err =>{
    	console.log(err.response)
        res.status(500).json({
            error: err
        });
    });
}
exports.industrialJobs = (req, res, next)=>{
	console.log("req.body - ", req.body);
	var selector = {}; 
	var industry_ids = [];
    var funarea_ids = [];

    selector['$and']=[];
    selector["$and"].push({ "location.countryCode" :  req.body.countryCode })
   	
    console.log(JSON.stringify(selector))

    if (req.body.industry_id) {
    	req.body.industry_id.map(elem => {
    		industry_ids.push(ObjectID(elem.id))
    	})
    	selector["$and"].push({ "jobBasicInfo.industry_id" : { $in: industry_ids } });
    }
    if (req.body.funarea_id) {
    	req.body.funarea_id.map(elem => {
    		funarea_ids.push(ObjectID(elem.id))
    	})
    	selector["$and"].push({ "jobBasicInfo.functionalarea_id" : { $in: funarea_ids } });
    }
    
    Jobs.aggregate([
    	{ $match 	: selector },
    	{ $sort 	: {createdAt : -1} },
    	{ $group 	: {_id: "$jobBasicInfo.industry_id", count: { $sum: 1}} },
    	{ $lookup 	: {from: "industrymasters", localField: "_id", foreignField: "_id", as: "industry"}}
    ])

    .sort({createdAt : -1})
    .exec()
    .then(data=>{
        res.status(200).json(data);
    })
    .catch(err =>{
    	console.log(err.response)
        res.status(500).json({
            error: err
        });
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