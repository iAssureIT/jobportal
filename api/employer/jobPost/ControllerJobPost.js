const mongoose	=	require('mongoose');
const mongodb	=	require('mongodb');
const Jobs 		=	require('./ModelJobPost.js');

const StateMaster               = require('../../coreAdmin/States/ModelStates.js');
const DistrictMaster            = require('../../coreAdmin/Districts/ModelDistricts.js');
const EntityMaster              = require('../../coreAdmin/entityMaster/ModelEntityMaster.js');
const IndustryMaster            = require('../../coreAdmin/IndustryMaster/ModelIndustryMaster.js');
const FunctionalAreaMaster 		= require('../../coreAdmin/FunctionalAreaMaster/ModelFunctionalAreaMaster.js');
const SubFunctionalAreaMaster 	= require('../../coreAdmin/SubFunctionalAreaMaster/ModelSubFunctionalAreaMaster.js');
const JobSectorMaster           = require('../../coreAdmin/JobSectorMaster/ModelJobSector.js');

const JobRoleMaster 			= require('../../coreAdmin/JobRoleMaster/ModelJobRole.js');
const JobTypeMaster 			= require('../../coreAdmin/JobTypeMaster/ModelJobType.js');
const JobShiftMaster            = require('../../coreAdmin/JobShiftMaster/ModelJobShift.js');
const JobTimeMaster 			= require('../../coreAdmin/JobTimeMaster/ModelJobTime.js');
const SkillMaster           	= require('../../coreAdmin/SkillMaster/ModelSkill.js');
const QualificationMaster       = require('../../coreAdmin/QualificationMaster/ModelQualification.js');

var ObjectID 	= 	require('mongodb').ObjectID;

