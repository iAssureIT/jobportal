const mongoose	        = require("mongoose");
const CategoryBrand     = require('./ModelMasterModel.js');
const CategoryMaster    = require('../categoryMaster/ModelCategoryMaster.js');
const FailedRecords     = require('../failedRecords/ModelFailedRecords');
const BrandMaster     = require('../brandMaster/ModelBrandMaster.js');


exports.insertModel = (req,res,next)=>{
     processData();
    async function processData(){
    var allData = await fetchAllData(req.body.dropdownID);
    var type = allData.filter((data)=>{
        if (data.brand.trim().toUpperCase() == req.body.fieldValue.trim().toUpperCase()) {
            return data;
        }
        })    

        if (type.length > 0) {
            res.status(200).json({ duplicated : true });
        }else{
            var Brand = await fetchBrand();
            var brandExists = Brand.filter((data)=>{
                if (data.brand == req.body.fieldValue) {
                    return data;
                }
            })
            var brandId;
            if (brandExists.length > 0) {
                brandId = brandExists[0]._id;
            }else{
                brandId = await insertBrand(req.body.fieldValue, req.body.createdBy);
            }
            const modelMaster = new CategoryBrand({
                                _id                         : new mongoose.Types.ObjectId(),                        
                                categoryId                  : req.body.dropdownID,
                                brand                       : req.body.fieldValue,
                                brandId                     : brandId,
                                createdBy                   : req.body.createdBy,
                                createdAt                   : new Date()
                            })

            modelMaster
                .save()
                .then(data=>{

                    res.status(200).json({ created : true, fieldID : data._id });
                })
                .catch(err =>{
                    res.status(500).json({ error: err }); 
                });

        }
    }   
    
    
};

var fetchAllData = async (categoryId)=>{
    return new Promise(function(resolve,reject){ 
    CategoryBrand.find({categoryId:categoryId})
        .exec()
        .then(data=>{
            resolve( data );
        })
        .catch(err =>{
            reject(err);
        }); 
    });
};


var fetchAllCategory = async (req,res,next)=>{
    return new Promise(function(resolve,reject){ 
      CategoryBrand.aggregate([
    {
    $lookup:
        {
           from: "categorymasters",
           localField: "categoryId",
           foreignField: "_id",
           as: "category"
        }
    },
    { "$unwind": "$category" },{$addFields: { category : "$category.category"} }])
        .sort({createdAt : -1})
        .exec()
        .then(data=>{
            var alldata = data.map((a, i)=>{
                    // console.log("a ",a);
                    return {
                        "_id"            : a._id,
                        "category"       : a.category,
                        "brand"          : a.brand,
                        "categoryId"     : a.categoryId  
                    }
            })
            resolve( data )
        })
        .catch(err =>{
             reject(err);
        }); 
    });
};

