const mongoose	        = require("mongoose");
const AutomatedSequence = require('./Model.js');
var   ObjectId          = require('mongodb').ObjectId;


exports.insertAutomatedBillingSequence = (req,res,next)=>{
  AutomatedSequence.findOne({"billTitle" : req.body.billTitle})
    .then(data=>{
        // console.log('data', data)
        if(data){
            res.status(200).json({ duplicated : true });
        }else{
          const automatedSequence = new AutomatedSequence({
              _id                         : new mongoose.Types.ObjectId(),
              billTitle                   : req.body.billTitle,
              sequence                    : req.body.sequence,
              createdBy                   : req.body.createdBy,
              createdAt                   : new Date()
          })
          automatedSequence.save()
          .then(data=>{
              res.status(200).json({ created : true, sequenceID : data._id });
          })
          .catch(err =>{
              res.status(500).json({ error: err }); 
          });
        }
    })
    .catch(error=>{
        res.status(500).json({ error: error });
    });
};

exports.fetchAutomatedBillingSequence = (req, res, next)=>{
  AutomatedSequence.find({})
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

exports.fetchSingleAutomatedBillingSequence = (req, res, next)=>{
  AutomatedSequence.findOne({ _id: req.params.sequenceID })
    .exec()
    .then(data=>{
        res.status(200).json( data );
    })
    .catch(err =>{
        res.status(500).json({ error: err });
    }); 
};

exports.updateAutomatedBillingSequence = (req,res,next)=>{
  AutomatedSequence.updateOne(
      { "_id":req.body.id},  
      {
          $set:   { 
              billTitle                   : req.body.billTitle,
              sequence                    : req.body.sequence,
          }
      }
  )
  .exec()
  .then(data=>{
      if(data.nModified == 1){
          AutomatedSequence.updateOne(
          { _id:req.body.id},
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

exports.deleteAutomatedBillingSequence = (req, res, next)=>{
  AutomatedSequence.deleteOne({_id: req.params.sequenceID})
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