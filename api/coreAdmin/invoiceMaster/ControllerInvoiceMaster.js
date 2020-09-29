const mongoose  			= require("mongoose");
const MasterInvoiceNumber   = require('../masterInvoiceNumbers/Model');
const InvoiceMaster 		= require('./ModelInvoiceMaster.js');
const BillingManagement 	= require('../BillingManagement/Model');
const DepartmentMaster 	    = require('../departmentMaster/ModelDepartmentMaster');
const PersonMaster      	= require('../personMaster/ModelPersonMaster');
const BookingMaster         = require('../bookingMaster/ModelBookingMaster');
var ObjectId            	= require('mongodb').ObjectID;
var moment      			= require('moment');

exports.insertInvoice = (req,res,next)=>{
	console.log("body in = ",req.body);
	BillingManagement.find({_id:{$in:req.body.invoices}})
	.exec()
	.then(data=>{
		if(data && data.length > 0){
			processData();
            async function processData(){ 
            	var qty 	    = 1;            	
            	var totalAmount = 0; 
            	var tax 		= 0;
            	var CGSTtax 	= 0;
            	var SGSTtax 	= 0;
            	var payment		= 0;
            	var balance		= 0;
            	var discount    = 0;

				for(var i=0 ; i<data.length ; i++){					
					var lineItem 	= data[i].lineItems;

					if(lineItem && lineItem.length > 0){						
						for(var j=0 ; j<lineItem.length ; j++){	
							if(lineItem[j].billingCode === 401 || lineItem[j].billingCode === 402){
								tax = parseFloat(tax) + parseFloat(lineItem[j].taxAmount)
							}
							if(lineItem[j].billingCode === 401){
								CGSTtax = parseFloat(CGSTtax) + parseFloat(lineItem[j].taxAmount)
							}
							if(lineItem[j].billingCode === 402){
								SGSTtax = parseFloat(SGSTtax) + parseFloat(lineItem[j].taxAmount)
							}
							if (lineItem[j].billingCode === 11 || 
                                lineItem[j].billingCode === 12 ||
                                lineItem[j].billingCode === 13 ||
                                lineItem[j].billingCode === 14) {
                                totalAmount += parseFloat(lineItem[j].amount);                                    
                            } 													
						}//j 						
					}//lineItem
				}//i
				var amount        = parseFloat(totalAmount) - parseFloat(tax);	
				var roundingOff   = (Math.round(totalAmount) - totalAmount).toFixed(2);
				var payableAmount = (Math.round(totalAmount)).toFixed(2);
				
				/*=========== Create Master Invoice ===========*/
				var invoiceNumberData = await getInvoiceNumber(req.body.createdBy);
	            if(invoiceNumberData){
	                var nextYear = parseInt(invoiceNumberData.finantialYear) + 1;
	                var invoiceNumber = "MI_FY" + invoiceNumberData.finantialYear 
	                    + "-"+ moment(nextYear, 'YYYY').format('YY')
	                    + "/" +invoiceNumberData.invoiceNumber;
	            } 
			    const invoiceMaster = new InvoiceMaster({
			        _id                         : new mongoose.Types.ObjectId(),
			        invoiceNumber               : invoiceNumber,
					company_id                  : req.body.company_id,
					department_id               : req.body.department_id,
    				employee_id                 : req.body.employee_id,
				    invoices                    : req.body.invoices,
				    qty 						: qty,     
				    amount               		: amount, //without Tax
				    totalAmount                 : totalAmount,   
				    payableAmount               : payableAmount,   
				    tax                         : tax,
				    CGSTtax                     : CGSTtax,
				    SGSTtax                     : SGSTtax,
				    discount                    : discount,
				    payment                     : payment,
				    roundingOff 				: roundingOff,
				    startDate 					: req.body.startDate,
				    endDate 					: req.body.endDate,
				    status 						:'Unpaid',
				    createdBy                   : req.body.createdBy,
			        createdAt                   : new Date()
				})
				invoiceMaster.save()
		        .then(data=>{
		        	if (data) {
		        		processStatus();
                        async function processStatus(){ 
	                    	var changeStatus = await changeInvoiceStatus(req.body.invoices, req.body.createdBy);
	                	}
	                }
		            res.status(200).json({ created : true,data:data });
		        })
		        .catch(err =>{
		            res.status(500).json({ error: err });
		        });
	    	}
		}//data
	})
	.catch(err =>{
        res.status(500).json({ error : err });
    });
	
}

