const  _                = require('underscore');
const mongoose          = require("mongoose");
const FailedRecords     = require('../failedRecords/ModelFailedRecords');
const BookingMaster     = require('../bookingMaster/ModelBookingMaster');
const PersonMaster      = require('../personMaster/ModelPersonMaster');
const User              = require('../userManagement/ModelUsers.js');
const EntityMaster      = require('../entityMaster/ModelEntityMaster.js');
const ProjectSetting    = require('../projectSettings/ModelProjectSettings.js');
const CategoryMaster    = require('../categoryMaster/ModelCategoryMaster.js');
const BillingManagement = require('../BillingManagement/Model');
const VehicleMaster     = require('../vehicleMaster/ModelVehicleMaster.js');
const Contract          = require('../contract/ModelContract.js');
const DepartmentMaster  = require('../departmentMaster/ModelDepartmentMaster.js');

var   request           = require('request-promise');
var   ObjectId          = require('mongodb').ObjectID;
var   moment            = require('moment');
const globalVariable    = require("../../nodemon.js");

const axios = require('axios');

exports.getdUserReports = (req,res,next)=>{
    User.aggregate([
        {$match:{'createdAt':{$gte : new Date(req.body.startDate), $lt : new Date(req.body.endDate) }}},
        {$lookup:
        {
            from:"entitymasters",
            localField: "corporateId",
            foreignField: "_id",
            as:"company"
         }
        },
        {$lookup:
        {
            from:"personmasters",
            localField: "_id",
            foreignField: "userId",
            as:"person"
         }
        },
        {$lookup:
        {
            from:"departmentmasters",
            localField: "departmentId",
            foreignField: "_id",
            as:"department"
        }
        },       
    ])
    .skip(req.body.startRange)
    .limit(req.body.limitRange)
    .exec()
    .then(data=>{
        res.status(200).json(data);
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        });
    });
}
exports.getAdminfilteredUserReports = (req,res,next)=>{
    var selector = {}; 
    var cityName = "";
    selector['$and']=[];
    if(req.body.selector.company && req.body.selector.company != "All"){
        selector["$and"].push({"profile.companyName": req.body.selector.company })
    }
    if(req.body.selector.status){
        selector["$and"].push({"users.profile.status": req.body.selector.status})
    }
    if(req.body.selector.city){
        selector["$and"].push({"address.city": req.body.selector.city})
    }
    if(req.body.selector.state){
        selector["$and"].push({"person.address.state": req.body.selector.state})
    }
    console.log("selector",selector);
    User.aggregate([

        {$match:{'createdAt':{$gte : new Date(req.body.startDate), $lt : new Date(req.body.endDate) }}},
        {$match:selector},
        {$lookup:
        {
            from:"entitymasters",
            localField: "corporateId",
            foreignField: "_id",
            as:"company"
         }
        },
        {$lookup:
        {
            from:"personmasters",
            localField: "userId",
            foreignField: "_id",
            as:"person"


         }
        },
        {$lookup:
        {
            from:"departmentmasters",
            localField: "departmentId",
            foreignField: "_id",
            as:"department"
        }
        },
    ])
    .skip(req.body.startRange)
    .limit(req.body.limitRange)
    .exec()
    .then(data=>{
        res.status(200).json(data);
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        });
    });
}

function getTotalBookings(id,status,startDate,endDate){
    return new Promise((resolve,reject)=>{
        if(status === 'All'){
            var selector = {'corporateId':id,'createdAt':{$gte : new Date(startDate), $lt : new Date(endDate) }}
        }else if(status === 'Rejected'){
            var statusVar = ['Manager Rejected','Vendor Rejected','Driver Rejected']
            var selector = {'corporateId':id,statusValue:{$in:statusVar},'createdAt':{$gte : new Date(startDate), $lt : new Date(endDate) }}
        }else{
            var statusVar = ['Cancelled By User','Cancelled By Vendor','Cancelled']
            var selector = {'corporateId':id,statusValue:{$in:statusVar},'createdAt':{$gte : new Date(startDate), $lt : new Date(endDate) }}
        }
        BookingMaster.find(selector)
        .exec()
        .then(data=>{
            if(data && data.length > 0){
              var bookings = data.length;
            }else{
              var bookings = 0;
            }
            resolve(bookings)
        })
        .catch(err => {
                reject(err);
            });
    });
}; 

function getTotalBookingsofVendor(id,status,startDate,endDate){
    return new Promise((resolve,reject)=>{
        if(status === 'All'){
            var selector = {'allocatedToVendor':id,'createdAt':{$gte : new Date(startDate), $lt : new Date(endDate) }}
        }else if(status === 'Rejected'){
            var statusVar = ['Manager Rejected','Vendor Rejected','Driver Rejected']
            var selector = {'allocatedToVendor':id,statusValue:{$in:statusVar},'createdAt':{$gte : new Date(startDate), $lt : new Date(endDate) }}
        }else{
            var statusVar = ['Cancelled By User','Cancelled By Vendor','Cancelled']
            var selector = {'allocatedToVendor':id,statusValue:{$in:statusVar},'createdAt':{$gte : new Date(startDate), $lt : new Date(endDate) }}
        }
        BookingMaster.find(selector)
        .exec()
        .then(data=>{
            if(data && data.length > 0){
              var bookings = data.length;
            }else{
              var bookings = 0;
            }
            resolve(bookings)
        })
        .catch(err => {
                reject(err);
            });
    });
}; 

