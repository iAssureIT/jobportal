const mongoose	=	require('mongoose');
const mongodb	=	require('mongodb');
const Jobs 		=	require('./ModelJobPost.js');
const FunctionalAreaMaster 		= require('../../coreAdmin/FunctionalAreaMaster/ModelFunctionalAreaMaster.js');
const SubFunctionalAreaMaster 	= require('../../coreAdmin/SubFunctionalAreaMaster/ModelSubFunctionalAreaMaster.js');
const JobCategoryMaster 		= require('../../coreAdmin/JobCategoryMaster/ModelJobCategory.js');
const JobRoleMaster 			= require('../../coreAdmin/JobRoleMaster/ModelJobRole.js');
const JobTypeMaster 			= require('../../coreAdmin/JobTypeMaster/ModelJobType.js');
const JobTimeMaster 			= require('../../coreAdmin/JobTimeMaster/ModelJobTime.js');
const SkillMaster           	= require('../../coreAdmin/SkillMaster/ModelSkill.js');

var ObjectID 	= 	require('mongodb').ObjectID;

exports.insertJobs = (req, res, next)=>{
		console.log(req.body)	
		var functionalarea_id, subfunctionalarea_id, jobcategory_id, jobrole_id, jobtype_id, jobtime_id;
		var primarySkills   = [];
	    var secondarySkills = [];
	    var otherSkills 	= [];
	    var preferredSkills = [];
	    var skill_id; 

		processData();
    	async function processData(){
    		functionalarea_id  		= req.body.functionalarea_id != "" ? req.body.functionalarea_id 
    							: await insertFunctArea(req.body.functionalArea,req.body.user_id)
			
			subfunctionalarea_id  	= req.body.subfunctionalarea_id != "" ? req.body.subfunctionalarea_id 
    							: await insertSubFunctArea(functionalarea_id, req.body.subFunctionalArea,req.body.user_id)
			
			jobcategory_id  		= req.body.jobcategory_id != "" ? req.body.jobcategory_id 
    							: await insertJobCategory(req.body.jobCategory,req.body.user_id)
			
			jobrole_id  			= req.body.jobrole_id != "" ? req.body.jobrole_id 
    							: await insertJobRole(req.body.jobRole,req.body.user_id)
			
			jobtype_id  			= req.body.jobtype_id != "" ? req.body.jobtype_id 
    							: await insertJobType(req.body.jobType,req.body.user_id)

			jobtime_id  			= req.body.jobtime_id != "" ? req.body.jobtime_id 
    							: await insertJobTime(req.body.jobTime,req.body.user_id)
		
    			
    		for (var i = 0 ; i < req.body.primarySkillTags.length; i++) {
                skill_id = req.body.primarySkillTags[i].id != "" ? req.body.primarySkillTags[i].id
                                    : await insertSkill(req.body.primarySkillTags[i].text, req.body.user_id)
                    
                primarySkills.push({ "skill_id" : skill_id })
            }	
            for (var i = 0 ; i < req.body.secondarySkillTags.length; i++) {
                skill_id = req.body.secondarySkillTags[i].id != "" ? req.body.secondarySkillTags[i].id
                                    : await insertSkill(req.body.secondarySkillTags[i].text, req.body.user_id)
                    
                secondarySkills.push({ "skill_id" : skill_id })
            }
            for (var i = 0 ; i < req.body.otherSkillTags.length; i++) {
                skill_id = req.body.otherSkillTags[i].id != "" ? req.body.otherSkillTags[i].id
                                    : await insertSkill(req.body.otherSkillTags[i].text, req.body.user_id)
                    
                otherSkills.push({ "skill_id" : skill_id })
            }		
            for (var i = 0 ; i < req.body.preferredSkillTags.length; i++) {
                skill_id = req.body.preferredSkillTags[i].id != "" ? req.body.preferredSkillTags[i].id
                                    : await insertSkill(req.body.preferredSkillTags[i].text, req.body.user_id)
                    
                preferredSkills.push({ "skill_id" : skill_id })
            }	
		const jobsData = new Jobs({
			
			"_id" 			: 	new mongoose.Types.ObjectId(),
			
			"company_id"	: 	req.body.company_id,
			
			"jobBasicInfo" 	: 	{
									"jobTitle"				: req.body.jobTitle,
									"industry_id"			: req.body.industry_id,
									"functionalarea_id" 	: functionalarea_id,
									"subfunctionalarea_id"	: subfunctionalarea_id,
									"jobrole_id"			: jobrole_id,
									"gender"				: req.body.gender,
									"workFromHome" 			: req.body.workFromHome,
									"jobtype_id" 			: jobtype_id,
									"jobtime_id" 			: jobtime_id,
									"jobcategory_id" 		: jobcategory_id,
									"positions" 			: req.body.positions,
									"jobDesc" 				: req.body.jobDesc,
									"lastDateOfAppl" 		: new Date(req.body.lastDateOfAppl),
									"contactPersonName" 	: req.body.contactPersonName,
									"contactPersonEmail" 	: req.body.contactPersonEmail,
									"contactPersonPhone" 	: req.body.contactPersonPhone
								},
			"location" 		: 	{
									"address" 				: req.body.address,
									"area" 					: req.body.area,
									"cityVillage"  			: req.body.cityVillage,
									"district" 				: req.body.district,
									"state" 				: req.body.states,
									"stateCode" 			: req.body.stateCode,	
									"country" 				: req.body.country,
									"countryCode" 			: req.body.countryCode,
									"pincode" 	 			: req.body.pincode
								},
			"ctcOffered" 	: 	{
									"minSalary" 	        : req.body.minSalary,
									"minSalPeriod" 	        : req.body.minSalPeriod,
									"maxSalary" 	        : req.body.maxSalary,
									"maxSalPeriod" 	        : req.body.maxSalPeriod,
								},
			
			"eligibility" 	: 	{
									"minEducation" 	        : req.body.minEducation,
									"minExperience"         : req.body.minExperience
								},
			
			"requiredSkills": 	{
									"primarySkills" 	    : primarySkills,
									"minPrimExp"		    : req.body.minPrimExp,
									"secondarySkills" 	    : secondarySkills,
									"minSecExp"			    : req.body.minSecExp,
									"otherSkills"		    : otherSkills,
									"minOtherExp" 	  	    : req.body.minOtherExp,
									"preferredSkills" 	    : preferredSkills
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
											created  : true,							
											message	 : "Job details Inserted Successfully",
										});
								  })
				
				.catch(error=> {
					console.log(error);
					res.status(500).json({
											error 	: error,
											created : false,
											message : "Some issue occurred during Insert Jobs."
										});
								});	
		}
}

