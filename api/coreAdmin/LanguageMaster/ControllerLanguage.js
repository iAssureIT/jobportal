const mongoose	        = require("mongoose");
const LanguageMaster       = require('./ModelLanguage.js');
const FailedRecords     = require('../failedRecords/ModelFailedRecords');

exports.insertLanguage = (req,res,next)=>{
    processData();
    async function processData(){
    var allLanguage = await fetchLanguage()
        var language = allLanguage.filter((data)=>{
        if (data.language.trim().toLowerCase() == req.body.fieldValue.trim().toLowerCase()) {
            return data;
        }
        })
        if (language.length > 0) {
            res.status(200).json({ duplicated : true });
        }else{
            const languageMaster = new LanguageMaster({
                            _id                         : new mongoose.Types.ObjectId(),
                            language                     : req.body.fieldValue,
                            createdBy                   : req.body.createdBy,
                            createdAt                   : new Date()
                        })
                        languageMaster.save()
                        .then(data=>{
                            res.status(200).json({ created : true, fieldID : data._id });
                        })
                        .catch(err =>{
                            console.log("err",err.code)
                            if (err.code == 11000) {
                                res.status(200).json({ duplicated : true });
                            }else{
                                res.status(500).json({ error: err });
                            }
                             
                        });
        }
    }       
};
var fetchLanguage = async ()=>{
    return new Promise(function(resolve,reject){ 
    LanguageMaster.find({})
        .exec()
        .then(data=>{
            resolve( data );
        })
        .catch(err =>{
            reject(err);
        }); 
    });
};
exports.countLanguages = (req, res, next)=>{
    LanguageMaster.find({}).count()
        .exec()
        .then(data=>{
            res.status(200).json({ count : data });
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};
exports.fetchLanguages = (req, res, next)=>{
    LanguageMaster.find({})
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
exports.getLanguages = (req, res, next)=>{
    LanguageMaster.find({})
    .exec()
    .then(data=>{
        res.status(200).json(data);
    })
    .catch(err =>{
        res.status(500).json({ error: err });
    }); 
};
exports.fetchSingleLanguage = (req, res, next)=>{
    LanguageMaster.findOne({ _id: req.params.fieldID })
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};

exports.searchLanguage = (req, res, next)=>{
    LanguageMaster.find({ language: { $regex : req.params.str ,$options: "i" }  })
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};
exports.updateLanguage = (req, res, next)=>{
    LanguageMaster.updateOne(
            { _id:req.body.fieldID },  
            {
                $set:   {  'language'       : req.body.fieldValue  }
            }
        )
        .exec()
        .then(data=>{
            if(data.nModified == 1){
                LanguageMaster.updateOne(
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
exports.deleteLanguage = (req, res, next)=>{
    LanguageMaster.deleteOne({_id: req.params.fieldID})
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

var fetchAllLanguage = async (type)=>{
    return new Promise(function(resolve,reject){ 
    LanguageMaster.find()
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
};


exports.bulkUploadLanguage = (req, res, next)=>{
    console.log("inside bulk upload Language");
     // var Language = [{Language:"mesh"}];
    var Language = req.body.data;
    console.log("Language",Language);

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
        for(var k = 0 ; k < Language.length ; k++){
            if (Language[k].Language == '-') {
                remark += "department not found, " ;  
            }
            console.log("remark",remark)

              if (remark == '') {
                // var allDepartments = await fetchAllDepartments(req.body.reqdata);
                // console.log("alldepartments",allDepartments);
                 console.log()
                  var allLanguage = await fetchAllLanguage(req.body.reqdata);
                  var LanguageExists = allLanguage.filter((data)=>{
                    if (data.Language == Language[k].Language)
                         {
                        return data;
                    }
                })
               
                 console.log("in else validObjects",LanguageExists);
                if (LanguageExists.length==0) {
                    validObjects = Language[k];
                    validObjects.fileName       = req.body.fileName;
                    // validObjects.createdBy      = req.body.reqdata.createdBy;
                    validObjects.createdAt      = new Date();

                    validData.push(validObjects); 

                }else{
                    
                    remark += "Language already exists." ; 

                    invalidObjects = Language[k];
                    invalidObjects.failedRemark = remark;
                    invalidData.push(invalidObjects); 
                }
 
              
            }

        }
        LanguageMaster.insertMany(validData)
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
    LanguageMaster.find( { _id : "fileName"})
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
    LanguageMaster.find( { fileName:req.params.fileName }  )
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