function getCompletedBooking(id,startDate,endDate){
    return new Promise(function (resolve, reject) {
        BookingMaster.find({'corporateId':id,'status.value':'Ready To Bill','createdAt':{$gte : new Date(startDate), $lt : new Date(endDate) }})
        .exec()
        .then(data=>{
            resolve(data)
        })
        .catch(err => {
                reject(err);
            });
    });
};  

function getCompletedBookingofVendor(id,startDate,endDate){
    return new Promise(function (resolve, reject) {
        BookingMaster.find({'allocatedToVendor':id,'status.value':'Ready To Bill','createdAt':{$gte : new Date(startDate), $lt : new Date(endDate) }})
        .exec()
        .then(data=>{
            resolve(data)
        })
        .catch(err => {
                reject(err);
            });
    });
};  

function getInvoiceData(id){
    return new Promise(function (resolve, reject) {
        BillingManagement.findOne({'_id':id})
        .exec()
        .then(data=>{
            resolve(data)
        })
        .catch(err => {
                reject(err);
            });
    });
}; 

function getTotalDrivers(id){
    return new Promise(function (resolve, reject) {
        PersonMaster.find({'company_Id':id,"type" : "driver"})
        .exec()
        .then(data=>{
            if(data && data.length > 0){
              var drivers = data.length;
            }else{
              var drivers = 0;
            }
            resolve(drivers)
        })
        .catch(err => {
                reject(err);
            });
    });
};  

function getTotalCars(id){
    return new Promise(function (resolve, reject) {
        VehicleMaster.find({'company_Id':id})
        .exec()
        .then(data=>{
            if(data && data.length > 0){
              var drivers = data.length;
            }else{
              var drivers = 0;
            }
            resolve(drivers)
        })
        .catch(err => {
                reject(err);
            });
    });
}; 

function getPersonalData(id){
    return new Promise(function (resolve, reject) {
        PersonMaster.findOne({'_id':id})
        .exec()
        .then(data=>{
            resolve(data)
        })
        .catch(err => {
                reject(err);
            });
    });
}

function getCompanyData(id){
    return new Promise(function (resolve, reject) {
        EntityMaster.findOne({'_id':id})
        .exec()
        .then(data=>{
            resolve(data)
        })
        .catch(err => {
                reject(err);
            });
    });
}

function getVehicleData(id){
    return new Promise(function (resolve, reject) {
        VehicleMaster.findOne({'_id':id})
        .exec()
        .then(data=>{
            resolve(data)
        })
        .catch(err => {
                reject(err);
            });
    });
}

function getUserData(id){
    return new Promise(function (resolve, reject) {
        User.findOne({'_id':id})
        .exec()
        .then(data=>{
            resolve(data.profile)
        })
        .catch(err => {
                reject(err);
            });
    });
}

function getPackageData(contractId,packageId){
    return new Promise(function (resolve, reject) {
        Contract.findOne({'_id':contractId})
        .exec()
        .then(data=>{
            if(data){
              var packages = data.packages;
              if(packages.length > 0){
                for (var i = 0; i < packages.length; i++) {                      
                    if(packageId.equals(packages[i]._id)){
                        resolve(packages[i]);                              
                    }
                }
              }
            } 
        })
        .catch(err => {
                reject(err);
            });
    });
} 

function getDepartmentData(id){
    return new Promise(function (resolve, reject) {
        DepartmentMaster.findOne({'_id':id})
        .exec()
        .then(data=>{
            resolve(data.department)
        })
        .catch(err => {
                reject(err);
            });
    });
} 

exports.getCompanyLocationData = (req,res,next)=>{
    EntityMaster.find({'entityType' : req.params.entityType})
    .exec()
    .then(data=>{
        if(data && data.length > 0){
            var finalArray = []

            for(var i=0 ; i<data.length ; i++){
                if(data[i].locations && data[i].locations.length > 0){
                    var loc = data[i].locations
                    
                    for(j=0;j<loc.length;j++){
                        const city = loc[j].city;
                        const state = loc[j].state;
                        
                        const found = finalArray.some(el => el.state === state);
                        if (!found){
                            var cityArray = [] 
                            cityArray.push(city)
                            finalArray.push({ 
                                state : state,
                                city : cityArray
                            });
                        }else{
                            var index = finalArray.findIndex(el => el.state === state);
                            var cityData = finalArray[index].city
                            if(cityData.includes(city) === false){
                                finalArray[index].city.push(city);
                            }
                        }
                    }//j
                }
            }//i
            res.status(200).json(finalArray);
        }
    })
    .catch(err =>{
        console.log('err=>',err)
        res.status(500).json({
            error: err
        });
    });
}


