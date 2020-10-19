const mongoose  = require("mongoose");

const PersonMaster = require('./ModelPersonMaster');
var request = require('request-promise');
//const gloabalVariable = require('./../../../nodemon');
var   ObjectID          = require('mongodb').ObjectID;
const FailedRecords     = require('../failedRecords/ModelFailedRecords');
const DesignationMaster = require('../designationMaster/ModelDesignationMaster.js');
const DepartmentMaster  = require('../departmentMaster/ModelDepartmentMaster.js');
const moment            = require('moment');

exports.insertPerson = (req,res,next)=>{
        console.log(req.body)
        const person = new PersonMaster({
                    _id                         : new mongoose.Types.ObjectId(),
                    type                        : req.body.type,
                    firstName                   : req.body.firstName,
                    middleName                  : req.body.middleName,
                    lastName                    : req.body.lastName,
                    DOB                         : req.body.DOB,
                    gender                      : req.body.gender,
                    contactNo                   : req.body.contactNo,
                    altContactNo                : req.body.altContactNo,
                    profilePhoto                : req.body.profilePhoto,
                    email                       : req.body.email,
                    whatsappNo                  : req.body.whatsappNo,
                    designationId               : req.body.designationId,
                    departmentId                : req.body.departmentId,
                    employeeId                  : req.body.employeeId,
                    bookingApprovalRequired     : req.body.bookingApprovalRequired,
                    preApprovedAmount           : req.body.preApprovedAmount,
                    workLocation                : req.body.workLocation,
                    batchNumber                 : req.body.batchNumber,
                    approvingAuthorityId        : req.body.approvingAuthorityId ? req.body.approvingAuthorityId : null,
                    address                     : req.body.address,
                    drivingLicense              : req.body.drivingLicense,
                    //pan                         : req.body.pan,
                    aadhar                      : req.body.aadhar,
                    identityProof               : req.body.identityProof,
                    //voterID                     : req.body.voterID,
                    //passport                    : req.body.passport,
                    corporateId                 : req.body.corporateId,
                    userId                      : req.body.userId,
                    createdBy                   : req.body.createdBy,
                    createdAt                   : new Date()
                })
                person.save()
                .then(data=>{
                    res.status(200).json({ created : true, PersonId : data._id });
                })
                .catch(err =>{
                    console.log(err)
                    res.status(500).json({ error: err }); 
                });
};



