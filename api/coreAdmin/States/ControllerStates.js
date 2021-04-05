const mongoose	= require("mongoose");
mongoose.Promise = global.Promise;
const async = require("async");
const States = require('./ModelStates.js');
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