/*======== getInvoiceNumber() =========*/
var getInvoiceNumber = async (createdBy) => {
    return new Promise(function (resolve, reject) {
        var currentYear = moment().year();
        MasterInvoiceNumber.find({"finantialYear" : currentYear})
            .sort({createdAt: -1})
            .exec()
            .then(data=>{
                if(data && data.length > 0){
                  var invoiceNo = data[0].invoiceNumber + 1;
                }else{
                  var invoiceNo = 1;
                } 
                const invoiceNumber = new MasterInvoiceNumber({
                    _id              : new mongoose.Types.ObjectId(),
                    finantialYear    : currentYear,
                    invoiceNumber    : invoiceNo,
                    createdBy        : createdBy,
                    createdAt        : new Date()
                })
                invoiceNumber.save()
                .then(invoiceNum=>{
                    resolve(invoiceNum);
                })
                .catch(err =>{
                    reject(err);
                });                
            })
            .catch(err =>{
                reject(err);
            }) 
        });
}
/*======== changeInvoiceStatus() =========*/
var changeInvoiceStatus = async (invoices, createdBy) => {
    return new Promise(function (resolve, reject) {
        BillingManagement.updateMany(
            { _id:{$in:invoices} },  
            {
                $set:  {
                            "masterinvoice"  : 'Yes',
                       }
            }
        )                        
        .exec()
        .then(booking=>{
            if(booking.nModified == 1){
                BillingManagement.updateMany(
                {_id:{$in:invoices}},
                {
                    $push:  { 'updateLog' : [{  updatedAt      : new Date(),
                                                updatedBy      : createdBy
                                            }]
                            }
                } )
                .exec()
                .then(data=>{
                    resolve(true);
                })
            }else{
                resolve(false);
            }
        })
        .catch(err =>{
            resolve(err);
        });
    });
};
/*======== changeInvoiceStatus() =========*/
exports.changeStatusToPaid = (req,res,next)=>{
	console.log("req.body = ",req.body);
    InvoiceMaster.findOne({ _id: req.body.masterInvoice_id})                        
    .exec()
    .then(masterInvoice=>{
        if(masterInvoice){
        	processStatus();
        	async function processStatus(){ 
            	var invoices = masterInvoice.invoices;
            	// console.log("Invoice = ",invoices);
            	var status = {
                    value             : "Paid",
                    statusBy          : req.body.updatedBy,
                    statusAt          : new Date()
                }
            	if(invoices){
            		var changeInvoiceStatus = await changeInvoiceStatusToPaid(invoices, req.body.updatedBy, status);
            		var changeBookingStatus = await changeBookingStatusToPaid(invoices, req.body.updatedBy, req.body.masterInvoice_id, status);
            		console.log("changeInvoiceStatus = ",changeInvoiceStatus);
            		console.log("changeBookingStatus = ",changeBookingStatus);
            	}
        	}
        	InvoiceMaster.updateOne(
	            { _id : req.body.masterInvoice_id },  
	            {
	                $set:  {
	                            "status"  : "Paid",
	                       }
	            }
	        )                        
	        .exec()
	        .then(updateMasterInvoice=>{
	            if(updateMasterInvoice.nModified == 1){
	            	console.log("updateMasterInvoice nModified = ",updateMasterInvoice.nModified)
	                InvoiceMaster.updateOne(
			            { _id: req.body.masterInvoice_id},
			            {
			                $push:  { 'updateLog' : [{  updatedAt      : new Date(),
			                                            updatedBy      : req.body.updatedBy
			                                        }]
			                        }
			            } 
		            )
	                .exec()
	                .then(data=>{
	                	console.log("updateMasterInvoiceLog  = ",data)
	                    res.status(200).json(data);
	                })
	            }
	            res.status(200).json(updateMasterInvoice);
	        })
	        .catch(err =>{
	            res.status(500).json({ error : err });
	        });			
        }
    })
    .catch(err =>{
        res.status(500).json({ error : err });
    });
};
/*======== changeInvoiceStatus() =========*/
var changeInvoiceStatusToPaid = async (invoices, updatedBy, status) => {
	console.log("invoice invoices = ",invoices);
	console.log("invoice updatedBy = ",updatedBy);
    return new Promise(function (resolve, reject) {
        BillingManagement.updateMany(
            { _id:{$in:invoices} },  
            {
            	$push:  {  
                            "status"  : status,
                        },
                $set:  {
                            "statusValue"  : "Paid",
                       }
            }
        )                        
        .exec()
        .then(invoice=>{
            if(invoice.nModified == 1){
            	console.log("invoice nModified = ",invoice.nModified)
                BillingManagement.updateMany(
                {_id:{$in:invoices}},
                {
                    $push:  { 'updateLog' : [{  updatedAt      : new Date(),
                                                updatedBy      : updatedBy
                                            }]
                            }
                } )
                .exec()
                .then(data=>{
                	console.log("invoice updateLog = ",data);
                    resolve(true);
                })
            }else{
                resolve(false);
            }
        })
        .catch(err =>{
            resolve(err);
        });
    });
};
/*======== changeInvoiceStatus() =========*/
var changeBookingStatusToPaid = async (invoices, updatedBy, masterinvoiceId, status) => {
	console.log("booking invoices = ",invoices);
	console.log("booking createdBy = ",updatedBy);
    return new Promise(function (resolve, reject) {
    	processBookingStatus();
    	async function processBookingStatus(){ 
	    	var bookingIds = [];
	    	for (var i = 0; i < invoices.length; i++) {    		
	        	var booking_id = await getBookingInInvoice(invoices[i]);;
	        	console.log("booking_id = ",booking_id);  
	        	bookingIds.push(booking_id);          	
	        }
    		console.log("booking Array = ",bookingIds);

	        BookingMaster.updateMany(
	            { _id:{$in:bookingIds} },  
	            {
	            	$push:  {  
                            	"status"  : status,
                            },
	                $set :  {
	                            "statusValue"  		: "Paid",	                            
                            	"masterinvoiceId" 	: masterinvoiceId 
	                        }
	            }
	        )                        
	        .exec()
	        .then(booking=>{
	            if(booking.nModified == 1){
	            	console.log("booking nModified = ",booking.nModified)
	                BookingMaster.updateMany(
		                {_id:{$in:invoices}},
		                {
		                    $push:  { 'updateLog' : [{  updatedAt      : new Date(),
		                                                updatedBy      : updatedBy
		                                            }]
		                            }
		                } 
		            )
	                .exec()
	                .then(data=>{
	                	console.log("booking updatelog = ",data)
	                    resolve(true);
	                })
	            }else{
	                resolve(false);
	            }
	        })
	        .catch(err =>{
	            resolve(err);
	        });
	    } 
	    
    });
};
/*======== singleInvoice() =========*/
exports.singleInvoice = (req,res,next)=>{
	console.log("id = ",req.params.id);
	InvoiceMaster.aggregate([
        {$lookup:
            {
               from         : "entitymasters",
               localField   : "company_id",
               foreignField : "_id",
               as           : "companyDetails"
            }
        },
        {"$match" :
            {
                "_id" : ObjectId(req.params.id)
            }
        },
    ])
	.exec()
	.then(data=>{
		var masterinvoice = data[0];
		var invoices      = masterinvoice.invoices;
		// console.log("masterinvoices = ", masterinvoice);
		if(data && data.length > 0){
			// console.log("invoices = ",invoices);
			BillingManagement.find({_id : {$in : invoices}})
			.populate('employeeId')
			.exec()
			.then(data=>{
				// console.log("data = ",data);
				if(data && data.length > 0){
					processData();
            		async function processData(){
						var finalArray = []
						for(var i=0 ; i<data.length ; i++){
							var invoiceId 	= data[i]._id;
							var invoiceNo 	= data[i].invoiceNumber;
							var lineItem   	= data[i].lineItems;
							var address    	= data[i].from.city+' - '+data[i].to.city;
							var date 	   	= moment(data[i].from.pickupDate).format("MMM Do YY")+' - '+moment(data[i].to.returnDate).format("MMM Do YY");
							var name 	   	= data[i].employeeId.firstName+' '+data[i].employeeId.lastName;
							var employeeId 	= data[i].employeeId._id;
							var qty 		= 1;
							var taxAmt 		= 0;
							var CGST 		= 0;
							var SGST 		= 0;
							var rateAmt		= 0;
							var totalAmt    = 0;

							if(lineItem && lineItem.length > 0){						
								for(var j=0 ; j<lineItem.length ; j++){	
									if(lineItem[j].billingCode === 401 || lineItem[j].billingCode === 402){
										console.log("tax = ","a" + j + "a  " + lineItem[j].taxAmount);
										taxAmt += parseFloat(lineItem[j].taxAmount)
									}
									if(lineItem[j].billingCode === 401){
										console.log("tax = ","a" + j + "a  " + lineItem[j].taxAmount);
										CGST += parseFloat(lineItem[j].taxAmount)
									}
									if(lineItem[j].billingCode === 402){
										console.log("tax = ","a" + j + "a  " + lineItem[j].taxAmount);
										SGST += parseFloat(lineItem[j].taxAmount)
									}
									if (lineItem[j].billingCode === 11 || 
				                        lineItem[j].billingCode === 12 ||
				                        lineItem[j].billingCode === 13 ||
				                        lineItem[j].billingCode === 14) {
										console.log("amount = ","a" + j + "a  " + lineItem[j].amount);
				                        totalAmt += parseFloat(lineItem[j].amount);                                    
				                    } 													
								}//j 						
							}//lineItem

							rateAmt = totalAmt - taxAmt;
							finalArray.push({
								name          : name, 
								address       : address,
								date          : date,
								employeeId    : employeeId,
								invoiceId     : invoiceId,
								invoiceNo     : invoiceNo,
								qty 	  	  : qty,
								rateAmt 	  : rateAmt,
								taxAmt 		  : taxAmt,
								CGST 		  : CGST,
								SGST 		  : SGST,
								totalAmt 	  : totalAmt
							})						
						}//i
						if (masterinvoice.department_id) {
							var department = await getDepartmentName(masterinvoice.department_id);
						}else{
							var department = "";
						}
						if (masterinvoice.employee_id) {
							var employeeName = await getEmployeeName(masterinvoice.employee_id);
						}else{
							var employeeName = "";
						}
						console.log("department name = ",department);
						console.log("employee name = ",employeeName);
						console.log("finalArray = ",finalArray);
						res.status(200).json({
							amount   	  : masterinvoice.amount, 
							totalAmount   : masterinvoice.totalAmount, 
							payableAmount : masterinvoice.payableAmount, 
							tax           : masterinvoice.tax, 
							CGSTtax       : masterinvoice.CGSTtax, 
							SGSTtax       : masterinvoice.SGSTtax, 
							qty           : masterinvoice.qty, 
							rate          : masterinvoice.amount,  
							payment       : masterinvoice.payment, 
							roundingOff   : masterinvoice.roundingOff,
							createdAt     : masterinvoice.createdAt,
							invoiceNo     : masterinvoice.invoiceNumber,
							invoiceData   : finalArray,
							employeeName  : employeeName,
							department 	  : department,
							startDate 	  : masterinvoice.startDate,
							endDate 	  : masterinvoice.endDate,
							companyDetails: masterinvoice.companyDetails[0]
						});
					}
				}//data
			})
			.catch(err =>{
		        res.status(500).json({ error : err });
		    });
		}
	})
	.catch(err =>{
        res.status(500).json({ error : err });
    });
}