exports.countPersons = (req,res,next)=>{
    PersonMaster.find({type: req.params.type}).count()
        .exec() 
        .then(data=>{
            res.status(200).json({ count : data } );
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};

exports.listPersons = (req,res,next)=>{ 
    PersonMaster.find({type: req.body.type})
        .sort({createdAt : -1})
        .then(data=>{
            res.status(200).json( data );
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};

exports.singlePerson = (req, res, next)=>{
    //PersonMaster.findOne({ _id: req.params.personID })
    PersonMaster.aggregate([
         {
            $lookup:
                {
                   from: "departmentmasters",
                   localField: "departmentId",
                   foreignField: "_id",
                   as: "department"
                }
        },
        {    $lookup:
                {
                   from: "designationmasters",
                   localField: "designationId",
                   foreignField: "_id",
                   as: "designation"
                }
        },
        { $match : {"_id": ObjectID(req.params.personID)} }
        ])
        .exec()
        .then(data=>{
            console.log(data)
            res.status(200).json(data[0]);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};

exports.singlePersonByUserId = (req, res, next)=>{
    //PersonMaster.findOne({ _id: req.params.personID })
    PersonMaster.aggregate([
         {
            $lookup:
                {
                   from: "departmentmasters",
                   localField: "departmentId",
                   foreignField: "_id",
                   as: "department"
                }
        },
        {    $lookup:
                {
                   from: "designationmasters",
                   localField: "designationId",
                   foreignField: "_id",
                   as: "designation"
                }
        },
        { $match : {"userId": ObjectID(req.params.userID)} }
        ])
        .exec()
        .then(data=>{
            console.log(data)
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};

exports.updatePerson = (req, res, next)=>{
    console.log('userDetails', req.body);
    PersonMaster.updateOne(
            { _id:req.body.personID },   
            {
                $set:   {   'firstName'                   : req.body.firstName,
                            'middleName'                  : req.body.middleName,
                            'lastName'                    : req.body.lastName,
                            'DOB'                         : req.body.DOB,
                            'gender'                      : req.body.gender,
                            'contactNo'                   : req.body.contactNo,
                            'altContactNo'                : req.body.altContactNo,
                            'profilePhoto'                : req.body.profilePhoto,
                            //'email'                     : req.body.email,
                            'whatsappNo'                  : req.body.whatsappNo,
                            'designationId'               : req.body.designationId,
                            'departmentId'                : req.body.departmentId,
                            'employeeId'                  : req.body.employeeId,
                            'bookingApprovalRequired'     : req.body.bookingApprovalRequired, 
                            'preApprovedAmount'           : req.body.preApprovedAmount, 
                            'workLocation'                : req.body.workLocation, 
                            'approvingAuthorityId'        : req.body.approvingAuthorityId,  
                            'address'                     : [{
                                                            addressLine1    : req.body.addressLine1,
                                                            addressLine2    : req.body.addressLine2,
                                                            landmark        : req.body.landmark,
                                                            area            : req.body.area,
                                                            city            : req.body.city,
                                                            district        : req.body.district,
                                                            stateCode       : req.body.stateCode,
                                                            state           : req.body.state,
                                                            countryCode     : req.body.countryCode,
                                                            country         : req.body.country,
                                                            pincode         : req.body.pincode,
                                                            latitude        : req.body.latitude,
                                                            longitude       : req.body.longitude,
                                                            addressProof    : req.body.addressProof    
                                                        }],

                            'drivingLicense'            : [{
                                                            licenseNo       : req.body.licenseNo,
                                                            effectiveTo     : req.body.effectiveTo,
                                                            licenseProof    : req.body.licenseProof
                                                        }],
                            'identityProof'               : req.body.identityProof,
                            // 'pan'                         : [{
                            //                                 PAN             : req.body.PAN,
                            //                                 PANProof        : req.body.PANProof
                            //                             }],
                            'aadhar'                    : [{
                                                            aadharNo        : req.body.aadharNo,
                                                            aadharProof     : req.body.aadharProof
                                                        }],
                            // 'voterID'                   : [{
                            //                                 voterID             : req.body.voterID,
                            //                                 voterIDProof        : req.body.voterIDProof
                            //                             }],
                            // 'passport'                    : [{
                            //                                 passportNo           : req.body.passportNo,
                            //                                 passportProof        : req.body.passportProof
                            //                             }]
                        }
            }
        )
        .exec()
        .then(data=>{
            if(data.nModified == 1){
                PersonMaster.updateOne(
                { _id:req.body.packageID},
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

exports.deletePerson = (req, res, next)=>{
    PersonMaster.deleteOne({_id: req.params.personID})
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
exports.filterPersons = (req,res,next)=>{
    var selector = {};
    
    for (var key in req.body) {
        if (key=='departments' && req.body.departments.length > 0) {
            selector.department =  { $in: req.body.departments } 
        }
        if (key=='designations' && req.body.designations.length > 0 ) {
            selector.designation =  { $in: req.body.designations } 
        }
        
        if (req.body.initial && req.body.initial != 'All') {
            selector.firstName = { $regex : "^"+req.body.initial,$options: "i"}
        }
    }
    selector.type = { $regex : req.body.type,$options: "i"}
    PersonMaster.find(selector)
    .exec()
    .then(data=>{
        res.status(200).json(data);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};

exports.searchPerson = (req, res, next)=>{
    var selector = {}; 
    selector["$and"] = [];
    selector["$and"].push({ type         : { $regex : req.params.type, $options: "i"}  })
    
    selector['$or'] = [];

    selector["$or"].push({ firstName    : { $regex : req.params.str, $options: "i"}  })
    selector["$or"].push({ middleName   : { $regex : req.params.str, $options: "i"}  })
    selector["$or"].push({ lastName     : { $regex : req.params.str, $options: "i"}  })
    selector["$or"].push({ gender       : { $regex : req.params.str, $options: "i"}  })
    selector["$or"].push({ designation  : { $regex : req.params.str, $options: "i"}  })
    selector["$or"].push({ department   : { $regex : req.params.str, $options: "i"}  })

    PersonMaster.find(selector)
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};



exports.bulkUploadEmployee = (req, res, next)=>{
    var employees = req.body.data;
    //console.log("employees",employees);
    
    var validData = [];
    var validObjects = [];
    var invalidData = [];
    var invalidObjects = [];
    var remark = ''; 
    var failedRecords = [];
    var Count = 0;
    var DuplicateCount = 0;
    processData();
    async function processData(){

        var departments = await fetchDepartments();
        var designations = await fetchDesignations();

        for(var k = 0 ; k < employees.length ; k++){
            if (employees[k].firstName == '-') {
                remark += "firstName not found, " ;  
            }
            if (employees[k].middleName == '-') {
                remark += "middleName not found, " ;  
            }
            if (employees[k].lastName == '-') {
                remark += "lastName not found, " ;  
            }
            if (employees[k].DOB == '-') {
                remark += "DOB not found, " ;  
            }
            if (employees[k].gender == '-') {
                remark += "gender not found, " ;  
            }
            if (employees[k].email == '-') {
                remark += "email not found, " ;  
            }
            if (employees[k].department == '-') {
                remark += "department not found, " ;  
            }
            if (employees[k].designation == '-') {
                remark += "designation not found, " ;  
            }
            if (employees[k].employeeId == '-') {
                remark += "employeeId not found, " ;  
            }
            console.log("remark",remark)

            if (remark == '') {
                var departmentId, designationId;
                // check if department exists
                var departmentExists = departments.filter((data)=>{
                    if (data.department.trim().toLowerCase() == employees[k].department.trim().toLowerCase()) {
                        return data;
                    }
                })
                if (departmentExists.length>0) {
                    departmentId = departmentExists[0]._id;
                }else{
                    departmentId = await insertDepartment(employees[k].department.trim(), req.body.reqdata.createdBy);
                    //departmentId = departmentExists[0]._id;
                }
                // check if designation exists
                var designationExists = designations.filter((data)=>{
                    if (data.designation.trim().toLowerCase() == employees[k].designation.trim().toLowerCase()) {
                        return data;
                    }
                })
                if (designationExists.length>0) {
                    designationId = designationExists[0]._id;
                }else{
                    designationId = await insertDesignation(employees[k].designation.trim(), req.body.reqdata.createdBy);
                    //departmentId = departmentExists[0]._id;
                }
                console.log("departmentId",departmentId)
                console.log("designationId",designationId)

                var allEmployees = await fetchAllEmployees(req.body.reqdata.type);

                // check if employee exists
                var employeeExists = allEmployees.filter((data)=>{
                    if (data.firstName.trim().toLowerCase() == employees[k].firstName.trim().toLowerCase()
                        && data.middleName.trim().toLowerCase() == employees[k].middleName.trim().toLowerCase()
                        && data.lastName.trim().toLowerCase() == employees[k].lastName.trim().toLowerCase()
                        && data.email.trim() == employees[k].email.trim()) {
                        return data;
                    }
                })
                console.log("in else validObjects",employeeExists);
                if (employeeExists.length==0) {
                    var DOB;
                    if (typeof employees[k].DOB == 'number') {
                        DOB = moment(new Date(Math.round((employees[k].DOB - 25569)*86400*1000))).format("YYYY-MM-DD");
                    }else{
                        DOB = moment(new Date(employees[k].DOB)).format("YYYY-MM-DD")
                    }
                    var bookingApprovalRequired = employees[k].bookingApprovalRequired && employees[k].bookingApprovalRequired == '-' ? "No" : "Yes";

                    validObjects = employees[k];

                    validObjects.type           = "employee";
                    validObjects.DOB            = DOB;
                    validObjects.departmentId   = departmentId;
                    validObjects.designationId  = designationId;
                    validObjects.bookingApprovalRequired = bookingApprovalRequired;
                    validObjects.corporateId    = req.body.reqdata.corporateId;
                    validObjects.fileName       = req.body.fileName;
                    validObjects.createdBy      = req.body.reqdata.createdBy;
                    validObjects.createdAt      = new Date();

                    validData.push(validObjects); 

                }else{
                    
                    remark += "Employee already exists." ; 

                    invalidObjects = employees[k];
                    invalidObjects.failedRemark = remark;
                    invalidData.push(invalidObjects); 
                }

            }else{

                var DOB;
                if (employees[k].DOB == '-') { 
                    employees[k].DOB = '-';
                }else{
                    if (typeof employees[k].DOB == 'number') {
                        DOB = moment(new Date(Math.round((employees[k].DOB - 25569)*86400*1000))).format("YYYY-MM-DD");
                    }else{
                        DOB = moment(new Date(employees[k].DOB)).format("YYYY-MM-DD")
                    }
                    
                    employees[k].DOB = DOB;
                }
                invalidObjects = employees[k];
                invalidObjects.failedRemark = remark;
                invalidData.push(invalidObjects);
            }
            remark= '';
        }
        //console.log("validData",validData);
        PersonMaster.insertMany(validData)
        .then(data=>{
            
        })
        .catch(err =>{
            console.log(err);
        });

        failedRecords.FailedRecords = invalidData;
        failedRecords.fileName = req.body.fileName;
        failedRecords.totalRecords = req.body.totalRecords;

        await insertFailedRecords(failedRecords,req.body.updateBadData);
        
        res.status(200).json({
            "message": "Bulk upload process is completed successfully!",
            "completed": true
        });
    }
};

var fetchDesignations = async ()=>{
    return new Promise(function(resolve,reject){ 
    DesignationMaster.find({})
        .exec()
        .then(data=>{
            resolve( data );
        })
        .catch(err =>{
            reject(err);
        }); 
    });
};


var fetchDepartments = async ()=>{
    return new Promise(function(resolve,reject){ 
    DepartmentMaster.find({})
        .exec()
        .then(data=>{
            resolve( data );
        })
        .catch(err =>{
            reject(err);
        }); 
    });
};
var fetchAllEmployees = async (type)=>{
    return new Promise(function(resolve,reject){ 
    PersonMaster.find({type: type})
        .sort({createdAt : -1})
        // .skip(req.body.startRange)
        // .limit(req.body.limitRange)
        .then(data=>{
            resolve( data );
        })
        .catch(err =>{
            reject(err);
        });
    });
}; 
function insertDepartment(department, createdBy){
    return new Promise(function(resolve,reject){ 
        const departmentMaster = new DepartmentMaster({
                        _id                         : new mongoose.Types.ObjectId(),
                        department                  : department,
                        createdBy                   : createdBy,
                        createdAt                   : new Date()
                    })
                    departmentMaster.save()
                    .then(data=>{
                        resolve( data._id );
                    })
                    .catch(err =>{
                        reject(err); 
                    });
    });
}
function insertDesignation(designation, createdBy){
    return new Promise(function(resolve,reject){ 
        const designationMaster = new DesignationMaster({
                        _id                         : new mongoose.Types.ObjectId(),
                        designation                 : designation,
                        createdBy                   : createdBy,
                        createdAt                   : new Date()
                    })
                    designationMaster.save()
                    .then(data=>{
                        resolve( data._id );
                    })
                    .catch(err =>{
                        reject(err); 
                    });
    });
}
var insertFailedRecords = async (invalidData,updateBadData) => {
     //console.log('invalidData',invalidData);
    return new Promise(function(resolve,reject){ 
    FailedRecords.find({fileName:invalidData.fileName})  
            .exec()
            .then(data=>{
            if(data.length>0){
                //console.log('data',data[0].failedRecords.length)   
                if (data[0].failedRecords.length>0) {
                    if (updateBadData) {
                        FailedRecords.updateOne({ fileName:invalidData.fileName},  
                        {   $set:   { 'failedRecords': [] } })
                        .then(data=>{
                        if(data.nModified == 1){
                            FailedRecords.updateOne({ fileName:invalidData.fileName},  
                                {   $set:   {'totalRecords': invalidData.totalRecords},
                                    $push:  { 'failedRecords' : invalidData.FailedRecords } 
                                })
                            .then(data=>{
                                if(data.nModified == 1){
                                    resolve(data);
                                }else{
                                    resolve(data);
                                }
                            })
                            .catch(err =>{ reject(err); });
                        }else{
                            resolve(0);
                        }
                        })
                        .catch(err =>{ reject(err); });
                    }else{
                        FailedRecords.updateOne({ fileName:invalidData.fileName},  
                                {   $set:   {'totalRecords': invalidData.totalRecords},
                                    $push:  { 'failedRecords' : invalidData.FailedRecords } 
                                })
                            .then(data=>{
                                if(data.nModified == 1){
                                    resolve(data);
                                }else{
                                    resolve(data);
                                }
                            })
                            .catch(err =>{ reject(err); });
                    }

                }else{
                    FailedRecords.updateOne({ fileName:invalidData.fileName},  
                        {   $set:   {'totalRecords': invalidData.totalRecords},
                            $push:  { 'failedRecords' : invalidData.FailedRecords } 
                        })
                    .then(data=>{
                        if(data.nModified == 1){
                            resolve(data);
                        }else{
                            resolve(data);
                        }
                    })
                    .catch(err =>{ reject(err); });
                }
            }else{
                    const failedRecords = new FailedRecords({
                    _id                     : new mongoose.Types.ObjectId(),                    
                    failedRecords           : invalidData.FailedRecords,
                    fileName                : invalidData.fileName,
                    totalRecords            : invalidData.totalRecords,
                    createdAt               : new Date()
                    });
                    
                    failedRecords
                    .save()
                    .then(data=>{
                        resolve(data._id);
                    })
                    .catch(err =>{
                        console.log(err);
                        reject(err);
                    });
            }
            })  
    
    })            
}


//Mobile Driver API

//For Driver Basic Info
exports.insertPersonBasicInfo = (req,res,next)=>{
        console.log(req.body)
         PersonMaster.find({userId: req.body.userId})
        .exec()
        .then(person=>{
            console.log("person",person);
            if(person && person.length >0){
                PersonMaster.updateOne(
                    { _id:person[0]._id },   
                    {
                        $set:   {   'firstName'                   : req.body.firstName,
                                    'middleName'                  : req.body.middleName,
                                    'lastName'                    : req.body.lastName,
                                    'DOB'                         : req.body.DOB,
                                    'gender'                      : req.body.gender,
                                    'contactNo'                   : req.body.contactNo,
                                    'altContactNo'                : req.body.altContactNo,
                                    'profilePhoto'                : req.body.profilePhoto,
                                    'email'                       : req.body.email,
                                    'whatsappNo'                  : req.body.whatsappNo,
                            }  
                    }
                )
                .exec()
                .then(data=>{
                    if(data.nModified == 1){
                        PersonMaster.updateOne(
                        { userId:req.body.userId},
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
            }else{
                 const person = new PersonMaster({
                    _id                         : new mongoose.Types.ObjectId(),
                    type                        : req.body.type,
                    firstName                   : req.body.firstName,
                    middleName                  : req.body.middleName,
                    lastName                    : req.body.lastName,
                    DOB                         : req.body.DOB,
                    gender                      : req.body.gender,
                    contactNo                   : req.body.contactNo,
                    altContactNo                : req.body.altContactNo,
                    profilePhoto                : req.body.profilePhoto,
                    email                       : req.body.email,
                    whatsappNo                  : req.body.whatsappNo,
                    userId                      : req.body.userId,
                    createdBy                   : req.body.createdBy,
                    createdAt                   : new Date()    
                })
                person.save()
                .then(data=>{
                    res.status(200).json({ created : true, PersonId : data._id });
                })
                .catch(err =>{
                    console.log(err)
                    res.status(500).json({ error: err }); 
                });
            } 
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        });  
       
};
//End


//For Driver Address Info
exports.insertPersonAddressInfo = (req,res,next)=>{
        console.log(req.body)
         PersonMaster.find({userId: req.body.userId})
        .exec()
        .then(person=>{
            if(person && person.length >0){
                PersonMaster.updateOne(
                    { _id:person[0]._id },   
                    {
                        $set:   {   
                                     
                                    'address'                     : [{
                                                                    addressLine1    : req.body.addressLine1,
                                                                    addressLine2    : req.body.addressLine2,
                                                                    landmark        : req.body.landmark,
                                                                    area            : req.body.area,
                                                                    city            : req.body.city,
                                                                    district        : req.body.district,
                                                                    stateCode       : req.body.stateCode,
                                                                    state           : req.body.state,
                                                                    countryCode     : req.body.countryCode,
                                                                    country         : req.body.country,
                                                                    pincode         : req.body.pincode,
                                                                    latitude        : req.body.latitude,
                                                                    longitude       : req.body.longitude,
                                                                    addressProof    : req.body.addressProof    
                                                                }],

                                }  
                    }
                )
                .exec()
                .then(data=>{
                    if(data.nModified == 1){
                        PersonMaster.updateOne(
                        { userId:req.body.userId},
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
            }else{
                 const person = new PersonMaster({
                    _id                         : new mongoose.Types.ObjectId(),
                    type                        : req.body.type,
                    address                     : [{
                                                        addressLine1    : req.body.addressLine1,
                                                        addressLine2    : req.body.addressLine2,
                                                        landmark        : req.body.landmark,
                                                        area            : req.body.area,
                                                        city            : req.body.city,
                                                        district        : req.body.district,
                                                        stateCode       : req.body.stateCode,
                                                        state           : req.body.state,
                                                        countryCode     : req.body.countryCode,
                                                        country         : req.body.country,
                                                        pincode         : req.body.pincode,
                                                        latitude        : req.body.latitude,
                                                        longitude       : req.body.longitude,
                                                        addressProof    : req.body.addressProof    
                                                    }],
                    userId                      : req.body.userId,
                    createdBy                   : req.body.createdBy,
                    createdAt                   : new Date()
                })
                person.save()
                .then(data=>{
                    res.status(200).json({ created : true, PersonId : data._id });
                })
                .catch(err =>{
                    console.log(err)
                    res.status(500).json({ error: err }); 
                });
            } 
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        });  
       
};
//End

//For Person Document Info
exports.insertPersonDocumentsProof = (req,res,next)=>{
        console.log(req.body)
         PersonMaster.find({userId: req.body.userId})
        .exec()
        .then(person=>{
            if(person && person.length >0){
                PersonMaster.updateOne(
                    { _id:person[0]._id },   
                    {
                        $set:   {   
                                    'drivingLicense'            : {
                                                                    licenseNo       : req.body.licenseNo,
                                                                    effectiveTo     : req.body.effectiveTo,
                                                                    licenseProof    : req.body.licenseProof
                                                                 },
                                    'identityProof'             : req.body.identityProof,
                                    'aadhar'                    : {
                                                                    aadharNo        : req.body.aadharNo,
                                                                    aadharProof     : req.body.aadharProof
                                                                  }      
                                }   
                    }
                )
                .exec()
                .then(data=>{
                    if(data.nModified == 1){
                        PersonMaster.updateOne(
                        { userId:req.body.userId},
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
            }else{
                 const person = new PersonMaster({
                    _id                         : new mongoose.Types.ObjectId(),
                    type                        : req.body.type,
                    'drivingLicense'            : {
                                                    licenseNo       : req.body.licenseNo,
                                                    effectiveTo     : req.body.effectiveTo,
                                                    licenseProof    : req.body.licenseProof
                                                 },
                    'identityProof'             : req.body.identityProof,
                    'aadhar'                    : {
                                                    aadharNo        : req.body.aadharNo,
                                                    aadharProof     : req.body.aadharProof
                                                  },    
                    userId                      : req.body.userId,
                    createdBy                   : req.body.createdBy,
                    createdAt                   : new Date()
                })
                person.save()
                .then(data=>{
                    res.status(200).json({ created : true, PersonId : data._id });
                })
                .catch(err =>{
                    console.log(err)
                    res.status(500).json({ error: err }); 
                });
            } 
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        });  
       
};
exports.filedetails = (req,res,next)=>{
    var finaldata = {};
    console.log(req.params.fileName)
    PersonMaster.aggregate([
    {
        $lookup:
            {
               from: "departmentmasters",
               localField: "departmentId",
               foreignField: "_id",
               as: "department"
            }
    },
    {    $lookup:
            {
               from: "designationmasters",
               localField: "designationId",
               foreignField: "_id",
               as: "designation"
            }
    },
    { $match : { type: req.params.type, fileName:req.params.fileName } }
    ])
    .exec()
    .then(data=>{
        //finaldata.push({goodrecords: data})
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



exports.fetch_file = (req,res,next)=>{ 
    PersonMaster.aggregate([
        { $match : { "type" : req.body.type } },
        { $group : { _id : "$fileName", count : {$sum: 1  } } }
        ])
    .exec()
    .then(data=>{
        res.status(200).json(data.slice(req.body.startRange, req.body.limitRange));
        //res.status(200).json(data);
        })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });   
};
exports.fetch_file_count = (req,res,next)=>{
    //PersonMaster.find({"type" : req.params.type})
    PersonMaster.aggregate([
        { $match : { "type" : req.params.type } },
        { $group : { _id : "$fileName", count : {$sum: 1  } } }
        ])
    .exec()
    .then(data=>{
        
        res.status(200).json(data.length);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    }); 
};

exports.delete_file = (req,res,next)=>{

    //console.log("type",req.params.type)
    //console.log("fileName",req.params.fileName)
    PersonMaster.deleteMany({"fileName":req.params.fileName, "type" : req.params.type})
    .exec()
    .then(data=>{
        res.status(200).json({
            "message" : "Records of file "+req.params.fileName+" deleted successfully"
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });  
};

exports.getUserByEmpID = (req,res,next)=>{
    PersonMaster.find({employeeId: req.params.employeeId})
        .exec() 
        .then(data=>{
            res.status(200).json({ data : data } );
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};

//End