exports.getCorporateReports = (req,res,next)=>{
    EntityMaster.find({'entityType' : req.body.entityType})
    .exec()
    .then(data=>{
        processData();
        async function processData() {
            if(data && data.length > 0){
               var finalArray = [];
                var totalAmount = 0;
                var kmTravelled = 0;
                var pendingBillAmount = 0;
                var settledBillAmount = 0;
               for(var i=0;i<data.length;i++){
                var loc = data[i].locations;
                var stateArray = []
                var cityArray = []
                if(loc && loc.length > 0){
                    for(j=0;j<loc.length;j++){
                        stateArray.push(loc[j].state)
                        cityArray.push(loc[j].city)
                    }//j
                }
                var name = data[i].companyName+'('+data[i].companyID+')'
                var status = data[i].profileStatus
                var registered = moment(data[i].createdAt).format('DD/MM/YYYY')
                var contacts = data[i].contactPersons
                var contactCount = 0;
                if(contacts && contacts.length > 0){
                    contactCount = contacts.length
                }

                var totalBookings = await getTotalBookings(data[i]._id,'All',req.body.startDate,req.body.endDate)
                var rejectedBookings = await getTotalBookings(data[i]._id,'Rejected',req.body.startDate,req.body.endDate)
                var cancelledBookings = await getTotalBookings(data[i]._id,'Cancelled',req.body.startDate,req.body.endDate)
                var completedBooking = await getCompletedBooking(data[i]._id,req.body.startDate,req.body.endDate)
                var completedBookingCount = completedBooking.length;
                var totalAmount = 0;
                var kmTravelled = 0;
                var pendingBillAmount = 0;
                var settledBillAmount = 0;
                if(completedBooking && completedBooking.length > 0){
                    
                    for(k=0;k<completedBooking.length;k++){
                        if(completedBooking[k].invoiceId){
                         var invoiceData = await getInvoiceData(completedBooking[k].invoiceId)
                         totalAmount = parseFloat(totalAmount) + parseFloat(invoiceData[0].totalAmount)
                         kmTravelled = parseFloat(kmTravelled) + parseFloat(invoiceData[0].totalKms)
                         settledBillAmount = parseFloat(settledBillAmount) + parseFloat(invoiceData[0].payment)
                         pendingBillAmount = parseFloat(pendingBillAmount) + parseFloat(invoiceData[0].balance)
                        }
                    }
                }
                finalArray.push({
                    company : name,
                    companyName : data[i].groupName+'('+data[i].companyID+')',
                    id: data[i]._id,
                    status:status,
                    registered:registered,
                    contactCount:contactCount,
                    totalBookings:totalBookings,
                    rejectedBookings:rejectedBookings,
                    cancelledBookings:cancelledBookings,
                    completedBookingCount:completedBookingCount,
                    states:stateArray,
                    cities:cityArray,
                    totalAmount:totalAmount,
                    kmTravelled:kmTravelled,
                    settledBillAmount:settledBillAmount,
                    pendingBillAmount:pendingBillAmount,
                })
               }//i 
              res.status(200).json(finalArray);
            }else{
                res.status(200).json(data);
            }

        }
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        });
    });
};

