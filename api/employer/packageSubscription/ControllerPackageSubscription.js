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
		    	++maxInvoiceNum;
		    	var order = new PackageSubscription({
				"_id"           	: mongoose.Types.ObjectId(), 
				"package_id" 		: req.body.package_id,
				"company_id"		: req.body.company_id,
				"companyID"			: req.body.companyID,
				"branch_id"			: req.body.branch_id,

				"startDate" 		: req.body.startDate, //"YYYY-MM-DD"
				"endDate" 			: req.body.endDate, //"YYYY-MM-DD"
				"planStatus" 		: "active", //"Active" or "Inactive"
				"amountPaid" 		: 0,
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
	var _id = req.body.order_id;
	
	PackageSubscription.updateOne(
                    { "_id": _id},

                    {
                        $set : {
								"amountPaid" 	: req.body.amountPaid,
								"paymentStatus"	: "Paid",
                        }
                    }
                    )
 		
        .exec()
        .then(data=>{
         	// res.redirect("http://localhost:3000/paymentResponse");
            if(data.nModified === 1){
            	res.status(200).json({							
	    				message	: "Payment is done successfully",
	                    data: data,
	    			});
            }
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
            	message: "Some issue occured while making payment",
                error: err
            });
        });
	
}
