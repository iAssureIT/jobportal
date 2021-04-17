const mongoose	            = require("mongoose");
var ObjectId                = require('mongodb').ObjectID;
const ApplyJob              = require('./ModelApplyJob');
const CandidateProfile      = require('../profile/ModelCandidateProfile.js');
const _ = require('underscore');   

exports.applyJob = (req,res,next)=>{
    console.log(req.body)
    const applyjob = new ApplyJob({
            _id                   : new mongoose.Types.ObjectId(),                    
            candidate_id          : req.body.candidate_id,
            job_id                 : req.body.job_id,
            entity_id            : req.body.entity_id,
            appliedDate           : new Date(),
            status                : req.body.status,   
            applicationViewed     : false,  
            createdBy             : req.body.createdBy,
            createdAt             : new Date()
        });
        applyjob.save()
		.then(data =>{
            res.status(200).json({ "message": "You have applied to job" });		
	})
	.catch(err =>{
        // console.log('5',err);
		res.status(500).json({
			error: err
		});
	});
};


exports.appliedJobList = (req,res,next)=>{
    console.log("candidate_id",req.body.candidate_id);
    
    var selector = {};
    var industry_ids = [];
    var funarea_ids = [];
    var subfunarea_ids = [];
    var jobsector_ids = [];
    var jobtype_ids = [];
    var jobtime_ids = [];
    var jobshift_ids = [];
    var jobroles_ids = [];
    var qualification_ids = [];
    var skill_ids = [];

    selector['$or'] = [];
    selector['$and'] = [];

    selector["$and"].push({
        "location.countryCode": "IN"
    })
    
    // 1
    if (req.body.stateCode && req.body.stateCode != "all") {
        selector["$and"].push({
            "location.stateCode": req.body.stateCode
        })
    }
    // 2
    if (req.body.district && req.body.district != "all") {
        selector["$and"].push({
            "location.district": req.body.district
        })
    }
    // 3
    if (req.body.company_id) {

        selector["$and"].push({
            "jobBasicInfo.company_id": ObjectId(req.body.company_id)
        });
    }
    // 4
    if (req.body.industry_id) {
        req.body.industry_id.map(elem => {
            industry_ids.push(ObjectId(elem.id))
        })
        selector["$and"].push({
            "jobBasicInfo.industry_id": {
                $in: industry_ids
            }
        });
    }
    // 5
    if (req.body.functionalArea_id) {
        req.body.functionalArea_id.map(elem => {
            funarea_ids.push(ObjectId(elem.id))
        })
        selector["$and"].push({
            "jobBasicInfo.functionalarea_id": {
                $in: funarea_ids
            }
        });
    }
    // 6
    if (req.body.subfunctionalArea_id) {
        req.body.subfunctionalArea_id.map(elem => {
            subfunarea_ids.push(ObjectId(elem.id))
        })
        selector["$and"].push({
            "jobBasicInfo.subfunctionalarea_id": {
                $in: subfunarea_ids
            }
        });
    }
    // 7
    if (req.body.jobSector_id) {
        req.body.jobSector_id.map(elem => {
            jobsector_ids.push(ObjectId(elem.id))
        })
        selector["$and"].push({
            "jobBasicInfo.jobsector_id": {
                $in: jobsector_ids
            }
        });
    }
    // 8
    if (req.body.jobType_id) {
        req.body.jobType_id.map(elem => {
            jobtype_ids.push(ObjectId(elem.id))
        })
        selector["$and"].push({
            "jobBasicInfo.jobtype_id": {
                $in: jobtype_ids
            }
        });
    }
    // 9
    if (req.body.jobTime_id) {
        req.body.jobTime_id.map(elem => {
            jobtime_ids.push(ObjectId(elem.id))
        })
        selector["$and"].push({
            "jobBasicInfo.jobtime_id": {
                $in: jobtime_ids
            }
        });
    }
    // 10
    if (req.body.jobShift_id) {
        req.body.jobShift_id.map(elem => {
            jobshift_ids.push(ObjectId(elem.id))
        })
        selector["$and"].push({
            "jobBasicInfo.jobshift_id": {
                $in: jobshift_ids
            }
        });
    }
    // 11
    if (req.body.jobRole_id) {
        req.body.jobRole_id.map(elem => {
            jobroles_ids.push(ObjectId(elem.id))
        })
        selector["$and"].push({
            "jobBasicInfo.jobrole_id": {
                $in: jobroles_ids
            }
        });
    }
    // 12
    if (req.body.qualification_id) {
        req.body.qualification_id.map(elem => {
            qualification_ids.push(ObjectId(elem.id))
        })
        selector["$and"].push({
            "eligibility.mineducation_id": {
                $in: qualification_ids
            }
        });
    }
    // 13
    if (req.body.skill_id) {
        req.body.skill_id.map(elem => {
            skill_ids.push(ObjectId(elem.id))
        })
        selector["$or"].push({
            "requiredSkills.primarySkills.skill_id": {
                $in: skill_ids
            }
        });
        selector["$or"].push({
            "requiredSkills.secondarySkills.skill_id": {
                $in: skill_ids
            }
        });
        selector["$or"].push({
            "requiredSkills.otherSkills.skill_id": {
                $in: skill_ids
            }
        });
        selector["$or"].push({
            "requiredSkills.preferredSkills.skill_id": {
                $in: skill_ids
            }
        });

    } else {
        delete selector["$or"];
    }
    // 14
    if (req.body.minExp != null && req.body.maxExp != null) {
        selector["$and"].push({
            "eligibility.minExperience": {
                '$gte': req.body.minExp,
                '$lte': req.body.maxExp
            }
        });
    }
    //console.log("list selector - ", selector);

    var limit = req.body.startLimit === 0 ? req.body.initialLimit : req.body.showMoreLimit
    console.log(req.body.startLimit)
    console.log(limit)
    
    ApplyJob.find({"candidate_id": req.body.candidate_id}).sort({ createdAt: -1 })
    .populate( 'job_id', null, selector )   
    .exec(function(err, jobs) {
            console.log(err)
            if (err) return res.status(500).json({
                error: err
            });
                //console.log("jobs",jobs)
            res.status(200).json(jobs);
        });
    
};
exports.appliedJobCount = (req,res,next)=>{
    //console.log(req.params.candidate_id);
    ApplyJob.aggregate([
        { "$match" : { "candidate_id" : ObjectId(req.params.candidate_id) } },
        { "$lookup": {
            "from": "jobs",
            "as": "jobDetail",
            "localField": "job_id",
            "foreignField": "_id"
        }},
            
    ])
    .exec()
    .then(data=>{
        res.status(200).json(data);
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        });
    });
};
//totalApplicantsCountList
exports.totalApplicantsCountList = (req,res,next)=>{
    console.log("count",req.body);
    if (req.body.entity_id) {
        ApplyJob.aggregate([
            { "$match" : { "entity_id" : ObjectId(req.body.entity_id) } },
            { "$group" : { _id: "$job_id", candidatesApplied: { $sum: 1 } }}
        ])
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({
                error: err
            });
        });
    }else{
        ApplyJob.aggregate([
            { "$group" : { _id: "$job_id", candidatesApplied: { $sum: 1 } }}
        ])
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({
                error: err
            });
        });
    } 
};
exports.countryApplicantsCountList = (req,res,next)=>{
    console.log("count",req.body);
    if (req.body.entity_id) {
        ApplyJob.aggregate([
            {
                $lookup:    {
                                from: "candidatemasters",
                                localField: "candidate_id",
                                foreignField: "_id",
                                as: "candidates"
                            }
            },    
            { "$match" : {  "entity_id" : ObjectId(req.body.entity_id), "candidates.address.countryCode" : req.body.countryCode } },
            { "$group" : { _id: "$job_id", candidatesApplied: { $sum: 1 } }}
        ])
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({
                error: err
            });
        });
    }else{
        ApplyJob.aggregate([
            {
                $lookup:    {
                                from: "candidatemasters",
                                localField: "candidate_id",
                                foreignField: "_id",
                                as: "candidates"
                            }
            },    
            { "$match" : {  "candidates.address.countryCode" : req.body.countryCode } },
            { "$group" : { _id: "$job_id", candidatesApplied: { $sum: 1 } }}
        ])
        
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({
                error: err
            });
        });
    } 
};