exports.corporateReportsfilter = (req,res,next)=>{
    var selector = {}; 
    selector['$and']=[];

    if(req.body.selector.company && req.body.selector.company != ""){
        selector["$and"].push({"_id": ObjectId(req.body.selector.company) })
    }else{
        selector["$and"].push({"_id": {$ne: ""} })
    }

    if(req.body.selector.stateName){
        selector["$and"].push({"locations.state": req.body.selector.stateName })
    }
    if(req.body.selector.city){
        selector["$and"].push({"locations.city": req.body.selector.city })
    }
    EntityMaster.aggregate([
        {$match:{'entityType' : req.body.entityType}},
        {$match:selector}
    ])
    .exec()
    .then(data=>{
        processData();
        async function processData() {
            if(data && data.length > 0){
               var finalArray = [];
                var totalAmount = 0;
                var kmTravelled = 0;
                var pendingBillAmount = 0;
                var settledBillAmount = 0;
               for(var i=0;i<data.length;i++){
                var loc = data[i].locations;
                var stateArray = []
                var cityArray = []
                if(loc && loc.length > 0){
                    for(j=0;j<loc.length;j++){
                        stateArray.push(loc[j].state)
                        cityArray.push(loc[j].city)
                    }//j
                }
                var name = data[i].companyName+'('+data[i].companyID+')'
                var status = data[i].profileStatus
                var registered = moment(data[i].createdAt).format('DD/MM/YYYY')
                var contacts = data[i].contactPersons
                var contactCount = 0;
                if(contacts && contacts.length > 0){
                    contactCount = contacts.length
                }

                var totalBookings = await getTotalBookings(data[i]._id,'All',req.body.startDate,req.body.endDate)
                var rejectedBookings = await getTotalBookings(data[i]._id,'Rejected',req.body.startDate,req.body.endDate)
                var cancelledBookings = await getTotalBookings(data[i]._id,'Cancelled',req.body.startDate,req.body.endDate)
                var completedBooking = await getCompletedBooking(data[i]._id,req.body.startDate,req.body.endDate)
                var completedBookingCount = completedBooking.length;
                var totalAmount = 0;
                var kmTravelled = 0;
                var pendingBillAmount = 0;
                var settledBillAmount = 0;
                if(completedBooking && completedBooking.length > 0){
                    
                    for(k=0;k<completedBooking.length;k++){
                        if(completedBooking[k].invoiceId){
                         var invoiceData = await getInvoiceData(completedBooking[k].invoiceId)
                         totalAmount = parseFloat(totalAmount) + parseFloat(invoiceData[0].totalAmount)
                         kmTravelled = parseFloat(kmTravelled) + parseFloat(invoiceData[0].totalKms)
                         settledBillAmount = parseFloat(settledBillAmount) + parseFloat(invoiceData[0].payment)
                         pendingBillAmount = parseFloat(pendingBillAmount) + parseFloat(invoiceData[0].balance)
                        }
                    }
                }
                finalArray.push({
                    company : name,
                    companyName : data[i].groupName+'('+data[i].companyID+')',
                    id: data[i]._id,
                    status:status,
                    registered:registered,
                    contactCount:contactCount,
                    totalBookings:totalBookings,
                    rejectedBookings:rejectedBookings,
                    cancelledBookings:cancelledBookings,
                    completedBookingCount:completedBookingCount,
                    states:stateArray,
                    cities:cityArray,
                    totalAmount:totalAmount,
                    kmTravelled:kmTravelled,
                    settledBillAmount:settledBillAmount,
                    pendingBillAmount:pendingBillAmount,
                })
               }//i 
               res.status(200).json(finalArray);
            }else{
                res.status(200).json(data);
            }

        }
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        });
    });
};
exports.getVendorReports = (req,res,next)=>{
    
    EntityMaster.find({'entityType' : req.body.entityType})
    .exec()
    .then(data=>{
        processData();
        async function processData() {
            if(data && data.length > 0){
               var finalArray = [];
                var totalAmount = 0;
                var kmTravelled = 0;
                var pendingBillAmount = 0;
                var settledBillAmount = 0;
               for(var i=0;i<data.length;i++){
                var loc = data[i].locations;
                var stateArray = []
                var cityArray = []
                if(loc && loc.length > 0){
                    for(j=0;j<loc.length;j++){
                        stateArray.push(loc[j].state)
                        cityArray.push(loc[j].city)
                    }//j
                }
                var name = data[i].companyName+'('+data[i].companyID+')'
                var status = data[i].profileStatus
                var registered = moment(data[i].createdAt).format('DD/MM/YYYY')
                var contacts = data[i].contactPersons
                var contactCount = 0;
                if(contacts && contacts.length > 0){
                    contactCount = contacts.length
                }

                var totalDrivers = await getTotalDrivers(data[i]._id)
                var totalCars = await getTotalCars(data[i]._id)
                var totalBookings = await getTotalBookingsofVendor(data[i]._id,'All',req.body.startDate,req.body.endDate)
                var rejectedBookings = await getTotalBookingsofVendor(data[i]._id,'Rejected',req.body.startDate,req.body.endDate)
                var cancelledBookings = await getTotalBookingsofVendor(data[i]._id,'Cancelled',req.body.startDate,req.body.endDate)
                var completedBooking = await getCompletedBookingofVendor(data[i]._id,req.body.startDate,req.body.endDate)
                var completedBookingCount = completedBooking.length;
                var totalAmount = 0;
                var kmTravelled = 0;
                var pendingBillAmount = 0;
                var settledBillAmount = 0;
                if(completedBooking && completedBooking.length > 0){
                    
                    for(k=0;k<completedBooking.length;k++){
                        if(completedBooking[k].invoiceId){
                         var invoiceData = await getInvoiceData(completedBooking[k].invoiceId)
                         totalAmount = parseFloat(totalAmount) + parseFloat(invoiceData[0].totalAmount)
                         kmTravelled = parseFloat(kmTravelled) + parseFloat(invoiceData[0].totalKms)
                         settledBillAmount = parseFloat(settledBillAmount) + parseFloat(invoiceData[0].payment)
                         pendingBillAmount = parseFloat(pendingBillAmount) + parseFloat(invoiceData[0].balance)
                        }
                    }
                }
                finalArray.push({
                    company : name,
                    companyName : data[i].groupName+'('+data[i].companyID+')',
                    id: data[i]._id,
                    status:status,
                    registered:registered,
                    contactCount:totalDrivers,
                    carCount:totalCars,
                    totalBookings:totalBookings,
                    rejectedBookings:rejectedBookings,
                    cancelledBookings:cancelledBookings,
                    completedBookingCount:completedBookingCount,
                    states:stateArray,
                    cities:cityArray,
                    totalAmount:totalAmount,
                    kmTravelled:kmTravelled,
                    settledBillAmount:settledBillAmount,
                    pendingBillAmount:pendingBillAmount,
                })
               }//i 
              res.status(200).json(finalArray);
            }else{
                res.status(200).json(data);
            }

        }
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        });
    });
};

