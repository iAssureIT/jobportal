const mongoose	= require("mongoose");
mongoose.Promise = global.Promise;
const async = require("async");
const States = require('./ModelStates.js');
const FailedRecords = require('../failedRecords/ModelFailedRecords');

const _          = require("underscore");

exports.getAllStates = (req,res,next)=>{

    States.aggregate([
    { $lookup: 
           {
             from: 'countries',
             localField: 'countryID',
             foreignField: '_id',
             as: 'countryDetails'
           }
    },
      { "$unwind": "$countryDetails" },
      { "$addFields": { countryCode: '$countryDetails.countryCode', 
                        countryName: '$countryDetails.countryName' } },
      { "$match" : {"countryCode" :  { "$regex": req.params.countryCode, $options: "i" } } }  
    ]).sort({ "stateName": 1 })
            .exec()
            .then(data=>{
                if(data.length>0){
                    var allData = data.map((x, i)=>{
                    return {
                        "_id"                 : x._id,
                        "countryCode"         : x.countryCode,
                        "countryName"         : x.countryName,
                        "stateCode"           : x.stateCode,
                        "stateName"           : camelCase(x.stateName)
                    }
                    })
                    res.status(200).json(allData);
                }else{
                    res.status(200).json({"message" : 'States not found for this '+ req.params.countryCode +' Country Code'});
                }
            })
            .catch(err =>{
                console.log(err);
                res.status(500).json({ 
                    error: err
                });
            });
}
var camelCase = (str)=>{
      return str
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
}
exports.stateBulkinsert = (req,res,next)=>{
    // console.log('req.body',req.body);
    var goodRecord = 0;
    var badRecord = 0;
    var DuplicateCount = 0;
    var invalidData = [];
    var invalidObjects = [];
    var validationRemark   = ''; 
    var failedRecords   = [];

    getData();
    async function getData(){
        var invalidData = [];
        var invalidObjects = [];
        var finaldata = req.body.data;
        // console.log('finaldata',finaldata.length)
        var excelData = req.body.excelData;
        var reqdata = req.body.reqdata;        
        console.log('reqdata',reqdata)

        for(k = 0 ; k < finaldata.length ; k++){
            if (finaldata[k].stateName == '-') {
                validationRemark += "stateName not found, " ;  
            }
            if (finaldata[k].stateCode == '-') {
                validationRemark += "stateCode not found, " ;  
            }
            if (validationRemark == '') {
                var insertStateObject = await insertState(finaldata[k], reqdata, req.body.fileName)
                var stateID = insertStateObject._id;
                if (insertStateObject.duplicate) {
                    if (finaldata[k]) {
                        DuplicateCount++;
                        invalidObjects = finaldata[k];
                        validationRemark = "Duplicate record found";
                        invalidObjects.failedRemark = validationRemark;
                        invalidData.push(invalidObjects);
                    }
                }else{
                    goodRecord++;
                }
            }else{
                invalidObjects = finaldata[k];
                invalidObjects.failedRemark = validationRemark;
                invalidData.push(invalidObjects);
            }   
            validationRemark= '';   
        }
        failedRecords.FailedRecords = invalidData
        failedRecords.fileName = req.body.fileName;
        failedRecords.totalRecords = req.body.totalRecords;
        await insertFailedRecords(failedRecords,req.body.updateBadData);
        res.status(200).json({
            "message": "Bulk upload process is completed successfully!",
            "completed": true
        });       
    }
};
function findState(stateName) {
    return new Promise(function(resolve,reject){  
    States.findOne({ "stateName": {'$regex' : "^"+stateName+"$" , $options: "i"} })
                .exec()
                .then(stateObject=>{
                    if(stateObject){
                        resolve(stateObject);
                    }else{
                        resolve(0);
                    }
                })
    })           
}
var insertState = async (data, reqdata, fileName) => {
    return new Promise(function(resolve,reject){ 
        stateDuplicateControl();
        async function stateDuplicateControl(){
            var statePresent = await findState(data.stateName);
            //console.log('statePresent',statePresent)    
            if (statePresent==0) {
            const state = new States({
                        _id                     : new mongoose.Types.ObjectId(),                    
                        countryID               : reqdata.countryID,
                        stateName               : data.stateName,
                        stateCode               : data.stateCode,
                        fileName                : fileName,
                        createdAt               : new Date()
                    });
                    state
                    .save()
                    .then(data=>{
                        resolve(data._id);
                    })
                    .catch(err =>{
                        console.log(err);
                        reject(err);
                    });
            }else{
                var statePresent = await findState(data.stateName);
                resolve({statePresent:statePresent, duplicate: true});
            }
        }
    })
}
var insertFailedRecords = async (invalidData,updateBadData) => {
    //console.log('invalidData',invalidData);
    return new Promise(function(resolve,reject){ 
    FailedRecords.find({fileName:invalidData.fileName})  
            .exec()
            .then(data=>{
                if(data.length>0){
                    //console.log('data',data)   
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
exports.fetch_file = (req,res,next)=>{
    Cities.find()
    .exec()
    .then(data=>{
        var x = _.unique(_.pluck(data, "fileName"));
        var z = [];
        for(var i=0; i<x.length; i++){
            var y = data.filter((a)=> a.fileName == x[i]);
            z.push({
                "fileName": x[i],
                'count': y.length,
                "_id" : x[i]
            })
        }
        res.status(200).json(z);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};
exports.filedetails = (req,res,next)=>{
    var finaldata = {};
    console.log(req.params.fileName)
    States.find({fileName:req.params.fileName})
    .exec()
    .then(data=>{
        // console.log('data',data);
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
exports.fetch_file_count = (req,res,next)=>{
    States.find()
    .exec()
    .then(data=>{
        var x = _.unique(_.pluck(data, "fileName"));
        var z = [];
        for(var i=0; i<x.length; i++){
            var y = data.filter((a)=> a.fileName == x[i]);
            z.push({
                "fileName": x[i],
                'count': y.length,
                "_id" : x[i]
            })
        }
        res.status(200).json(z.length);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};

