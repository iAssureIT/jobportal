// import moment from 'moment';
var moment 			= require('moment');
const mongoose	    = require("mongoose");
var ObjectID 		= require('mongodb').ObjectID;
/*const https         = require('https')
const Razorpay      = require("razorpay");
var request         = require('request-promise')
var sha256          = require('js-sha256');
var CryptoJS        = require("crypto-js");
var globalVariable  = require("../../nodemon.js");*/

const PackageSubscription   = require('./ModelPackageSubscription.js');



//End of payment gateway integration
exports.create_order = (req, res, next) => {
	var paymentData = {
		"amount" 			: req.body.amount,
		"currency"			: req.body.currency,
		"receipt"			: req.body.receipt,
		"payment_capture"	: req.body.payment_capture,
	};
	instance.orders.create(paymentData, function(err, payment_order) {
      	if(err){
	        res.status(500).json({
	            error: err
	        }); 
	    }else if(payment_order){
	        // res.status(200).json(order);
	        // console.log("payment_order ",payment_order);

			Orders  .find()
					.count()
				    .then((maxInvoiceNum)=>{

						var order = new Orders({
												"_id"           	: mongoose.Types.ObjectId(), 
												"invoiceNum" 		: maxInvoiceNum + 1,
												"plan_ID"			: req.body.planID,
											    "userID"			: req.body.userID,
											    "planName"			: req.body.planName,
												"planAmount"  		: req.body.planAmount, 
												"validityPeriod" 	: req.body.validityPeriod, //1 month or 1 year
												"purchaseDate"		: req.body.purchaseDate, //"YYYY-MM-DD"
												"startDate" 		: req.body.startDate, //"YYYY-MM-DD"
												"endDate" 			: req.body.endDate, //"YYYY-MM-DD"
												"paymentOrderId" 	: payment_order.id,
												"amountPaid"		: payment_order.amount,
												"paymentStatus"		: "unPaid",
												"createdBy"			: req.body.createdBy,
												"createdAt"			: new Date(),
											});
						console.log("order ",order);


						order.save()
					        .then(data=>{
					                res.status(200).json(payment_order);
					            })
					            .catch(err =>{
					                console.log(err);
					                res.status(500).json({
					                	message: "Some issue occured in Order Insert",
					                    error: err
					                });
					            });	

				    })
		            .catch(err =>{
		                console.log(err);
		                res.status(500).json({
		                	message: "Some issue occured while finding Max Invoice Number",
		                    error: err
		                });
		            });	
	    }
    });
};


