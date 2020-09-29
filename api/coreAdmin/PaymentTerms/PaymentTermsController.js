const mongoose	        = require("mongoose");
const PaymentTerms      = require('./PaymentTermsModel.js');
var   ObjectId          = require('mongodb').ObjectId;


exports.insertPaymentTerms = (req,res,next)=>{
  console.log("req .body = ",req.body);
    PaymentTerms.find()
    .exec()
    .then(data=>{
        console.log('data', data)
        if(data && data.length>0){
            res.status(200).json({ 
              message       : "Payment Terms Already Exists!",
            });
        }else{
            const paymentTerms = new PaymentTerms({
                _id                         : new mongoose.Types.ObjectId(),
                paymentTerms                : req.body.paymentTerms,
                createdBy                   : req.body.createdBy,
                createdAt                   : new Date()
            })
            paymentTerms.save()
            .then(data=>{
              console.log("data added => ",data);
                res.status(200).json({ 
                  created         : true, 
                  message       : "Payment Terms Added Successfully!",
                  paymentTerms_id : data._id 
                });
            })
            .catch(err =>{
                res.status(500).json({ error: err }); 
            });
        }
    })
    .catch(error=>{
      res.status(500).json({ error: err }); 
    });
};

exports.getPaymentTerms = (req,res,next)=>{
    PaymentTerms.find()
        .exec()
        .then(data=>{
            if(data){ 
            console.log("data=>",data);               
                res.status(200).json(data);
            }else{
                res.status(404).json('Payment Terms Not Found');
            }
        })
        .catch(err =>{
            res.status(500).json({
                error: err
            });
        });
}

exports.fetchSinglePaymentTerms = (req, res, next)=>{
    PaymentTerms.findOne({ _id: req.params.paymentTerms_id })
        .exec()
        .then(data=>{
            res.status(200).json( data );
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};

exports.updatePaymentTerms = (req,res,next)=>{
    console.log("req .body = ",req.body);
    PaymentTerms.updateOne(
            { "_id":req.body.paymentTerms_id},  
            {
                $set :   { 
                    'paymentTerms' : req.body.paymentTerms,
                }
            }
        )
        .exec()
        .then(data=>{
            if(data.nModified == 1){
                PaymentTerms.updateOne(
                { _id:req.body.paymentTerms_id},
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
exports.deletePaymentTerms = (req, res, next)=>{
    PaymentTerms.deleteOne({_id: req.params.paymentTerms_id})
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
}          
