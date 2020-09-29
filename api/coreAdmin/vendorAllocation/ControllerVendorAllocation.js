const mongoose	        = require("mongoose");
const VendorAllocation          = require('./ModelVendorAllocation.js');
var   ObjectId          = require('mongodb').ObjectId;


exports.insertVendorAllocation = (req,res,next)=>{
  processData();
    async function processData(){
        var getData = await fetchData(req.body.event)
        var city = req.body.city;
        var city1 = camelCase(city);
        var city2 = city.toUpperCase();
        var city3 = city.toLowerCase();
        var event = getData.filter((data)=>{
        if ((data.city == city) || (data.city == city1) || (data.city == city2) || (data.city == city3)) {
            return data;
        }
        })
        if(event.length > 0) {
          res.status(200).json({ duplicate : true });
        }else{
          console.log('else')
            const entities = new VendorAllocation({
                _id                  : new mongoose.Types.ObjectId(),
                city                 : req.body.city,
                vendor               : req.body.vendor,
                createdBy            : req.body.createdBy,
                createdAt            : new Date()
            })
            entities.save()
            .then(data=>{
                res.status(200).json({ created : true, mappingID : data._id });
            })
            .catch(err =>{
                res.status(500).json({ error: err }); 
            });
        }
  
    }
};

function camelCase(str) {
    return str
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
}

var fetchData = async ()=>{
    return new Promise(function(resolve,reject){ 
    VendorAllocation.find({})
        .exec()
        .then(data=>{
            resolve( data );
        })
        .catch(err =>{
            reject(err);
        }); 
    });
};

exports.countVendorAllocations = (req, res, next)=>{
    VendorAllocation.find({}).count()
        .exec()
        .then(data=>{
            res.status(200).json({ count : data });
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};
exports.fetchVendorAllocations = (req, res, next)=>{
    VendorAllocation.find({})
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
exports.getVendorAllocations = (req, res, next)=>{
    VendorAllocation.aggregate([
        {
           $lookup: {
              from: "entitymasters",
              localField: "vendor.vendorID",    
              foreignField: "_id",  
              as: "vendor"
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
};
exports.joinentities = (req, res, next)=>{
    VendorAllocation.aggregate([
        { "$match" : {_id: ObjectId(req.params.mappingID)}},
        {
           $lookup: {
              from: "entitymasters",
              localField: "vendor.vendorID",    
              foreignField: "_id",  
              as: "vendor"
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
};
exports.joinentitieslist = (req, res, next)=>{
    VendorAllocation.aggregate([
        {
            $lookup: {
               from: "entitymasters",
               localField: "vendor.vendorID",    
               foreignField: "_id",  
               as: "vendor"
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
};
exports.fetchSingleVendorAllocation = (req, res, next)=>{
    VendorAllocation.findOne({ _id: req.params.mappingID })
        .exec()
        .then(data=>{
            res.status(200).json( data );
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};

exports.updateVendorAllocation = (req,res,next)=>{
    
    VendorAllocation.updateOne(
            { "_id":req.body.mappingID},  
            {
                $set:   { 
                    'vendor'                      : req.body.vendor,
                }
            }
        )
        .exec()
        .then(data=>{
            if(data.nModified == 1){
                VendorAllocation.updateOne(
                { _id:req.body.mappingID},
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
            res.status(500).json({ error: err });
        });
};
exports.deleteVendorAllocation = (req, res, next)=>{
    VendorAllocation.deleteOne({_id: req.params.mappingID})
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


exports.filterVendorAllocation = (req, res, next)=>{

    var selector = {};
    
    console.log(req.body)
    for (var key in req.body) {

        if (key=='vendorIds' && req.body.vendorIds.length > 0 ) {
            var vendorIds = [];
            // covert array of ids into object ids
            for(var subkey in req.body.vendorIds){
                vendorIds.push(ObjectId(req.body.vendorIds[subkey])) 
            }
            // selector.vendor={};
            selector['vendor._id'] =  { $in: vendorIds } 
        }
        if (key=='stateCodes' && req.body.stateCodes.length > 0 ) {
            selector['$or']=[];
            selector['$or'].push({ "corporate.locations.stateCode" :  { $in: req.body.stateCodes } });
            selector['$or'].push({ "vendor.locations.stateCode" :  { $in: req.body.stateCodes } });
        }
        if (key=='districts' && req.body.districts.length > 0 ) {
            selector['$or']=[];
            selector['$or'].push({ "corporate.locations.district" :  { $in: req.body.districts } });
            selector['$or'].push({ "vendor.locations.district" :  { $in: req.body.districts } });
        }
        console.log('selector',selector);
    }
    VendorAllocation.aggregate([
        {
            $lookup: {
               from: "entitymasters",
               localField: "vendor.vendorID",    
               foreignField: "_id",  
               as: "vendor"
            }
         },
        {
            $match : selector
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
};

exports.searchVendorAllocation = (req, res, next)=>{
    var selector = {}; 
    selector['$or']=[];
    selector["$or"].push({ "vendor.companyName"       : { $regex : req.params.str, $options: "i"}  })
    selector["$or"].push({ "vendor.groupName"    : { $regex : req.params.str, $options: "i"} })
    selector["$or"].push({ "city"    : { $regex : req.params.str, $options: "i"} })
    
    VendorAllocation.aggregate([
        {
            $lookup: {
               from: "entitymasters",
               localField: "vendor.vendorID",    
               foreignField: "_id",  
               as: "vendor"
            }
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

exports.getCompanyCount = (req, res, next)=>{
    VendorAllocation.find({"vendor.vendorID": req.params.company} ).count()
    .exec()
    .then(data=>{
        res.status(200).json({ count : data });
    })
    .catch(err =>{
        res.status(500).json({ error: err });
    });   
};