/*======== getDepartmentName() =========*/
var getDepartmentName = async (department_id) => {
    return new Promise(function (resolve, reject) {
        DepartmentMaster.findOne({_id: ObjectId(department_id)})                        
        .exec()
        .then(data=>{
            if(data){
            	var department = data.department;
            	resolve(department);
            }                
        })
        .catch(err =>{
            resolve(err);
        });
    });
};

/*======== getInvoicesInMasterInvoice() =========*/
var getBookingInInvoice = async (Invoice_id) => {
    return new Promise(function (resolve, reject) {
        BillingManagement.findOne({"_id": ObjectId(Invoice_id)})                        
        .exec()
        .then(data=>{
        	// console.log("booking data = ",data)
            if(data){            	
            	resolve(data.booking_Id);
            }                
        })
        .catch(err =>{
            resolve(err);
        });
    });
};

/*======== getEmployeeName() =========*/
var getEmployeeName = async (employee_id) => {
    return new Promise(function (resolve, reject) {
        PersonMaster.findOne({"_id": ObjectId(employee_id)})                        
        .exec()
        .then(data=>{
            if(data){
            	var employeeName = (data.firstName ? data.firstName + " " : '') + 
					               (data.middleName ? data.middleName + " " : '') + 
					               (data.lastName ? data.lastName : '');
            	resolve(employeeName);
            }                
        })
        .catch(err =>{
            resolve(err);
        });
    });
};

