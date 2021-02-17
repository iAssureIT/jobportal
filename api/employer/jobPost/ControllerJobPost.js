const mongoose	=	require('mongoose');
const mongodb	=	require('mongodb');
const Jobs 		=	require('./ModelJobPost.js');

const IndustryMaster            = require('../../coreAdmin/IndustryMaster/ModelIndustryMaster.js');
const FunctionalAreaMaster 		= require('../../coreAdmin/FunctionalAreaMaster/ModelFunctionalAreaMaster.js');
const SubFunctionalAreaMaster 	= require('../../coreAdmin/SubFunctionalAreaMaster/ModelSubFunctionalAreaMaster.js');
const JobCategoryMaster 		= require('../../coreAdmin/JobCategoryMaster/ModelJobCategory.js');
const JobRoleMaster 			= require('../../coreAdmin/JobRoleMaster/ModelJobRole.js');
const JobTypeMaster 			= require('../../coreAdmin/JobTypeMaster/ModelJobType.js');
const JobTimeMaster 			= require('../../coreAdmin/JobTimeMaster/ModelJobTime.js');
const SkillMaster           	= require('../../coreAdmin/SkillMaster/ModelSkill.js');
const QualificationLevel        = require('../../coreAdmin/QualificationLevelMaster/ModelQualificationLevel.js');

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
    .exec(function (err, job) {
        console.log(err)
        if (err) return res.status(500).json({ error: err });
        res.status(200).json(job);
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
   	if (req.body.stateCode) {
        selector["$and"].push({ "location.stateCode" :  req.body.stateCode   })
    }
    if (req.body.district) {
        selector["$and"].push({ "location.district" :  req.body.district   }) 
    }
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
    
    Jobs.find(selector).sort({createdAt:1})
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
    .exec(function (err, jobs) {
        console.log(err)
        if (err) return res.status(500).json({ error: err });
        res.status(200).json(jobs);
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
    Jobs.find(selector).sort({createdAt:1})
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
    .exec(function (err, jobs) {
        console.log(err)
        if (err) return res.status(500).json({ error: err });
        res.status(200).json(jobs);
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
    if (req.body.district) {
        selector["$and"].push({ "location.district" :  req.body.district   }) 
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
	console.log("req.body - ", req.body);
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
    console.log("stateCode",JSON.stringify(selector))
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
   	
    if (req.body.stateCode) {
        selector["$and"].push({ "location.stateCode" :  req.body.stateCode   })
    }
    if (req.body.district) {
        selector["$and"].push({ "location.district" :  req.body.district   }) 
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
    
    if (req.body.stateCode) {
        selector["$and"].push({ "location.stateCode" :  req.body.stateCode   })
    }
    if (req.body.district) {
        selector["$and"].push({ "location.district" :  req.body.district   }) 
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
		const selector = {$or: [selector1]};

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

function getIndustries(){ 
    return new Promise(function(resolve,reject){ 
        IndustryMaster.find({})
            .exec()
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            });            
    });
}
function getFunctionalAreas(){ 
    return new Promise(function(resolve,reject){ 
        FunctionalAreaMaster.find({})
            .exec()
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            });            
    });
}
function getSubFunctionalAreas(functionalarea_id){ 
    return new Promise(function(resolve,reject){ 
        SubFunctionalAreaMaster.find({"functionalarea_id" : functionalarea_id})
            .exec()
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            });            
    });
}
function getJobCategories(){ 
    return new Promise(function(resolve,reject){ 
        JobCategoryMaster.find({})
            .exec()
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            });            
    });
}
function getJobRoles(){ 
    return new Promise(function(resolve,reject){ 
        JobRoleMaster.find({})
            .exec()
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            });            
    });
}
function getJobType(){ 
    return new Promise(function(resolve,reject){ 
        JobTypeMaster.find({})
            .exec()
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            });            
    });
}
function getJobTime(){ 
    return new Promise(function(resolve,reject){ 
        JobTimeMaster.find({})
            .exec()
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            });            
    });
}
function getQualificationLevel(){ 
    return new Promise(function(resolve,reject){ 
        QualificationLevel.find({})
            .exec()
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            });            
    });
}
exports.insertBulkJobs = (req,res,next)=>{
    processData();
    async function processData() {
        var industries      = await getIndustries();
        var funAreas        = await getFunctionalAreas();
        var jobCategories   = await getJobCategories();
        var jobRoles        = await getJobRoles();
        var jobTypes        = await getJobType();
        var jobTimes        = await getJobTime();
        var qualificationLevel        = await getQualificationLevel();
        var gender          = ["Male Only","Female Only","Both (Male & Female)"];
        var states          = [{"state":"Andaman and Nicobar Islands", "stateCode": "AN"},
                        {"state": "Andhra Pradesh", "stateCode": "AP"},
                        {"state": "Arunachal Pradesh", "stateCode": "AR"},
                        {"state": "Assam", "stateCode": "AS"},
                        {"state": "Bihar", "stateCode": "BH"},
                        {"state": "Chandigarh", "stateCode": "CH"},
                        {"state": "Chattisgarh", "stateCode": "CT"},
                        {"state": "Dadra and Nagar Haveli", "stateCode": "DN"},
                        {"state": "Daman and Diu", "stateCode": "DD"},
                        {"state": "Delhi", "stateCode": "DL"},
                        {"state": "Goa", "stateCode": "GA"},
                        {"state": "Gujarat", "stateCode": "GJ"},
                        {"state": "Haryana", "stateCode": "HR"},
                        {"state": "Himachal Pradesh", "stateCode": "HP"},
                        {"state": "Jammu and Kashmir", "stateCode": "JK"},
                        {"state": "Jharkhand", "stateCode": "JH"},
                        {"state": "Karnataka", "stateCode": "KA"},
                        {"state": "Kerala", "stateCode": "KL"},
                        {"state": "Lakshadweep Islands", "stateCode": "LD"},
                        {"state": "Madhya Pradesh", "stateCode": "MP"},
                        {"state": "Maharashtra", "stateCode": "MH"},
                        {"state": "Manipur", "stateCode": "MN"},
                        {"state": "Meghalaya", "stateCode": "ML"},
                        {"state": "Mizoram", "stateCode": "MZ"},
                        {"state": "Nagaland", "stateCode": "NL"},
                        {"state": "Odisha", "stateCode": "OR"},
                        {"state": "Pondicherry", "stateCode": "PY"},
                        {"state": "Punjab", "stateCode": "PB"},
                        {"state": "Rajasthan", "stateCode": "RJ"},
                        {"state": "Sikkim", "stateCode": "SK"},
                        {"state": "Tamil Nadu", "stateCode": "TN"},
                        {"state": "Telangana", "stateCode": "TS"},
                        {"state": "Tripura", "stateCode": "TR"},
                        {"state": "Uttar Pradesh", "stateCode": "UP"},
                        {"state": "Uttarakhand", "stateCode": "UT"},
                        {"state": "West Bengal", "stateCode": "WB"},
        ]
        var jobsArray = []; 
        for (var k = 0; k < req.body.noofjobs; k++) {
            var industry_id             = industries[Math.floor(Math.random() * industries.length)]._id;
            var functionalarea_id       = funAreas[Math.floor(Math.random() * funAreas.length)]._id;;
            var subfunAreas     = await getSubFunctionalAreas(functionalarea_id);
            var subfunctionalarea_id    = subfunAreas[Math.floor(Math.random() * subfunAreas.length)]._id;
            var jobcategory_id          = jobCategories[Math.floor(Math.random() * jobCategories.length)]._id;
            var jobrole_id = jobRoles[Math.floor(Math.random() * jobRoles.length)]._id;
            var jobtype_id = jobTypes[Math.floor(Math.random() * jobTypes.length)]._id;
            var jobtime_id = jobTimes[Math.floor(Math.random() * jobTimes.length)]._id;
            
            var jobObject = {
                "company_id"    : null,
                "jobBasicInfo"  :   {
                                    "jobTitle"              : jobRoles[Math.floor(Math.random() * jobRoles.length)].jobRole,
                                    "industry_id"           : industry_id,
                                    "functionalarea_id"     : functionalarea_id,
                                    "subfunctionalarea_id"  : subfunctionalarea_id,
                                    "jobrole_id"            : jobrole_id,
                                    "gender"                : gender[Math.floor(Math.random() * gender.length)],
                                    "workFromHome"          : 0,
                                    "jobtype_id"            : jobtype_id,
                                    "jobtime_id"            : jobtime_id,
                                    "jobcategory_id"        : jobcategory_id,
                                    "positions"             : Math.floor(Math.random()*10),
                                    "jobDesc"               : "",
                                    "lastDateOfAppl"        : null,
                                    "contactPersonName"     : "",
                                    "contactPersonEmail"    : "",
                                    "contactPersonPhone"    : ""
                                },
                "location"      :   {
                                    "address"               : "",
                                    "area"                  : "",
                                    "cityVillage"           : "",
                                    "district"              : "",
                                    "state"                 : states[Math.floor(Math.random() * states.length)].state,
                                    "stateCode"             : states[Math.floor(Math.random() * states.length)].stateCode,   
                                    "country"               : "India",
                                    "countryCode"           : "IN",
                                    "pincode"               : ""
                                }, 
                "ctcOffered"    :   {
                                    "minSalary"             : Math.floor(Math.random()*20),
                                    "minSalPeriod"          : "Per Month",
                                    "maxSalary"             : Math.floor(Math.random()*30),
                                    "maxSalPeriod"          : "Per Month",
                                },
            
                "eligibility"   :   {
                                    "minEducation"          : qualificationLevel[Math.floor(Math.random() * qualificationLevel.length)].qualificationLevel,
                                    "minExperience"         : Math.floor(Math.random()*10)
                                },  
                "createdAt"     :   new Date()                                         
            }
            jobsArray.push(jobObject) 
            //jobsData.save()
        }
        Jobs.insertMany(jobsArray)
            .then(data => {
                res.status(200).json({  created  : true });
            })
            .catch(err => {
                console.log(err);
            });   
    }
}