function insertSkill(skill, createdBy){ 
    return new Promise(function(resolve,reject){ 
        const skillMaster = new SkillMaster({
                        _id                   : new mongoose.Types.ObjectId(),
                        skill                 : skill,
                        createdBy             : createdBy,
                        createdAt             : new Date()
                    })
                    skillMaster.save()
                    .then(data=>{
                        resolve( data._id );
                    })
                    .catch(err =>{
                        reject(err); 
                    });
    });
}

function insertFunctArea(functionalArea, createdBy){ 
    return new Promise(function(resolve,reject){ 
        const functionalAreaMaster = new FunctionalAreaMaster({
                        _id                         : new mongoose.Types.ObjectId(),
                        functionalArea              : functionalArea,
                        iconUrl						: "",
                        createdBy                   : createdBy,
                        createdAt                   : new Date()
                    })
                    functionalAreaMaster.save()
                    .then(data=>{
                        resolve( data._id );
                    })
                    .catch(err =>{
                        reject(err); 
                    });
    });
}

function insertSubFunctArea(functionalarea_id, subFunctionalArea, createdBy){ 
    return new Promise(function(resolve,reject){ 
        const subFunctionalAreaMaster = new SubFunctionalAreaMaster({
                        _id                         : new mongoose.Types.ObjectId(),
                        functionalarea_id           : functionalarea_id,
                        subfunctionalArea			: subFunctionalArea,
                        createdBy                   : createdBy,
                        createdAt                   : new Date()
                    })
                    subFunctionalAreaMaster.save()
                    .then(data=>{
                        resolve( data._id );
                    })
                    .catch(err =>{
                        reject(err); 
                    });
    });
}

