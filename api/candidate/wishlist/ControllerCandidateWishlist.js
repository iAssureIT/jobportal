const mongoose	= require("mongoose");
var ObjectId = require('mongodb').ObjectID;
const Wishlist = require('./ModelCandidateWishlist');
const _ = require('underscore');   

exports.manage_wishlist = (req,res,next)=>{
    console.log(req.body)
	Wishlist.findOne({"candidate_id": req.body.candidate_id})
		.exec()
		.then(data =>{
            
            if(data){
                Wishlist.findOne({"candidate_id": req.body.candidate_id, "wishlistItems.job_id": req.body.job_id })
                .exec()
                .then(jobdata =>{
                    console.log("jobdata",jobdata)
                    if (jobdata) {
                        Wishlist.updateOne(
                        {"candidate_id": req.body.candidate_id},
                        { $pull: {"wishlistItems":{"job_id": req.body.job_id } } }
                        )
                        .exec()
                        .then(data=>{
                            res.status(200).json({
                                "message": "Job is removed from wishlist",
                            });
                        })
                        .catch(err =>{
                            // console.log('2',err);
                            res.status(500).json({
                                error: err
                            });
                        });
                    }else{
                        var wishlistItems = {
                            'job_id' : req.body.job_id
                        }
                        Wishlist.updateOne(
                            {"candidate_id": req.body.candidate_id},
                            {
                                $push:{
                                    'wishlistItems' : wishlistItems,
                                },
                            }
                        )
                        .exec()
                        .then(data=>{
                            if(data.nModified == 1){
                                res.status(200).json({
                                    "message": "Job is added to wishlist",
                                });
                            }else{
                                res.status(401).json({
                                    "message": "Failed to add in wishlist"
                                });
                            }
                        })
                        .catch(err =>{
                            // console.log('2',err);
                            res.status(500).json({
                                error: err
                            });
                        });
                    }
                })
                .catch(err =>{
                    res.status(500).json({
                        error: err
                    });
                });
            }else{
               
                const wishlists = new Wishlist({
                    _id                   : new mongoose.Types.ObjectId(),                    
                    candidate_id           : req.body.candidate_id,
                    wishlistItems         : [{"job_id": req.body.job_id}],  
                    createdBy             : req.body.createdBy,
                    createdAt             : new Date()
                });
                wishlists.save()
                .then(datas=>{
                    res.status(200).json({
                        "message": "Job is added to wishlist",
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


exports.getCandidateWishlist = (req,res,next)=>{
    console.log(req.body.candidate_id)
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
    console.log("list selector - ", selector);

    var limit = req.body.startLimit === 0 ? req.body.initialLimit : req.body.showMoreLimit
    console.log(req.body.startLimit)
    console.log(limit)

    Wishlist.find({"candidate_id": ObjectId(req.body.candidate_id)}).sort({ createdAt: -1 })
    .populate( 'wishlistItems.job_id', null, selector ) 
    .populate({path : 'wishlistItems.job_id', model : 'jobs',
                populate: {
                  path: 'company_id',
                  model: 'entitymasters'
                },
                match : selector 
            })  
    .exec(function(err, jobs) {
            console.log(err)
            if (err) return res.status(500).json({
                error: err
            });
            console.log("jobs",jobs)
            res.status(200).json(jobs);
        });

    //Wishlist.find({"candidate_id": req.params.candidate_id})     
    /*Wishlist.aggregate([
        { "$match" : { "candidate_id" : ObjectId(req.body.candidate_id) } },
        { "$unwind": "$wishlistItems" },
        { "$lookup": {
            "from": "jobs",
            "as": "wishlistItems.jobDetail",
            "localField": "wishlistItems.job_id",
            "foreignField": "_id"
        }},
        { "$unwind": "$wishlistItems.jobDetail" }    
    ])  
    .exec()
    .then(data=>{
        //console.log(data)
        res.status(200).json(data);
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        });
    });*/
};
exports.countCandidateWishlist = (req,res,next)=>{
    console.log(req.params.candidate_id);
    Wishlist.aggregate([
        { "$match" : { "candidate_id" : ObjectId(req.params.candidate_id) } },
        { "$unwind": "$wishlistItems" },
        { "$lookup": {
            "from": "jobs",
            "as": "wishlistItems.jobDetail",
            "localField": "wishlistItems.job_id",
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