exports.vendorReportsfilter = (req,res,next)=>{
    
    var selector = {}; 
    selector['$and']=[];

    if(req.body.selector.company && req.body.selector.company != ""){
        selector["$and"].push({"_id": ObjectId(req.body.selector.company) })
    }else{
        selector["$and"].push({"_id": {$ne: ""} })
    }

    if(req.body.selector.stateName){
        selector["$and"].push({"locations.state": req.body.selector.stateName })
    }
    if(req.body.selector.city){
        selector["$and"].push({"locations.city": req.body.selector.city })
    }
    EntityMaster.aggregate([
        {$match:{'entityType' : req.body.entityType}},
        {$match:selector}
    ])
    .exec()
    .then(data=>{
        processData();
        async function processData() {
            if(data && data.length > 0){
               var finalArray = [];
                var totalAmount = 0;
                var kmTravelled = 0;
                var pendingBillAmount = 0;
                var settledBillAmount = 0;
               for(var i=0;i<data.length;i++){
                var loc = data[i].locations;
                var stateArray = []
                var cityArray = []
                if(loc && loc.length > 0){
                    for(j=0;j<loc.length;j++){
                        stateArray.push(loc[j].state)
                        cityArray.push(loc[j].city)
                    }//j
                }
                var name = data[i].companyName+'('+data[i].companyID+')'
                var status = data[i].profileStatus
                var registered = moment(data[i].createdAt).format('DD/MM/YYYY')
                var contacts = data[i].contactPersons
                var contactCount = 0;
                if(contacts && contacts.length > 0){
                    contactCount = contacts.length
                }

                var totalDrivers = await getTotalDrivers(data[i]._id)
                var totalCars = await getTotalCars(data[i]._id)
                var totalBookings = await getTotalBookingsofVendor(data[i]._id,'All',req.body.startDate,req.body.endDate)
                var rejectedBookings = await getTotalBookingsofVendor(data[i]._id,'Rejected',req.body.startDate,req.body.endDate)
                var cancelledBookings = await getTotalBookingsofVendor(data[i]._id,'Cancelled',req.body.startDate,req.body.endDate)
                var completedBooking = await getCompletedBookingofVendor(data[i]._id,req.body.startDate,req.body.endDate)
                var completedBookingCount = completedBooking.length;
                var totalAmount = 0;
                var kmTravelled = 0;
                var pendingBillAmount = 0;
                var settledBillAmount = 0;
                if(completedBooking && completedBooking.length > 0){
                    
                    for(k=0;k<completedBooking.length;k++){
                        if(completedBooking[k].invoiceId){
                         var invoiceData = await getInvoiceData(completedBooking[k].invoiceId)
                         totalAmount = parseFloat(totalAmount) + parseFloat(invoiceData[0].totalAmount)
                         kmTravelled = parseFloat(kmTravelled) + parseFloat(invoiceData[0].totalKms)
                         settledBillAmount = parseFloat(settledBillAmount) + parseFloat(invoiceData[0].payment)
                         pendingBillAmount = parseFloat(pendingBillAmount) + parseFloat(invoiceData[0].balance)
                        }
                    }
                }
                finalArray.push({
                    company : name,
                    companyName : data[i].groupName+'('+data[i].companyID+')',
                    id: data[i]._id,
                    status:status,
                    registered:registered,
                    contactCount:totalDrivers,
                    carCount:totalCars,
                    totalBookings:totalBookings,
                    rejectedBookings:rejectedBookings,
                    cancelledBookings:cancelledBookings,
                    completedBookingCount:completedBookingCount,
                    states:stateArray,
                    cities:cityArray,
                    totalAmount:totalAmount,
                    kmTravelled:kmTravelled,
                    settledBillAmount:settledBillAmount,
                    pendingBillAmount:pendingBillAmount,
                })
               }//i 
              res.status(200).json(finalArray);
            }else{
                res.status(200).json(data);
            }

        }
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        });
    });
};

