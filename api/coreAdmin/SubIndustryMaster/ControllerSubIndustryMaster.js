const mongoose	        = require("mongoose");
const SubIndustryMaster       = require('./ModelSubIndustryMaster.js');
const IndustryMaster       = require('../IndustryMaster/ModelIndustryMaster.js');
const FailedRecords     = require('../failedRecords/ModelFailedRecords');


exports.insertSubIndustry = (req,res,next)=>{
    // console.log("insertModel req.body = ",req.body);
    const subIndustryMaster = new SubIndustryMaster({
                        _id                         : new mongoose.Types.ObjectId(),                        
                        industry_id                 : req.body.dropdownID,
                        subIndustry              : req.body.fieldValue,
                        createdBy                   : req.body.createdBy,
                        createdAt                   : new Date()
                    })

    subIndustryMaster
        .save()
        .then(data=>{
            res.status(200).json({ created : true, fieldID : data._id });
        })
        .catch(err =>{
            res.status(500).json({ error: err }); 
        });
};


/*var getSubIndustries = async (req,res,next)=>{
    return new Promise(function(resolve,reject){ 
      SubIndustryMaster.aggregate([
    {
    $lookup:
        {
           from: "industrymasters",
           localField: "industry_id",
           foreignField: "_id",
           as: "industry"
        }
    },
    { "$unwind": "$industry" },{$addFields: { industry : "$industry.industry"} }])
        .sort({createdAt : -1})
        .exec()
        .then(data=>{
            var alldata = data.map((a, i)=>{
                    // console.log("a ",a);
                    return {
                        "_id"               : a._id,
                        "industry"          : a.industry,
                        "model"             : a.model,
                        "industry_id"       : a.industry_id  
                    }
            })
            resolve( data )
        })
        .catch(err =>{
             reject(err);
        }); 
    });
};*/