/*======== getEmployeeName() =========*/
var getSingleInvoicesDetails = async (invoiceNumberArray) => {
    return new Promise(function (resolve, reject) {
        BillingManagement.find({_id : {$in : invoiceNumberArray}})
			.populate('employeeId')
			.exec()
			.then(data=>{
				if(data && data.length > 0){
					processData();
            		async function processData(){
						var finalArray = []
						for(var i=0 ; i<data.length ; i++){
							var invoiceId 	= data[i]._id;
							var invoiceNo 	= data[i].invoiceNumber;
							var lineItem   	= data[i].lineItems;
							var address    	= data[i].from.city+' - '+data[i].to.city;
							var date 	   	= moment(data[i].from.pickupDate).format("MMM Do YY")+' - '+moment(data[i].to.returnDate).format("MMM Do YY");
							var name 	   	= data[i].employeeId.firstName+' '+data[i].employeeId.lastName;
							var employeeId 	= data[i].employeeId._id;
								
							finalArray.push({
								name          : name, 
								address       : address,
								date          : date,
								employeeId    : employeeId,
								invoiceId     : invoiceId,
								invoiceNo     : invoiceNo,

							})						
						}//i
						resolve(finalArray);
					}
				}//data
			})
			.catch(err =>{
		        res.status(500).json({ error : err });
		    });
    });
};
/*======== allUnpaidInvoice() =========*/
exports.allPaidInvoice = (req,res,next)=>{
	console.log("req body master paid => ",req.body);
	InvoiceMaster.aggregate([
		{$lookup: 
			{
               from         : "entitymasters",
               localField   : "company_id",
               foreignField : "_id",
               as           : "companyDetails"
            }
        },
        {$match:{status :'Paid'}},
        {$facet: {
                paginatedResults: [{ $skip: req.body.startRange }, { $limit: req.body.limitRange-req.body.startRange }],
                totalCount: [
                  {
                    $count: 'count'
                  }
                ]
              }
        }
    ])
    .sort({createdAt : 1})
    .exec()
    .then(data=>{    	
		console.log("data = ",data);
    	res.status(200).json(data);    		
    })
    .catch(err =>{
        res.status(500).json({ error: err });
    });
}