exports.countModels = (req, res, next)=>{
    CategoryBrand.find({}).count()
        .exec()
        .then(data=>{
            res.status(200).json({ count : data });
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};
exports.fetchModels = (req, res, next)=>{

    CategoryBrand
        .aggregate([{
            $lookup:
                {
                   from: "categorymasters",
                   localField: "categoryId",
                   foreignField: "_id",
                   as: "category"
                }
            },
            { "$unwind": "$category" },
            {$addFields: { categoryName : "$category.category"} 
        }])
        .sort({createdAt : -1})
        .skip(req.body.startRange)
        .limit(req.body.limitRange)
        .exec()
        .then(data=>{
            var alldata = data.map((a, i)=>{
                    return {
                        "_id"                : a._id,
                        "category"       : a.categoryName,
                        "brand"              : a.brand,
                        "categoryId"         : a.categoryId  
                    }
            })
            res.status(200).json(alldata);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};

exports.getModels = (req, res, next)=>{
    CategoryBrand.find({})
        .sort({createdAt : -1})
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};

exports.getCategoryBrandData = (req, res, next)=>{
    CategoryBrand.find({categoryId:req.params.id})
        .sort({createdAt : -1})
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};
exports.fetchSingleModel = (req, res, next)=>{
    CategoryBrand.findOne({ _id: req.params.fieldID })
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};
exports.searchModel = (req, res, next)=>{
    CategoryBrand.aggregate([
    {
    $lookup:
        {
           from: "categoryMaster",
           localField: "categoryId",
           foreignField: "_id",
           as: "category"
        }
    },
    { "$unwind": "$category" },
    { $addFields: { categoryName : "$category.category"} },
    { $match : { model: { $regex : req.params.str ,$options: "i" } } }

    ])
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};
exports.updateModel = (req, res, next)=>{
    CategoryBrand.updateOne(
            { _id:req.body.fieldID },  
            {
                $set:   {   'categoryId'   : req.body.dropdownID,
                            'brand'        : req.body.fieldValue
                        }
            }
        )
        .exec()
        .then(data=>{
            if(data.nModified == 1){
                CategoryBrand.updateOne(
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
exports.deleteModel = (req, res, next)=>{
    CategoryBrand.deleteOne({_id: req.params.fieldID})
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
var fetchCategory = async ()=>{
    return new Promise(function(resolve,reject){ 
    CategoryMaster.find({})
        .exec()
        .then(data=>{
            resolve( data );
        })
        .catch(err =>{
            reject(err);
        }); 
    });
};

var fetchBrand = async ()=>{
    return new Promise(function(resolve,reject){ 
    BrandMaster.find({})
        .exec()
        .then(data=>{
            resolve( data );
        })
        .catch(err =>{
            reject(err);
        }); 
    });
};
function insertCategory(category, createdBy){
    // console.log('category',category);
    return new Promise(function(resolve,reject){ 
        const categoryMaster = new CategoryMaster({
            _id              : new mongoose.Types.ObjectId(),
            category         : category,
            iconUrl          : "",
            createdBy        : createdBy,
            createdAt        : new Date()
        })
        categoryMaster.save()
        .then(data=>{
            resolve( data._id );
        })
        .catch(err =>{
            reject(err); 
        });
    });
}

function insertBrand(brand, createdBy){
    // console.log('category',category);
    return new Promise(function(resolve,reject){ 
        const brandMaster = new BrandMaster({
            _id           : new mongoose.Types.ObjectId(),
            brand         : brand,
            createdBy     : createdBy,
            createdAt     : new Date()
        })
        brandMaster.save()
        .then(data=>{
            resolve( data._id );
        })
        .catch(err =>{
            reject(err); 
        });
    });
}
function fetchCategoryName (categoryId){
    // console.log('categoryId',categoryId);
    return new Promise(function(resolve,reject){ 
        CategoryMaster.findOne({ _id: categoryId })
            .exec()
            .then(data=>{
                resolve( data.category );
            })
            .catch(err =>{
                reject(err); 
            }); 
    });
};
exports.bulkUploadVehicleModel = (req, res, next)=>{
    var models = req.body.data;
    // var models = [{brandId:"mesh", model:"kkk"}];
    
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
        var allCategory=await fetchAllCategory(); 
        var Category = await fetchCategory();
        var Brand = await fetchBrand();
        for(var k = 0 ; k < models.length ; k++){
            if (models[k].category== '-' || models[k].category== '' || models[k].category== null) {
                remark += "category not found, " ;  
            }
            if (models[k].brand == '-' || models[k].brand == '' || models[k].brand == null) {
                remark += "brand not found, " ;  
            }

              if (remark == '') {
               var categoryId;
               var brandId;
               var catExists = Category.filter((data)=>{
                    if (data.category == models[k].category) {
                        return data;
                    }
                })

                if (catExists.length>0) {
                    categoryId = catExists[0]._id;
                }else{
                    categoryId = await insertCategory(models[k].category, req.body.createdBy);
                }

                var brandExists = Brand.filter((data)=>{
                    if (data.brand == models[k].brand) {
                        return data;
                    }
                })

                if (brandExists.length>0) {
                    brandId = brandExists[0]._id;
                }else{
                    brandId = await insertBrand(models[k].brand, req.body.createdBy);
                }

                var categoryBrandExists = allCategory.filter((data)=>{
                    if (data.brand == models[k].brand && data.category == models[k].category) {
                        return data;
                    }
                })


                if (categoryBrandExists.length == 0) {
                    validObjects = models[k];
                    validObjects.categoryId     = categoryId;
                    validObjects.brand          = models[k].brand;
                    validObjects.brandId        = brandId;
                    validObjects.fileName       = req.body.fileName;
                    validObjects.createdBy      = req.body.reqdata.createdBy;
                    validObjects.createdAt      = new Date();

                    validData.push(validObjects);  

                }else{
                    remark += "Brand already exists." ; 

                    invalidObjects = models[k];
                    invalidObjects.failedRemark = remark;
                    invalidData.push(invalidObjects); 
                }
            }

        }
        CategoryBrand.insertMany(validData)
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
    CategoryBrand.find( { _id : "fileName"})
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
    CategoryBrand.aggregate([
    {
        $lookup:
        {
           from: "categorymasters",
           localField: "categoryId",
           foreignField: "_id",
           as: "category"
        }
    },
    { "$unwind": "$category" },
    { $addFields: { category : "$category.category"} },
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





