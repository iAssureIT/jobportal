const mongoose  = require("mongoose");

const EntityMaster = require('./ModelEntityMaster');
const FailedRecords = require('../failedRecords/ModelFailedRecords');
const DesignationMaster = require('../designationMaster/ModelDesignationMaster.js');
const DepartmentMaster = require('../departmentMaster/ModelDepartmentMaster.js');
const User = require('../userManagement/ModelUsers.js');

var request = require('request-promise');
var ObjectID = require('mongodb').ObjectID;

exports.insertEntity = (req,res,next)=>{
    insertEntityFun();
    async function insertEntityFun(){
        var getnext = await getNextSequence(req.body.entityType)
        if(req.body.entityType == 'corporate'){var str = "C"+parseInt(getnext)}else if(req.body.entityType == 'vendor'){var str = "V"+parseInt(getnext)}else if(req.body.entityType == 'supplier'){var str = "S"+parseInt(getnext)}else{var str = 1}

        EntityMaster.findOne({  
                            companyName               : req.body.companyName,
                            groupName                 : req.body.groupName,
                            companyEmail              : req.body.companyEmail, 
                            companyPhone              : req.body.companyPhone,
                            website                   : req.body.website   
                            })
        .exec()
        .then(data=>{
            if (data) {
                res.status(200).json({ duplicated : true });
            }else{
                const entity = new EntityMaster({
                    _id                       : new mongoose.Types.ObjectId(),
                    supplierOf                : req.body.supplierOf,
                    entityType                : req.body.entityType,
                    profileStatus             : req.body.profileStatus,
                    companyNo                 : getnext ? getnext : 1,
                    companyID                 : str ? str : 1, 
                    companyName               : req.body.companyName,
                    groupName                 : req.body.groupName,
                    CIN                       : req.body.CIN,   
                    COI                       : req.body.COI,
                    TAN                       : req.body.TAN,
                    companyLogo               : req.body.companyLogo,
                    website                   : req.body.website,
                    companyPhone              : req.body.companyPhone,
                    companyEmail              : req.body.companyEmail,
                    country                   : req.body.country,
                    countryCode               : req.body.countryCode,
                    userID                    : req.body.userID,  
                    createdBy                 : req.body.createdBy,
                    createdAt                 : new Date()
                })
                entity.save()
                .then(data=>{
                    res.status(200).json({ created : true, entityID : data._id ,companyID : data.companyID});
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
};
function getNextSequence(entityType) {
    return new Promise((resolve,reject)=>{
    EntityMaster.findOne({entityType:entityType})    
        .sort({companyNo : -1})   
        .exec()
        .then(data=>{
            if (data) { 
                var seq = data.companyNo;
                seq = seq+1;
                resolve(seq) 
            }else{
               resolve(1)
            }
            
        })
        .catch(err =>{
            reject(0)
        });
    });
}
exports.addStatutoryDetails = (req,res,next)=>{
    EntityMaster.find({ _id:req.body.entityID,"statutoryDetails.state": req.body.statutoryDetails.state})
    .then((datas)=>{
        if(datas.length > 0){
            res.status(200).json({ duplicated : true });
        }else{
            EntityMaster.updateOne(
                { _id:req.body.entityID},  
                {
                    $push:   { 
                                'statutoryDetails':req.body.statutoryDetails
                            }
                }
            )
            .exec()
            .then(data=>{
                if(data.nModified == 1){
                    EntityMaster.updateOne(
                    { _id:req.body.entityID},
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
   
}

exports.listEntity = (req,res,next)=>{
    EntityMaster.find({entityType:req.params.entityType}).sort({createdAt : -1})    
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
exports.listSupplier = (req,res,next)=>{
    EntityMaster.find({entityType:req.params.entityType,supplierOf:req.params.company_id}).sort({createdAt : -1})    
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
exports.countEntity = (req,res,next)=>{
    EntityMaster.find({entityType:req.params.entityType}).count()       
        .exec()
        .then(data=>{
            res.status(200).json({count: data});
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};
exports.singleEntity = (req,res,next)=>{
    EntityMaster.findOne({_id : req.params.entityID})
    .exec()
    .then(data=>{
        main();
        async function main(){
            var k = 0 ;
            var returnData = [];
            if(data){
            if(data.contactPersons && data.contactPersons.length > 0){
                var contactData = [];
                for(k = 0 ; k < data.contactPersons.length ; k++){
                    var manager1Details = {
                        Name   : "",
                        Department  : "",
                        Designation    : "",
                        contactNo   : "",
                        EmpID   : "",
                    };
                     var manager2Details = {
                        Name   : "",
                        Department  : "",
                        Designation    : "",
                        contactNo   : "",
                        EmpID   : "",
                    };
                     var manager3Details = {
                        Name   : "",
                        Department  : "",
                        Designation    : "",
                        contactNo   : "",
                        EmpID   : "",
                    };
                    // if(data.contactPersons[k].bookingApprovalRequired == 'Yes'){

                      
                    manager1Details = await getManagerDetails(data.contactPersons[k].approvingAuthorityId1,data.companyID)
                    
                   
                    manager2Details = await getManagerDetails(data.contactPersons[k].approvingAuthorityId2,data.companyID)
                    
                   
                    manager3Details = await getManagerDetails(data.contactPersons[k].approvingAuthorityId3,data.companyID)

                       
                    // }
                    contactData.push({
                        "_id"                    : data.contactPersons[k]._id,
                        branchCode               : data.contactPersons[k].branchCode,
                        branchName               : data.contactPersons[k].branchName,
                        locationType             : data.contactPersons[k].locationType,
                        firstName                : data.contactPersons[k].firstName,
                        workLocationId           : data.contactPersons[k].workLocationId,
                        addEmployee              : data.contactPersons[k].addEmployee,
                        personID                 : data.contactPersons[k].personID,
                        lastName                 : data.contactPersons[k].lastName,
                        departmentName           : data.contactPersons[k].departmentName,
                        designationName          : data.contactPersons[k].designationName,
                        phone                    : data.contactPersons[k].phone,
                        email                    : data.contactPersons[k].email,
                        employeeID               : data.contactPersons[k].employeeID,
                        role                     : data.contactPersons[k].role,
                        bookingApprovalRequired  : data.contactPersons[k].bookingApprovalRequired,
                        profilePhoto             : data.contactPersons[k].profilePhoto,
                        middleName               : data.contactPersons[k].middleName,
                        DOB                      : data.contactPersons[k].DOB,
                        altPhone                 : data.contactPersons[k].altPhone,
                        gender                   : data.contactPersons[k].gender,
                        whatsappNo               : data.contactPersons[k].whatsappNo,
                        department               : data.contactPersons[k].department,
                        empCategory              : data.contactPersons[k].empCategory,
                        empPriority              : data.contactPersons[k].empPriority,
                        designation              : data.contactPersons[k].designation,
                        address                  : data.contactPersons[k].address,
                        createUser               : data.contactPersons[k].createUser,
                        approvingAuthorityId1    : data.contactPersons[k].approvingAuthorityId1,
                        approvingAuthorityId2    : data.contactPersons[k].approvingAuthorityId2,
                        approvingAuthorityId3    : data.contactPersons[k].approvingAuthorityId3,
                        preApprovedKilometer     : data.contactPersons[k].preApprovedKilometer,
                        preApprovedAmount        : data.contactPersons[k].preApprovedAmount,
                        preApprovedRides         : data.contactPersons[k].preApprovedRides,

                        manager1Details           : manager1Details,
                        manager2Details           : manager2Details,
                        manager3Details           : manager3Details,

                    })
                }
                    
            }
            returnData.push({
                        "_id"                   : data._id,
                        supplierOf              : data.supplierOf,
                        companyID               : data.companyID,
                        companyName             : data.companyName,
                        companyPhone            : data.companyPhone,
                        companyEmail            : data.companyEmail,
                        locations               : data.locations,
                        statutoryDetails        : data.statutoryDetails,
                        entityType              : data.entityType,
                        profileStatus           : data.profileStatus,
                        groupName               : data.groupName,
                        CIN                     : data.CIN,   
                        COI                     : data.COI,
                        TAN                     : data.TAN,
                        companyLogo             : data.companyLogo,
                        website                 : data.website,
                        userID                  : data.userID,  
                        contactData             : contactData
                    })
            }//data
            res.status(200).json(returnData);
            
        }
        
        
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        });
    });
};

exports.getCompany = (req,res,next)=>{
    EntityMaster.findOne({companyID : req.params.companyID})
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
exports.entityDetails = (req,res,next)=>{
    EntityMaster.findOne({"contactPersons.userID" : req.params.userID})
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
exports.getEntity = (req, res, next)=>{
    EntityMaster.findOne({_id : req.params.entityID})
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};

exports.getAllStatutoryDetails = (req, res, next)=>{
    EntityMaster.findOne({_id : req.params.entityID})
        .exec()
        .then(data=>{
            res.status(200).json(data.statutoryDetails);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};

exports.fetchLocationEntities = (req, res, next)=>{
    EntityMaster.findOne({_id : req.body.entityID})
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
exports.fetchContactEntities = (req, res, next)=>{
    EntityMaster.findOne({_id : req.body.entityID})
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
exports.getWorkLocation = (req, res, next)=>{
    console.log("body=>",req.body)
    var selector = {};
    if(req.body.company_id){
        selector = {'_id':ObjectID(req.body.company_id)}
    }else{
        selector = {"entityType":req.body.entityType} 
    }
    console.log("selector",selector);
    EntityMaster.aggregate([
        { $match :selector},
        { $unwind: "$locations" }
        ])
        .exec()
        .then(data=>{
            var locations = data.map((a, i)=>{
                return a.locations
             })   
            res.status(200).json({locations});
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};
exports.companyName = (req,res,next)=>{
    EntityMaster.findOne({companyID : req.params.companyID},{companyName:1,companyLogo:1})
    .exec()
    .then(data=>{
        if(data){
            res.status(200).json(data);
        }else{
            res.status(200).json({message:"COMPANY_NOT_FOUND"})
        }
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        });
    });
};
exports.companyNameType = (req,res,next)=>{
    EntityMaster.findOne({companyID : req.params.companyID,entityType : req.params.type},{companyID:1,companyName:1})
    .exec()
    .then(data=>{
        if(data){
            res.status(200).json(data);
        }else{
            res.status(200).json({message:"COMPANY_NOT_FOUND"})
        }
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        });
    });
};
exports.branchCodeLocation = (req,res,next)=>{
    EntityMaster.findOne({_id : req.params.entityID, 'locations.branchCode' : req.params.branchCode})
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
exports.updateEntity = (req,res,next)=>{
    EntityMaster.updateOne(
            { _id:req.body.entityID},  
            {
                $set:   { 
                            'companyName'               : req.body.companyName,
                            'groupName'                 : req.body.groupName,
                            'CIN'                       : req.body.CIN,   
                            'COI'                       : req.body.COI,
                            'TAN'                       : req.body.TAN,
                            'companyLogo'               : req.body.companyLogo,
                            'website'                   : req.body.website,
                            'companyEmail'              : req.body.companyEmail,
                            'companyPhone'              : req.body.companyPhone,
                            'country'                   : req.body.country,
                            'countryCode'               : req.body.countryCode,
                        }
            }
        )
        .exec()
        .then(data=>{
            if(data.nModified == 1){
                EntityMaster.updateOne(
                { _id:req.body.entityID},
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
            res.status(500).json({
                error: err
            });
        });
};
exports.updateProfileStatus = (req,res,next)=>{
    EntityMaster.updateOne(
            { _id:req.body.entityID},  
            {
                $set:   { 
                            'profileStatus':req.body.status
                        }
            }
        )
        .exec()
        .then(data=>{
            if(data.nModified == 1){
                EntityMaster.updateOne(
                { _id:req.body.entityID},
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
            res.status(500).json({
                error: err
            });
        });
};
exports.addLocation = (req,res,next)=>{
    var locationdetails = req.body.locationDetails;
    
    insertLocationdetails();
    async function insertLocationdetails() {
        // var data = await updateDocInLoc(req.body.entityID,locationdetails)
        // console.log('data====>',data)
         var getData = await fetchLocData(req.body.entityID,locationdetails);
        if (getData.length > 0) {
            res.status(200).json({ duplicated : true });
        }else{
            // if(locationdetails.GSTIN || locationdetails.PAN){
            //     var compare = await updateSameStateDocuments(req.body.entityID,locationdetails)
            // }
            var getnext = await getNextBranchCode(req.body.entityID)
            locationdetails.branchCode = getnext;
            EntityMaster.updateOne(
                    { _id: ObjectID(req.body.entityID) },  
                    {
                        $push:  { 'locations' : locationdetails }
                    }
                )
                .exec()
                .then(data=>{
                    if(data.nModified == 1){
                        res.status(200).json({ created : true });
                    }else{
                        res.status(401).json({ created : false });
                    }
                })
                .catch(err =>{
                    res.status(500).json({ error: err });
                });
        }
    }
};
function fetchLocData(entityID,locationdetails){
    return new Promise((resolve,reject)=>{
        EntityMaster.find(
        {_id: entityID,"locations.locationType":locationdetails.locationType, "locations.addressLine1": locationdetails.addressLine1},{ 'locations.$': 1 })
        .exec()
        .then(data=>{
            resolve(data)
        })
        .catch(err =>{
            reject(0)
        });
    })
}

function getNextBranchCode(entityID) {
    return new Promise((resolve,reject)=>{
    EntityMaster.findOne({"_id" : entityID }).sort({"locations.branchCode":-1})       
        .exec()
        .then(data=>{
            if (data.locations.length > 0 ) { 
                var seq = data.locations[data.locations.length - 1].branchCode;
                seq = seq+1;
                resolve(seq) 
            }else{
               resolve(1)
            }
            
        })
        .catch(err =>{
            reject(0)
        });
    });
}

function updateSameStateDocuments(entityID,locationdetails){
    return new Promise((resolve,reject)=>{
        EntityMaster.updateMany({"_id":entityID, "locations.state":locationdetails.state},
            {
                $set:   { 
                          'locations.$[].GSTIN'        : locationdetails.GSTIN,
                          'locations.$[].GSTDocument'  : locationdetails.GSTDocument,
                          'locations.$[].PAN'          : locationdetails.PAN,
                          'locations.$[].PANDocument'  : locationdetails.PANDocument
                        }
            },{ multi: true }
        )
        .exec()
        .then(data=>{
            resolve(data)
        })
        .catch(err =>{
            reject(0)
        });
    })
}

exports.updateDocInLoc= (req,res,next)=>{
    EntityMaster.find({"_id":req.body.entityID, "locations.state":req.body.state},{_id: 0, 'locations.$': 1})
    .exec()
    .then(data=>{
         console.log('results====>',JSON.stringify(data[0].locations[0].GSTIN)) 
         // EntityMaster.updateOne({"_id":entityID, "locations._id":})
//              const category = await Category.findOne({ _id:req.params.categoryId });
// const lastIndex: number = category.items.length - 1;

// console.log(category.items[lastIndex]);
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        });
    });
}

exports.singleLocation = (req,res,next)=>{
    EntityMaster.find({"_id" : req.body.entityID, "locations._id":req.body.locationID },
        {"locations.$" : 1})
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
exports.updateSingleLocation = (req,res,next)=>{
    var locationdetails = req.body.locationDetails;
    insertLocationdetails();
    async function insertLocationdetails() {
    // var getData = await fetchLocData(req.body.entityID,locationdetails);
    //     if (getData.length > 0) {
    //         res.status(200).json({ duplicated : true });
    //     }else{
            // if(locationdetails.GSTIN || locationdetails.PAN){
            //     var compare = await updateSameStateDocuments(req.body.entityID,locationdetails)
            // }
    
           EntityMaster.updateOne(
                { "_id":req.body.entityID, "locations._id": req.body.locationID},  
                {
                    $set:   { 'locations.$.locationType' : locationdetails.locationType,
                              'locations.$.branchCode'   : locationdetails.branchCode,
                              'locations.$.addressLine1' : locationdetails.addressLine1,
                              'locations.$.addressLine2' : locationdetails.addressLine2,
                              'locations.$.countryCode'  : locationdetails.countryCode,
                              'locations.$.country'      : locationdetails.country,
                              'locations.$.stateCode'    : locationdetails.stateCode,
                              'locations.$.state'        : locationdetails.state,
                              'locations.$.district'     : locationdetails.district,
                              'locations.$.city'         : locationdetails.city,
                              'locations.$.area'         : locationdetails.area,
                              'locations.$.pincode'      : locationdetails.pincode,
                              'locations.$.latitude'     : locationdetails.latitude,
                              'locations.$.longitude'    : locationdetails.longitude,
                              // 'locations.$.GSTIN'        : locationdetails.GSTIN,
                              // 'locations.$.GSTDocument'  : locationdetails.GSTDocument,
                              // 'locations.$.PAN'          : locationdetails.PAN,
                              // 'locations.$.PANDocument'  : locationdetails.PANDocument
                            }
                }
            )
            .exec()
            .then(data=>{
                if(data.nModified == 1){
                    res.status(200).json({ updated : true });
                }else{
                    res.status(200).json({ updated : false });
                }
            })
            .catch(err =>{
                res.status(500).json({ error: err });
            });
        // }
    }
};

exports.updateSingleStatutory = (req,res,next)=>{
    var statutorydetails = req.body.statutoryDetails
   EntityMaster.updateOne(
        { "_id":req.body.entityID, "statutoryDetails._id": req.body.statutoryID},  
        {
            $set:   { 
                      'statutoryDetails.$.stateCode'    : statutorydetails.stateCode,
                      'statutoryDetails.$.state'        : statutorydetails.state,
                      'statutoryDetails.$.GSTIN'        : statutorydetails.GSTIN,
                      'statutoryDetails.$.GSTDocument'  : statutorydetails.GSTDocument,
                      'statutoryDetails.$.PAN'          : statutorydetails.PAN,
                      'statutoryDetails.$.PANDocument'  : statutorydetails.PANDocument
                    }
        }
    )
    .exec()
    .then(data=>{
        if(data.nModified == 1){
            res.status(200).json({ updated : true });
        }else{
            res.status(200).json({ updated : false });
        }
    })
    .catch(err =>{
        res.status(500).json({ error: err });
    });
};

exports.addContact = (req,res,next)=>{
    var contactdetails = req.body.contactDetails;
     if(contactdetails.role === 'driver'){
        var selector = {"_id":req.body.entityID,"contactPersons.phone": contactdetails.phone}
    }else if(contactdetails.role === 'guest'){
        var selector = {_id:req.body.entityID,$or:[{"contactPersons.email": contactdetails.email},{"contactPersons.phone":contactdetails.phone}]}
    }else{
        var selector = {_id:req.body.entityID,$or:[{"contactPersons.email": contactdetails.email},{"contactPersons.employeeID":contactdetails.employeeID}]}
    }
    EntityMaster.find(selector)
    .then((datas)=>{
        if(datas.length > 0){
            res.status(200).json({ duplicated : true });
        }else{
            EntityMaster.updateOne(
                { _id:req.body.entityID},  
                {
                    $push:  { 'contactPersons' : contactdetails }
                }
            )
            .exec()
            .then(data=>{
                if(data.nModified == 1){
                    res.status(200).json({ created : true });
                }else{
                    res.status(200).json({ created : false });
                }
            })
            .catch(err =>{
                res.status(500).json({
                    error: err
                });
            });
        }
    })
    .catch((err)=>{
        res.status(500).json({
            error: err
        });
    })
    
};
exports.singleContact = (req,res,next)=>{
    EntityMaster.findOne({"_id" : req.body.entityID, "contactPersons._id":req.body.contactID},
        {"contactPersons.$" : 1})
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

function camelCase(str) {
    return str
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

exports.getAllVendors = (req,res,next)=>{
    var city = req.params.city;
    var city1 = camelCase(city);
    var city2 = city.toUpperCase();
    var city3 = city.toLowerCase();
    EntityMaster.find({"entityType":"vendor","locations.city":{$in:
          [city,city1,city2,city3]}})
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
// Convert Degress to Radians
function Deg2Rad(deg) {
  return deg * Math.PI / 180;
}
function PythagorasEquirectangular(lat1, lon1, lat2, lon2) {
  lat1 = Deg2Rad(lat1);
  lat2 = Deg2Rad(lat2);
  lon1 = Deg2Rad(lon1);
  lon2 = Deg2Rad(lon2);
  var R = 6371; // km
  var x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
  var y = (lat2 - lat1);
  var d = Math.sqrt(x * x + y * y) * R;
  return d;
}
function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}
exports.getAllNearbyVendors = (req,res,next)=>{
    EntityMaster.find({"entityType":"vendor"})
    .exec()
    .then(data=>{
        if(data && data.length > 0){
            var vendorArray = []
            for(var i=0 ; i<data.length ; i++){
                if(data[i].locations && data[i].locations.length > 0){
                    var cityArray = []
                    for(var j=0 ; j<data[i].locations.length ; j++){
                        var lat = data[i].locations[j].latitude;
                        var lng = data[i].locations[j].longitude;
                        if(lat && lng){
                            cityArray.push({lat:lat,lng:lng})
                        }
                    }//j
                    var minDif = 300;
                    var closest
                    if(cityArray && cityArray.length > 0){
                        for (index = 0; index < cityArray.length; index++) {
                           var dif = PythagorasEquirectangular(req.params.lat, req.params.lng, cityArray[index].lat, cityArray[index].lng); 
                           if (dif < minDif) {
                              closest = index;
                              minDif = dif;
                              vendorArray.push(data[i])
                            }
                        }//index
                    }
                }
            }//i
            var uniqueVendorArray = vendorArray.filter( onlyUnique );
            res.status(200).json(uniqueVendorArray);
        }
        
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        });
    });
};
exports.getAdminCompany = (req,res,next)=>{
    EntityMaster.find({"entityType":"appCompany"})
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
exports.getAllEntities = (req,res,next)=>{
    EntityMaster.find({})
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
exports.updateSingleContact = (req,res,next)=>{
    var contactdetails = req.body.contactDetails;
    console.log('contactdetails', contactdetails, contactdetails.createUser);
     if(contactdetails.role === 'driver'){
        var selector = {"_id":req.body.entityID,"contactPersons.phone": contactdetails.phone}
    }else{
        var selector = {"contactPersons.email": contactdetails.email, _id: { $ne: req.body.entityID}, "contactPersons._id" : {$ne : req.body.contactID},"contactPersons.employeeID" : {$ne : req.body.employeeID} }
    }
    EntityMaster.find(selector)
    .then((datas)=>{
        if(datas.length > 0){
            res.status(200).json({ duplicated : true });
        }else{
            EntityMaster.updateOne(
            { "_id":req.body.entityID, "contactPersons._id": req.body.contactID},  
            {
                $set:   { 'contactPersons.$.branchCode' : contactdetails.branchCode,
                          'contactPersons.$.branchName' : contactdetails.branchName,
                          'contactPersons.$.locationType' : contactdetails.locationType,
                          'contactPersons.$.profilePhoto': contactdetails.profilePhoto,
                          'contactPersons.$.firstName'  : contactdetails.firstName,
                          'contactPersons.$.middleName' : contactdetails.middleName,
                          'contactPersons.$.lastName'   : contactdetails.lastName,
                          'contactPersons.$.DOB'        : contactdetails.DOB,
                          'contactPersons.$.employeeID' : contactdetails.employeeID,
                          'contactPersons.$.phone'      : contactdetails.phone,
                          'contactPersons.$.altPhone'   : contactdetails.altPhone,
                          'contactPersons.$.whatsappNo' : contactdetails.whatsappNo,
                          'contactPersons.$.email'      : contactdetails.email,
                          'contactPersons.$.gender'     : contactdetails.gender,
                          'contactPersons.$.department' : contactdetails.department,
                          'contactPersons.$.empCategory' : contactdetails.empCategory,
                          'contactPersons.$.empPriority' : contactdetails.empPriority,
                          'contactPersons.$.designationName'    : contactdetails.designationName,
                          'contactPersons.$.designation'        : contactdetails.designation,
                          'contactPersons.$.departmentName'     : contactdetails.departmentName,
                          'contactPersons.$.address'            : contactdetails.address,
                          'contactPersons.$.role'               : contactdetails.role,
                          'contactPersons.$.createUser'         : contactdetails.createUser,
                          'contactPersons.$.bookingApprovalRequired'    : contactdetails.bookingApprovalRequired,
                          'contactPersons.$.approvingAuthorityId1'      : contactdetails.approvingAuthorityId1,
                          'contactPersons.$.approvingAuthorityId2'      : contactdetails.approvingAuthorityId2,
                          'contactPersons.$.approvingAuthorityId3'      : contactdetails.approvingAuthorityId3,
                          'contactPersons.$.preApprovedKilometer'       : contactdetails.preApprovedKilometer,
                          'contactPersons.$.preApprovedAmount'  : contactdetails.preApprovedAmount,
                          'contactPersons.$.preApprovedRides'  : contactdetails.preApprovedRides,
                        }
            }
            )
            .exec()
            .then(data=>{
                if(data.nModified == 1){
                    res.status(200).json({ updated : true });
                }else{
                    res.status(200).json({ updated : false });
                }
            })
            .catch(err =>{
                res.status(500).json({ error: err });
            });
        }
    })
    .catch((err)=>{
        res.status(500).json({
            error: err
        });
    })
};

//function deleteEntityUsers(id){
   // return new Promise((resolve,reject)=>{
     //   User.deleteMany({"company_Id":id})
       // .exec()
        //.then(response=>{
         //   resolve(response)
        //})
        //.catch(err=>{
          //  console.log("Error :",err)
           // reject(err)
        //})
    //})
//}
exports.deleteEntityUsers = (req,res,next)=>{
    User.deleteMany({"profile.companyID":req.params.companyID})
    .exec()
    .then(data=>{
        res.status(200).json({ deleted : true });
        
    })
    .catch(err =>{
        res.status(500).json({ error: err });
    });
};

exports.deleteEntity = (req,res,next)=>{
    EntityMaster.deleteOne({_id:req.params.entityID})
    .exec()
    .then(data=>{
        main();
        
            res.status(200).json({ deleted : true });
        
    })
    .catch(err =>{
        res.status(500).json({ error: err });
    });
};

exports.deleteLocation = (req,res,next)=>{   
    EntityMaster.updateOne(
            { _id:req.params.entityID},  
            {
                $pull: { 'locations' : {_id:req.params.locationID}}
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

exports.deleteStatutory = (req,res,next)=>{   
    EntityMaster.updateOne(
            { _id:req.params.entityID},  
            {
                $pull: { 'statutoryDetails' : {_id:req.params.statutoryID}}
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
exports.deleteContact = (req,res,next)=>{   
    EntityMaster.updateOne(
            { _id:req.params.entityID},  
            {
                $pull: { 'contactPersons' : {_id:req.params.contactID}}
            }
        )
        .exec()
        .then(data=>{
            if(data.nModified == 1){
                res.status(200).json({ deleted : true });
            }else{
                res.status(200).json({ deleted : false });
            }
        })
        .catch(err =>{
            res.status(500).json({
                error: err
            });
        });
};
exports.filterEntities = (req,res,next)=>{
    // var selector = {
    //         "locations":{ $elemMatch: { stateCode : "MH" }}, 
    //         "locations":{ $elemMatch: { district : "Pune" }},
    //         "companyName" :  {$regex : "^i",$options: "i"} 
    //     };


    var selector = {}; 
    selector['$and']=[];

    selector["$and"].push({ entityType : { $regex : req.body.entityType,$options: "i"} })
    //selector.entityType = {$regex : req.body.entityType,$options: "i"}  
    if (req.body.stateCode) {
        selector["$and"].push({ locations : { $elemMatch: { stateCode : req.body.stateCode } }  })
        //selector.locations = { $elemMatch: { stateCode : req.body.stateCode } }     
    }
    if (req.body.district) {
        selector["$and"].push({ locations : { $elemMatch: { district : { $regex : req.body.district, $options: "i"} } }  })
    }
    if (req.body.initial && req.body.initial != 'All') {
        //selector.companyName = {$regex : "^"+req.body.initial,$options: "i"} 
        selector["$and"].push({ companyName : { $regex : "^"+req.body.initial,$options: "i"}   })
    }
    if (req.body.searchStr && req.body.searchStr != '') {
        selector['$or']=[];
        if (req.body.initial && req.body.initial != 'All') {
            selector["$and"].push({ companyName : { $regex : "^"+req.body.initial,$options: "i"}   })
        }
        
        selector["$or"].push({ companyName : { $regex : req.body.searchStr, $options: "i"}  })
        selector["$or"].push({ groupName   : { $regex : req.body.searchStr, $options: "i"}  })
        selector["$or"].push({ locations   : { $elemMatch: { addressLine1 : { $regex : req.body.searchStr, $options: "i"} } }  })
        selector["$or"].push({ locations   : { $elemMatch: { area : { $regex : req.body.searchStr, $options: "i"} } }  })
        selector["$or"].push({ locations   : { $elemMatch: { district : { $regex : req.body.searchStr, $options: "i"} } }  })
        selector["$or"].push({ locations   : { $elemMatch: { stateCode : { $regex : req.body.searchStr, $options: "i"} } }  })
    }

    EntityMaster.find(selector)
    .sort({createdAt : -1})
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
exports.filterEntities_grid = (req,res,next)=>{
    
    var selector = {}; 
    selector['$and']=[];

    selector["$and"].push({ entityType : { $regex : req.body.entityType,$options: "i"} })
    if (req.body.stateCode) {
        selector["$and"].push({ locations : { $elemMatch: { stateCode : req.body.stateCode } }  })
    }
    if (req.body.district) {
        selector["$and"].push({ locations : { $elemMatch: { district : { $regex : req.body.district, $options: "i"} } }  })
    }
    if (req.body.initial && req.body.initial != 'All') {
        selector["$and"].push({ companyName : { $regex : "^"+req.body.initial,$options: "i"}   })
    }
    if (req.body.searchStr && req.body.searchStr != '') {
        selector['$or']=[];
        if (req.body.initial && req.body.initial != 'All') {
            selector["$and"].push({ companyName : { $regex : "^"+req.body.initial,$options: "i"}   })
        }
        
        selector["$or"].push({ companyName : { $regex : req.body.searchStr, $options: "i"}  })
        selector["$or"].push({ groupName   : { $regex : req.body.searchStr, $options: "i"}  })
        selector["$or"].push({ locations   : { $elemMatch: { addressLine1 : { $regex : req.body.searchStr, $options: "i"} } }  })
        selector["$or"].push({ locations   : { $elemMatch: { area : { $regex : req.body.searchStr, $options: "i"} } }  })
        selector["$or"].push({ locations   : { $elemMatch: { district : { $regex : req.body.searchStr, $options: "i"} } }  })
        selector["$or"].push({ locations   : { $elemMatch: { stateCode : { $regex : req.body.searchStr, $options: "i"} } }  })
    }

    EntityMaster.find(selector)
    .sort({createdAt : -1})
    .skip(req.body.startRange)
    .limit(req.body.limitRange)
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
exports.fetchEntities = (req, res, next)=>{
    EntityMaster.find({entityType:req.body.type})
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
exports.CompanyfromEntities = (req, res, next)=>{
    EntityMaster.find({})
        .sort({createdAt : -1})
        .select("companyName")
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};
exports.countContacts = (req,res,next)=>{
    EntityMaster.aggregate([
        { "$match": { entityType:req.params.entityType } },
        {
          $group: {
            _id: "$entityType",
            total: { $sum: { $size: "$contactPersons"} }
          }
        }
    ])
    .exec()
    .then(data=>{
        if(data[0]){
            var count = data[0].total
        }else{
            var count = 0
        }

            res.status(200).json({count:count});
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};


/*Bulk upload*/

exports.bulkUploadEntity = (req, res, next) => {
    var entity = req.body.data;
    console.log("entity...",entity);
    var validData = [];
    var validObjects = [];
    var invalidData = [];
    var invalidObjects = [];
    var remark = '';
    var failedRecords = [];
    var Count = 0;
    var DuplicateCount = 0;
    processData();
    async function processData() {

        var departments = await fetchDepartments();
        var designations = await fetchDesignations();
        var users = await fetchAllUsers();
        console.log("entity",entity);

        for (var k = 0; k < entity.length; k++) {
            if (entity[k].entityType == '-') {
                remark += "entityType not found, ";
            }
            if (entity[k].companyName == '-') {
                remark += "companyName not found, ";
            }
            if (entity[k].groupName == '-') {
                remark += "groupName not found, ";
            }
            if (entity[k].companyEmail == '-') {
                remark += "companyEmail not found, ";
            }
            if (entity[k].website == '-') {
                remark += "website not found, ";
            }
            if (entity[k].companyPhone == '-') {
                remark += "companyPhone not found, ";
            }
            if (entity[k].CIN == '-') {
                remark += "CIN not found, ";
            }
            if (entity[k].COI == '-') {
                remark += "COI not found, ";
            }
            if (entity[k].TAN == '-') {
                remark += "TAN not found, ";
            }
            // else if(entity[i].state != "-" && entity[i].GSTIN !="-"&& entity[i].PAN){

            // }
            // console.log("remark", remark)
            // console.log("departments", departments)

            if (remark == '') {
                var departmentId1,departmentId2,departmentId3, designationId1,designationId2,designationId3;
                var departmentExists1 = departments.filter((data) => {
                        // console.log("data.department == entity[k].department1",data.department == entity[k].department1);
                        // console.log("entity[k].department1",entity[k].department1);
                    if (data.department == entity[k].department1) {
                    console.log("data---",data);
                        return data;

                    }
                })
                if (departmentExists1.length > 0) {
                    departmentId1 = departmentExists1[0]._id;

                } else {
                    departmentId1 = await insertDepartment(entity[k].department1);
                }

                /**/
                var departmentExists2 = departments.filter((data) => {
                    if (data.department == entity[k].department2) {
                        return data;

                    }
                })
                if (departmentExists2.length > 0) {
                    departmentId2 = departmentExists2[0]._id;
                } else {
                    departmentId2 = await insertDepartment(entity[k].department2);
                }

                /**/
                 var departmentExists3 = departments.filter((data) => {
                    if (data.department == entity[k].department3) {
                        return data;

                    }
                })
                if (departmentExists3.length > 0) {
                    departmentId3 = departmentExists3[0]._id;
                } else {
                    departmentId3 = await insertDepartment(entity[k].department3);
                }



                // check if designation exists
                var designationExists1 = designations.filter((data) => {
                    if (data.designation == entity[k].designation1) {
                        return data;
                    }
                   
                })
                if (designationExists1.length > 0) {
                    designationId1 = designationExists1[0]._id;
                    
                } else {
                    designationId1 = await insertDesignation(entity[k].designation1);
                }
                /**/
                var designationExists2 = designations.filter((data) => {
                    if (data.designation == entity[k].designation2) {
                        return data;
                    }
                   
                })
                if (designationExists2.length > 0) {
                    designationId2 = designationExists2[0]._id;
                    
                } else {
                    designationId2 = await insertDesignation(entity[k].designation2);
                }
                /**/
                var designationExists3 = designations.filter((data) => {
                    if (data.designation == entity[k].designation3) {
                        return data;
                    }
                   
                })
                if (designationExists3.length > 0) {
                    designationId3 = designationExists3[0]._id;
                    
                } else {
                    designationId3 = await insertDesignation(entity[k].designation3);
                }

                var allEntities = await fetchAllEntities(req.body.reqdata.entityType);
                console.log("allEntities",allEntities);
                // check if employee exists
                var employeeExists = allEntities.filter((data) => {
                    if (data.entityType == entity[k].entityType
                        && data.companyName == entity[k].companyName
                        && data.companyEmail == entity[k].companyEmail) {
                        return data;
                    }
                })
                validObjects.fileName       = req.body.fileName;
                // console.log("employeeExists--",employeeExists);
                if (employeeExists.length == 0) {   
                   var statutorydetails=[
                                       {
                                        state               : entity[k].State1Name,
                                        GSTIN               : entity[k].State1GST,
                                        PAN                 : entity[k].State1PAN,
                                       },
                                       {
                                        state               : entity[k].State2Name != '-'  ? entity[k].State2Name : 'null',
                                        GSTIN               : entity[k].State2GST  != '-'  ? entity[k].State2GST : 'null', 
                                        PAN                 : entity[k].State2PAN  != '-'  ? entity[k].State2PAN : 'null',
                                       },
                                       {
                                        state               : entity[k].State3Name != '-'  ? entity[k].State3Name : 'null',
                                        GSTIN               : entity[k].State3GST != '-'  ? entity[k].State3GST : 'null',
                                        PAN                 : entity[k].State3PAN != '-'  ? entity[k].State3PAN : 'null',
                                       },
                                           ]
                    console.log("statutorydetails--",statutorydetails);
                    let finalstatutorydetails = [];
                    for( var a=0; a<statutorydetails.length; a++){
                        if((statutorydetails[a].state != 'null' || statutorydetails[a].GSTIN != 'null' || statutorydetails[a].PAN != 'null' ))
                          {
                           
                            finalstatutorydetails.push(statutorydetails[a]);
                                
                            }
                        }

                    var  locations =[

                                   {
                                        locationType        : entity[k].Location1Type,
                                        addressLine1        : entity[k].address1Line1,
                                        addressLine2        : entity[k].address1Line2,
                                        country             : entity[k].country1,
                                        state               : entity[k].state1,
                                        district            : entity[k].district1,
                                        city                : entity[k].city1,
                                        area                : entity[k].area1,
                                        pincode             : entity[k].pincode1,

                                     },

                                    {
                                            locationType        : entity[k].Location2Type != '-'  ?  entity[k].Location2Type : 'null',
                                            addressLine1        : entity[k].address2Line1 != '-'  ?  entity[k].address2Line1 : 'null',
                                            addressLine2        : entity[k].address2Line2 != '-'  ?  entity[k].address2Line2 : 'null',
                                            country             : entity[k].country2 != '-'  ?  entity[k].country2 : 'null',
                                            state               : entity[k].state2 != '-'  ?  entity[k].state2 : 'null',
                                            district            : entity[k].district2 != '-'  ?  entity[k].district2 : 'null',
                                            city                : entity[k].city2 != '-'  ?  entity[k].city2 : 'null',
                                            area                : entity[k].area2 != '-'  ?  entity[k].area2 : 'null',
                                            pincode             : entity[k].pincode2 != '-'  ?  entity[k].pincode2 : 'null',
                                    },
                                    {
                                            locationType        : entity[k].Location3Type != '-'  ? entity[k].Location3Type : 'null',
                                            addressLine1        : entity[k].address3Line1 != '-'  ? entity[k].address3Line1 : 'null',
                                            addressLine2        : entity[k].address3Line2 != '-'  ? entity[k].address3Line2 : 'null',
                                            country             : entity[k].country3 != '-'  ? entity[k].country3 : 'null',
                                            state               : entity[k].state3 != '-'  ? entity[k].state3 : 'null',
                                            district            : entity[k].district3 != '-'  ? entity[k].district3 : 'null',
                                            city                : entity[k].city3 != '-'  ? entity[k].city3 : 'null',
                                            area                : entity[k].area3 != '-'  ? entity[k].area3 : 'null',
                                            pincode             : entity[k].pincode3 != '-'  ? entity[k].pincode3 : 'null',
                                   }
                                 ]
                             let locationdetails = [];
                                for( var a=0; a<locations.length; a++){
                                    if((locations[a].locationType != 'null' || locations[a].addressLine1 != 'null' || locations[a].addressLine2 != 'null' ))
                                      {
                                       
                                        locationdetails.push(locations[a]);
                                            
                                        }
                                    }  

                           var contactPersons      =[

                                                    {
                                                        branchName                : entity[k].branchName1,
                                                        firstName                 : entity[k].firstName1,
                                                        lastName                  : entity[k].lastName1,
                                                        empCategory               : entity[k].empCategory1,
                                                        empPriority               : entity[k].empPriority1,
                                                        phone                     : entity[k].phone1,
                                                        altPhone                  : entity[k].altPhone1,
                                                        email                     : entity[k].email1,
                                                        department                : entity[k].department1,
                                                        designation               : entity[k].designation1,
                                                        employeeID                : entity[k].employeeID1,
                                                        // bookingApprovalRequired   : entity[k].bookingApprovalRequired1,
                                                        approvingAuthorityId1     : entity[k].approving1AuthorityId1,
                                                        approvingAuthorityId2     : entity[k].approving1AuthorityId2,
                                                        approvingAuthorityId3     : entity[k].approving1AuthorityId3,
                                                        preApprovedKilometer      : entity[k].preApprovedKilometer1,
                                                        preApprovedRides          : entity[k].preApprovedRides1,
                                                        preApprovedAmount         : entity[k].preApprovedAmount1,
                       
                                                      },
                                                      {
                                                        branchName                : entity[k].branchName2 != '-'  ? entity[k].branchName2 : 'null',
                                                        firstName                 : entity[k].firstName2 != '-'  ? entity[k].firstName2 : 'null',
                                                        lastName                  : entity[k].lastName2 != '-'  ? entity[k].lastName2 : 'null',
                                                        empCategory               : entity[k].empCategory2 != '-'  ? entity[k].empCategory2 : 'null',
                                                        empPriority               : entity[k].empPriority2 != '-'  ? entity[k].empPriority2 : 'null',
                                                        phone                     : entity[k].phone2 != '-'  ? entity[k].phone2 : 'null',
                                                        altPhone                  : entity[k].altPhone2 != '-'  ? entity[k].altPhone2 : 'null',
                                                        email                     : entity[k].email2 != '-'  ? entity[k].email2 : 'null',
                                                        department                : entity[k].department2 != '-'  ? entity[k].department2 : 'null',
                                                        designation               : entity[k].designation2 != '-'  ? entity[k].designation2 : 'null',
                                                        employeeID                : entity[k].employeeID2 != '-'  ? entity[k].employeeID2 : 'null',
                                                        // bookingApprovalRequired   : entity[k].bookingApprovalRequired2 != '-'  ? entity[k].bookingApprovalRequired2 : 'null',
                                                        approvingAuthorityId1     : entity[k].approving2AuthorityId1 != '-'  ? entity[k].approving2AuthorityId1 : 'null',
                                                        approvingAuthorityId2     : entity[k].approving2AuthorityId2 != '-'  ? entity[k].approving2AuthorityId2 : 'null',
                                                        approvingAuthorityId3     : entity[k].approving2AuthorityId3 != '-'  ? entity[k].approving2AuthorityId3 : 'null',
                                                        preApprovedKilometer      : entity[k].preApprovedKilometer2 != '-'  ? entity[k].preApprovedKilometer2 : 'null',
                                                        preApprovedRides          : entity[k].preApprovedRides2 != '-'  ? entity[k].preApprovedRides2 : 'null',
                                                        preApprovedAmount         : entity[k].preApprovedAmount2 != '-'  ? entity[k].preApprovedAmount2 : 'null',
                       
                                                      },
                                                       {
                                                        branchName                : entity[k].branchName3 != '-'  ? entity[k].branchName3 : 'null',
                                                        firstName                 : entity[k].firstName3 != '-'  ? entity[k].firstName3 : 'null',
                                                        lastName                  : entity[k].lastName3 != '-'  ? entity[k].lastName3 : 'null',
                                                        empCategory               : entity[k].empCategory3 != '-'  ? entity[k].empCategory3 : 'null',
                                                        empPriority               : entity[k].empPriority3 != '-'  ? entity[k].empPriority3 : 'null',
                                                        phone                     : entity[k].phone3 != '-'  ? entity[k].phone3 : 'null',
                                                        altPhone                  : entity[k].altPhone3 != '-'  ? entity[k].altPhone3 : 'null',
                                                        email                     : entity[k].email3 != '-'  ? entity[k].email3 : 'null',
                                                        department                : entity[k].department3 != '-'  ? entity[k].department3 : 'null',
                                                        designation               : entity[k].designation3 != '-'  ? entity[k].designation3 : 'null',
                                                        employeeID                : entity[k].employeeID3 != '-'  ? entity[k].employeeID3 : 'null',
                                                        // bookingApprovalRequired   : entity[k].bookingApprovalRequired3 != '-'  ? entity[k].bookingApprovalRequired3 : 'null',
                                                        approvingAuthorityId1     : entity[k].approving3AuthorityId1 != '-'  ? entity[k].approving3AuthorityId1 : 'null',
                                                        approvingAuthorityId2     : entity[k].approving3AuthorityId2 != '-'  ? entity[k].approving3AuthorityId2 : 'null',
                                                        approvingAuthorityId3     : entity[k].approving3AuthorityId3 != '-'  ? entity[k].approving3AuthorityId3 : 'null',
                                                        preApprovedKilometer      : entity[k].preApprovedKilometer3 != '-'  ? entity[k].preApprovedKilometer3 : 'null',
                                                        preApprovedRides          : entity[k].preApprovedRides3 != '-'  ? entity[k].preApprovedRides3 : 'null',
                                                        preApprovedAmount         : entity[k].preApprovedAmount3 != '-'  ? entity[k].preApprovedAmount3 : 'null',
                       
                                                      },
                                                   ]
                                        console.log("contactPersons",contactPersons);           
                                        let contactdetails = [];
                                            for( var a=0; a<contactPersons.length; a++){
                                                if((contactPersons[a].branchName != 'null' || contactPersons[a].firstName != 'null' || 
                                                    contactPersons[a].lastName != 'null' || contactPersons[a].empCategory != 'null' || contactPersons[a].empPriority != 'null' || contactPersons[a].phone != 'null' || contactPersons[a].altPhone != 'null' || contactPersons[a].email != 'null' ||
                                                     contactPersons[a].department != 'null' || contactPersons[a].designation != 'null' || contactPersons[a].employeeID != 'null' ||
                                                      contactPersons[a].approvingAuthorityId1 != 'null' || contactPersons[a].approving3AuthorityId2 != 'null' || contactPersons[a].approving3AuthorityId3 != 'null' || 
                                                       contactPersons[a].preApprovedKilometer != 'null' || contactPersons[a].preApprovedRides != 'null' || contactPersons[a].preApprovedAmount != 'null'))
                                                    
                                                    {
                                                   
                                                    contactdetails.push(contactPersons[a]);
                                                        
                                                    }
                                                } 
                                                /*var userExists = users.filter((data) => {
                                                    if (data.firstName == entity[k].firstName
                                                        && data.lastname == entity[k].lastname
                                                        && data.companyName == entity[k].companyName) {
                                                        return data;
                                                    }
                                                })
                                                  if (userExists.length==0) {
                                                    
                                                    userExists = await insertUser(entity[k].firstName);
                                                }*/


                                       
                                                validObjects = {
                                                fileName                  : req.body.fileName,   
                                                entityType                : entity[k].entityType,
                                                companyName               : entity[k].companyName,
                                                groupName                 : entity[k].groupName,
                                                CIN                       : entity[k].CIN,   
                                                COI                       : entity[k].COI,
                                                TAN                       : entity[k].TAN,
                                                website                   : entity[k].website,
                                                companyPhone              : entity[k].companyPhone,
                                                companyEmail              : entity[k].companyEmail,
                                                country                   : entity[k].country,
                                                statutoryDetails          : finalstatutorydetails,
                                                locations                 : locationdetails,
                                                contactPersons            : contactdetails,

                               
                                

                                                                         

                             
                                }

                                validData.push(validObjects);

                            } else {

                    remark += "data already exists.";

                    invalidObjects = entity[k];
                    invalidObjects.failedRemark = remark;
                    invalidData.push(invalidObjects);
                }

            } else {

              
                invalidObjects = entity[k];
                invalidObjects.failedRemark = remark;
                invalidData.push(invalidObjects);
            }
            remark = '';
        }
        //console.log("validData",validData);
        EntityMaster.insertMany(validData)
            .then(data => {

            })
            .catch(err => {
                console.log(err);
            });

        failedRecords.FailedRecords = invalidData;
        failedRecords.fileName = req.body.fileName;
        failedRecords.totalRecords = req.body.totalRecords;

        await insertFailedRecords(failedRecords, req.body.updateBadData);

        res.status(200).json({
            "message": "Bulk upload process is completed successfully!",
            "completed": true
        });
    }
};

var fetchDesignations = async () => {
    return new Promise(function (resolve, reject) {
        DesignationMaster.find({})
            .exec()
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            });
    });
};

var fetchDepartments = async () => {
    return new Promise(function (resolve, reject) {
        DepartmentMaster.find({})
            .exec()
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            });
    });
};
var fetchAllUsers = async (type) => {
    return new Promise(function (resolve, reject) {
        User.find({})
            .exec()
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            });
    });
};
/*function insertUser(firstName,lastName,companyName,createdAt) {
    return new Promise(function (resolve, reject) {
        const departmentMaster = new DepartmentMaster({
            _id: new mongoose.Types.ObjectId(),

            firstName        : firstName,
            lastnName        : lastName,
            fullName         : firstname + ' ' + lastname,
            email            : emailId.toLowerCase(),
            mobile           : phone,
            workLocation     : workLocation,
            companyName      : companyName,
            department       : department,
            designation      : designation ,
            city             : city,
            states           : states,
            createdBy        : createdBy,
            createdAt        : new Date()
        })
        user.save()
            .then(data => {
                resolve(data._id);
            })
            .catch(err => {
                reject(err);
            });
    });
}*/
var fetchAllEntities = async (type) => {
    return new Promise(function (resolve, reject) {
        EntityMaster.find({entityType:type})
            .sort({ createdAt: -1 })
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            });
    });
};
exports.filedetails = (req,res,next)=>{
    // console.log('req------',req,'res',res);
    var finaldata = {};
    console.log(req.params.fileName)
    EntityMaster.find( { fileName:req.params.fileName  }
    )
    .exec()
    .then(data=>{
        // finaldata.push({goodrecords: data})
        finaldata.goodrecords = data;
        FailedRecords.find({fileName:req.params.fileName})  
            .exec()
            .then(badData=>{
                finaldata.failedRecords = badData[0].failedRecords
                finaldata.totalRecords = badData[0].totalRecords
                res.status(200).json(finaldata);
            })
        
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};



function insertDepartment(department, createdBy) {
    return new Promise(function (resolve, reject) {
        const departmentMaster = new DepartmentMaster({
            _id: new mongoose.Types.ObjectId(),
            department: department,
            createdBy: createdBy,
            createdAt: new Date()
        })
        departmentMaster.save()
            .then(data => {
                resolve(data._id);
            })
            .catch(err => {
                reject(err);
            });
    });
}
// function insertDepartment(department, createdBy) {
//     return new Promise(function (resolve, reject) {
//         const departmentMaster = new DepartmentMaster({
//             _id: new mongoose.Types.ObjectId(),
//             department: department,
//             createdBy: createdBy,
//             createdAt: new Date()
//         })
//         departmentMaster.save()
//             .then(data => {
//                 resolve(data._id);
//             })
//             .catch(err => {
//                 reject(err);
//             });
//     });
// }
function insertContactDetails(department, createdBy) {
    return new Promise(function (resolve, reject) {
        const departmentMaster = new DepartmentMaster({
            _id: new mongoose.Types.ObjectId(),
            department: department,
            createdBy: createdBy,
            createdAt: new Date()
        })
        departmentMaster.save()
            .then(data => {
                resolve(data._id);
            })
            .catch(err => {
                reject(err);
            });
    });
}
function insertDesignation(designation, createdBy) {
    return new Promise(function (resolve, reject) {
        const designationMaster = new DesignationMaster({
            _id: new mongoose.Types.ObjectId(),
            designation: designation,
            createdBy: createdBy,
            createdAt: new Date()
        })
        designationMaster.save()
            .then(data => {
                resolve(data._id);
            })
            .catch(err => {
                reject(err);
            });
    });
}
var insertFailedRecords = async (invalidData, updateBadData) => {
    //console.log('invalidData',invalidData);
    return new Promise(function (resolve, reject) {
        FailedRecords.find({ fileName: invalidData.fileName })
            .exec()
            .then(data => {
                if (data.length > 0) {
                    //console.log('data',data[0].failedRecords.length)   
                    if (data[0].failedRecords.length > 0) {
                        if (updateBadData) {
                            FailedRecords.updateOne({ fileName: invalidData.fileName },
                                { $set: { 'failedRecords': [] } })
                                .then(data => {
                                    if (data.nModified == 1) {
                                        FailedRecords.updateOne({ fileName: invalidData.fileName },
                                            {
                                                $set: { 'totalRecords': invalidData.totalRecords },
                                                $push: { 'failedRecords': invalidData.FailedRecords }
                                            })
                                            .then(data => {
                                                if (data.nModified == 1) {
                                                    resolve(data);
                                                } else {
                                                    resolve(data);
                                                }
                                            })
                                            .catch(err => { reject(err); });
                                    } else {
                                        resolve(0);
                                    }
                                })
                                .catch(err => { reject(err); });
                        } else {
                            FailedRecords.updateOne({ fileName: invalidData.fileName },
                                {
                                    $set: { 'totalRecords': invalidData.totalRecords },
                                    $push: { 'failedRecords': invalidData.FailedRecords }
                                })
                                .then(data => {
                                    if (data.nModified == 1) {
                                        resolve(data);
                                    } else {
                                        resolve(data);
                                    }
                                })
                                .catch(err => { reject(err); });
                        }

                    } else {
                        FailedRecords.updateOne({ fileName: invalidData.fileName },
                            {
                                $set: { 'totalRecords': invalidData.totalRecords },
                                $push: { 'failedRecords': invalidData.FailedRecords }
                            })
                            .then(data => {
                                if (data.nModified == 1) {
                                    resolve(data);
                                } else {
                                    resolve(data);
                                }
                            })
                            .catch(err => { reject(err); });
                    }
                } else {
                    const failedRecords = new FailedRecords({
                        _id: new mongoose.Types.ObjectId(),
                        failedRecords: invalidData.FailedRecords,
                        fileName: invalidData.fileName,
                        totalRecords: invalidData.totalRecords,
                        createdAt: new Date()
                    });

                    failedRecords
                        .save()
                        .then(data => {
                            resolve(data._id);
                        })
                        .catch(err => {
                            console.log(err);
                            reject(err);
                        });
                }
            })

    })
}