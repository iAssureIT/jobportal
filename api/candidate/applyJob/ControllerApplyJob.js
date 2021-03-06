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
     //ApplyJob.find({"candidate_id": req.params.candidate_id}) 

    ApplyJob.aggregate([
        { "$match" : { "candidate_id" : ObjectId(req.body.candidate_id) } },
        { "$lookup": {
            "from": "jobs",
            "as": "jobDetails",
            "localField": "job_id",
            "foreignField": "_id"
        }}
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
exports.appliedJobCount = (req,res,next)=>{
    console.log(req.params.candidate_id);
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
//applicantsCountList
exports.applicantsCountList = (req,res,next)=>{
    //console.log(req.params.candidate_id);
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
};
//candidatesAppliedToJob
exports.candidatesAppliedToJob = (req,res,next)=>{

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
    ApplyJob.deleteOne({_id:req.body.job_id})
    .exec()
    .then(data=>{
       
            res.status(200).json({ deleted : true });
        
    })
    .catch(err =>{
        res.status(500).json({ error: err });
    });
};