exports.countSubIndustries = (req, res, next)=>{
    SubIndustryMaster.find({}).count()
        .exec()
        .then(data=>{
            res.status(200).json({ count : data });
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};
exports.fetchSubIndustries = (req, res, next)=>{

    // console.log("fetchModels req.body = ",req.body);

    SubIndustryMaster
        .aggregate([{
            $lookup:
                {
                   from: "industrymasters",
                   localField: "industry_id",
                   foreignField: "_id",
                   as: "industry"
                }
            },
            { "$unwind": "$industry" },
            {$addFields: { industry : "$industry.industry"} 
        }])
        .sort({createdAt : -1})
        .skip(req.body.startRange)
        .limit(req.body.limitRange)
        .exec()
        .then(data=>{
            var alldata = data.map((a, i)=>{
                    return {
                        "_id"                : a._id,
                        "industry"           : a.industry,
                        "subIndustry"     : a.subIndustry,
                        "industry_id"        : a.industry_id  
                    }
            })
             console.log("alldata = ",alldata);
            res.status(200).json(alldata);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};

exports.getSubIndustries = (req, res, next)=>{
    SubIndustryMaster.find({})
        .sort({createdAt : -1})
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};

exports.fetchSubIndustryData = (req, res, next)=>{
    SubIndustryMaster.find({industry_id:req.params.id})
        .sort({createdAt : -1})
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};
exports.fetchSingleSubIndustry = (req, res, next)=>{
    SubIndustryMaster.findOne({ _id: req.params.fieldID })
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};
exports.searchSubIndustry = (req, res, next)=>{
    SubIndustryMaster.aggregate([
    {
    $lookup:
        {
           from: "industrymasters",
           localField: "industry_id",
           foreignField: "_id",
           as: "industry"
        }
    },
    { "$unwind": "$industry" },
    { $addFields: { industry : "$industry.industry"} },
    { $match : { model: { $regex : req.params.str ,$options: "i" } } }

    ])
    //SubIndustryMaster.find({ model: { $regex : req.params.str ,$options: "i" }  })
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};
exports.updateSubIndustry = (req, res, next)=>{
    SubIndustryMaster.updateOne(
            { _id:req.body.fieldID },  
            {
                $set:   {   'industry_id'                     : req.body.dropdownID,
                            'subIndustry'                  : req.body.fieldValue
                        }
            }
        )
        .exec()
        .then(data=>{
            if(data.nModified == 1){
                SubIndustryMaster.updateOne(
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
exports.deleteSubIndustry = (req, res, next)=>{
    SubIndustryMaster.deleteOne({_id: req.params.fieldID})
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
var fetchIndustry = async ()=>{
    return new Promise(function(resolve,reject){ 
    IndustryMaster.find({})
        .exec()
        .then(data=>{
            resolve( data );
        })
        .catch(err =>{
            reject(err);
        }); 
    });
};
function insertIndustry(Industry, createdBy){
    return new Promise(function(resolve,reject){ 
        const industryMaster = new IndustryMaster({
            _id                         : new mongoose.Types.ObjectId(),
            Industry                       : Industry,
            createdBy                   : createdBy,
            createdAt                   : new Date()
        })
        industryMaster.save()
        .then(data=>{
            resolve( data._id );
        })
        .catch(err =>{
            reject(err); 
        });
    });
}
function fetchIndustryName (industry_id){
    // console.log('industry_id',industry_id);
    return new Promise(function(resolve,reject){ 
        industryMaster.findOne({ _id: industry_id })
            .exec()
            .then(data=>{
                resolve( data.Industry );
            })
            .catch(err =>{
                reject(err); 
            }); 
    });
};
exports.bulkUploadSubIndustry = (req, res, next)=>{
    var models = req.body.data;
    // var models = [{industry_id:"mesh", model:"kkk"}];
    
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
        var allmodels=await fetchModels(); 
        var Industries = await fetchIndustries();
        for(var k = 0 ; k < models.length ; k++){
            if (models[k].Industry== '-') {
                remark += "industry_id not found, " ;  
            }
            if (models[k].model == '-') {
                remark += "model not found, " ;  
            }

              if (remark == '') {
               var industry_id;
               var IndustryExists = Industries.filter((data)=>{
                    if (data.Industry == models[k].Industry) {
                        return data;
                    }
                })
                console.log("IndustryExists",IndustryExists);
                if (IndustryExists.length>0) {
                    industry_id = IndustryExists[0]._id;
                }else{
                    industry_id = await insertIndustry(models[k].Industry, req.body.createdBy);
                }
                var modelExists = allmodels.filter((data)=>{
                    if (data.model== models[k].model && data.IndustryName== models[k].Industry) {
                        return data;
                    }
                })

                if (modelExists.length==0) {
                    validObjects = models[k];
                    console.log('validObjects=====',validObjects);
                    console.log('models[k]=====',models[k]);
                    validObjects.industry_id        = industry_id;
                    validObjects.model          = models[k].model;
                    validObjects.fileName       = req.body.fileName;
                    validObjects.createdBy      = req.body.reqdata.createdBy;
                    validObjects.createdAt      = new Date();

                    validData.push(validObjects);  
                    console.log('validDataaa',validData);

                }else{
                    remark += "Model already exists." ; 

                    invalidObjects = models[k];
                    invalidObjects.failedRemark = remark;
                    invalidData.push(invalidObjects); 
                }
            }

        }
        console.log("validData",validData);
        SubIndustryMaster.insertMany(validData)
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

exports.fetch_file = (req,res,next)=>{ 
    SubIndustryMaster.find( { _id : "fileName"})
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
    SubIndustryMaster.aggregate([
    {
        $lookup:
        {
           from: "industrymasters",
           localField: "industry_id",
           foreignField: "_id",
           as: "Industry"
        }
    },
    { "$unwind": "$Industry" },
    { $addFields: { IndustryName : "$Industry.Industry"} },
    ])
    .exec()
    .then(data=>{
        //finaldata.push({goodrecords: data})
        finaldata.goodrecords = data;
        console.log('data',data);
        FailedRecords.find({fileName:req.params.fileName})  
            .exec()
            .then(badData=>{
                finaldata.failedRecords = badData[0].failedRecords
                finaldata.totalRecords = badData[0].totalRecords
                res.status(200).json(finaldata);
                // console.log('finaldata',finaldata);
            })
        
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};





