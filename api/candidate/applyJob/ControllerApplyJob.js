const mongoose	= require("mongoose");
var ObjectId = require('mongodb').ObjectID;
const ApplyJob = require('./ModelApplyJob');
const _ = require('underscore');   

exports.applyJob = (req,res,next)=>{
    console.log(req.body)
    const applyjob = new ApplyJob({
            _id                   : new mongoose.Types.ObjectId(),                    
            candidate_id          : req.body.candidate_id,
            jobID                 : req.body.jobID,
            employerID            : req.body.employerID,
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
            "localField": "jobID",
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
            "localField": "jobID",
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
        { "$match" : { "employerID" : ObjectId(req.body.employerID) } },
        { "$group" : { _id: "$jobID", candidatesApplied: { $sum: 1 } }}
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
    ApplyJob.aggregate([
        { $match : { "jobID" : ObjectId(req.body.jobID) } },
        { $lookup: {
                    from: "candidatemasters",
                    as: "candidate",
                    localField: "candidate_id",
                    foreignField: "_id"}
        },
        {$lookup:{
                   from: "addresstypemasters",
                   localField: "candidate.address.addressType",
                   foreignField: "_id",
                   as: "addressType" } 
        },
        {$lookup:{
                   from: "qualificationlevelmasters",
                   localField: "candidate.academics.qualificationLevel",
                   foreignField: "_id",
                   as: "qualificationlevel" } 
        },   
        {$lookup:{
                   from: "qualificationmasters",
                   localField: "candidate.academics.qualification",
                   foreignField: "_id",
                   as: "qualification" } 
        },
        {$lookup:{
                   from: "universitymasters",
                   localField: "candidate.academics.universityBoard",
                   foreignField: "_id",
                   as: "universityBoard" } 
        },
        {$lookup:{
                   from: "collagemasters",
                   localField: "candidate.academics.collegeSchool",
                   foreignField: "_id",
                   as: "collegeSchool" } 
        }
            
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