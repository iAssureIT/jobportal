const mongoose          = require("mongoose");
const InvoiceNumber     = require('./Model');
var ObjectId            = require('mongodb').ObjectID;
var moment              = require('moment');

exports.insertInvoiceNumber = (req,res,next)=>{
    var currentYear = moment().year();
    InvoiceNumber.find({"finantialYear" : currentYear})
    .sort({createdAt: -1})
    .exec()
    .then(data=>{
        console.log("data = ",data); 
        if(data && data.length > 0){
          var invoiceNo = data[0].invoiceNumber + 1;
        }else{
          var invoiceNo = 1;
        }
        console.log("invoiceNo = ",invoiceNo); 
        const invoiceNumber = new InvoiceNumber({
                _id                         : new mongoose.Types.ObjectId(),
                finantialYear               : currentYear,
                invoiceNumber               : invoiceNo,
                createdBy                   : req.body.createdBy,
                createdAt                   : new Date()
            })
            invoiceNumber.save()
            .then(invoiceNum=>{
                console.log("invoiceNum = ",invoiceNum);
                res.status(200).json({ 
                    created   : true,  
                    data      : invoiceNum 
                });
            })
            .catch(err =>{
                res.status(500).json({ error : err });
            });
        
    })
    .catch(err =>{
        res.status(500).json({error : err})
    })                
};