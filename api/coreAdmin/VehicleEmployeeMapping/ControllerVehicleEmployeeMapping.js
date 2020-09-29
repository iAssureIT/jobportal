const mongoose  = require("mongoose");
var moment      = require('moment');
var   ObjectId          = require('mongodb').ObjectID;


const VehicleEmployeeMapping = require('./ModelVehicleEmployeeMapping.js');

exports.insertVehicleEmployeeMapping = (req,res,next)=>{
    processData();
    async function processData(){
        var getData = await fetchData()
        var category = getData.filter((data)=>{
        if ((data.empCategory == req.body.empCategory) && (data.company === req.body.company)) {
            return data;
        }
        })
        if(category.length > 0) {
            res.status(200).json({ duplicated : true });
        }else{
            const vehicleEmployeeMappingMaster = new VehicleEmployeeMapping({
                _id             : new mongoose.Types.ObjectId(),
                empCategory     : req.body.empCategory,
                company     : req.body.company,
                VehicleCategory : req.body.VehicleCategory,
                createdBy       : req.body.createdBy,
                createdAt       : new Date(),
            })
            vehicleEmployeeMappingMaster.save()
            .then(data=>{
                res.status(200).json({ created : true, id : data._id });
            })
            .catch(err =>{
                res.status(500).json({ error: err }); 
            });
        }
    } 
    
};

var fetchData = async ()=>{
    return new Promise(function(resolve,reject){ 
    VehicleEmployeeMapping.find({})
        .exec()
        .then(data=>{
            resolve( data );
        })
        .catch(err =>{
            reject(err);
        }); 
    });
};

exports.getAllVehicleEmployeeMapping = (req,res,next)=>{
    VehicleEmployeeMapping.aggregate([
        {$lookup:
            {
                from:"categorymasters",
                localField: "VehicleCategory.category_id",
                foreignField: "_id",
                as:"vehicle"
             }
        },
        {$lookup:
            {
                from:"entitymasters",
                localField: "company",
                foreignField: "companyID",
                as:"company"
             }
        }
        
    ])
    .sort({createdAt : -1})
    .exec() 
    .then(data=>{
        res.status(200).json(data);
    })
    .catch(err =>{
        res.status(500).json({ error: err });
    });

}

exports.getAllCompanyVehicleEmployeeMapping = (req,res,next)=>{
    VehicleEmployeeMapping.aggregate([
        {$match:{'company':req.body.company}},
        {$lookup:
            {
                from:"categorymasters",
                localField: "VehicleCategory.category_id",
                foreignField: "_id",
                as:"vehicle"
             }
        },
        {$lookup:
            {
                from:"entitymasters",
                localField: "company",
                foreignField: "companyID",
                as:"company"
             }
        }
        
    ])
    .sort({createdAt : -1})
    .exec() 
    .then(data=>{
        res.status(200).json(data);
    })
    .catch(err =>{
        res.status(500).json({ error: err });
    });

}

exports.getSingleVehicleEmployeeMapping = (req,res,next)=>{
    VehicleEmployeeMapping.findOne({"_id":req.params.id})
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
}

exports.updateVehicleEmployeeMapping = (req,res,next)=>{
    VehicleEmployeeMapping.updateOne(

        { "_id" : req.body.id},
        {
            $set:{
                "VehicleCategory"    : req.body.VehicleCategory
            }
        }
        )
        .exec()
        .then(data=>{
            if(data.nModified == 1){
                VehicleEmployeeMapping.updateOne(
                { _id:req.body.id},
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
                res.status(404).json("Data Not found");
            }
        })
        .catch(err =>{
            res.status(500).json({
                error: err
            });
        });
}
exports.deleteVehicleEmployeeMapping = (req, res, next)=>{
    VehicleEmployeeMapping.deleteOne({_id: req.params.id})
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

exports.getSelectedVehicleData = (req,res,next)=>{
    VehicleEmployeeMapping.find({"company":req.body.company,"empCategory":req.body.empCategory,"VehicleCategory.category_id":req.body.vehicleCategory})
    .exec()
    .then(data=>{
        res.status(200).json(data);
    })
    .catch(err =>{
        res.status(500).json({ error: err });
    }); 
}