function insertJobCategory(jobCategory, createdBy){ 
    return new Promise(function(resolve,reject){ 
        const jobCategoryMaster = new JobCategoryMaster({
                        _id                         : new mongoose.Types.ObjectId(),
                        jobCategory           		: jobCategory,
                        createdBy                   : createdBy,
                        createdAt                   : new Date()
                    })
                    jobCategoryMaster.save()
                    .then(data=>{
                        resolve( data._id );
                    })
                    .catch(err =>{
                        reject(err); 
                    });
    });
}

function insertJobRole(jobRole, createdBy){ 
    return new Promise(function(resolve,reject){ 
        const jobRoleMaster = new JobRoleMaster({
                        _id                         : new mongoose.Types.ObjectId(),
                        jobRole           		    : jobRole,
                        createdBy                   : createdBy,
                        createdAt                   : new Date()
                    })
                    jobRoleMaster.save()
                    .then(data=>{
                        resolve( data._id );
                    })
                    .catch(err =>{
                        reject(err); 
                    });
    });
}

function insertJobType(jobType, createdBy){ 
    return new Promise(function(resolve,reject){ 
        const jobTypeMaster = new JobTypeMaster({
                        _id                         : new mongoose.Types.ObjectId(),
                        jobType           		    : jobType,
                        createdBy                   : createdBy,
                        createdAt                   : new Date()
                    })
                    jobTypeMaster.save()
                    .then(data=>{
                        resolve( data._id );
                    })
                    .catch(err =>{
                        reject(err); 
                    });
    });
}

function insertJobTime(jobTime, createdBy){ 
    return new Promise(function(resolve,reject){ 
        const jobTimeMaster = new JobTimeMaster({
                        _id                         : new mongoose.Types.ObjectId(),
                        jobTime           		    : jobTime,
                        createdBy                   : createdBy,
                        createdAt                   : new Date()
                    })
                    jobTimeMaster.save()
                    .then(data=>{
                        resolve( data._id );
                    })
                    .catch(err =>{
                        reject(err); 
                    });
    });
}

exports.getJob = (req,res,next)=>{
	var job_id = req.params.job_id;
    Jobs.findOne({"_id": ObjectID(req.params.job_id)})
    .populate('company_id')
    .populate('jobBasicInfo.industry_id')
    .populate('jobBasicInfo.functionalarea_id')
    .populate('jobBasicInfo.subfunctionalarea_id')
    .populate('jobBasicInfo.jobrole_id')
    .populate('jobBasicInfo.jobtype_id')
    .populate('jobBasicInfo.jobtime_id')
    .populate('jobBasicInfo.jobcategory_id')
    .populate('requiredSkills.primarySkills.skill_id')
    .populate('requiredSkills.secondarySkills.skill_id')
    .populate('requiredSkills.otherSkills.skill_id')
    .populate('requiredSkills.preferredSkills.skill_id')
    .exec(function (err, candidate) {
        console.log(err)
        if (err) return res.status(500).json({ error: err });
        res.status(200).json(candidate);
    });
}