/*======== allUnpaidInvoice() =========*/
exports.allUnpaidInvoice = (req,res,next)=>{
	console.log("req body master unpaid => ",req.body);
	InvoiceMaster.aggregate([
		{$lookup: 
			{
               from         : "entitymasters",
               localField   : "company_id",
               foreignField : "_id",
               as           : "companyDetails"
            }
        },
        {$match:{status :'Unpaid'}},
        {$facet: {
                paginatedResults: [{ $skip: req.body.startRange }, { $limit: req.body.limitRange-req.body.startRange }],
                totalCount: [
                  {
                    $count: 'count'
                  }
                ]
              }
        }
    ])
    .sort({createdAt : 1})
    .exec()
    .then(data=>{    	
	    res.status(200).json(data);   
    })
    .catch(err =>{
        res.status(500).json({ error: err });
    });
}

/*======== filteredUnpaidMasterBills =========*/
exports.filteredUnpaidMasterBills = (req,res,next)=>{
	console.log("filteredUnpaidMasterBills => ",req.body);
    if(req.body.company && req.body.company != "All"){
        var company = {"company_id": ObjectId(req.body.company) }
    }else{
        var company = {"company_id": {$ne: ""} }
    }
    if(req.body.department && req.body.department != "All"){
        var department = {"department_id": req.body.department}
    }else{
    	var department     = {}; 
    	department['$and'] = [];
    	department["$and"].push({"department_id": {$ne: ""}})
    	// selector["$and"].push({"department_id": {$eq: ""}})
        // var department   = {"department_id": {$ne: ""} }
    }
    if(req.body.status === "Paid"){
        var status       = { "status" : "Paid"}
    }else if(req.body.status === "Unpaid"){
        var status       = { "status" : "Unpaid"}
    }

	InvoiceMaster.aggregate([
		{$match : company},
        {$match : department},
        {$match : {
                    'createdAt': {
                                    $gte : new Date(req.body.startDate), 
                                    $lt  : new Date(req.body.endDate) 
                                 }
                  }
        },
        {$match : status},
		{$lookup: 
			{
               from         : "entitymasters",
               localField   : "company_id",
               foreignField : "_id",
               as           : "companyDetails"
            }
        },
        {$facet: {
                paginatedResults: [{ $skip: req.body.startRange }, { $limit: req.body.limitRange-req.body.startRange }],
                totalCount: [
                  {
                    $count: 'count'
                  }
                ]
              }
        }
    ])
    .sort({createdAt : 1})
    .exec()
    .then(data=>{
    	console.log("data = ",data);
	    res.status(200).json(data);    		
    })
    .catch(err =>{
        res.status(500).json({ error: err });
    });
}