exports.insertJobs = (req, res, next)=>{
		console.log(req.body)	
		var functionalarea_id, subfunctionalarea_id, jobsector_id, jobrole_id, jobtype_id, jobshift_id, jobtime_id, mineducation_id;
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
			
			jobsector_id  		= req.body.jobsector_id != "" ? req.body.jobsector_id 
    							: await insertJobSector(req.body.jobSector,req.body.user_id)
			
			jobrole_id  		= req.body.jobrole_id != "" ? req.body.jobrole_id 
    							: await insertJobRole(req.body.jobRole,req.body.user_id)
			
			jobtype_id  		= req.body.jobtype_id != "" ? req.body.jobtype_id 
    							: await insertJobType(req.body.jobType,req.body.user_id)

            jobshift_id         = req.body.jobshift_id != "" ? req.body.jobshift_id 
                                : await insertJobShift(req.body.jobShift,req.body.user_id)
                            
			jobtime_id  		= req.body.jobtime_id != "" ? req.body.jobtime_id 
    							: await insertJobTime(req.body.jobTime,req.body.user_id)
		
    		mineducation_id     = req.body.mineducation_id != "" ? req.body.mineducation_id 
                                : await insertQualification(req.body.minEducation,req.body.user_id)	
    		
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
                                    "jobsector_id"          : jobsector_id,
									"jobrole_id"			: jobrole_id,
									"gender"				: req.body.gender,
									"workFromHome" 			: req.body.workFromHome,
									"jobtype_id" 			: jobtype_id,
                                    "jobshift_id"           : jobshift_id,
									"jobtime_id" 			: jobtime_id,
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
									"mineducation_id" 	    : mineducation_id,
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

function insertJobSector(jobSector, createdBy){ 
    return new Promise(function(resolve,reject){ 
        const jobSectorMaster = new JobSectorMaster({
                        _id                         : new mongoose.Types.ObjectId(),
                        jobSector           		: jobSector,
                        createdBy                   : createdBy,
                        createdAt                   : new Date()
                    })
                    jobSectorMaster.save()
                    .then(data=>{
                        resolve( data._id );
                    })
                    .catch(err =>{
                        reject(err); 
                    });
    });
}
function insertJobShift(jobShift, createdBy){ 
    return new Promise(function(resolve,reject){ 
        const jobShiftMaster = new JobShiftMaster({
                        _id                         : new mongoose.Types.ObjectId(),
                        jobShift                    : jobShift,
                        createdBy                   : createdBy,
                        createdAt                   : new Date()
                    })
                    jobShiftMaster.save()
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

function insertQualification(qualification, createdBy){ 
    return new Promise(function(resolve,reject){ 
        const qualification = new QualificationMaster({
                        _id                         : new mongoose.Types.ObjectId(),
                        qualification               : qualification,
                        createdBy                   : createdBy,
                        createdAt                   : new Date()
                    })
                    qualification.save()
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
    .populate('jobBasicInfo.jobsector_id')
    .populate('jobBasicInfo.jobshift_id')
    .populate('eligibility.mineducation_id')
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
    var jobsector_ids   = [];
    var jobtype_ids     = [];
    var jobtime_ids     = [];
    var jobshift_ids    = []; 
    var jobroles_ids 	= [];
    var qualification_ids    = [];
    var skill_ids       = [];

    selector['$or']    = [];
    selector['$and'] 	= [];

    selector["$and"].push({ "location.countryCode" :  req.body.countryCode   })
    // 1
   	if (req.body.stateCode && req.body.stateCode != "all") {
        selector["$and"].push({ "location.stateCode" :  req.body.stateCode   })
    }
    // 2
    if (req.body.district && req.body.district != "all") {
        selector["$and"].push({ "location.district" :  req.body.district   }) 
    }
    // 3
    if (req.body.company_id) {
    	
    	selector["$and"].push({ "jobBasicInfo.company_id" : ObjectID(req.body.company_id)});
    }
    // 4
    if (req.body.industry_id) {
    	req.body.industry_id.map(elem => {
    		industry_ids.push(ObjectID(elem.id))
    	})
    	selector["$and"].push({ "jobBasicInfo.industry_id" : { $in: industry_ids } });
    }
    // 5
    if (req.body.functionalArea_id ) {
    	req.body.functionalArea_id.map(elem => {
    		funarea_ids.push(ObjectID(elem.id))
    	})
    	selector["$and"].push({ "jobBasicInfo.functionalarea_id" : { $in: funarea_ids } });
    }
    // 6
    if (req.body.subfunctionalArea_id ) {
    	req.body.subfunctionalArea_id.map(elem => {
    		subfunarea_ids.push(ObjectID(elem.id))
    	})
    	selector["$and"].push({ "jobBasicInfo.subfunctionalarea_id" : { $in: subfunarea_ids } });
    }
    // 7
    if (req.body.jobSector_id) {
        req.body.jobSector_id.map(elem => {
            jobsector_ids.push(ObjectID(elem.id))
        })
        selector["$and"].push({ "jobBasicInfo.jobsector_id" : { $in: jobsector_ids } });
    }
    // 8
    if (req.body.jobType_id) {
        req.body.jobType_id.map(elem => {
            jobtype_ids.push(ObjectID(elem.id))
        })
        selector["$and"].push({ "jobBasicInfo.jobtype_id" : { $in: jobtype_ids } });
    }
    // 9
    if (req.body.jobTime_id) {
        req.body.jobTime_id.map(elem => {
            jobtime_ids.push(ObjectID(elem.id))
        })
        selector["$and"].push({ "jobBasicInfo.jobtime_id" : { $in: jobtime_ids } });
    }
    // 10
    if (req.body.jobShift_id) {
        req.body.jobShift_id.map(elem => {
            jobshift_ids.push(ObjectID(elem.id))
        })
        selector["$and"].push({ "jobBasicInfo.jobshift_id" : { $in: jobshift_ids } });
    }
    // 11
    if (req.body.jobRole_id) {
    	req.body.jobRole_id.map(elem => {
    		jobroles_ids.push(ObjectID(elem.id))
    	})
    	selector["$and"].push({ "jobBasicInfo.jobrole_id" : { $in: jobroles_ids } });
    }
    // 12
    if (req.body.qualification_id) {
        req.body.qualification_id.map(elem => {
            qualification_ids.push(ObjectID(elem.id))
        })
        selector["$and"].push({ "eligibility.mineducation_id" : { $in: qualification_ids } });
    }
    // 13
    if (req.body.skill_id) {
        req.body.skill_id.map(elem => {
            skill_ids.push(ObjectID(elem.id))
        })
        selector["$or"].push({ "requiredSkills.primarySkills.skill_id" : { $in: skill_ids } });
        selector["$or"].push({ "requiredSkills.secondarySkills.skill_id" : { $in: skill_ids } });
        selector["$or"].push({ "requiredSkills.otherSkills.skill_id" : { $in: skill_ids } });
        selector["$or"].push({ "requiredSkills.preferredSkills.skill_id" : { $in: skill_ids } });
        
    }else{
        delete selector["$or"];
    }
    // 14
    if (req.body.minExp != null  && req.body.maxExp != null) {
        selector["$and"].push({ "eligibility.minExperience" : { '$gte' : req.body.minExp,  '$lte' : req.body.maxExp} });
    }
    console.log("list selector - ", selector);
    
    Jobs.find(selector).sort({createdAt:1})
    .populate('company_id')
    .populate('jobBasicInfo.industry_id')
    .populate('jobBasicInfo.functionalarea_id')
    .populate('jobBasicInfo.subfunctionalarea_id')
    .populate('jobBasicInfo.jobrole_id')
    .populate('jobBasicInfo.jobtype_id')
    .populate('jobBasicInfo.jobtime_id')
    .populate('jobBasicInfo.jobsector_id')
    .populate('jobBasicInfo.jobshift_id')
    .populate('eligibility.mineducation_id')
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
    var jobsector_ids   = [];
    var jobtype_ids     = [];
    var jobtime_ids     = [];
    var jobshift_ids    = [];
    var jobroles_ids 	= [];
    var qualification_ids    = [];
    var skill_ids       = [];

    selector['$and'] 	= [];
    selector["$or"]     = [];

    selector["$and"].push({ "location.countryCode" :  req.body.countryCode   })
   	// 1
    if (req.body.company_id) {
    	selector["$and"].push({ "company_id" : ObjectID(req.body.company_id)});
    }
    // 2
    if (req.body.industry_id) {
    	req.body.industry_id.map(elem => {
    		industry_ids.push(ObjectID(elem.id))
    	})
    	selector["$and"].push({ "jobBasicInfo.industry_id" : { $in: industry_ids } });
    }
    // 3
    if (req.body.functionalArea_id ) {
    	req.body.functionalArea_id.map(elem => {
    		funarea_ids.push(ObjectID(elem.id))
    	})
    	selector["$and"].push({ "jobBasicInfo.functionalarea_id" : { $in: funarea_ids } });
    }
    // 4
    if (req.body.subfunctionalArea_id) {
    	req.body.subfunctionalArea_id.map(elem => {
    		subfunarea_ids.push(ObjectID(elem.id))
    	})
    	selector["$and"].push({ "jobBasicInfo.subfunctionalarea_id" : { $in: subfunarea_ids } });
    }
    // 5
    if (req.body.jobSector_id) {
        req.body.jobSector_id.map(elem => {
            jobsector_ids.push(ObjectID(elem.id))
        })
        selector["$and"].push({ "jobBasicInfo.jobsector_id" : { $in: jobsector_ids } });
    }
    // 6
    if (req.body.jobType_id) {
        req.body.jobType_id.map(elem => {
            jobtype_ids.push(ObjectID(elem.id))
        })
        selector["$and"].push({ "jobBasicInfo.jobtype_id" : { $in: jobtype_ids } });
    }
    // 7
    if (req.body.jobTime_id) {
        req.body.jobTime_id.map(elem => {
            jobtime_ids.push(ObjectID(elem.id))
        })
        selector["$and"].push({ "jobBasicInfo.jobtime_id" : { $in: jobtime_ids } });
    }
    // 8
    if (req.body.jobShift_id) {
        req.body.jobShift_id.map(elem => {
            jobshift_ids.push(ObjectID(elem.id))
        })
        selector["$and"].push({ "jobBasicInfo.jobshift_id" : { $in: jobshift_ids } });
    }
    // 9
    if (req.body.jobTime_id) {
        req.body.jobTime_id.map(elem => {
            jobtime_ids.push(ObjectID(elem.id))
        })
        selector["$and"].push({ "jobBasicInfo.jobtime_id" : { $in: jobtime_ids } });
    }
    // 10
    if (req.body.jobShift_id) {
        req.body.jobShift_id.map(elem => {
            jobshift_ids.push(ObjectID(elem.id))
        })
        selector["$and"].push({ "jobBasicInfo.jobshift_id" : { $in: jobshift_ids } });
    }
    // 11
    if (req.body.jobRole_id ) {
    	req.body.jobRole_id.map(elem => {
    		jobroles_ids.push(ObjectID(elem.id))
    	})
    	selector["$and"].push({ "jobBasicInfo.jobrole_id" : { $in: jobroles_ids } });
    }
    // 12
    if (req.body.qualification_id) {
        req.body.qualification_id.map(elem => {
            qualification_ids.push(ObjectID(elem.id))
        })
        selector["$and"].push({ "eligibility.mineducation_id" : { $in: qualification_ids } });
    }
    // 13
    if (req.body.skill_id) {
        req.body.skill_id.map(elem => {
            skill_ids.push(ObjectID(elem.id))
        })
        selector["$or"].push({ "requiredSkills.primarySkills.skill_id" : { $in: skill_ids } });
        selector["$or"].push({ "requiredSkills.secondarySkills.skill_id" : { $in: skill_ids } });
        selector["$or"].push({ "requiredSkills.otherSkills.skill_id" : { $in: skill_ids } });
        selector["$or"].push({ "requiredSkills.preferredSkills.skill_id" : { $in: skill_ids } });
        
    }else{
        delete selector["$or"];
    }
    // 14
    if (req.body.minExp != null  && req.body.maxExp != null) {
        selector["$and"].push({ "eligibility.minExperience" : { '$gte' : req.body.minExp,  '$lte' : req.body.maxExp} });
    }
    //console.log("hagshg",JSON.stringify(selector))
    Jobs.find(selector).sort({createdAt:1})
    .populate('company_id')
    .populate('jobBasicInfo.industry_id')
    .populate('jobBasicInfo.functionalarea_id')
    .populate('jobBasicInfo.subfunctionalarea_id')
    .populate('jobBasicInfo.jobrole_id')
    .populate('jobBasicInfo.jobtype_id')
    .populate('jobBasicInfo.jobtime_id')
    .populate('jobBasicInfo.jobsector_id')
    .populate('jobBasicInfo.jobshift_id')
    .populate('eligibility.mineducation_id')
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
	var functionalarea_id, subfunctionalarea_id, jobsector_id, jobrole_id, jobtype_id, jobtime_id, jobshift_id, mineducation_id;
	var primarySkills   = [];
    var secondarySkills = [];
    var otherSkills     = [];
    var preferredSkills = [];
    var skill_id; 

    	processData();
		async function processData(){
    		functionalarea_id  		= req.body.functionalarea_id != "" ? req.body.functionalarea_id 
    							: await insertFunctArea(req.body.functionalArea,req.body.user_id)
			
			subfunctionalarea_id  	= req.body.subfunctionalarea_id != "" ? req.body.subfunctionalarea_id 
    							: await insertSubFunctArea(functionalarea_id, req.body.subFunctionalArea,req.body.user_id)
			
			jobsector_id  		= req.body.jobsector_id != "" ? req.body.jobsector_id 
    							: await insertJobSector(req.body.jobSector,req.body.user_id)
			
			jobrole_id  		= req.body.jobrole_id != "" ? req.body.jobrole_id 
    							: await insertJobRole(req.body.jobRole,req.body.user_id)
			
			jobtype_id  		= req.body.jobtype_id != "" ? req.body.jobtype_id 
    							: await insertJobType(req.body.jobType,req.body.user_id)

            jobshift_id         = req.body.jobshift_id != "" ? req.body.jobshift_id 
                                : await insertJobShift(req.body.jobShift,req.body.user_id)

			jobtime_id  		= req.body.jobtime_id != "" ? req.body.jobtime_id 
    							: await insertJobTime(req.body.jobTime,req.body.user_id)
		    
            mineducation_id     = req.body.mineducation_id != "" ? req.body.mineducation_id 
                                : await insertQualification(req.body.minEducation,req.body.user_id) 
            
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
									"jobsector_id" 		    : jobsector_id,
                                    "jobshift_id"           : jobshift_id,
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
									"mineducation_id" 	     : mineducation_id,
									"minExperience"          : req.body.minExperience
								},
			
			"requiredSkills": 	{
									"primarySkills" 	     : primarySkills,
									"minPrimExp"		     : req.body.minPrimExp,
									"secondarySkills" 	     : secondarySkills,
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
    
    var selector        = {}; 
    var industry_ids    = [];
    var funarea_ids     = [];
    var subfunarea_ids  = [];
    var jobsector_ids   = [];
    var jobtype_ids     = [];
    var jobtime_ids     = [];
    var jobshift_ids    = [];
    var jobrole_ids     = [];
    var qualification_ids    = []; 
    var skill_ids       = [];
    selector['$and']=[]; selector['$or']=[];
   
    var countryCode = req.body.countryCode ? req.body.countryCode : "IN";
    selector["$and"].push({ "location.countryCode" :  countryCode   })
    // 1
    if (req.body.stateCode && req.body.stateCode != "all") {
        selector["$and"].push({ "location.stateCode" :  req.body.stateCode   })
    }
    // 2
    if (req.body.district  && req.body.district != "all") {
        selector["$and"].push({ "location.district" :  req.body.district   }) 
    }
    // 3
    if (req.body.industry_id) {
        req.body.industry_id.map(elem => {
            industry_ids.push(ObjectID(elem.id))
        })
        selector["$and"].push({ "jobBasicInfo.industry_id" : { $in: industry_ids } });
    }
    // 4
    if (req.body.functionalArea_id ) {
        req.body.functionalArea_id.map(elem => {
            funarea_ids.push(ObjectID(elem.id))
        })
        selector["$and"].push({ "jobBasicInfo.functionalarea_id" : { $in: funarea_ids } });
    }
    // 5
    if (req.body.subfunctionalArea_id ) {
        req.body.subfunctionalArea_id.map(elem => {
            subfunarea_ids.push(ObjectID(elem.id))
        })
        selector["$and"].push({ "jobBasicInfo.subfunctionalarea_id" : { $in: subfunarea_ids } });
    }
    // 6
    if (req.body.jobSector_id) {
        req.body.jobSector_id.map(elem => {
            jobsector_ids.push(ObjectID(elem.id))
        })
        selector["$and"].push({ "jobBasicInfo.jobsector_id" : { $in: jobsector_ids } });
    }
    // 7
    if (req.body.jobType_id) {
        req.body.jobType_id.map(elem => {
            jobtype_ids.push(ObjectID(elem.id))
        })
        selector["$and"].push({ "jobBasicInfo.jobtype_id" : { $in: jobtype_ids } });
    }
    // 8
    if (req.body.jobTime_id) {
        req.body.jobTime_id.map(elem => {
            jobtime_ids.push(ObjectID(elem.id))
        })
        selector["$and"].push({ "jobBasicInfo.jobtime_id" : { $in: jobtime_ids } });
    }
    // 9
    if (req.body.jobShift_id) {
        req.body.jobShift_id.map(elem => {
            jobshift_ids.push(ObjectID(elem.id))
        })
        selector["$and"].push({ "jobBasicInfo.jobshift_id" : { $in: jobshift_ids } });
    }
    // 10
    if (req.body.jobRole_id ) {
        req.body.jobRole_id.map(elem => {
            jobrole_ids.push(ObjectID(elem.id))
        })
        selector["$and"].push({ "jobBasicInfo.jobrole_id" : { $in: jobrole_ids } });
    }
    // 11
    if (req.body.qualification_id) {
        req.body.qualification_id.map(elem => {
            qualification_ids.push(ObjectID(elem.id))
        })
        selector["$and"].push({ "eligibility.mineducation_id" : { $in: qualification_ids } });
    }
    // 12
    if (req.body.skill_id) {
        req.body.skill_id.map(elem => {
            skill_ids.push(ObjectID(elem.id))
        })
        selector["$or"].push({ "requiredSkills.primarySkills.skill_id" : { $in: skill_ids } });
        selector["$or"].push({ "requiredSkills.secondarySkills.skill_id" : { $in: skill_ids } });
        selector["$or"].push({ "requiredSkills.otherSkills.skill_id" : { $in: skill_ids } });
        selector["$or"].push({ "requiredSkills.preferredSkills.skill_id" : { $in: skill_ids } });
        
    }else{
        delete selector["$or"];
    }
    // 13
    if (req.body.minExp != null  && req.body.maxExp != null) {
        selector["$and"].push({ "eligibility.minExperience" : { '$gte' : req.body.minExp,  '$lte' : req.body.maxExp} });
    }
    console.log("count selector - ", JSON.stringify(selector));
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
	var selector        = {}; 
	var industry_ids    = [];
    var funarea_ids     = [];
    var subfunarea_ids  = [];
    var jobsector_ids   = [];
    var jobtype_ids     = [];
    var jobtime_ids     = [];
    var jobshift_ids    = [];
    var jobrole_ids     = [];
    var qualification_ids    = [];
    var skill_ids       = [];

    selector['$and']=[];
    selector['$or']=[];

    var countryCode = req.body.countryCode ? req.body.countryCode : "IN";
    selector["$and"].push({ "location.countryCode" :  countryCode   })
    // 1
   	if (req.body.stateCode  && req.body.stateCode != "all") {
        selector["$and"].push({ "location.stateCode" :  req.body.stateCode   })
    }
    // 2
    if (req.body.district  && req.body.district != "all") {
        selector["$and"].push({ "location.district" :  req.body.district   }) 
    }
    // 3
    if (req.body.industry_id ) {
    	req.body.industry_id.map(elem => {
    		industry_ids.push(ObjectID(elem.id))
    	})
    	selector["$and"].push({ "jobBasicInfo.industry_id" : { $in: industry_ids } });
    }
    // 4
    if (req.body.functionalArea_id ) {
    	req.body.functionalArea_id.map(elem => {
    		funarea_ids.push(ObjectID(elem.id))
    	})
    	selector["$and"].push({ "jobBasicInfo.functionalarea_id" : { $in: funarea_ids } });
    }
    // 5
    if (req.body.subfunctionalArea_id ) {
        req.body.subfunctionalArea_id.map(elem => {
            subfunarea_ids.push(ObjectID(elem.id))
        })
        selector["$and"].push({ "jobBasicInfo.subfunctionalarea_id" : { $in: subfunarea_ids } });
    }
    // 6
    if (req.body.jobSector_id) {
        req.body.jobSector_id.map(elem => {
            jobsector_ids.push(ObjectID(elem.id))
        })
        selector["$and"].push({ "jobBasicInfo.jobsector_id" : { $in: jobsector_ids } });
    }
    // 7
    if (req.body.jobType_id) {
        req.body.jobType_id.map(elem => {
            jobtype_ids.push(ObjectID(elem.id))
        })
        selector["$and"].push({ "jobBasicInfo.jobtype_id" : { $in: jobtype_ids } });
    }
    // 8
    if (req.body.jobTime_id) {
        req.body.jobTime_id.map(elem => {
            jobtime_ids.push(ObjectID(elem.id))
        })
        selector["$and"].push({ "jobBasicInfo.jobtime_id" : { $in: jobtime_ids } });
    }
    // 9
    if (req.body.jobShift_id) {
        req.body.jobShift_id.map(elem => {
            jobshift_ids.push(ObjectID(elem.id))
        })
        selector["$and"].push({ "jobBasicInfo.jobshift_id" : { $in: jobshift_ids } });
    }
    // 10
    if (req.body.jobRole_id) {
        req.body.jobRole_id.map(elem => {
            jobrole_ids.push(ObjectID(elem.id))
        })
        selector["$and"].push({ "jobBasicInfo.jobrole_id" : { $in: jobrole_ids } });
    }
    // 11
    if (req.body.qualification_id) {
        req.body.qualification_id.map(elem => {
            qualification_ids.push(ObjectID(elem.id))
        })
        selector["$and"].push({ "eligibility.mineducation_id" : { $in: qualification_ids } });
    }
    // 12
    if (req.body.skill_id) {
        req.body.skill_id.map(elem => {
            skill_ids.push(ObjectID(elem.id))
        })
        selector["$or"].push({ "requiredSkills.primarySkills.skill_id" : { $in: skill_ids } });
        selector["$or"].push({ "requiredSkills.secondarySkills.skill_id" : { $in: skill_ids } });
        selector["$or"].push({ "requiredSkills.otherSkills.skill_id" : { $in: skill_ids } });
        selector["$or"].push({ "requiredSkills.preferredSkills.skill_id" : { $in: skill_ids } });
        
    }else{
        delete selector["$or"];
    }
    // 13
    if (req.body.minExp != null  && req.body.maxExp != null) {
        selector["$and"].push({ "eligibility.minExperience" : { '$gte' : req.body.minExp,  '$lte' : req.body.maxExp} });
    }

    //console.log("stateCode",JSON.stringify(selector))
    if (req.body.stateCode && req.body.stateCode != "all") { 
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
	var selector        = {}; 
    var industry_ids    = [];
    var funarea_ids     = [];
    var subfunarea_ids  = [];
    var jobsector_ids   = [];
    var jobtype_ids     = [];
    var jobtime_ids     = [];
    var jobshift_ids    = [];
    var jobrole_ids     = [];
    var qualification_ids    = [];
    var skill_ids       = [];

    selector['$and']=[];
    selector['$or']=[];

    var countryCode = req.body.countryCode ? req.body.countryCode : "IN";
    selector["$and"].push({ "location.countryCode" :  countryCode })
   	// 1
    if (req.body.stateCode && req.body.stateCode != "all") {
        selector["$and"].push({ "location.stateCode" :  req.body.stateCode   })
    }
    // 2
    if (req.body.district && req.body.district != "all") {
        selector["$and"].push({ "location.district" :  req.body.district   }) 
    }
    // 3
    if (req.body.industry_id) {
    	req.body.industry_id.map(elem => {
    		industry_ids.push(ObjectID(elem.id))
    	})
    	selector["$and"].push({ "jobBasicInfo.industry_id" : { $in: industry_ids } });
    }
    // 4
    if (req.body.functionalArea_id) {
    	req.body.functionalArea_id.map(elem => {
    		funarea_ids.push(ObjectID(elem.id))
    	})
    	selector["$and"].push({ "jobBasicInfo.functionalarea_id" : { $in: funarea_ids } });
    }
    // 5
    if (req.body.subfunctionalArea_id) {
        req.body.subfunctionalArea_id.map(elem => {
            subfunarea_ids.push(ObjectID(elem.id))
        })
        selector["$and"].push({ "jobBasicInfo.subfunctionalarea_id" : { $in: subfunarea_ids } });
    }
    // 6
    if (req.body.jobSector_id) {
        req.body.jobSector_id.map(elem => {
            jobsector_ids.push(ObjectID(elem.id))
        })
        selector["$and"].push({ "jobBasicInfo.jobsector_id" : { $in: jobsector_ids } });
    }
    // 7
    if (req.body.jobType_id) {
        req.body.jobType_id.map(elem => {
            jobtype_ids.push(ObjectID(elem.id))
        })
        selector["$and"].push({ "jobBasicInfo.jobtype_id" : { $in: jobtype_ids } });
    }
    // 8
    if (req.body.jobTime_id) {
        req.body.jobTime_id.map(elem => {
            jobtime_ids.push(ObjectID(elem.id))
        })
        selector["$and"].push({ "jobBasicInfo.jobtime_id" : { $in: jobtime_ids } });
    }
    // 9
    if (req.body.jobShift_id) {
        req.body.jobShift_id.map(elem => {
            jobshift_ids.push(ObjectID(elem.id))
        })
        selector["$and"].push({ "jobBasicInfo.jobshift_id" : { $in: jobshift_ids } });
    }
    // 10
    if (req.body.jobRole_id) {
        req.body.jobRole_id.map(elem => {
            jobrole_ids.push(ObjectID(elem.id))
        })
        selector["$and"].push({ "jobBasicInfo.jobrole_id" : { $in: jobrole_ids } });
    }
    // 11
    if (req.body.qualification_id) {
        req.body.qualification_id.map(elem => {
            qualification_ids.push(ObjectID(elem.id))
        })
        selector["$and"].push({ "eligibility.mineducation_id" : { $in: qualification_ids } });
    }
    // 12
    if (req.body.skill_id) {
        req.body.skill_id.map(elem => {
            skill_ids.push(ObjectID(elem.id))
        })
        selector["$or"].push({ "requiredSkills.primarySkills.skill_id" : { $in: skill_ids } });
        selector["$or"].push({ "requiredSkills.secondarySkills.skill_id" : { $in: skill_ids } });
        selector["$or"].push({ "requiredSkills.otherSkills.skill_id" : { $in: skill_ids } });
        selector["$or"].push({ "requiredSkills.preferredSkills.skill_id" : { $in: skill_ids } });
        
    }else{
        delete selector["$or"];
    }
    // 13
    if (req.body.minExp != null  && req.body.maxExp != null) {
        selector["$and"].push({ "eligibility.minExperience" : { '$gte' : req.body.minExp,  '$lte' : req.body.maxExp} });
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
	var selector       = {}; 
	var industry_ids   = [];
    var funarea_ids    = [];
    var subfunarea_ids = [];
    var jobsector_ids  = [];
    var jobtype_ids    = [];
    var jobtime_ids    = [];
    var jobshift_ids   = [];
    var jobrole_ids    = [];
    var qualification_ids    = [];
    var skill_ids      = [];

    selector['$and']=[];
    selector['$or']=[];

    var countryCode = req.body.countryCode ? req.body.countryCode : "IN";
    selector["$and"].push({ "location.countryCode" :  countryCode })
   	
    console.log(JSON.stringify(selector))
    // 1
    if (req.body.stateCode && req.body.stateCode != "all") {
        selector["$and"].push({ "location.stateCode" :  req.body.stateCode   })
    }
    // 2
    if (req.body.district && req.body.district != "all") {
        selector["$and"].push({ "location.district" :  req.body.district   }) 
    }
    // 3
    if (req.body.industry_id ) {
    	req.body.industry_id.map(elem => {
    		industry_ids.push(ObjectID(elem.id))
    	})
    	selector["$and"].push({ "jobBasicInfo.industry_id" : { $in: industry_ids } });
    }
    // 4
    if (req.body.functionalArea_id) {
    	req.body.functionalArea_id.map(elem => {
    		funarea_ids.push(ObjectID(elem.id))
    	})
    	selector["$and"].push({ "jobBasicInfo.functionalarea_id" : { $in: funarea_ids } });
    }
    // 5
    if (req.body.subfunctionalArea_id) {
        req.body.subfunctionalArea_id.map(elem => {
            subfunarea_ids.push(ObjectID(elem.id))
        })
        selector["$and"].push({ "jobBasicInfo.subfunctionalarea_id" : { $in: subfunarea_ids } });
    }
    // 6
    if (req.body.jobSector_id) {
        req.body.jobSector_id.map(elem => {
            jobsector_ids.push(ObjectID(elem.id))
        })
        selector["$and"].push({ "jobBasicInfo.jobsector_id" : { $in: jobsector_ids } });
    }
    // 7
    if (req.body.jobType_id) {
        req.body.jobType_id.map(elem => {
            jobtype_ids.push(ObjectID(elem.id))
        })
        selector["$and"].push({ "jobBasicInfo.jobtype_id" : { $in: jobtype_ids } });
    }
    // 8
    if (req.body.jobTime_id) {
        req.body.jobTime_id.map(elem => {
            jobtime_ids.push(ObjectID(elem.id))
        })
        selector["$and"].push({ "jobBasicInfo.jobtime_id" : { $in: jobtime_ids } });
    }
    // 9
    if (req.body.jobShift_id) {
        req.body.jobShift_id.map(elem => {
            jobshift_ids.push(ObjectID(elem.id))
        })
        selector["$and"].push({ "jobBasicInfo.jobshift_id" : { $in: jobshift_ids } });
    }
    // 10
    if (req.body.jobRole_id) {
        req.body.jobRole_id.map(elem => {
            jobrole_ids.push(ObjectID(elem.id))
        })
        selector["$and"].push({ "jobBasicInfo.jobrole_id" : { $in: jobrole_ids } });
    }
    // 11
    if (req.body.qualification_id) {
        req.body.qualification_id.map(elem => {
            qualification_ids.push(ObjectID(elem.id))
        })
        selector["$and"].push({ "eligibility.mineducation_id" : { $in: qualification_ids } });
    }
    // 12
    if (req.body.skill_id) {
        req.body.skill_id.map(elem => {
            skill_ids.push(ObjectID(elem.id))
        })
        selector["$or"].push({ "requiredSkills.primarySkills.skill_id" : { $in: skill_ids } });
        selector["$or"].push({ "requiredSkills.secondarySkills.skill_id" : { $in: skill_ids } });
        selector["$or"].push({ "requiredSkills.otherSkills.skill_id" : { $in: skill_ids } });
        selector["$or"].push({ "requiredSkills.preferredSkills.skill_id" : { $in: skill_ids } });
        
    }else{
        delete selector["$or"];
    }
    // 13
    if (req.body.minExp != null  && req.body.maxExp != null) {
        selector["$and"].push({ "eligibility.minExperience" : { '$gte' : req.body.minExp,  '$lte' : req.body.maxExp} });
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
	var selector        = {}; 
	var industry_ids    = [];
    var funarea_ids     = [];
    var subfunarea_ids  = [];
    var jobsector_ids   = [];
    var jobtype_ids     = [];
    var jobtime_ids     = [];
    var jobshift_ids    = [];
    var jobrole_ids     = [];
    var skill_ids       = [];
    var qualification_ids     = [];

    selector['$and']=[];
    selector['$or']=[];

    var countryCode = req.body.countryCode ? req.body.countryCode : "IN";
    selector["$and"].push({ "location.countryCode" :  countryCode })
   	
    console.log(JSON.stringify(selector))
    // 1
    if (req.body.stateCode && req.body.stateCode != "all") {
        selector["$and"].push({ "location.stateCode" :  req.body.stateCode   })
    }
    // 2
    if (req.body.district && req.body.district != "all") {
        selector["$and"].push({ "location.district" :  req.body.district   }) 
    }
    // 3
    if (req.body.industry_id ) {
    	req.body.industry_id.map(elem => {
    		industry_ids.push(ObjectID(elem.id))
    	})
    	selector["$and"].push({ "jobBasicInfo.industry_id" : { $in: industry_ids } });
    }
    // 4
    if (req.body.functionalArea_id ) {
    	req.body.functionalArea_id.map(elem => {
    		funarea_ids.push(ObjectID(elem.id))
    	})
    	selector["$and"].push({ "jobBasicInfo.functionalarea_id" : { $in: funarea_ids } });
    }
    // 5
    if (req.body.subfunctionalArea_id ) {
        req.body.subfunctionalArea_id.map(elem => {
            subfunarea_ids.push(ObjectID(elem.id))
        })
        selector["$and"].push({ "jobBasicInfo.subfunctionalarea_id" : { $in: subfunarea_ids } });
    }
    // 6
    if (req.body.jobSector_id) {
        req.body.jobSector_id.map(elem => {
            jobsector_ids.push(ObjectID(elem.id))
        })
        selector["$and"].push({ "jobBasicInfo.jobsector_id" : { $in: jobsector_ids } });
    }
    // 7
    if (req.body.jobType_id) {
        req.body.jobType_id.map(elem => {
            jobtype_ids.push(ObjectID(elem.id))
        })
        selector["$and"].push({ "jobBasicInfo.jobtype_id" : { $in: jobtype_ids } });
    }
    // 8
    if (req.body.jobTime_id) {
        req.body.jobTime_id.map(elem => {
            jobtime_ids.push(ObjectID(elem.id))
        })
        selector["$and"].push({ "jobBasicInfo.jobtime_id" : { $in: jobtime_ids } });
    }
    // 9
    if (req.body.jobShift_id) {
        req.body.jobShift_id.map(elem => {
            jobshift_ids.push(ObjectID(elem.id))
        })
        selector["$and"].push({ "jobBasicInfo.jobshift_id" : { $in: jobshift_ids } });
    }
    // 10
    if (req.body.jobRole_id) {
        req.body.jobRole_id.map(elem => {
            jobrole_ids.push(ObjectID(elem.id))
        })
        selector["$and"].push({ "jobBasicInfo.jobrole_id" : { $in: jobrole_ids } });
    }
    //12
    if (req.body.qualification_id) {
        req.body.qualification_id.map(elem => {
            qualification_ids.push(ObjectID(elem.id))
        })
        //selector["$and"].push({ "jobBasicInfo.jobrole_id" : { $in: qualification_ids } });
    }
    // 13
    if (req.body.skill_id) {
        req.body.skill_id.map(elem => {
            skill_ids.push(ObjectID(elem.id))
        })
        selector["$or"].push({ "requiredSkills.primarySkills.skill_id" : { $in: skill_ids } });
        selector["$or"].push({ "requiredSkills.secondarySkills.skill_id" : { $in: skill_ids } });
        selector["$or"].push({ "requiredSkills.otherSkills.skill_id" : { $in: skill_ids } });
        selector["$or"].push({ "requiredSkills.preferredSkills.skill_id" : { $in: skill_ids } });
        
    }else{
        delete selector["$or"];
    }
    // 14
    if (req.body.minExp != null  && req.body.maxExp != null) {
        selector["$and"].push({ "eligibility.minExperience" : { '$gte' : req.body.minExp,  '$lte' : req.body.maxExp} });
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
function getStates(){ 
    return new Promise(function(resolve,reject){ 
        StateMaster.find({})
            .exec()
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            });            
    });
}
function getDistricts(state_id){ 
    return new Promise(function(resolve,reject){ 
        
        DistrictMaster.find({"stateID":ObjectID(state_id)})
            .exec()
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            });            
    });
}

function getEntity(state_id){ 
    return new Promise(function(resolve,reject){
        EntityMaster.find({entityType : "corporate"})
            .exec()
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            });            
    });
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
function getJobSectors(){ 
    return new Promise(function(resolve,reject){ 
        JobSectorMaster.find({})
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
function getJobShift(){ 
    return new Promise(function(resolve,reject){ 
        JobShiftMaster.find({})
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
function getQualification(){ 
    return new Promise(function(resolve,reject){ 
        QualificationMaster.find({})
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
        var states          = await getStates();
        var entities        = await getEntity();
        var industries      = await getIndustries();
        var funAreas        = await getFunctionalAreas();
        var jobSectors      = await getJobSectors();
        var jobRoles        = await getJobRoles();
        var jobTypes        = await getJobType();
        var jobShifts       = await getJobShift();
        var jobTimes        = await getJobTime();
        var qualifications  = await getQualification();
        var gender          = ["Male Only","Female Only","Both (Male & Female)"];
        /*var states          = [{"state":"Andaman and Nicobar Islands", "stateCode": "AN"},
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
        ]*/
        var jobsArray = []; 
        for (var k = 0; k < req.body.noofjobs; k++) {
            var randomStateIndex        = Math.floor(Math.random() * states.length);
            var districts               = await getDistricts(states[randomStateIndex]._id);
            var randomDistrictIndex     = Math.floor(Math.random() * districts.length);
            //console.log("districts[randomDistrictIndex]",districts)
            var company_id              = entities[Math.floor(Math.random() * entities.length)]._id;
            var industry_id             = industries[Math.floor(Math.random() * industries.length)]._id;
            var functionalarea_id       = funAreas[Math.floor(Math.random() * funAreas.length)]._id;;
            var subfunAreas             = await getSubFunctionalAreas(functionalarea_id);
            var subfunctionalarea_id    = subfunAreas[Math.floor(Math.random() * subfunAreas.length)] ? subfunAreas[Math.floor(Math.random() * subfunAreas.length)]._id : "";
            var jobsector_id            = jobSectors[Math.floor(Math.random() * jobSectors.length)]._id;
            var jobrole_id              = jobRoles[Math.floor(Math.random() * jobRoles.length)]._id;
            var jobtype_id              = jobTypes[Math.floor(Math.random() * jobTypes.length)]._id;
            var jobtime_id              = jobTimes[Math.floor(Math.random() * jobTimes.length)]._id;
            var jobshift_id             = jobShifts[Math.floor(Math.random() * jobShifts.length)]._id;
            var mineducation_id         = qualifications[Math.floor(Math.random() * qualifications.length)]._id
            
            var jobObject = {
                "company_id"    : company_id,
                "jobBasicInfo"  :   {
                                    "jobTitle"              : jobRoles[Math.floor(Math.random() * jobRoles.length)].jobRole,
                                    "industry_id"           : industry_id,
                                    "functionalarea_id"     : functionalarea_id,
                                    "subfunctionalarea_id"  : subfunctionalarea_id,
                                    "jobrole_id"            : jobrole_id,
                                    "gender"                : gender[Math.floor(Math.random() * gender.length)],
                                    "workFromHome"          : 0,
                                    "jobtype_id"            : jobtype_id,
                                    "jobshift_id"           : jobshift_id,
                                    "jobtime_id"            : jobtime_id,
                                    "jobsector_id"          : jobsector_id,
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
                                    "district"              : districts[randomDistrictIndex] ? camelCase(districts[randomDistrictIndex].districtName) : "",
                                    "state"                 : camelCase(states[randomStateIndex].stateName),
                                    "stateCode"             : states[randomStateIndex].stateCode,   
                                    "country"               : "India",
                                    "countryCode"           : "IN",
                                    "pincode"               : ""
                                }, 
                "ctcOffered"    :   {
                                    "minSalary"             : Math.floor(Math.random()*20000),
                                    "minSalPeriod"          : "Per Year",
                                    "maxSalary"             : Math.floor(Math.random()*30000),
                                    "maxSalPeriod"          : "Per Year",
                                },
            
                "eligibility"   :   {
                                    "mineducation_id"       : mineducation_id,
                                    "minExperience"         : Math.floor(Math.random()*10)
                                },  
                "createdAt"     :   new Date()                                         
            }
            //console.log(jobObject)
            jobsArray.push(jobObject) 
            
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
function camelCase(str) {
        return str.toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
}