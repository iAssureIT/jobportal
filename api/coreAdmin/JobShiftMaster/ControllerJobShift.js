const mongoose	        = require("mongoose");
const JobShiftMaster       = require('./ModelJobShift.js');
const FailedRecords     = require('../failedRecords/ModelFailedRecords');

exports.insertJobShift = (req,res,next)=>{
    processData();
    async function processData(){
    var allJobShift = await fetchJobShift()
        var jobShift = allJobShift.filter((data)=>{
            console.log(data.jobShift.trim().toLowerCase())
            console.log(req.body.fieldValue.trim().toLowerCase())
        if (data.jobShift.trim().toLowerCase() == req.body.fieldValue.trim().toLowerCase()) {
            return data;
        }
        })
        console.log(jobShift)
        if (jobShift.length > 0) {
            res.status(200).json({ duplicated : true });
        }else{
            const jobShiftMaster = new JobShiftMaster({
                            _id                         : new mongoose.Types.ObjectId(),
                            jobShift                    : req.body.fieldValue,
                            createdBy                   : req.body.createdBy,
                            createdAt                   : new Date()
                        })
                        jobShiftMaster.save()
                        .then(data=>{
                            res.status(200).json({ created : true, fieldID : data._id });
                        })
                        .catch(err =>{

                            console.log("err",err)
                            if (err.code == 11000) {
                                res.status(200).json({ duplicated : true });
                            }else{
                                res.status(500).json({ error: err });
                            }
                             
                        });
        }
    }       
};
var fetchJobShift = async ()=>{
    return new Promise(function(resolve,reject){ 
    JobShiftMaster.find({})
        .exec()
        .then(data=>{
            resolve( data );
        })
        .catch(err =>{
            reject(err);
        }); 
    });
};
exports.countJobShifts = (req, res, next)=>{
    JobShiftMaster.find({}).count()
        .exec()
        .then(data=>{
            res.status(200).json({ count : data });
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};
exports.fetchJobShifts = (req, res, next)=>{
    JobShiftMaster.find({})
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
exports.getJobShifts = (req, res, next)=>{
    JobShiftMaster.find({})
    .exec()
    .then(data=>{
        res.status(200).json(data);
    })
    .catch(err =>{
        res.status(500).json({ error: err });
    }); 
};
exports.fetchSingleJobShift = (req, res, next)=>{
    JobShiftMaster.findOne({ _id: req.params.fieldID })
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};

exports.searchJobShift = (req, res, next)=>{
    JobShiftMaster.find({ jobShift: { $regex : req.params.str ,$options: "i" }  })
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};
exports.updateJobShift = (req, res, next)=>{
    JobShiftMaster.updateOne(
            { _id:req.body.fieldID },  
            {
                $set:   {  'jobShift'       : req.body.fieldValue  }
            }
        )
        .exec()
        .then(data=>{
            if(data.nModified == 1){
                JobShiftMaster.updateOne(
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
exports.deleteJobShift = (req, res, next)=>{
    JobShiftMaster.deleteOne({_id: req.params.fieldID})
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

var fetchAllJobShift = async (type)=>{
    return new Promise(function(resolve,reject){ 
    JobShiftMaster.find()
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
                    _id                     : new mongoose.Shifts.ObjectId(),                    
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
};


exports.bulkUploadJobShift = (req, res, next)=>{
    console.log("inside bulk upload JobShift");
     // var JobShift = [{JobShift:"mesh"}];
    var JobShift = req.body.data;
    console.log("JobShift",JobShift);

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
         // var alldepartments = await fetchDepartments();
        for(var k = 0 ; k < JobShift.length ; k++){
            if (JobShift[k].JobShift == '-') {
                remark += "department not found, " ;  
            }
            console.log("remark",remark)

              if (remark == '') {
                // var allDepartments = await fetchAllDepartments(req.body.reqdata);
                // console.log("alldepartments",allDepartments);
                 console.log()
                  var allJobShift = await fetchAllJobShift(req.body.reqdata);
                  var JobShiftExists = allJobShift.filter((data)=>{
                    if (data.JobShift == JobShift[k].JobShift)
                         {
                        return data;
                    }
                })
               
                 console.log("in else validObjects",JobShiftExists);
                if (JobShiftExists.length==0) {
                    validObjects = JobShift[k];
                    validObjects.fileName       = req.body.fileName;
                    // validObjects.createdBy      = req.body.reqdata.createdBy;
                    validObjects.createdAt      = new Date();

                    validData.push(validObjects); 

                }else{
                    
                    remark += "JobShift already exists." ; 

                    invalidObjects = JobShift[k];
                    invalidObjects.failedRemark = remark;
                    invalidData.push(invalidObjects); 
                }
 
              
            }

        }
        JobShiftMaster.insertMany(validData)
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
exports.fetch_file = (req,res,next)=>{ 
    JobShiftMaster.find( { _id : "fileName"})
    .exec()
    .then(data=>{
        res.status(200).json(data.length);
        //res.status(200).json(data);
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
    JobShiftMaster.find( { fileName:req.params.fileName }  )
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