exports.getJobList = (req,res,next)=>{
	var selector 		= {}; 
	var industry_ids 	= [];
    var funarea_ids 	= [];
    var subfunarea_ids 	= [];
    var jobroles_ids 	= [];

    selector['$and'] 	= [];
    selector["$and"].push({ "location.countryCode" :  req.body.countryCode   })
   	
    if (req.body.company_id) {
    	
    	selector["$and"].push({ "jobBasicInfo.company_id" : ObjectID(req.body.company_id)});
    }
    if (req.body.industry_id) {
    	req.body.industry_id.map(elem => {
    		industry_ids.push(ObjectID(elem.id))
    	})
    	selector["$and"].push({ "jobBasicInfo.industry_id" : { $in: industry_ids } });
    }
    if (req.body.functionalArea_id) {
    	req.body.functionalArea_id.map(elem => {
    		funarea_ids.push(ObjectID(elem.id))
    	})
    	selector["$and"].push({ "jobBasicInfo.functionalarea_id" : { $in: funarea_ids } });
    }
    if (req.body.subfunctionalArea_id) {
    	req.body.subfunctionalArea_id.map(elem => {
    		subfunarea_ids.push(ObjectID(elem.id))
    	})
    	selector["$and"].push({ "jobBasicInfo.subfunctionalarea_id" : { $in: subfunarea_ids } });
    }
    if (req.body.jobRoles_id) {
    	req.body.jobRoles_id.map(elem => {
    		jobroles_ids.push(ObjectID(elem.id))
    	})
    	selector["$and"].push({ "jobBasicInfo.jobrole_id" : { $in: jobroles_ids } });
    }

    console.log(JSON.stringify(selector))
    Jobs.find(selector)
    
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

exports.getJobListForEmployer = (req,res,next)=>{
	var selector 		= {}; 
	var industry_ids 	= [];
    var funarea_ids 	= [];
    var subfunarea_ids 	= [];
    var jobroles_ids 	= [];

    selector['$and'] 	= [];
    selector["$and"].push({ "location.countryCode" :  req.body.countryCode   })
   	
    if (req.body.company_id) {
    	selector["$and"].push({ "company_id" : ObjectID(req.body.company_id)});
    }
    if (req.body.industry_id) {
    	req.body.industry_id.map(elem => {
    		industry_ids.push(ObjectID(elem.id))
    	})
    	selector["$and"].push({ "jobBasicInfo.industry_id" : { $in: industry_ids } });
    }
    if (req.body.functionalArea_id) {
    	req.body.functionalArea_id.map(elem => {
    		funarea_ids.push(ObjectID(elem.id))
    	})
    	selector["$and"].push({ "jobBasicInfo.functionalarea_id" : { $in: funarea_ids } });
    }
    if (req.body.subfunctionalArea_id) {
    	req.body.subfunctionalArea_id.map(elem => {
    		subfunarea_ids.push(ObjectID(elem.id))
    	})
    	selector["$and"].push({ "jobBasicInfo.subfunctionalarea_id" : { $in: subfunarea_ids } });
    }
    if (req.body.jobRoles_id) {
    	req.body.jobRoles_id.map(elem => {
    		jobroles_ids.push(ObjectID(elem.id))
    	})
    	selector["$and"].push({ "jobBasicInfo.jobrole_id" : { $in: jobroles_ids } });
    }

    console.log(JSON.stringify(selector))

    Jobs.aggregate([
    	{ $match 	: selector },
    	{ $sort 	: {createdAt : -1} },
    	{$lookup:{
                   from: "entitymasters", 		localField: "company_id",
                   foreignField: "_id",		as: "employer" } 
        },
    	{ $lookup 	: { from: "industrymasters",
                   		localField: "jobBasicInfo.industry_id",
                   		foreignField: "_id",
                   		as: "industry"}
        },
        {$lookup:{
                   from: "functionalareamasters",
                   localField: "jobBasicInfo.functionalarea_id",
                   foreignField: "_id",
                   as: "functionalArea" } 
        },
        {$lookup:{
                   from: "subfunctionalareamasters",
                   localField: "jobBasicInfo.subfunctionalarea_id",
                   foreignField: "_id",
                   as: "subFunctionalArea" } 
        },   
        {$lookup:{
                   from: "jobrolemasters",
                   localField: "jobBasicInfo.jobrole_id",
                   foreignField: "_id",
                   as: "jobRole" } 
        },
        {$lookup:{
                   from: "jobtypemasters",
                   localField: "jobBasicInfo.jobtype_id",
                   foreignField: "_id",
                   as: "jobType" } 
        },
        {$lookup:{
                   from: "jobtimemasters",
                   localField: "jobBasicInfo.jobtime_id",
                   foreignField: "_id",
                   as: "jobTime" } 
        },
        {$lookup:{
                   from: "jobcategorymasters",
                   localField: "jobBasicInfo.jobcategory_id",
                   foreignField: "_id",
                   as: "jobCategory" } 
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
	var functionalarea_id, subfunctionalarea_id, jobcategory_id, jobrole_id, jobtype_id, jobtime_id;
		processData();
		async function processData(){
    		functionalarea_id  		= req.body.functionalarea_id != "" ? req.body.functionalarea_id 
    							: await insertFunctArea(req.body.functionalArea,req.body.user_id)
			
			subfunctionalarea_id  	= req.body.subfunctionalarea_id != "" ? req.body.subfunctionalarea_id 
    							: await insertSubFunctArea(functionalarea_id, req.body.subFunctionalArea,req.body.user_id)
			
			jobcategory_id  		= req.body.jobcategory_id != "" ? req.body.jobcategory_id 
    							: await insertJobCategory(req.body.jobCategory,req.body.user_id)
			
			jobrole_id  			= req.body.jobrole_id != "" ? req.body.jobrole_id 
    							: await insertJobRole(req.body.jobRole,req.body.user_id)
			
			jobtype_id  			= req.body.jobtype_id != "" ? req.body.jobtype_id 
    							: await insertJobType(req.body.jobType,req.body.user_id)

			jobtime_id  			= req.body.jobtime_id != "" ? req.body.jobtime_id 
    							: await insertJobTime(req.body.jobTime,req.body.user_id)
		
	Jobs.updateOne(
					{_id : req.body.job_id},
					{$set 	: 	{
									"company_id"	: 	req.body.company_id,
			
			"jobBasicInfo" 	: 	{
									"jobTitle"				: req.body.jobTitle,
									"industry_id"			: req.body.industry_id,
									"functionalarea_id" 	: functionalarea_id,
									"subfunctionalarea_id"	: subfunctionalarea_id,
									"jobrole_id"			: jobrole_id,
									"gender"				: req.body.gender,
									"workFromHome" 			: req.body.workFromHome,
									"jobtype_id" 			: jobtype_id,
									"jobtime_id" 			: jobtime_id,
									"jobcategory_id" 		: jobcategory_id,
									"positions" 			: req.body.positions,
									"jobDesc" 				: req.body.jobDesc,
									"lastDateOfAppl" 		: new Date(req.body.lastDateOfAppl),
									"contactPersonName" 	: req.body.contactPersonName,
									"contactPersonEmail" 	: req.body.contactPersonEmail,
									"contactPersonPhone" 	: req.body.contactPersonPhone
								},
			"location" 		: 	{
									"address" 				: req.body.address,
									"area" 					: req.body.area,
									"cityVillage"  			: req.body.cityVillage,
									"district" 				: req.body.district,
									"state" 				: req.body.states,
									"stateCode" 			: req.body.stateCode,	
									"country" 				: req.body.country,
									"countryCode" 			: req.body.countryCode,
									"pincode" 	 			: req.body.pincode
								},
			"ctcOffered" 	: 	{
									"minSalary" 	         : req.body.minSalary,
									"minSalPeriod" 	         : req.body.minSalPeriod,
									"maxSalary" 	         : req.body.maxSalary,
									"maxSalPeriod" 	         : req.body.maxSalPeriod
								},
			
			"eligibility" 	: 	{
									"minEducation" 	         : req.body.minEducation,
									"minExperience"          : req.body.minExperience
								},
			
			"requiredSkills": 	{
									"primarySkills" 	     : primarySkills,
									"minPrimExp"		     : req.body.minPrimExp,
									"secondarySkills" 	     : req.body.secondarySkills,
									"minSecExp"			     : req.body.minSecExp,
									"otherSkills"		     : otherSkills,
									"minOtherExp" 	  	     : req.body.minOtherExp,
									"preferredSkills" 	     : preferredSkills
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
}
exports.jobCount = (req, res, next)=>{
    //console.log("req.body - ", req.body);
    var selector = {}; 
    var industry_ids = [];
    var funarea_ids = [];

    selector['$and']=[];
   
    var countryCode = req.body.countryCode ? req.body.countryCode : "IN";
    selector["$and"].push({ "location.countryCode" :  countryCode   })
    
    if (req.body.stateCode) {
        selector["$and"].push({ "location.stateCode" :  req.body.stateCode   })
    }
    if (req.body.industry_id) {
        req.body.industry_id.map(elem => {
            industry_ids.push(ObjectID(elem.id))
        })
        selector["$and"].push({ "jobBasicInfo.industry_id" : { $in: industry_ids } });
    }
    if (req.body.functionalArea_id) {
        req.body.functionalArea_id.map(elem => {
            funarea_ids.push(ObjectID(elem.id))
        })
        selector["$and"].push({ "jobBasicInfo.functionalarea_id" : { $in: funarea_ids } });
    }
    console.log("count", JSON.stringify(selector))

    Jobs.aggregate([
        { $match    : selector },
        { $count    : "jobCount" },
    ])
    
    .exec()
    .then(data=>{
        //create states array
        res.status(200).json(data);
    })
    .catch(err =>{
        console.log(err.response)
        res.status(500).json({
            error: err
        });
    });
}
exports.mapwiseJobs = (req, res, next)=>{
	//console.log("req.body - ", req.body);
	var selector = {}; 
	var industry_ids = [];
    var funarea_ids = [];

    selector['$and']=[];
    var countryCode = req.body.countryCode ? req.body.countryCode : "IN";
    selector["$and"].push({ "location.countryCode" :  countryCode   })
   	

    if (req.body.industry_id) {
    	req.body.industry_id.map(elem => {
    		industry_ids.push(ObjectID(elem.id))
    	})
    	selector["$and"].push({ "jobBasicInfo.industry_id" : { $in: industry_ids } });
    }
    if (req.body.functionalArea_id) {
    	req.body.functionalArea_id.map(elem => {
    		funarea_ids.push(ObjectID(elem.id))
    	})
    	selector["$and"].push({ "jobBasicInfo.functionalarea_id" : { $in: funarea_ids } });
    }
    console.log(JSON.stringify(selector))
    if (req.body.stateCode) { 
        var groupByField = "district"; 
    }else{
        var groupByField = "stateCode"; 
    }
    
    Jobs.aggregate([
    	{ $match 	: selector },
    	{ $sort 	: {createdAt : -1} }, 
    	{ $group 	: {_id: "$location."+groupByField, count: { $sum: 1}} },
    ])
    
    .exec()
    .then(data=>{
    	//create states array
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
	//console.log("req.body - ", req.body);
	var selector = {}; 
    var industry_ids = [];
    var funarea_ids = [];

    selector['$and']=[];
    var countryCode = req.body.countryCode ? req.body.countryCode : "IN";
    selector["$and"].push({ "location.countryCode" :  countryCode })
   	
    if (req.body.industry_id) {
    	req.body.industry_id.map(elem => {
    		industry_ids.push(ObjectID(elem.id))
    	})
    	selector["$and"].push({ "jobBasicInfo.industry_id" : { $in: industry_ids } });
    }
    if (req.body.functionalArea_id) {
    	req.body.functionalArea_id.map(elem => {
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
    var countryCode = req.body.countryCode ? req.body.countryCode : "IN";
    selector["$and"].push({ "location.countryCode" :  countryCode })
   	
    console.log(JSON.stringify(selector))

    if (req.body.industry_id) {
    	req.body.industry_id.map(elem => {
    		industry_ids.push(ObjectID(elem.id))
    	})
    	selector["$and"].push({ "jobBasicInfo.industry_id" : { $in: industry_ids } });
    }
    if (req.body.functionalArea_id) {
    	req.body.functionalArea_id.map(elem => {
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
    var countryCode = req.body.countryCode ? req.body.countryCode : "IN";
    selector["$and"].push({ "location.countryCode" :  countryCode })
   	
    console.log(JSON.stringify(selector))

    if (req.body.industry_id) {
    	req.body.industry_id.map(elem => {
    		industry_ids.push(ObjectID(elem.id))
    	})
    	selector["$and"].push({ "jobBasicInfo.industry_id" : { $in: industry_ids } });
    }
    if (req.body.functionalArea_id) {
    	req.body.functionalArea_id.map(elem => {
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