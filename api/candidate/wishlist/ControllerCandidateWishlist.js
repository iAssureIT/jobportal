const mongoose	= require("mongoose");
var ObjectId = require('mongodb').ObjectID;
const Wishlist = require('./ModelCandidateWishlist');
const _ = require('underscore');   

exports.manage_wishlist = (req,res,next)=>{
    console.log(req.body)
	Wishlist.findOne({"candidateID": req.body.candidateID})
		.exec()
		.then(data =>{
            
            if(data){
                Wishlist.findOne({"candidateID": req.body.candidateID, "wishlistItems.jobID": req.body.jobID })
                .exec()
                .then(jobdata =>{
                    console.log("jobdata",jobdata)
                    if (jobdata) {
                        Wishlist.updateOne(
                        {"candidateID": req.body.candidateID},
                        { $pull: {"wishlistItems":{"jobID": req.body.jobID } } }
                        )
                        .exec()
                        .then(data=>{
                            res.status(200).json({
                                "message": "Job is removed from wishlist.",
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
                            'jobID' : req.body.jobID
                        }
                        Wishlist.updateOne(
                            {"candidateID": req.body.candidateID},
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
                                    "message": "Job is added to wishlist.",
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
                    candidateID           : req.body.candidateID,
                    wishlistItems         : [{"jobID": req.body.jobID}],  
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
    console.log(req.body.candidateID)
    //Wishlist.find({"candidateID": req.params.candidateID})     
    Wishlist.aggregate([
        { "$match" : { "candidateID" : ObjectId(req.body.candidateID) } },
        { "$unwind": "$wishlistItems" },
        { "$lookup": {
            "from": "jobs",
            "as": "wishlistItems.jobDetail",
            "localField": "wishlistItems.jobID",
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
    console.log(req.params.candidateID);
    Wishlist.aggregate([
        { "$match" : { "candidateID" : ObjectId(req.params.candidateID) } },
        { "$unwind": "$wishlistItems" },
        { "$lookup": {
            "from": "jobs",
            "as": "wishlistItems.jobDetail",
            "localField": "wishlistItems.jobID",
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