exports.stateApplicantsCountList = (req,res,next)=>{
    console.log("count",req.body);
    if (req.body.entity_id) {
        ApplyJob.aggregate([
            {
                $lookup:    {
                                from: "candidatemasters",
                                localField: "candidate_id",
                                foreignField: "_id",
                                as: "candidates"
                            }
            },    
            { "$match" : {  "entity_id" : ObjectId(req.body.entity_id), "candidates.address.stateCode" : req.body.stateCode } },
            { "$group" : { _id: "$job_id", candidatesApplied: { $sum: 1 } }}
        ])
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({
                error: err
            });
        });
    }else{
        ApplyJob.aggregate([
            {
                $lookup:    {
                                from: "candidatemasters",
                                localField: "candidate_id",
                                foreignField: "_id",
                                as: "candidates"
                            }
            },    
            { "$match" : {  "candidates.address.stateCode" : req.body.stateCode } },
            { "$group" : { _id: "$job_id", candidatesApplied: { $sum: 1 } }}
        ])
        
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({
                error: err
            });
        });
    } 
};
exports.districtApplicantsCountList = (req,res,next)=>{
    console.log("count",req.body);
    if (req.body.entity_id) {
        ApplyJob.aggregate([
            {
                $lookup:    {
                                from: "candidatemasters",
                                localField: "candidate_id",
                                foreignField: "_id",
                                as: "candidates"
                            }
            },    
            { "$match" : {  "entity_id" : ObjectId(req.body.entity_id), "candidates.address.district" : req.body.district } },
            { "$group" : { _id: "$job_id", candidatesApplied: { $sum: 1 } }}
        ])
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({
                error: err
            });
        });
    }else{
        ApplyJob.aggregate([
            {
                $lookup:    {
                                from: "candidatemasters",
                                localField: "candidate_id",
                                foreignField: "_id",
                                as: "candidates"
                            }
            },    
            { "$match" : {  "candidates.address.district" : req.body.district } },
            { "$group" : { _id: "$job_id", candidatesApplied: { $sum: 1 } }}
        ])
        
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({
                error: err
            });
        });
    } 
};
//maleApplicantsCountList
exports.maleApplicantsCountList = (req,res,next)=>{
    console.log("count",req.body);
    if (req.body.entity_id) {
        ApplyJob.aggregate([
            {
                $lookup:    {
                                from: "candidatemasters",
                                localField: "candidate_id",
                                foreignField: "_id",
                                as: "candidates"
                            }
            },    
            { "$match" : {  "entity_id" : ObjectId(req.body.entity_id), "candidates.basicInfo.gender" : "male" } },
            { "$group" : { _id: "$job_id", candidatesApplied: { $sum: 1 } }}
        ])
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({
                error: err
            });
        });
    }else{
        ApplyJob.aggregate([
            {
                $lookup:    {
                                from: "candidatemasters",
                                localField: "candidate_id",
                                foreignField: "_id",
                                as: "candidates"
                            }
            },    
            { "$match" : {  "candidates.basicInfo.gender" : "male" } },
            { "$group" : { _id: "$job_id", candidatesApplied: { $sum: 1 } }}
        ])
        
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({
                error: err
            });
        });
    } 
};

