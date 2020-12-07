const mongoose	= require("mongoose");
var ObjectId = require('mongodb').ObjectID;
const ApplyJob = require('./ModelApplyJob');
const _ = require('underscore');   

exports.applyJob = (req,res,next)=>{
    console.log(req.body)
	ApplyJob.findOne({"candidateID": req.body.candidateID})
		.exec()
		.then(data =>{
            
            if(data){
                var appliedItems = {
                        'jobID'                 : req.body.jobID,
                        'employerID'            : req.body.employerID,
                        'appliedDate'           : new Date(),
                        'status'                : req.body.status,
                        'applicationViewed'     : false
                    }
                ApplyJob.updateOne(
                    {"candidateID": req.body.candidateID},
                    {
                        $push:{
                            'appliedItems' : appliedItems,
                        },
                    }
                )
                .exec()
                .then(data=>{
                    if(data.nModified == 1){
                        res.status(200).json({
                            "message": "You have applied to job.",
                        });
                    }else{
                        res.status(401).json({
                            "message": "Failed to apply job."
                        });
                    }
                })
                .catch(err =>{
                    // console.log('2',err);
                    res.status(500).json({
                        error: err
                    });
                });
            }else{
                var appliedItems = {
                        'jobID'         : req.body.jobID,
                        'employerID'    : req.body.employerID,
                        'appliedDate'   : new Date(req.body.appliedDate),
                        'status'        : req.body.status,
                        'applicationViewed' : 0
                    }
                const applyjob = new ApplyJob({
                    _id                   : new mongoose.Types.ObjectId(),                    
                    candidateID           : req.body.candidateID,
                    appliedItems          : [appliedItems],  
                    createdBy             : req.body.createdBy,
                    createdAt             : new Date()
                });
                applyjob.save()
                .then(datas=>{
                    res.status(200).json({
                        "message": "You have applied to job.",
                    });
                })
                .catch(err =>{
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });
            }
		
	})
	.catch(err =>{
        // console.log('5',err);
		res.status(500).json({
			error: err
		});
	});
};


exports.getCandidateAppliedJobList = (req,res,next)=>{
    console.log(req.params.candidateID)
    //ApplyJob.find({"candidateID": req.params.candidateID})     
    ApplyJob.aggregate([
        { "$match" : { "candidateID" :req.params.candidateID } },
        { "$unwind": "$appliedItems" },
        { "$lookup": {
            "from": "jobs",
            "as": "appliedItems.jobDetail",
            "localField": "appliedItems.jobID",
            "foreignField": "_id"
        }},
        { "$unwind": "$appliedItems.jobDetail" }    
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
        { "$unwind": "$appliedItems" },
        { "$lookup": {
            "from": "jobs",
            "as": "appliedItems.jobDetail",
            "localField": "appliedItems.jobID",
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
