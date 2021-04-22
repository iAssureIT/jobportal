const mongoose	        = require("mongoose");
const PackageMaster     = require('./ModelPackageMaster.js');


exports.insertPackage = (req,res,next)=>{
    
    const packageMaster = new PackageMaster({
                    _id                         : new mongoose.Types.ObjectId(),
                    packageName                 : req.body.packageName,
                    validity                    : req.body.validity,
                    jobsPublish                 : req.body.jobsPublish,
                    resumeDownloads             : req.body.resumeDownloads,
                    maxEmails                   : req.body.maxEmails,
                    videoIntroduction           : req.body.videoIntroduction,
                    robotInterviews             : req.body.robotInterviews,
                    currency                    : req.body.currency,
                    price                       : req.body.price,
                    createdBy                   : req.body.createdBy,
                    createdAt                   : new Date()
                })
                packageMaster.save()
                .then(data=>{
                    res.status(200).json({ created : true, package_id : data._id });
                })
                .catch(err =>{
                    res.status(500).json({ error: err }); 
                });
};

exports.countPackages = (req, res, next)=>{
    PackageMaster.find({}).count()
        .exec()
        .then(data=>{
            res.status(200).json({ count : data });
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};
exports.fetchPackages = (req, res, next)=>{
    PackageMaster.find()
        .sort({createdAt : -1})
        .skip(req.body.startRange)
        .limit(req.body.limitRange)
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};
exports.fetchListPackages = (req, res, next)=>{
    PackageMaster.find({})
        .sort({packageName : 1})
        .exec()
        .then(data=>{
            console.log('data', data);
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};
exports.fetchSinglePackage = (req, res, next)=>{
    PackageMaster.findOne({ _id: req.params.package_id })
        .exec()
        .then(data=>{
            res.status(200).json( data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};

exports.updatePackage = (req, res, next)=>{
    PackageMaster.updateOne(
            { _id:req.body.package_id},  
            {
                $set:   {   
                            'packageName'                 : req.body.packageName,
                            'validity'                    : req.body.validity,
                            'jobsPublish'                 : req.body.jobsPublish,
                            'resumeDownloads'             : req.body.resumeDownloads,
                            'maxEmails'                   : req.body.maxEmails,
                            'videoIntroduction'           : req.body.videoIntroduction,
                            'robotInterviews'             : req.body.robotInterviews,
                            'currency'                    : req.body.currency,
                            'price'                       : req.body.price,
                        }
            }
        )
        .exec()
        .then(data=>{
            if(data.nModified == 1){
                PackageMaster.updateOne(
                { _id:req.body.package_id},
                {
                    $push:  { 'updateLog' : [{  updatedAt      : new Date(),
                                                updatedBy      : req.body.updatedBy 
                                            }] 
                            }
                } )
                .exec()
                .then(data=>{
                    res.status(200).json({ updated : true });
                })
            }else{
                res.status(200).json({ updated : false });
            }
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({ error: err });
        });
};
exports.deletePackage = (req, res, next)=>{
    PackageMaster.deleteOne({_id: req.params.package_id})
        .exec()
        .then(data=>{
            if(data.deletedCount === 1){
                res.status(200).json({ deleted : true });
            }else{
                res.status(200).json({ deleted : false });
            }
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        });            
};



