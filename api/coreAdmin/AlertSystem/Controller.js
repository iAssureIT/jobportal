const mongoose          = require("mongoose");
const BookingMaster     = require('../bookingMaster/ModelBookingMaster');
var ObjectId            = require('mongodb').ObjectID;
var moment              = require('moment');
const axios             = require('axios');
var request         = require('request-promise');

const globalVariable    = require("../../nodemon.js");

exports.vendorAcceptanceAlert = (req,res,next)=>{
	BookingMaster.find({'statusValue':"Allocated To Vendor"})
	.exec()
    .then(booking => {
        if(booking.length > 0){
        	for(var i=0 ; i<booking.length ; i++){
        		var status = booking[i].status.filter((elem)=>{return elem.value === "Allocated To Vendor"});
        		if(status && status.length > 0){
        			var startdate = status[0].statusAt
	        		var reqDateTime = moment(startdate).add(45, 'minutes'); 
	                var sameDateTime = moment().isSame(reqDateTime);
	                var afterDateTime = moment().isAfter(reqDateTime);
	                if(sameDateTime || afterDateTime){
	                	var bookingID = booking[i].bookingId;
	                	var tripType = booking[i].tripType;
	                	var fromAddr = booking[i].from.address;
	                	var toAddr = booking[i].to.address;
	                	var fromTime = booking[i].pickupTime;
	                	var toTime = booking[i].returnTime;
	                	var fromDate = moment(booking[i].pickupDate).format('DD/MM/YYYY');
	                	var toDate = moment(booking[i].returnDate).format('DD/MM/YYYY');
	                	var allocatedToVendor = booking[i].allocatedToVendor;
	                	var secondDateTime = moment(reqDateTime).add(45, 'minutes'); 
	                	var futureDateTime = moment(startdate).add(2, 'hours'); 
	                	var thirdDateTime = moment(futureDateTime).add(1, 'hours');
						if (moment().isBetween(reqDateTime,secondDateTime)) {
	                		main();
        					async function main(){
		                		var updateObj = {
				                    value:'AlertLevel1',
				                    statusAt: new Date()   
				                   }
		                		 var updateStatus = await updateNotificationStatus(booking[i]._id,updateObj)
			                	 var sendData = {
						          "event": "Event35",
						          "company_id": allocatedToVendor, // company _id (ref: entitymaster)
						          "otherAdminRole":'vendoradmin', // in our case corporateadmin or vendoradmin
						          "variables": {
						            "BookingNum": bookingID,
						            "pickup" 	: fromAddr,
						            "drop" 		: toAddr,
						            "FromDate" 	: fromDate +' '+ fromTime,
						            "ToDate"    : toDate +' '+ toTime,
						            "tripType" 	: tripType,
						            }
						          }
						          axios.post('http://localhost:'+globalVariable.port+'/api/masternotifications/post/sendNotification', sendData)
						          .then((res) => {
						          		console.log('sendDataToUser in result==>>>', res.data)
						          })
						          .catch((error) => { console.log('notification error: ',error)})
						          res.status(200).json({ updated : true });
						    }

						} else if (moment().isBetween(futureDateTime,thirdDateTime)) { 
					    	main();
        					async function main(){
						    	var updateObj = {
				                    value:'AlertLevel2',
				                    statusAt: new Date()   
				                   }
		                		var updateStatus = await updateNotificationStatus(booking[i]._id,updateObj)
						    	var sendData = {
						          "event": "Event36",
						          "company_id": allocatedToVendor, // company _id (ref: entitymaster)
						          "otherAdminRole":'vendoradmin', // in our case corporateadmin or vendoradmin
						          "variables": {
						            "BookingNum": bookingID,
						            "pickup" 	: fromAddr,
						            "drop" 		: toAddr,
						            "FromDate" 	: fromDate +' '+ fromTime,
						            "ToDate"    : toDate +' '+ toTime,
						            "tripType" 	: tripType,
						            }
						          }
						          axios.post('http://localhost:'+globalVariable.port+'/api/masternotifications/post/sendNotification', sendData)
						          .then((res) => {
						          		console.log('sendDataToUser in result==>>>', res.data)
						          })
						          .catch((error) => { console.log('notification error: ',error)})
						          res.status(200).json({ updated : true });
						    }
					    }
			        }
			        // res.status(200).json({ updated : false });
	            }
        	}//i
            
        }
    })
    .catch(err => {
        console.log("err",err);
        res.status(500).json({ error: err });
    });
}

function updateNotificationStatus(id,updateObj){
    return new Promise((resolve,reject)=>{
        BookingMaster.updateOne(
                { _id:id },  
                {
                    $push:  {  
                                "vendorAcceptanceAlertLevels"      : updateObj,
                            },
                }
            )
            .exec()
            .then(data=>{
                if(data.nModified == 1){
                    BookingMaster.updateOne(
                    { _id:id},
                    {
                        $push:  { 'updateLog' : [{  updatedAt      : new Date(),
                                                }]
                                }
                    } )
                    .exec()
                    .then(data=>{
                        resolve(data)
                    })
                }else{
                    reject(data)
                }
            })
            .catch(err =>{
                reject(err)
            });
    })
}
