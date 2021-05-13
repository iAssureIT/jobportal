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
	var paymentStatus=""
	if (req.body.amount > 0) {
		paymentStatus = "unpaid"
	}else{
		paymentStatus = "paid"
	}	
	PackageSubscription.find()
			.count()
		    .then((maxInvoiceNum)=>{
		    	var order = new PackageSubscription({
				"_id"           	: mongoose.Types.ObjectId(), 
				"package_id" 		: req.body.package_id,
				"company_id"		: req.body.company_id,
				"companyID"			: req.body.companyID,
				"branch_id"			: req.body.branch_id,

				"startDate" 		: req.body.startDate, //"YYYY-MM-DD"
				"endDate" 			: req.body.endDate, //"YYYY-MM-DD"
				"planStatus" 		: "active", //"Active" or "Inactive"
				"amountPaid" 		: req.body.amount,
				"paymentMethod" 	: "",
				//"transactionID" 	: req.body.transactionID,
				"paymentOrderID" 	: "",
				"paymentStatus"	    : paymentStatus, //Paid or Failed
				"invoiceNumber"		: maxInvoiceNum,
				"createdAt" 		: new Date(),
				"createdBy"			: req.body.user_id				
			});
				console.log("order ",order);
				order.save()
		        .then(data=>{
		                res.status(200).json({							
		    				message	: "Package is subscribed successfully",
		                    data: data,
		    			});
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
		
};


exports.paymentOrderDetails = (req,res,next) =>{
	PackageSubscription.findOne({_id: req.params.paymentOrderId})
	.populate('createdBy','profile')
	.populate('package_id')
	.populate('company_id')
	.exec(function(err, details) {
            console.log(err)
            if (err) return res.status(500).json({
                error: err
            });
            res.status(200).json(details);
        });
}

exports.payment_response = (req,res,next) =>{ 
	var _id = req.params.order_id;
	
	var generated_signature = sha256.hmac('VgF165CC3e5vKlfqwPnbeckJ', req.body.razorpay_order_id+"|"+req.body.razorpay_payment_id);
	console.log("generated_signature",generated_signature);
	if (generated_signature == req.body.razorpay_signature) { 
	  PackageSubscription.updateOne(
                    { "_id": _id},

                    {
                        $set : {
								"transactionId" 	: req.body.razorpay_payment_id,
								"paymentStatus"		: "Paid",
                        }
                    }
                    )
 		
         .exec()
         .then(data=>{
         	// res.redirect("http://localhost:3000/paymentResponse");
            if(data.nModified === 1){
         	console.log("req.body.razorpay_order_id",req.body.razorpay_order_id);

         		PackageSubscription.findOne({ "paymentOrderId":req.body.razorpay_order_id})
         		.then((orderDetails)=>{
         			console.log("orderDetails--",orderDetails);
         			console.log("globalVariable.url ",globalVariable.url);
         			
         			var url = globalVariable.url+"payment-response/"+orderDetails.paymentOrderId;
         			if(url){
						res.redirect(url);
         			}
         		})
	            .catch(err =>{
	                console.log(err);
	                res.status(500).json({
	                    error: err
	                });
	            });	
            }else{
                res.status(200).json({message : "SIGNATURE_MATCHED_BUT_ORDER_NOT_UPDATED"})
            }
         })
	} else {
		console.log("payment Failed",JSON.stringify(req.body));
		console.log("req.body.razorpay_order_id",req.body.razorpay_order_id);
		PackageSubscription.updateOne(
                        { "_id" : _id},
                        {
                            $set : {
								"transactionId" 	: req.body.razorpay_payment_id,
								"paymentStatus"		: "Failed",
                            }
                        }
                    )
         .exec()
         .then(data=>{
         	if(data.nModified === 1){
         	console.log("req.body.razorpay_order_id",req.body.razorpay_order_id);

         		PackageSubscription.findOne({ "_id":_id})
         		.then((orderDetails)=>{
         			console.log("orderDetails--",orderDetails);
         			console.log("globalVariable.url ",globalVariable.url);
         			var url = globalVariable.url+"payment-response/"+orderDetails.paymentOrderId;
         			if(url){
						res.redirect(url);
         			}
         		})
	            .catch(err =>{
	                console.log(err);
	                res.status(500).json({
	                    error: err
	                });
	            });	
            }else{
                res.status(200).json({message : "SIGNATURE_MATCHED_BUT_ORDER_NOT_UPDATED"})
            }
         	
         })
	}
}
