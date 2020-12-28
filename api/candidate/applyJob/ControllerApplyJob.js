const mongoose	= require("mongoose");
var ObjectId = require('mongodb').ObjectID;
const ApplyJob = require('./ModelApplyJob');
const _ = require('underscore');   

exports.applyJob = (req,res,next)=>{
    console.log(req.body)
    const applyjob = new ApplyJob({
            _id                   : new mongoose.Types.ObjectId(),                    
            candidateID           : req.body.candidateID,
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


exports.getCandidateAppliedJobList = (req,res,next)=>{
     //ApplyJob.find({"candidateID": req.params.candidateID}) 

    ApplyJob.aggregate([
        { "$match" : { "candidateID" : ObjectId(req.body.candidateID) } },
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
    console.log(req.params.candidateID);
    ApplyJob.aggregate([
        { "$match" : { "candidateID" : ObjectId(req.params.candidateID) } },
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
    //console.log(req.params.candidateID);
    ApplyJob.aggregate([
        { "$unwind": "$appliedItems" },
        { "$match" : { "appliedItems.employerID" : ObjectId(req.body.employerID) } },
        { "$group" : { _id: "$appliedItems.jobID", candidatesApplied: { $sum: 1 } }}
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
                    localField: "candidateID",
                    foreignField: "_id"}
        },
        {$lookup:{
                   from: "addresstypemasters",
                   localField: "address.addressType",
                   foreignField: "_id",
                   as: "addressType" } 
        },
        {$lookup:{
                   from: "qualificationlevelmasters",
                   localField: "academics.qualificationLevel",
                   foreignField: "_id",
                   as: "qualificationlevel" } 
        },   
        {$lookup:{
                   from: "qualificationmasters",
                   localField: "academics.qualification",
                   foreignField: "_id",
                   as: "qualification" } 
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