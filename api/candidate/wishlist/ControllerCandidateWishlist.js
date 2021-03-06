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
    //Wishlist.find({"candidate_id": req.params.candidate_id})     
    Wishlist.aggregate([
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
    });
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
