const mongoose	        = require("mongoose");
const Contract          = require('./ModelContract.js');
var   ObjectId          = require('mongodb').ObjectId;
const CityNameMaster    = require('../cityNameMaster/ModelCityNameMaster.js');


exports.insertContract = (req,res,next)=>{
  console.log("req .body = ",req.body);
    Contract.findOne(
      {
        "companyId"         : req.body.companyId,  
        "entityId"          : req.body.entityId,
        "effectiveUpto"     : {$gt : new Date(req.body.contractDate) }
      })
    .then(data=>{
        console.log('data', data)
        if(data){
            res.status(200).json({ 
              message       : "DUPLICATE" ,
              contractDate  : data.contractDate,
              effectiveUpto : data.effectiveUpto,
            });
        }else{
            const contract = new Contract({
                _id                         : new mongoose.Types.ObjectId(),
                contractDate                : req.body.contractDate,
                effectiveUpto               : req.body.effectiveUpto, 
                companyId                   : req.body.companyId,
                companyLocationId           : req.body.companyLocationId,
                entityType                  : req.body.entityType,
                entityId                    : req.body.entityId,
                entityLocationId            : req.body.entityLocationId,
                contractDuration            : req.body.contractDuration,
                status                      : req.body.status,
                active                      : "Yes",
                createdBy                   : req.body.createdBy,
                createdAt                   : new Date()
            })
            contract.save()
            .then(data=>{
                res.status(200).json({ created : true, contractID : data._id });
            })
            .catch(err =>{
                res.status(500).json({ error: err }); 
            });
        }
    })
    .catch(error=>{});
};
exports.savePackage = (req,res,next)=>{
  // console.log("savePackage = ",req.body.packages);
    var packages = req.body.packages;
    Contract.updateOne(
        { "_id":ObjectId(req.body.contractID)},  
        {
            $set:   { 
              'packages'                    : packages,
              'earlyMorningChargesFromTime' : req.body.earlyMorningChargesFromTime,
              'earlyMorningChargesToTime'   : req.body.earlyMorningChargesToTime,
              'nightChargesFromTime'        : req.body.nightChargesFromTime,
              'nightChargesToTime'          : req.body.nightChargesToTime,
            }
            
        }
    )
    .exec()
    .then(data=>{
        // console.log("data response = ", data);
        res.status(200).json({ updated : true });
    })
    .catch(err =>{
        res.status(500).json({ error: err });
    });
};
//PL added function to Change status of contact Approval added from admin side 
exports.UpdateCorporateApprovalStatus = (req,res,next)=>{
    Contract.updateOne(
        { "_id":ObjectId(req.body.contractID)},  
        {
            $set:   { 'status' : req.body.status}
        }
    )
    .exec()
    .then(data=>{
        if(data.nModified == 1){
            Contract.updateOne(
            { _id:req.body.contractID},
            {
                $push:  { 'statusLog' : [{ 
                                          status        : req.body.status,
                                          statusAt      : new Date(),
                                          statusBy      : {
                                                        userid      : req.body.userid,
                                                        username    : req.body.username,
                                                        company     : req.body.company,
                                                        empid       : req.body.empid, 
                                                        companyId   : req.body.companyId, 
                                                        department  : req.body.department,  
                                                        designation : req.body.designation, 
                                                        address     : req.body.address, 
                                          },
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
        // res.status(200).json({ updated : true });
    })
    .catch(err =>{
        res.status(500).json({ error: err });
    });
};

exports.saveCondition = (req,res,next)=>{
  if (req.body.status) {
    Contract.updateOne(
        { "_id": ObjectId(req.body.contractID)},  
        {
            $set:   { 
                      'conditions' : req.body.conditions,
                      'status'     : req.body.status
                    }
        }
    )
    .exec()
    .then(data=>{
      if(data.nModified == 1){
          Contract.updateOne(
          { _id:req.body.contractID},
          {
              $push:  { 'statusLog' : [{ 
                                        status        : "edited",
                                        statusAt      : new Date(),
                                        statusBy      : {
                                                      userid      : req.body.userid,
                                                      username    : req.body.username,
                                                      company     : req.body.company,
                                                      empid       : req.body.empid, 
                                                      companyId   : req.body.companyId, 
                                                      department  : req.body.department,  
                                                      designation : req.body.designation, 
                                                      address     : req.body.address, 
                                        },
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
  }else{
    Contract.updateOne(
        { "_id": ObjectId(req.body.contractID)},  
        {
            $set:   { 'conditions' : req.body.conditions}
        }
    )
    .exec()
    .then(data=>{
        res.status(200).json({ updated : true });
    })
    .catch(err =>{
        res.status(500).json({ error: err });
    });
  }
};

exports.updatePackage = (req,res,next)=>{
  console.log("body = ",req.body);
    var packages    = req.body.packages;
    Contract.updateOne(
        { "_id":ObjectId(req.body.contractID)},  
        {
            $set:   { 
              'packages'                    : packages,
              'earlyMorningChargesFromTime' : req.body.earlyMorningChargesFromTime,
              'earlyMorningChargesToTime'   : req.body.earlyMorningChargesToTime,
              'nightChargesFromTime'        : req.body.nightChargesFromTime,
              'nightChargesToTime'          : req.body.nightChargesToTime,
              'status'                      : "edited",
            }
        }
    )
    .exec()
    .then(data=>{
        if(data.nModified == 1){
            Contract.updateOne(
            { _id:req.body.contractID},
            {
                $push:  { 'statusLog' : [{ 
                                          status        : "edited",
                                          statusAt      : new Date(),
                                          statusBy      : {
                                                        userid      : req.body.userid,
                                                        username    : req.body.username,
                                                        company     : req.body.company,
                                                        empid       : req.body.empid, 
                                                        companyId   : req.body.companyId, 
                                                        department  : req.body.department,  
                                                        designation : req.body.designation, 
                                                        address     : req.body.address, 
                                          },
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
        // res.status(200).json({ updated : true });
    })
    .catch(err =>{
        res.status(500).json({ error: err });
    });
};

exports.contractSign = (req,res,next)=>{
  console.log("body = ",req.body);
    Contract.updateOne(
            { "_id":req.body.contractID},  
            {
                $set:   { 
                    'status'                      : req.body.status,
                }
            }
        )
        .exec()
        .then(data=>{
            if(data.nModified == 1){
                Contract.updateOne(
                { _id:req.body.contractID},
                {
                    $push:  { 'statusLog' : [{ 
                                              status        : req.body.status,
                                              statusAt      : new Date(),
                                              statusBy      : {
                                                            userid      : req.body.userid,
                                                            username    : req.body.username,
                                                            company     : req.body.company,
                                                            empid       : req.body.empid, 
                                                            companyId   : req.body.companyId, 
                                                            department  : req.body.department,  
                                                            designation : req.body.designation, 
                                                            address     : req.body.address,
                                              },
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

exports.countContracts = (req, res, next)=>{
    Contract.find().count()
        .exec()
        .then(data=>{
            res.status(200).json( data );
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};
exports.fetchContracts = (req, res, next)=>{
    Contract.find({})
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
exports.getContracts = (req, res, next)=>{
  // console.log("In getContracts ");
    Contract.aggregate([
        {
           $lookup: {
              from: "entitymasters",
              localField: "companyId",    
              foreignField: "_id",  
              as: "company"
           }
        },
        {
           $unwind:"$company"
        },
        {
           $lookup: {
              from: "entitymasters",
              localField: "entityId",   
              foreignField: "_id",  
              as: "entity"
           }
        },
        {
           $unwind:"$entity"
        },
     ])
        .sort({createdAt : -1})
        .exec()
        .then(data=>{
          // console.log("In getContracts Data = ",data);
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};
exports.joincontract = (req, res, next)=>{
  console.log("in join contract body = ", req.params.contractID);
    Contract.aggregate([
        
        {
            $lookup: {
               from: "entitymasters",
               localField: "companyId",    
               foreignField: "_id",  
               as: "company"
            }
         },
         {
            $unwind:"$company"
         },
         {
            $lookup: {
               from: "entitymasters",
               localField: "entityId",   
               foreignField: "_id",  
               as: "entity"
            }
         },
         {
            $unwind:"$entity"
         },
         { "$match" : {"_id": ObjectId(req.params.contractID)}},
     ])
        .sort({createdAt : -1})
        .exec()
        .then(data=>{
          // console.log("Data ==> ", data);
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};
exports.joincontractlist = (req, res, next)=>{
    Contract.aggregate([
        {
            $lookup: {
               from: "companysettings",
               localField: "companyId",    
               foreignField: "_id",  
               as: "company"
            }
         },
         {
            $unwind:"$company"
         },
         {
            $lookup: {
               from: "entitymasters",
               localField: "entityId",   
               foreignField: "_id",  
               as: "entity"
            }
         },
         {
            $unwind:"$entity"
         },
     ])
        .sort({createdAt : -1})
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};

exports.fetchSingleContract = (req, res, next)=>{
    Contract.findOne({ _id: req.params.contractID })
        .exec()
        .then(data=>{
            res.status(200).json( data );
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};

exports.fetchSingleEntityContract = (req, res, next)=>{
  // console.log("company id = ", req.params.entityID);
    Contract.aggregate([
        {
            $lookup: {
               from         : "entitymasters",
               localField   : "companyId",    
               foreignField : "_id",  
               as           : "company"
            }
         },
         {
            $unwind:"$company"
         },
         {
            $lookup: {
               from         : "entitymasters",
               localField   : "entityId",   
               foreignField : "_id",  
               as           : "entity"
            }
         },
         {
            $unwind : "$entity"
         },
         { "$match" : {"entityId" : ObjectId(req.params.entityID)}},
     ])
        .exec()
        .then(data=>{
            res.status(200).json( data );
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};

exports.updateContract = (req,res,next)=>{
    var extras = req.body.contactDetails;
    
    Contract.updateOne(
            { "_id":req.body.contractID},  
            {
                $set:   { 
                    'contractDate'                : req.body.contractDate,
                    'effectiveUpto'               : req.body.effectiveUpto, 
                    'companyId'                   : req.body.companyId,
                    'companyLocationId'           : req.body.companyLocationId,
                    'entityType'                  : req.body.entityType,
                    'entityId'                    : req.body.entityId,
                    'entityLocationId'            : req.body.entityLocationId,
                    'contractDuration'            : req.body.contractDuration,
                    'status'                      : "edited"
                }
            }
        )
        .exec()
        .then(data=>{
            if(data.nModified == 1){
                Contract.updateOne(
                { _id:req.body.contractID},
                {
                    $push:  { 'updateLog' : [{  updatedAt      : new Date(),
                                                updatedBy      : req.body.updatedBy 
                                            }] 
                            }
                })
                .exec()
                .then(data=>{
                    if(data.nModified == 1){
                      Contract.updateOne(
                      { _id:req.body.contractID},
                      {
                          $push:  { 'statusLog' : [{ 
                                                    status        : "edited",
                                                    statusAt      : new Date(),
                                                    statusBy      : {
                                                                  userid      : req.body.userid,
                                                                  username    : req.body.username,
                                                                  company     : req.body.company,
                                                                  empid       : req.body.empid, 
                                                                  companyId   : req.body.companyId, 
                                                                  department  : req.body.department,  
                                                                  designation : req.body.designation, 
                                                                  address     : req.body.address,
                                                    },
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
                    // res.status(200).json({ updated : true });
                })
            }else{
                res.status(200).json({ updated : false });
            }
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        });
};
exports.deleteContract = (req, res, next)=>{
    Contract.deleteOne({_id: req.params.contractID})
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
exports.deletePackageInContract = (req,res,next)=>{   
    Contract.updateOne(
            { _id:req.params.contractID},  
            {
                $pull: { 'packages' : {_id:req.params.packageID}}
            }
        )
        .exec()
        .then(data=>{
            if(data.nModified == 1){
                res.status(200).json({ deleted : true });
            }else{
                res.status(401).json({ deleted : false });
            }
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        });
};


exports.filterContract = (req, res, next)=>{
    console.log("In filterContract",req.body);
    var selector = {};
    // selector['$or']=[];
    for (var key in req.body) {
        if (key=='corporateIds' && req.body.corporateIds.length > 0 ) {
            var corporateIds = [];
            // covert array of ids into object ids
            for(var subkey in req.body.corporateIds){
                corporateIds.push(ObjectId(req.body.corporateIds[subkey]))
            }
            selector.entityId =  { $in: corporateIds } 
        }
        if (key=='vendorIds' && req.body.vendorIds.length > 0 ) {
            var vendorIds = [];
            // covert array of ids into object ids
            for(var subkey in req.body.vendorIds){
                vendorIds.push(ObjectId(req.body.vendorIds[subkey])) 
            }
            selector.entityId =  { $in: vendorIds } 
        }
        if (key=='stateCodes' && req.body.stateCodes.length > 0 ) {
            selector['$or']=[];
            selector['$or'].push({ "company.companyLocationsInfo.stateCode" :  { $in: req.body.stateCodes } });
            selector['$or'].push({ "entity.locations.stateCode" :  { $in: req.body.stateCodes } });
        }
        if (key=='districts' && req.body.districts.length > 0 ) {
            selector['$or']=[];
            selector['$or'].push({ "company.companyLocationsInfo.district" :  { $in: req.body.districts } });
            selector['$or'].push({ "entity.locations.district" :  { $in: req.body.districts } });
        }
        
    }
    Contract.aggregate([
        {
            $lookup: {
               from: "entitymasters",
               localField: "companyId",    
               foreignField: "_id",  
               as: "company"
            }
         },
         {
            $unwind:"$company"
         },
         {
            $lookup: {
               from: "entitymasters",
               localField: "entityId",   
               foreignField: "_id",  
               as: "entity"
            }
         },
         {
            $unwind:"$entity"
         },
        {
            $match : selector
        }
     ])
        .sort({createdAt : -1})
        .exec()
        .then(data=>{
          console.log("In filterContract data = ",data);
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};

exports.searchContract = (req, res, next)=>{
    var selector = {}; 
    selector['$or']=[];
    selector["$or"].push({ "company.companyName"    : { $regex : req.params.str, $options: "i"}  })
    selector["$or"].push({ "entity.companyName"     : { $regex : req.params.str, $options: "i"}  })
    selector["$or"].push({ "company.companywebsite" : { $regex : req.params.str, $options: "i"}  })
    selector["$or"].push({ "entity.groupName"       : { $regex : req.params.str, $options: "i"} })
    selector["$or"].push({ "entity.entityType"       : { $regex : req.params.str, $options: "i"} })
    
    Contract.aggregate([
        {
            $lookup: {
               from         : "entitymasters",
               localField   : "companyId",    
               foreignField : "_id",  
               as           : "company"
            }
         },
         {
            $unwind : "$company"
         },
         {
            $lookup: {
               from         : "entitymasters",
               localField   : "entityId",   
               foreignField : "_id",  
               as           : "entity"
            }
         },
         {
            $unwind:"$entity"
         },
        {
            $match : selector
        }
     ])
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};

exports.packagesInContract = (req, res, next)=>{
  Contract.aggregate([{ "$match": {"corporateId": ObjectId(req.params.corporateID)}},
                      { "$unwind":"$packages" }
                    ])
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};
// exports.image = (req, res, next)=>{
//     var url = 'https://fivebees.s3.amazonaws.com/propertiesImages/download.png';
//     function toDataURL(url, callback) {
//         var httpRequest = new XMLHttpRequest();
//         httpRequest.onload = function() {
//            var fileReader = new FileReader();
//               fileReader.onloadend = ()=> {
//                  callback(fileReader.result);
//               }
//               fileReader.readAsDataURL(httpRequest.response);
//         };
//         httpRequest.open('GET', url);
//         httpRequest.responseType = 'blob';
//         httpRequest.send();
//      }
//      toDataURL(url, function(dataUrl) {
//      res.status(200).json('hgjhghjg'); 
//   })
        

// };

exports.getPackageDetails = (req, res, next)=>{
  console.log('=========#########====================')
  console.log('req.body=>',req.body)
  // Contract.find({}).sort({createdAt : -1})
  //       .exec()
  //       .then(data=>{
  //           res.status(200).json(data);
  //       })
  //       .catch(err =>{
  //           res.status(500).json({ error: err });
  //       }); 
  Contract.findOne({"status" : "Approved","entityId" :req.body.company_id})
    .exec()
    .then(data=>{
      console.log('data=>',data)
      main();
        async function main(){
            if(data){
              var cityData = await getCityDetail(req.body.city,req.body.district)
              var returnData = []
              if(cityData && cityData.length > 0){
                for(var i=0 ; i<cityData.length ; i++){
                  console.log('cityData: ',cityData[i])
                  var packageData = data.packages.filter((elem)=>{
                    console.log(elem.cityClassId +'==='+ cityData[i].cityTypeId)
                    console.log(elem.cityClassId === (cityData[i].cityTypeId).toString())
                    return (elem.packageTypeId === req.body.packageTypeId) && (elem.carCategoryId === req.body.vehicleCategoryId) && (elem.cityClassId === (cityData[i].cityTypeId).toString())
                  });
                  console.log('Info==>',packageData)
                  returnData.push(packageData,data._id)
                }//i
              }
              res.status(200).json(returnData);
            }
        }
    })
    .catch(err =>{
        res.status(500).json({ error: err });
    }); 

};

function getCityDetail(city,district){
  console.log('city,district==>',city,district)
    return new Promise((resolve,reject)=>{
      CityNameMaster.find({ $or: [ { cityName:city }, { cityName:district } ]})
      .exec()
       .then(type=>{
        console.log('type==>',type)
          resolve(type);
       })
      .catch(err =>{
          reject(err)
      });
    })
}