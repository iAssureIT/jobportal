const mongoose	             = require("mongoose");
const EmpVehicalMaster       = require('./ModelEmpVehicalMaster.js');

exports.insertEmpVehicalMaster = (req,res,next)=>{
        EmpVehicalMaster.findOne({  
            empCategory : req.body.empCategory   
            })
        .exec()
        .then(data=>{
                if(data)
                {
                    res.status(200).json({ duplicated : true });

                }else{
                    const empVehicalMaster = new EmpVehicalMaster({
                        _id                         : new mongoose.Types.ObjectId(),                        
                        empCategory                 : req.body.empCategory,
                        vehicalCategory             : req.body.vehicalCategory,
                        company_Id                  : req.body.company_Id,
                        createdBy                   : req.body.createdBy,
                        createdAt                   : new Date()
                    })
                    empVehicalMaster.save()
                    .then(data=>{
                        res.status(200).json({ created : true, fieldID : data._id });
                    })
                    .catch(err =>{
                        res.status(500).json({ error: err }); 
                    });
                }
            })
        .catch(err =>{
            res.status(500).json({ error: err }); 
        });
        
    }
        

/*function insertEmpVehicalMaster(brandId, createdBy){
    return new Promise(function(resolve,reject){ 
        const empVehicalMaster = new EmpVehicalMaster({
             _id                        : new mongoose.Types.ObjectId(),
            empCategory                 : empCategory,
            vehicalCategory             : vehicalCategory,
            createdBy                   : createdBy,
            createdAt                   : new Date()
        })
        empVehicalMaster.save()
        .then(data=>{
            resolve( data._id );
        })
        .catch(err =>{
            reject(err); 
        });
    });
}
*/
exports.fetchEmpVehicalMaster = (req, res, next)=>{
    EmpVehicalMaster.find({})
        .sort({createdAt : -1})
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};
exports.countEmpVehicalMaster = (req, res, next)=>{
    EmpVehicalMaster.find({}).count()
        .exec()
        .then(data=>{
            res.status(200).json({ count : data });
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};

exports.getEmpVehicalMaster = (req, res, next)=>{
    EmpVehicalMaster.find({})
        .sort({createdAt : -1})
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};
exports.fetchSingleEmpVehicalMaster = (req, res, next)=>{
    EmpVehicalMaster.findOne({ _id: req.params.fieldID })
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};
{/*exports.searchModel = (req, res, next)=>{
    ModelMaster.aggregate([
    {
    $lookup:
        {
           from: "brandmasters",
           localField: "brandId",
           foreignField: "_id",
           as: "brand"
        }
    },
    { "$unwind": "$brand" },
    { $addFields: { brandName : "$brand.brand"} },
    { $match : { model: { $regex : req.params.str ,$options: "i" } } }

    ])
    //ModelMaster.find({ model: { $regex : req.params.str ,$options: "i" }  })
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};
*/}
exports.updateEmpVehicalMaster = (req, res, next)=>{
    EmpVehicalMaster.updateOne(
        { _id:req.body.fieldID },  
        {
            $set:   {   'empCategory'     : req.body.empCategory,
                        'vehicalCategory' : req.body.vehicalCategory
                    }
        }
    )
    .exec()
    .then(data=>{
        if(data.nModified == 1){
            EmpVehicalMaster.updateOne(
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
        console.log(err);
        res.status(500).json({ error: err });
    });
};
exports.deleteEmpVehicalMaster = (req, res, next)=>{
    EmpVehicalMaster.deleteOne({_id: req.params.fieldID})
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