/*======== filteredUnpaidMasterBills =========*/
exports.filteredPaidMasterBills = (req,res,next)=>{
	console.log("filteredPaidMasterBills => ",req.body);
    if(req.body.company && req.body.company != "All"){
        var company = {"company_id": ObjectId(req.body.company) }
    }else{
        var company = {"company_id": {$ne: ""} }
    }
    if(req.body.department && req.body.department != "All"){
        var department = {"department_id": req.body.department }
    }else{
    	var department     = {}; 
    	department['$and'] = [];
    	department["$and"].push({"department_id": {$ne: ""}})
    	// selector["$and"].push({"department_id": {$eq: ""}})
        // var department   = {"department_id": {$ne: ""} }
    }

	InvoiceMaster.aggregate([
		{$match : company},
        {$match : department},
        {$match : {
                    'createdAt': {
                                    $gte : new Date(req.body.startDate), 
                                    $lt  : new Date(req.body.endDate) 
                                 }
                  }
        },
        {$match : { "status" : "Paid"}},
		{$lookup: 
			{
               from         : "entitymasters",
               localField   : "company_id",
               foreignField : "_id",
               as           : "companyDetails"
            }
        },
        {$facet: {
                paginatedResults: [{ $skip: req.body.startRange }, { $limit: req.body.limitRange-req.body.startRange }],
                totalCount: [
                  {
                    $count: 'count'
                  }
                ]
              }
        }
    ])
    .sort({createdAt : 1})
    .exec()
    .then(data=>{
    	console.log("data = ",data);
    	res.status(200).json(data);    		
    })
    .catch(err =>{
        res.status(500).json({ error: err });
    });
}
