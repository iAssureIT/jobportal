const mongoose          = require("mongoose");
const FunctionalAreaMaster    = require('./ModelFunctionalAreaMaster.js');
 

exports.insertFunctionalArea = (req,res,next)=>{
    processData();
    async function processData(){
    var allFunctionalAreas = await fetchFunctionalAreas();
    var functionalArea = allFunctionalAreas.filter((data)=>{
        if (data.functionalArea.trim().toLowerCase() == req.body.fieldValue.trim().toLowerCase()) {
            return data;
        }
        })
        if (functionalArea.length > 0) {
            res.status(200).json({ duplicated : true });
        }else{
            const functionalAreaMaster = new FunctionalAreaMaster({
                            _id                         : new mongoose.Types.ObjectId(),
                            functionalArea              : req.body.fieldValue,
                            iconUrl                     : req.body.iconUrl,    
                            createdBy                   : req.body.createdBy,
                            createdAt                   : new Date()
                        })
                        functionalAreaMaster.save()
                        .then(data=>{
                            res.status(200).json({ created : true, fieldID : data._id });
                        })
                        .catch(err =>{
                            res.status(500).json({ error: err }); 
                        });
        }
    }
};
var fetchFunctionalAreas = async ()=>{
    return new Promise(function(resolve,reject){ 
    FunctionalAreaMaster.find({})
        .exec()
        .then(data=>{
            resolve( data );
        })
        .catch(err =>{
            reject(err);
        }); 
    });
};
exports.countFunctionalAreas = (req, res, next)=>{
    FunctionalAreaMaster.find({}).count()
        .exec()
        .then(data=>{
            res.status(200).json({ count : data });
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};
exports.fetchFunctionalAreas = (req, res, next)=>{
    FunctionalAreaMaster.find({})
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
exports.getFunctionalAreas = (req, res, next)=>{
    FunctionalAreaMaster.find({})
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};
exports.fetchSingleFunctionalArea = (req, res, next)=>{
    FunctionalAreaMaster.findOne({ _id: req.params.fieldID })
        .exec()
        .then(data=>{
           res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};
exports.searchFunctionalArea = (req, res, next)=>{
    FunctionalAreaMaster.find({ functionalArea: { $regex : req.params.str ,$options: "i" }  })
        .exec()
        .then(data=>{
           res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};
exports.updateFunctionalArea = (req, res, next)=>{
    FunctionalAreaMaster.updateOne(
            { _id:req.body.fieldID },  
            {
                $set:   {  'functionalArea'       : req.body.fieldValue,
                           'iconUrl'        : req.body.iconUrl
                        }
            }
        )
        .exec()
        .then(data=>{
            if(data.nModified == 1){
                FunctionalAreaMaster.updateOne(
                { _id:req.body.fieldID},
                {
                    $push:  { 'updateLog' : [{  updatedAt      : new Date(),
                                                updatedBy      : req.body.updatedBy 
                                            }] 
                            }
                })
                .exec()
                .then(data=>{
                    res.status(200).json({ updated : true });
                })
            }else{
                res.status(200).json({ updated : false });
            }
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        });
};
exports.deleteFunctionalArea = (req, res, next)=>{
    FunctionalAreaMaster.deleteOne({_id: req.params.fieldID})
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



