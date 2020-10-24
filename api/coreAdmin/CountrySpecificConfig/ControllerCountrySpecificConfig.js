const mongoose  = require("mongoose");
var moment      = require('moment');

const CountrySpecificConfig = require('./ModelCountrySpecificConfig.js');

exports.insertCountrySpecificConfig = (req,res,next)=>{
    processData();
    async function processData(){
        var getData = await fetchData(req.body.country)
        var event = getData.filter((data)=>{
        if (data.country == req.body.country) {
            return data;
        }
        })
        if(event.length > 0) {
            res.status(200).json({ duplicated : true });
        }else{
            const countrySpecificCofig = new CountrySpecificConfig({
                _id             : new mongoose.Types.ObjectId(),
                country         : req.body.country,
                countryCode     : req.body.countryCode,
                currency        : req.body.currency,
                currencySymbol  : req.body.currencySymbol,
                taxName         : req.body.taxName,
                createdBy       : req.body.createdBy,
                createdAt       : new Date(),
            })
            countrySpecificCofig.save()
            .then(data=>{
                res.status(200).json({ created : true, id : data._id });
            })
            .catch(err =>{
                res.status(500).json({ error: err }); 
            });
        }
    } 
    
};

var fetchData = async ()=>{
    return new Promise(function(resolve,reject){ 
    CountrySpecificConfig.find({})
        .exec()
        .then(data=>{
            resolve( data );
        })
        .catch(err =>{
            reject(err);
        }); 
    });
};

exports.getAllCountrySpecificConfig = (req,res,next)=>{
    CountrySpecificConfig.find({})
    .exec() 
    .then(data=>{
        res.status(200).json(data);
    })
    .catch(err =>{
        res.status(500).json({ error: err });
    });

}
exports.getTaxName = (req,res,next)=>{
    CountrySpecificConfig.findOne({countryCode:req.params.countryCode})
    .exec() 
    .then(data=>{
        res.status(200).json(data);
    })
    .catch(err =>{
        res.status(500).json({ error: err });
    });

}

exports.getSingleCountrySpecificConfig = (req,res,next)=>{
    CountrySpecificConfig.findOne({"_id":req.params.id})
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
}

exports.updateCountrySpecificConfig = (req,res,next)=>{
    CountrySpecificConfig.updateOne(

        { "_id" : req.body.id},
        {
            $set:{
                "currency"          : req.body.currency,
                "currencySymbol"    : req.body.currencySymbol,
                "taxName"           : req.body.taxName
            }
        }
        )
        .exec()
        .then(data=>{
            // console.log("in Update Expense type data = ", data);
            if(data.nModified == 1){
                CountrySpecificConfig.updateOne(
                { _id:req.body.id},
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
                res.status(404).json("Data Not found");
            }
        })
        .catch(err =>{
            res.status(500).json({
                error: err
            });
        });
}
exports.deleteCountrySpecificConfig = (req, res, next)=>{
    CountrySpecificConfig.deleteOne({_id: req.params.id})
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