exports.femaleApplicantsCountList = (req,res,next)=>{
    console.log("count",req.body);
    if (req.body.entity_id) {
        ApplyJob.aggregate([
            {
                $lookup:    {
                                from: "candidatemasters",
                                localField: "candidate_id",
                                foreignField: "_id",
                                as: "candidates"
                            }
            },    
            { "$match" : {  "entity_id" : ObjectId(req.body.entity_id), "candidates.basicInfo.gender" : "female" } },
            { "$group" : { _id: "$job_id", candidatesApplied: { $sum: 1 } }}
        ])
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({
                error: err
            });
        });
    }else{
        ApplyJob.aggregate([
            {
                $lookup:    {
                                from: "candidatemasters",
                                localField: "candidate_id",
                                foreignField: "_id",
                                as: "candidates"
                            }
            },    
            { "$match" : {  "candidates.basicInfo.gender" : "female" } },
            { "$group" : { _id: "$job_id", candidatesApplied: { $sum: 1 } }}
        ])
        
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({
                error: err
            });
        });
    } 
};

exports.otherApplicantsCountList = (req,res,next)=>{
    console.log("count",req.body);
    if (req.body.entity_id) {
        ApplyJob.aggregate([
            {
                $lookup:    {
                                from: "candidatemasters",
                                localField: "candidate_id",
                                foreignField: "_id",
                                as: "candidates"
                            }
            },    
            { "$match" : {  "entity_id" : ObjectId(req.body.entity_id), "candidates.basicInfo.gender" : "transgender" } },
            { "$group" : { _id: "$job_id", candidatesApplied: { $sum: 1 } }}
        ])
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({
                error: err
            });
        });
    }else{
        ApplyJob.aggregate([
            {
                $lookup:    {
                                from: "candidatemasters",
                                localField: "candidate_id",
                                foreignField: "_id",
                                as: "candidates"
                            }
            },    
            { "$match" : {  "candidates.basicInfo.gender" : "transgender" } },
            { "$group" : { _id: "$job_id", candidatesApplied: { $sum: 1 } }}
        ])
        
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({
                error: err
            });
        });
    } 
};
exports.expApplicantsCountList = (req,res,next)=>{
    console.log("count",req.body);
    if (req.body.entity_id) {
        ApplyJob.aggregate([
            {
                $lookup:    {
                                from: "candidatemasters",
                                localField: "candidate_id",
                                foreignField: "_id",
                                as: "candidates"
                            }
            },    
            { "$match" : {  "entity_id" : ObjectId(req.body.entity_id), "candidates.totalExperience" : { '$gte': req.body.minExp , '$lte' : req.body.maxExp } } },
            { "$group" : { _id: "$job_id", candidatesApplied: { $sum: 1 } }}
        ])
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({
                error: err
            });
        });
    }else{
        ApplyJob.aggregate([
            {
                $lookup:    {
                                from: "candidatemasters",
                                localField: "candidate_id",
                                foreignField: "_id",
                                as: "candidates"
                            }
            },    
            { "$match" : {  "candidates.totalExperience" : { '$gte': req.body.minExp , '$lte' : req.body.maxExp } } },
            { "$group" : { _id: "$job_id", candidatesApplied: { $sum: 1 } }}
        ])
        
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({
                error: err
            });
        });
    } 
};
//candidatesAppliedToJob
exports.candidatesAppliedToJob = (req,res,next)=>{
    console.log(req.body)
    ApplyJob.find({"job_id" : ObjectId(req.body.job_id)})
            .populate({path : 'candidate_id', model : 'candidatemasters',
                populate: {
                  path: 'address.addressType',
                  model: 'addresstypemasters'
                }
            })
            .populate({ path : 'candidate_id', model : 'candidatemasters',
                populate: {
                  path: 'academics.qualificationlevel_id',
                  model: 'qualificationlevelmasters'
                }
            })
            .populate({ path: 'candidate_id', model: 'candidatemasters',
                populate: {
                  path: 'academics.qualification_id',
                  model: 'qualificationmasters'
                }
            })
            .populate({ path: 'candidate_id', model: 'candidatemasters',
                populate: {
                  path: 'academics.university_id',
                  model: 'universitymasters'
                }
            })
            .populate({ path: 'candidate_id', model: 'candidatemasters',
                populate: {
                  path: 'workExperience.company_id',
                  model: 'entitymasters'
                }
            })
            .populate({ path: 'candidate_id', model: 'candidatemasters',
                populate: {
                  path: 'skills.skill_id',
                  model: 'skillmasters'
                }
            })
    .exec(function (err, candidate) {
    console.log(err)
    if (err) return res.status(500).json({ error: err });
    res.status(200).json(candidate);
    // prints "The author is Ian Fleming"
    });
};
exports.removeApplication = (req,res,next)=>{
    console.log(req.body)
    ApplyJob.deleteOne({job_id : ObjectId(req.body.job_id) })
    .exec()
    .then(data=>{
        if (data.deletedCount == 1) {
           res.status(200).json({ deleted : true }); 
       }else{

            res.status(200).json({ deleted : false });
       }
            
        
    })
    .catch(err =>{
        res.status(500).json({ error: err });
    });
};