exports.getEmployeeReport = (req,res,next)=>{
    BookingMaster.find({'createdAt':{$gte : new Date(req.body.startDate), $lt : new Date(req.body.endDate) }})
    .exec()
    .then(data=>{
        processData();
        async function processData() {
            if(data && data.length > 0){
                var finalArray = []
                for(var i=0 ; i<data.length ; i++){
                    var personalData = await getPersonalData(data[i].employeeId)
                    var driverData = await getPersonalData(data[i].allocatedToDriver)
                    var driver = driverData ? driverData.firstName+' '+personalData.lastName : 'NA';
                    var driverNumber = driverData ? driverData.contactNo : 'NA';
                    var employeeId = personalData.employeeId;
                    var grade = personalData.empCategory;
                    var region = personalData.workLocation;
                    var bookingType = personalData.workLocation;
                    var employeeName = personalData.firstName+' '+personalData.lastName;
                    var companyData = await getCompanyData(data[i].corporateId)
                    var userData = await getUserData(data[i].createdBy)
                    var bookerDetails = userData.fullName +' ('+userData.mobile+')'
                    var entityName = companyData.companyName;
                    var vendorData = await getCompanyData(data[i].allocatedToVendor)
                    var vendorCode = vendorData ? vendorData.companyID : 'NA';
                    var vendorName = vendorData ? vendorData.companyName : 'NA';
                    var carData = await getVehicleData(data[i].vehicleID)
                    var carCategory = carData ? carData.category : 'NA';
                    var carModel = carData ? carData.model : "NA";
                    var carNumber = carData ? carData.vehicleNumber : "NA";
                    var department = await getDepartmentData(data[i].departmentId)
                    var invoiceData = await getInvoiceData(data[i].invoiceId)
                    var systemRefInvoiceNo = invoiceData ? invoiceData.invoiceNumber : "NA";
                    var travelDistance = invoiceData ? invoiceData.totalKms : "NA";
                    var hours = invoiceData ? parseInt(invoiceData.totalHrs) : "NA"
                    var travelTime = hours ? hours * 60 : 'NA';
                    var packageData = await getPackageData(data[i].contractId,data[i].package)
                   
                    var packageName = packageData.packageName
                    var checkManager = data[i].status.slice().reverse().find(e=> e.value === "Manager Approved")
                    if(checkManager && checkManager.remark){
                        var approvalDate = moment(checkManager.statusAt).format('DD/MM/YYYY')
                    }else{
                        var approvalDate = 'NA'
                    }

                    var checkBookingState = data[i].status.slice().reverse().find(e=> e.value === "Edited")
                    if(checkBookingState){
                        var bookingState = 'Modified'
                    }else{
                        var bookingState = 'New'
                    }
                    var checkPickup = data[i].status.slice().reverse().find(e=> e.value === "Start From Pickup")
                    if(checkPickup){
                      var actualpickupTime = moment(checkPickup.statusAt).format('DD/MM/YYYY')  
                    }else{
                        var actualpickupTime = 'NA'
                    }

                    var checkReachedTime = data[i].status.slice().reverse().find(e=> e.value === "Reached Garage")
                    if(checkReachedTime){
                      var dutyCloseAt = moment(checkReachedTime.statusAt).format('DD/MM/YYYY, HH:mm')  
                    }else{
                        var dutyCloseAt = 'NA'
                    }
                    
                    const pickup = moment(data[i].pickupDate).format('dddd'); // Monday ... Sunday
                    const returnD = moment(data[i].returnDate).format('dddd'); // Monday ... Sunday
                    if(pickup === 'Sunday' || pickup === 'Saturday' || returnD === 'Sunday' || returnD === 'Saturday'){
                        var weekendTravel = 'Yes'
                    }else{
                        var weekendTravel = 'No'
                    }

                    if(invoiceData){
                        var driverAllowanceData = invoiceData.lineItems.slice().reverse().find(e=> e.value === "Driver Allowance")
                    }
                    if(driverAllowanceData){
                        var driverAllowance = driverAllowanceData.amount
                    }else{
                        var driverAllowance = 'NA'
                    }

                    if(invoiceData){
                        var NightChargesData = invoiceData.lineItems.slice().reverse().find(e=> e.value === "Night Charges")
                    }
                    if(NightChargesData){
                        var nightTimeCharge = NightChargesData.amount
                    }else{
                        var nightTimeCharge = 'NA'
                    }

                    if(invoiceData){
                        var extraTimeChargeData = invoiceData.lineItems.slice().reverse().find(e=> e.value === "Extra Hr")
                    }
                    if(extraTimeChargeData){
                        var extraTimeCharge = extraTimeChargeData.amount
                    }else{
                        var extraTimeCharge = 'NA'
                    }
                    

                    finalArray.push({
                        bookingNo:data[i].bookingId,
                        bookingDate:moment(data[i].createdAt).format('DD/MM/YYYY'),
                        employeeId:employeeId,
                        employeeName:employeeName,
                        grade:grade,
                        department:department,
                        vendorCode:vendorCode,
                        vendorName:vendorName,
                        entityName:entityName,
                        region:region,
                        bookerDetails:bookerDetails,
                        approvalDate:approvalDate,
                        bookedFrom:data[i].browser,
                        serviceType:data[i].tripType,
                        packageName:packageName,
                        carCategory:carCategory,
                        carModel:carModel,
                        carNumber:carNumber,
                        driver:driver,
                        driverNumber:driverNumber,
                        pickupDate:moment(data[i].pickupDate).format('DD/MM/YYYY'),
                        pickupDay:moment(data[i].pickupDate).format('dddd'),
                        pickupTime:data[i].pickupTime,
                        pickupCity:data[i].from.city,
                        pickupAddr:data[i].from.address,
                        pickupArea:data[i].from.address1 ? data[i].from.address1 : data[i].from.area,
                        actualpickupTime:actualpickupTime,
                        dropAddress:data[i].to.address,
                        dropArea:data[i].to.address1 ? data[i].to.address1 : data[i].to.area,
                        dropTime:data[i].returnTime,
                        dropDate:moment(data[i].returnDate).format('DD/MM/YYYY'),
                        dropDay:moment(data[i].returnDate).format('dddd'),
                        bookingState:bookingState,
                        tripStatus:data[i].statusValue,
                        weekendTravel:weekendTravel,
                        // garageToPickup:"Garage to Pickup KM",
                        // dropToGarage:"Drop to Garage KM",
                        travelDistance:travelDistance,
                        travelTime:travelTime,
                        ratePerKm:packageData.maxKm,
                        extraCharge:packageData.extraHr,
                        baseFare:packageData.fixCharges,
                        extraKmCharge:invoiceData ? invoiceData.extraKms : 'NA',
                        extraTimeCharge:invoiceData ? invoiceData.extraHrs : 'NA',
                        nightTimeCharge:nightTimeCharge,
                        // driverCharge:"Driver Charge",
                        driverAllowance:driverAllowance,
                        // otherCharges:"Other Charges",
                        // tax:"Tax",
                        totalFare:invoiceData ? invoiceData.totalAmount : 'NA',
                        dutyCloseAt:dutyCloseAt,
                        systemRefInvoiceNo:systemRefInvoiceNo,
                        vendorInvoiceNo:"",
                    })
                }//i
                res.status(200).json(finalArray);
            }else{
                res.status(200).json(data);
            }
        }
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        });
    });
}
exports.employeeReportsfilter = (req,res,next)=>{
    var selector = {}; 
    selector['$and']=[];

    if(req.body.selector.company && req.body.selector.company != ""){
        selector["$and"].push({"corporateId": ObjectId(req.body.selector.company) })
    }else{
        selector["$and"].push({"corporateId": {$ne: ""} })
    }

    if(req.body.selector.stateName){
        selector["$and"].push({"from.state": req.body.selector.stateName })
    }
    if(req.body.selector.city){
        selector["$and"].push({"from.city": req.body.selector.city })
    }
    BookingMaster.aggregate([
        {$match:{'createdAt':{$gte : new Date(req.body.startDate), $lt : new Date(req.body.endDate) }}},
        {$match:selector}
    ])
    .exec()
    .then(data=>{
        processData();
        async function processData() {
            if(data && data.length > 0){
                var finalArray = []
                for(var i=0 ; i<data.length ; i++){
                    var personalData = await getPersonalData(data[i].employeeId)
                    var driverData = await getPersonalData(data[i].allocatedToDriver)
                    var driver = driverData ? driverData.firstName+' '+personalData.lastName : 'NA';
                    var driverNumber = driverData ? driverData.contactNo : 'NA';
                    var employeeId = personalData.employeeId;
                    var grade = personalData.empCategory;
                    var region = personalData.workLocation;
                    var bookingType = personalData.workLocation;
                    var employeeName = personalData.firstName+' '+personalData.lastName;
                    var companyData = await getCompanyData(data[i].corporateId)
                    var userData = await getUserData(data[i].createdBy)
                    var bookerDetails = userData.fullName +' ('+userData.mobile+')'
                    var entityName = companyData.companyName;
                    var vendorData = await getCompanyData(data[i].allocatedToVendor)
                    var vendorCode = vendorData ? vendorData.companyID : 'NA';
                    var vendorName = vendorData ? vendorData.companyName : 'NA';
                    var carData = await getVehicleData(data[i].vehicleID)
                    var carCategory = carData ? carData.category : 'NA';
                    var carModel = carData ? carData.model : "NA";
                    var carNumber = carData ? carData.vehicleNumber : "NA";
                    var department = await getDepartmentData(data[i].departmentId)
                    var invoiceData = await getInvoiceData(data[i].invoiceId)
                    var systemRefInvoiceNo = invoiceData ? invoiceData.invoiceNumber : "NA";
                    var travelDistance = invoiceData ? invoiceData.totalKms : "NA";
                    var hours = invoiceData ? parseInt(invoiceData.totalHrs) : "NA"
                    var travelTime = hours ? hours * 60 : 'NA';
                    var packageData = await getPackageData(data[i].contractId,data[i].package)
                   
                    var packageName = packageData.packageName
                    var checkManager = data[i].status.slice().reverse().find(e=> e.value === "Manager Approved")
                    if(checkManager && checkManager.remark){
                        var approvalDate = moment(checkManager.statusAt).format('DD/MM/YYYY')
                    }else{
                        var approvalDate = 'NA'
                    }

                    var checkBookingState = data[i].status.slice().reverse().find(e=> e.value === "Edited")
                    if(checkBookingState){
                        var bookingState = 'Modified'
                    }else{
                        var bookingState = 'New'
                    }
                    var checkPickup = data[i].status.slice().reverse().find(e=> e.value === "Start From Pickup")
                    if(checkPickup){
                      var actualpickupTime = moment(checkPickup.statusAt).format('DD/MM/YYYY')  
                    }else{
                        var actualpickupTime = 'NA'
                    }

                    var checkReachedTime = data[i].status.slice().reverse().find(e=> e.value === "Reached Garage")
                    if(checkReachedTime){
                      var dutyCloseAt = moment(checkReachedTime.statusAt).format('DD/MM/YYYY, HH:mm')  
                    }else{
                        var dutyCloseAt = 'NA'
                    }
                    
                    const pickup = moment(data[i].pickupDate).format('dddd'); // Monday ... Sunday
                    const returnD = moment(data[i].returnDate).format('dddd'); // Monday ... Sunday
                    if(pickup === 'Sunday' || pickup === 'Saturday' || returnD === 'Sunday' || returnD === 'Saturday'){
                        var weekendTravel = 'Yes'
                    }else{
                        var weekendTravel = 'No'
                    }

                    if(invoiceData){
                        var driverAllowanceData = invoiceData.lineItems.slice().reverse().find(e=> e.value === "Driver Allowance")
                    }
                    if(driverAllowanceData){
                        var driverAllowance = driverAllowanceData.amount
                    }else{
                        var driverAllowance = 'NA'
                    }

                    if(invoiceData){
                        var NightChargesData = invoiceData.lineItems.slice().reverse().find(e=> e.value === "Night Charges")
                    }
                    if(NightChargesData){
                        var nightTimeCharge = NightChargesData.amount
                    }else{
                        var nightTimeCharge = 'NA'
                    }

                    if(invoiceData){
                        var extraTimeChargeData = invoiceData.lineItems.slice().reverse().find(e=> e.value === "Extra Hr")
                    }
                    if(extraTimeChargeData){
                        var extraTimeCharge = extraTimeChargeData.amount
                    }else{
                        var extraTimeCharge = 'NA'
                    }
                    

                    finalArray.push({
                        bookingNo:data[i].bookingId,
                        bookingDate:moment(data[i].createdAt).format('DD/MM/YYYY'),
                        employeeId:employeeId,
                        employeeName:employeeName,
                        grade:grade,
                        department:department,
                        vendorCode:vendorCode,
                        vendorName:vendorName,
                        entityName:entityName,
                        region:region,
                        bookerDetails:bookerDetails,
                        approvalDate:approvalDate,
                        bookedFrom:data[i].browser,
                        serviceType:data[i].tripType,
                        packageName:packageName,
                        carCategory:carCategory,
                        carModel:carModel,
                        carNumber:carNumber,
                        driver:driver,
                        driverNumber:driverNumber,
                        pickupDate:moment(data[i].pickupDate).format('DD/MM/YYYY'),
                        pickupDay:moment(data[i].pickupDate).format('dddd'),
                        pickupTime:data[i].pickupTime,
                        pickupCity:data[i].from.city,
                        pickupAddr:data[i].from.address,
                        pickupArea:data[i].from.address1 ? data[i].from.address1 : data[i].from.area,
                        actualpickupTime:actualpickupTime,
                        dropAddress:data[i].to.address,
                        dropArea:data[i].to.address1 ? data[i].to.address1 : data[i].to.area,
                        dropTime:data[i].returnTime,
                        dropDate:moment(data[i].returnDate).format('DD/MM/YYYY'),
                        dropDay:moment(data[i].returnDate).format('dddd'),
                        bookingState:bookingState,
                        tripStatus:data[i].statusValue,
                        weekendTravel:weekendTravel,
                        // garageToPickup:"Garage to Pickup KM",
                        // dropToGarage:"Drop to Garage KM",
                        travelDistance:travelDistance,
                        travelTime:travelTime,
                        ratePerKm:packageData.maxKm,
                        extraCharge:packageData.extraHr,
                        baseFare:packageData.fixCharges,
                        extraKmCharge:invoiceData ? invoiceData.extraKms : 'NA',
                        extraTimeCharge:invoiceData ? invoiceData.extraHrs : 'NA',
                        nightTimeCharge:nightTimeCharge,
                        // driverCharge:"Driver Charge",
                        driverAllowance:driverAllowance,
                        // otherCharges:"Other Charges",
                        // tax:"Tax",
                        totalFare:invoiceData ? invoiceData.totalAmount : 'NA',
                        dutyCloseAt:dutyCloseAt,
                        systemRefInvoiceNo:systemRefInvoiceNo,
                        vendorInvoiceNo:"",
                    })
                }//i
                res.status(200).json(finalArray);
            }else{
                res.status(200).json(data);
            }
        }
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        });
    });
}


