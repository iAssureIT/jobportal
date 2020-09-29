const  _                = require('underscore');
const mongoose          = require("mongoose");
const FailedRecords     = require('../failedRecords/ModelFailedRecords');
const BookingMaster     = require('./ModelBookingMaster');
const PersonMaster      = require('../personMaster/ModelPersonMaster');
const User              = require('../userManagement/ModelUsers.js');
const EntityMaster      = require('../entityMaster/ModelEntityMaster.js');
const ProjectSetting    = require('../projectSettings/ModelProjectSettings.js');
const CategoryMaster    = require('../categoryMaster/ModelCategoryMaster.js');
const VendorAllocation  = require('../vendorAllocation/ModelVendorAllocation.js');

var request             = require('request-promise');
var ObjectId            = require('mongodb').ObjectID;
var moment              = require('moment');
var schedule            = require('node-schedule');    
const haversine = require('haversine');

const axios = require('axios');
exports.insertBooking = (req,res,next)=>{
    BookingMaster.find({})
    .sort({createdAt: -1})
    .exec()
    .then(data=>{
        if(data && data.length > 0){
          var bookingId = data[0].bookingId + 1;
          var round = 'No'
        }else{
          var bookingId = 1;
          var round = 'Yes'
        }
        const booking = new BookingMaster({
            _id                         : new mongoose.Types.ObjectId(),
            packageTypeId               : req.body.packageTypeId,
            packageId                   : req.body.packageId,
            package                     : req.body.package,
            contractId                  : req.body.contractId,
            bookingId                   : bookingId,
            tripType                    : req.body.tripType,
            pickupFrom                  : req.body.pickupFrom,
            from                        : req.body.from,
            to                          : req.body.to,
            pickupDate                  : req.body.pickupDate,
            pickupTime                  : req.body.pickupTime,
            returnDate                  : req.body.returnDate,
            returnTime                  : req.body.returnTime,   
            vehicleCategoryId           : req.body.vehicleCategoryId,
            vehicleID                   : req.body.vehicleID,
            employeeId                  : req.body.employeeId,
            employeeUserId              : req.body.employeeUserId,
            empId                       : req.body.empId,
            employeeName                : req.body.employeeName,
            departmentId                : req.body.departmentId,
            corporateId                 : req.body.corporateId,
            managerId1                  : req.body.managerId1,
            managerId2                  : req.body.managerId2,
            managerId3                  : req.body.managerId3,
            managerID1                  : req.body.managerID1,
            managerID2                  : req.body.managerID2,
            managerID3                  : req.body.managerID3,
            approver1exist              : req.body.approver1exist,
            approver2exist              : req.body.approver2exist,
            approver3exist              : req.body.approver3exist,
            approvalRequired            : req.body.approvalRequired,
            estimatedCost               : req.body.estimatedCost,
            intermediateStops           : req.body.intermediateStops,
            specialInstruction          : req.body.specialInstruction,
            purposeOfTravel             : req.body.purposeOfTravel,
            purposeOfTravelOther        : req.body.purposeOfTravelOther,
            reasonForSelectingVehicle   : req.body.reasonForSelectingVehicle,
            browser                     : req.body.browser,
            status                      : req.body.status,
            statusValue                 : req.body.statusValue,
            roundAllocated              : round,
            createdBy                   : req.body.createdBy,
            createdAt                   : new Date()
        })
        booking.save()
        .then(data=>{
            res.status(200).json({ created : true, bookingId : data._id,data:data });
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        });
    })
    .catch(err =>{
        res.status(500).json({error:err})
    })  
        
       
};

exports.getAllBookings = (req, res, next)=>{
    BookingMaster.find({})
        .sort({createdAt : -1})
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        });
};

exports.AllocateToVendor = (req,res,next)=>{
    BookingMaster.find({roundAllocated:'Yes', $or: [ { 'from.city':req.params.city }, { 'from.district':req.params.district } ] }).sort({_id:-1}).limit(1)
    .exec()
    .then(data=>{
        console.log('=============AllocateToVendor==================')
        main();
        async function main(){
            if(data && data.length>0){
            
                if(data[0].bookingId == 1 && !data[0].round){
                    console.log('inside if')
                   var allocationData = await getAllocationData(req.params.city,req.params.district,'firstBooking')
                   var status = {
                        value           : "Allocated To Vendor",
                        statusBy        : req.params.user,
                        allocatedToVendor     : allocationData.vendorID,
                        statusAt        : new Date(),
                   }
                   var updateObj ={
                    statusValue:'Allocated To Vendor',
                    allocatedToVendor:allocationData.vendorID,
                    vendorID:allocationData.ID,                                                           
                    round:'R1',
                    roundAllocated:'Yes',
                    RAB:1,    
                    TAB:1    
                   }
                   var updateStatus = await updateStatusForAllocation(req.params.bookingID,status,updateObj)
                   res.status(200).json(allocationData.vendorID)
                }else{
                    console.log('<===second round===>')
                    var maxRound = data[0].round;
                    var roundAllocated = data[0].RAB;
                    var bookingAllocated = data[0].TAB;
                    if(roundAllocated === 10){
                        console.log('inside if')
                        var matches = maxRound.match(/(\d+)/); 
                        if(matches){
                            var currInt = matches[0]
                            var nextInt = parseInt(currInt)+1
                            var allocationData = await getAllocationData(req.params.city,req.params.district,'firstBooking')
                            var status = {
                                            value           : "Allocated To Vendor",
                                            statusBy        : req.params.user,
                                            allocatedToVendor     : allocationData.vendorID,
                                            statusAt        : new Date(),
                            }
                            var updateObj ={
                                statusValue:'Allocated To Vendor',
                                allocatedToVendor:allocationData.vendorID,
                                vendorID:allocationData.ID,                                                           
                                round:'R'+ nextInt,
                                roundAllocated:'Yes',
                                RAB:1,    
                                TAB:1    
                            }
                            var updateStatus = await updateStatusForAllocation(req.params.bookingID,status,updateObj)
                            res.status(200).json(allocationData.vendorID)
                        }
                    }else{
                        console.log('inside second round else')
                        var allocationData = await getAllocationData(req.params.city,req.params.district,data[0].vendorID,bookingAllocated)
                        console.log('allocationData==>',allocationData)
                        var totalBookingAllocatedCount = await getTotalBookingAllocatedCount(req.params.city,req.params.district,maxRound,roundAllocated,allocationData.ID)
                       console.log('============>totalBookingAllocatedCount<================')
                       console.log('totalBookingAllocatedCount: ',totalBookingAllocatedCount)
                        var VendorData = await getVendorData(req.params.city,req.params.district,allocationData.ID)
                        console.log('VendorData===>',VendorData)
                        console.log(parseInt(totalBookingAllocatedCount) +'<'+ parseInt(VendorData.total))
                        console.log((parseInt(VendorData.total) > parseInt(totalBookingAllocatedCount) ))
                        if(parseInt(VendorData.total) > parseInt(totalBookingAllocatedCount) ){
                            console.log('1')
                            var TAB = parseInt(totalBookingAllocatedCount) + 1 
                            var status = {
                                        value           : "Allocated To Vendor",
                                        statusBy        : req.params.user,
                                        allocatedToVendor     : allocationData.vendorID,
                                        statusAt        : new Date(),
                           }
                           var updateObj ={
                            statusValue:'Allocated To Vendor',
                            allocatedToVendor:allocationData.vendorID,
                            vendorID:allocationData.ID,                                                           
                            round:maxRound,
                            roundAllocated:'Yes',
                            RAB:parseInt(roundAllocated) + 1,    
                            TAB:TAB  
                           }
                           var updateStatus = await updateStatusForAllocation(req.params.bookingID,status,updateObj)
                            res.status(200).json(allocationData.vendorID) 
                        }else{
                            console.log('2')
                            var nextAllocationData = await getAllocationData(req.params.city,req.params.district,allocationData.ID)
                            console.log('///////////////////////////////')
                            console.log('nextAllocationData:',nextAllocationData)
                            var nextTotalBookingAllocatedCount = await getTotalBookingAllocatedCount(req.params.city,req.params.district,maxRound,roundAllocated,nextAllocationData.ID)

                            var secondVendorData = await getVendorData(req.params.city,req.params.district,nextAllocationData.ID)
                            if(parseInt(secondVendorData.total) > parseInt(nextTotalBookingAllocatedCount) ){
                                var status = {
                                            value           : "Allocated To Vendor",
                                            statusBy        : req.params.user,
                                            allocatedToVendor     : nextAllocationData.vendorID,
                                            statusAt        : new Date(),
                               }
                               var updateObj ={
                                statusValue:'Allocated To Vendor',
                                allocatedToVendor:nextAllocationData.vendorID,
                                vendorID:nextAllocationData.ID,                                                           
                                round:maxRound,
                                roundAllocated:'Yes',
                                RAB:parseInt(roundAllocated) + 1,    
                                TAB:parseInt(nextTotalBookingAllocatedCount) + 1   
                               }
                               var updateStatus = await updateStatusForAllocation(req.params.bookingID,status,updateObj)
                                res.status(200).json(nextAllocationData.vendorID)
                            }else{
                                var thirdAllocationData = await getAllocationData(req.params.city,req.params.district,nextAllocationData.ID)
                                var thirdTotalBookingAllocatedCount = await getTotalBookingAllocatedCount(req.params.city,req.params.district,maxRound,roundAllocated,thirdAllocationData.ID)
                                var status = {
                                            value           : "Allocated To Vendor",
                                            statusBy        : req.params.user,
                                            allocatedToVendor     : thirdAllocationData.vendorID,
                                            statusAt        : new Date(),
                               }
                               var updateObj ={
                                statusValue:'Allocated To Vendor',
                                allocatedToVendor:thirdAllocationData.vendorID,
                                vendorID:thirdAllocationData.ID,                                                           
                                round:maxRound,
                                roundAllocated:'Yes',
                                RAB:parseInt(roundAllocated) + 1,    
                                TAB:parseInt(thirdTotalBookingAllocatedCount) + 1   
                               }
                               var updateStatus = await updateStatusForAllocation(req.params.bookingID,status,updateObj)
                                res.status(200).json(thirdAllocationData.vendorID)
                            }

                            
                        }
                        
                    }
                }
            }else{
                console.log('inside else')
                var allocationData = await getAllocationData(req.params.city,req.params.district,'firstBooking')
                if(allocationData && allocationData.vendorID){
                   var status = {
                        value           : "Allocated To Vendor",
                        statusBy        : req.params.user,
                        allocatedToVendor     : allocationData.vendorID,
                        statusAt        : new Date(),
                   }
                   var updateObj ={
                    statusValue:'Allocated To Vendor',
                    allocatedToVendor:allocationData.vendorID,
                    vendorID:allocationData.ID,                                                           
                    round:'R1',
                    roundAllocated:'Yes',
                    RAB:1,    
                    TAB:1    
                   }
                   var updateStatus = await updateStatusForAllocation(req.params.bookingID,status,updateObj)
                   res.status(200).json(allocationData.vendorID)
                }else{
                    res.status(200).json("")
                }
            } 
        }
        
    })
    .catch(err=>{
        res.status(500).json({ error: err });
    })
};

function updateStatusForAllocation(id,status,updateObj){
    return new Promise((resolve,reject)=>{
        BookingMaster.updateOne(
                { _id:id },  
                {
                    $push:  {  
                                "status"      : status,
                            },
                    $set:  updateObj,
                }
            )
            .exec()
            .then(data=>{
                if(data.nModified == 1){
                    BookingMaster.updateOne(
                    { _id:id},
                    {
                        $push:  { 'updateLog' : [{  updatedAt      : new Date(),
                                                    updatedBy      : updateObj.statusBy
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

function getAllocationData(city,district,vendor){
    console.log('%%%%%city,district,vendor%%%',city,district,vendor)
    return new Promise((resolve,reject)=>{
        VendorAllocation.findOne({ $or: [ { city:city }, { city:district } ] })
        .exec()
        .then(data=>{
            if(data){
                if(vendor == 'firstBooking'){
                    resolve(data.vendor[0])
                }else{
                    if(data.vendor && data.vendor.length > 0){
                        
                        var totLen = data.vendor.length;
                        var Data = data.vendor.filter((elem)=>{return elem.ID === vendor})
                        var index = data.vendor.findIndex(x => x.ID === vendor);
                        console.log(totLen +'>'+ index)
                        if(totLen > index){
                            index = parseInt(index) + 1;
                            if(parseInt(index) < parseInt(totLen)){
                                console.log('Allocation inside if')
                                var vendorData = data.vendor[index];
                                resolve(vendorData) 
                                
                            }else{
                                console.log('Allocation inside else')
                                resolve(data.vendor[0])
                            }
                            
                        }
                    }
                    
                }
            }else{
                var result = {}
                resolve(result) 
            }
            
        })
        .catch(err=>{
            reject(err)
        })
    })
}

function getVendorData(city,district,vendor){
    return new Promise((resolve,reject)=>{
        VendorAllocation.findOne({ $or: [ { city:city }, { city:district } ] })
        .exec()
        .then(data=>{
            if(data){
                
                if(data.vendor && data.vendor.length > 0){
                    
                    var totLen = data.vendor.length;
                    var Data = data.vendor.filter((elem)=>{return elem.ID === vendor})
                    if(Data && Data.length > 0){
                        resolve(Data[0])
                    }else{
                        var result = []
                        resolve(result) 
                    }
                }
                    
            }else{
                var result = []
                resolve(result) 
            }
            
        })
        .catch(err=>{
            reject(err)
        })
    })
}

function getTotalBookingAllocatedCount(city,district,maxRound,roundAllocated,vendorID){
    console.log('DATA=>',city,district,maxRound,roundAllocated,vendorID)
    return new Promise((resolve,reject)=>{
        BookingMaster.find({roundAllocated:'Yes',vendorID:vendorID,round:maxRound, $or: [ { 'from.city':city }, { 'from.district':district } ] }).sort({_id:-1}).limit(1)
        .exec()
        .then(data=>{
            if(data && data.length > 0){
                resolve(data[0].TAB)
            }else{
                resolve(0) 
            }
            
        })
        .catch(err=>{
            reject(err)
        })
    })
}

exports.getAllApprovalReqBookings = (req, res, next)=>{
    BookingMaster.aggregate([{ $match :{$or:
          [
            {"managerId1":ObjectId(req.params.managerId)},
            {"managerId2":ObjectId(req.params.managerId)},
            {"managerId3":ObjectId(req.params.managerId)}
          ]
        }},
    {$lookup:
        {
            from:"personmasters",
            localField: "employeeId",
            foreignField: "_id",
            as:"person"
         }
    },
    {$lookup:
        {
            from:"categorymasters",
            localField: "vehicleCategoryId",
            foreignField: "_id",
            as:"category"
         }
    },
    { $match :{"approvalRequired" : "Yes"}},
    { $match :{"statusValue" :{$in:["New","Manager Approved","Manager Rejected","Cancelled By Vendor","Cancelled By User","Cancelled"]}}}
    ])

    // BookingMaster.find({"approvalRequired" : "Yes","statusValue" :{$in:["New","Approved","Rejected","Cancel By Vendor","Cancel By User"]},"managerId":req.params.managerId})
        .sort({createdAt : -1})
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        });
};


exports.getAdminfilterBookings = (req,res,next)=>{
    var selector = {}; 
    selector['$and']=[];

    if(req.body.selector.company_name && req.body.selector.company_name != "All"){
        selector["$and"].push({"corporateId": ObjectId(req.body.selector.company_name) })
    }else{
        selector["$and"].push({"corporateId": {$ne: ""} })
    }

    if(req.body.selector.originatingCity){
        selector["$and"].push({"from.city": req.body.selector.originatingCity })
    }
    if(req.body.selector.destinationCity){
        selector["$and"].push({"to.city": req.body.selector.destinationCity })
    }
    if(req.body.selector.vendor_name && req.body.selector.vendor_name != "All"){
        selector["$and"].push({"status.allocatedToVendor": ObjectId(req.body.selector.vendor_name) })
    }else{
        selector["$and"].push({"status.allocatedToVendor": {$ne: ""} })
    }
    if(req.body.selector.date){
        selector["$and"].push({"pickupDate": {$gte : new Date(req.body.selector.from), $lt : new Date(req.body.selector.to) } })
    }

    if(req.body.tab==="Cancelled"){
        var statusVar = {status: { $elemMatch: { value : { $in:req.body.status} } } }
    }else{
        var statusVar = {'statusValue' : { $in:req.body.status}}
    }

    BookingMaster.aggregate([
        {$match:{'pickupDate':{$gte : new Date(req.body.startDate), $lt : new Date(req.body.endDate) }}},
        // {$match:{'statusValue' : { $in:req.body.status}}},
        {$match:statusVar},
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
            localField: "employeeId",
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
        {$lookup:
        {
            from:"personmasters",
            localField: "managerId1",
            foreignField: "_id",
            as:"manager1"
        }
         },
        {$lookup:
        {
            from:"personmasters",
            localField: "managerId2",
            foreignField: "_id",
            as:"manager2"
         }
        },
        {$lookup:
        {
            from:"personmasters",
            localField: "managerId3",
            foreignField: "_id",
            as:"manager3"
         }
        },
        { "$lookup": {
        "from": "entitymasters",
        localField:"allocatedToVendor",
        foreignField:"_id",
        "as": "vendor"
        }}
    ])
    .sort({pickupDate : 1})
    .exec()
    .then(data=>{
        res.status(200).json(data);
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        });
    });
};

exports.getcorporatefilterBookings = (req,res,next)=>{
    var selector = {}; 
    selector['$and']=[];

    
    if(req.body.selector.originatingCity){
        selector["$and"].push({"from.city": req.body.selector.originatingCity })
    }
    if(req.body.selector.destinationCity){
        selector["$and"].push({"to.city": req.body.selector.destinationCity })
    }
    if(req.body.selector.vendor_name && req.body.selector.vendor_name != "All"){
        selector["$and"].push({"status.allocatedToVendor": ObjectId(req.body.selector.vendor_name) })
    }else{
        selector["$and"].push({"status.allocatedToVendor": {$ne: ""} })
    }
    if(req.body.selector.date){
        selector["$and"].push({"pickupDate": {$gte : new Date(req.body.selector.from), $lt : new Date(req.body.selector.to) } })
    }

    if(req.body.tab==="Cancelled"){
        var statusVar = {status: { $elemMatch: { value : { $in:req.body.status} } } }
    }else{
        var statusVar = {'statusValue' : { $in:req.body.status}}
    }
    BookingMaster.aggregate([
        {$match:{'pickupDate':{$gte : new Date(req.body.startDate), $lt : new Date(req.body.endDate) }}},
        // {$match:{'statusValue' : { $in:req.body.status}}},
        {$match:{'corporateId':ObjectId(req.body.company_id)}},
        {$match:statusVar},
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
            localField: "employeeId",
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
        {$lookup:
        {
            from:"personmasters",
            localField: "managerId1",
            foreignField: "_id",
            as:"manager1"
        }
         },
        {$lookup:
        {
            from:"personmasters",
            localField: "managerId2",
            foreignField: "_id",
            as:"manager2"
         }
        },
        {$lookup:
        {
            from:"personmasters",
            localField: "managerId3",
            foreignField: "_id",
            as:"manager3"
         }
        },
        { "$lookup": {
        "from": "entitymasters",
        localField:"allocatedToVendor",
        foreignField:"_id",
        "as": "vendor"
        }}
    ])
    .sort({pickupDate : 1})
    .exec()
    .then(data=>{
        res.status(200).json(data);
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        });
    });
};

exports.getAdminSearchBookings = (req,res,next)=>{
        BookingMaster.aggregate([
            {$match:
            {
                $or:
                    [
                        { "bookingId": parseInt(req.body.str) },
                        { "employeeName": { $regex: req.body.str, $options: "i" } },
                    ]
            }},
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
            localField: "employeeId",
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
        {$lookup:
        {
            from:"personmasters",
            localField: "managerId1",
            foreignField: "_id",
            as:"manager1"
        }
         },
        {$lookup:
        {
            from:"personmasters",
            localField: "managerId2",
            foreignField: "_id",
            as:"manager2"
         }
        },
        {$lookup:
        {
            from:"personmasters",
            localField: "managerId3",
            foreignField: "_id",
            as:"manager3"
         }
        },
        { "$lookup": {
        "from": "entitymasters",
        localField:"allocatedToVendor",
        foreignField:"_id",
        "as": "vendor"
        }}
    ])
    .sort({pickupDate : 1})
    .exec()
    .then(data=>{
        res.status(200).json(data);
    })
    .catch(err =>{
        res.status(500).json({ error: err });
    });
       
};

exports.getcorporateSearchBookings = (req,res,next)=>{
  
    BookingMaster.aggregate([
    {$match:{'corporateId':ObjectId(req.body.company_id)}},
    {$match:
    {
        $or:
            [
                { "bookingId": parseInt(req.body.str) },
                { "employeeName": { $regex: req.body.str, $options: "i" } },
            ]
    }},
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
        localField: "employeeId",
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
    {$lookup:
    {
        from:"personmasters",
        localField: "managerId1",
        foreignField: "_id",
        as:"manager1"
    }
     },
    {$lookup:
    {
        from:"personmasters",
        localField: "managerId2",
        foreignField: "_id",
        as:"manager2"
     }
    },
    {$lookup:
    {
        from:"personmasters",
        localField: "managerId3",
        foreignField: "_id",
        as:"manager3"
     }
    },
    { "$lookup": {
    "from": "entitymasters",
    localField:"allocatedToVendor",
    foreignField:"_id",
    "as": "vendor"
    }}
])
.sort({pickupDate : 1})
.exec()
.then(data=>{
    res.status(200).json(data);
})
.catch(err =>{
    res.status(500).json({ error: err });
});
        
};


exports.getAdminBookingList = (req,res,next)=>{
    // console.log('=======>',req.body.tab)
    // if(req.body.tab === "Cancelled"){
    //     var matchVar = {$in:['Cancelled By Vendor','Cancelled By User','Manager Rejected','Edited Manager Rejected','Cancelled']}
    // }else{
    //     var matchVar = {$ne: ""} 
    // }
    if(req.body.tab==="Cancelled"){
        var selector = {status: { $elemMatch: { value : { $in:req.body.status} } } }
    }else{
        var selector = {'statusValue' : { $in:req.body.status}}
    }
    BookingMaster.aggregate([
        {$match:{'pickupDate':{$gte : new Date(req.body.startDate), $lt : new Date(req.body.endDate) }}},
        {$match:selector},
        // {$match:{'status.value':matchVar}},
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
            localField: "employeeId",
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
        {$lookup:
        {
            from:"personmasters",
            localField: "managerId1",
            foreignField: "_id",
            as:"manager1"
        }
         },
        {$lookup:
        {
            from:"personmasters",
            localField: "managerId2",
            foreignField: "_id",
            as:"manager2"
         }
        },
        {$lookup:
        {
            from:"personmasters",
            localField: "managerId3",
            foreignField: "_id",
            as:"manager3"
         }
        },
        { "$lookup": {
        "from": "entitymasters",
        localField:"allocatedToVendor",
        foreignField:"_id",
        "as": "vendor"
        }},
        // {$lookup:
        //     {
        //         from: "personmasters", localField:"status.allocatedToDriver"
        //     },
        // },
        // {$sort:{
        //     "status.statusAt","-1"
        // }}
    ])
    .sort({pickupDate : 1})
    .exec()
    .then(data=>{
        res.status(200).json(data);
    })
    .catch(err =>{
        res.status(500).json({ error: err });
    });
},

exports.getcorporateBookingList = (req,res,next)=>{
    if(req.body.tab==="Cancelled"){
        var selector = {status: { $elemMatch: { value : { $in:req.body.status} } } }
    }else{
        var selector = {'statusValue' : { $in:req.body.status}}
    }
    BookingMaster.aggregate([
        {$match:{'pickupDate':{$gte : new Date(req.body.startDate), $lt : new Date(req.body.endDate) }}},
        // {$match:{'statusValue' : { $in:req.body.status}}},
        {$match:selector},
        {$match:{'corporateId':ObjectId(req.body.company_id)}},
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
            localField: "employeeId",
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
        {$lookup:
        {
            from:"personmasters",
            localField: "managerId1",
            foreignField: "_id",
            as:"manager1"
        }
         },
        {$lookup:
        {
            from:"personmasters",
            localField: "managerId2",
            foreignField: "_id",
            as:"manager2"
         }
        },
        {$lookup:
        {
            from:"personmasters",
            localField: "managerId3",
            foreignField: "_id",
            as:"manager3"
         }
        },
        { "$lookup": {
        "from": "entitymasters",
        localField:"allocatedToVendor",
        foreignField:"_id",
        "as": "vendor"
        }}
    ])
    .exec()
    .then(data=>{
        res.status(200).json(data);
    })
    .catch(err =>{
        res.status(500).json({ error: err });
    });
},

exports.getStatistics = (req,res,next)=>{
   if(req.body.status == "" || req.body.status == "All"){
    BookingMaster.aggregate([
        {$match:{'createdAt':{$gte : new Date(req.body.start), $lt : new Date(req.body.end) }}},
        {$count:"count"}
    ])
    .exec()
    .then(data=>{
        res.status(200).json(data);
    })
    .catch(err =>{
        res.status(500).json({ error: err });
    });
   }else{
    BookingMaster.aggregate([
        {$match:{'createdAt':{$gte : new Date(req.body.start), $lt : new Date(req.body.end) }}},
        {$match:{"statusValue" :req.body.status}},
        {$count:"count"}
      ])
    .exec()
    .then(data=>{
        res.status(200).json(data);
    })
    .catch(err =>{
        res.status(500).json({ error: err });
    });
   } 
    
}

exports.getAllBookingsForManager = (req, res, next)=>{
     BookingMaster.aggregate([
        { $match :{$or:
          [
            {"managerId1":ObjectId(req.body.managerId)},
            {"managerId2":ObjectId(req.body.managerId)},
            {"managerId3":ObjectId(req.body.managerId)},
            {"managerID1":req.body.managerID},
            {"managerID2":req.body.managerID},
            {"managerID3":req.body.managerID},
          ]
        }},
        {$match:{"corporateId":ObjectId(req.body.corporate_id)}},
    {$lookup:
        {
            from:"personmasters",
            localField: "employeeId",
            foreignField: "_id",
            as:"person"
         }
    },
    {$lookup:
        {
            from:"categorymasters",
            localField: "vehicleCategoryId",
            foreignField: "_id",
            as:"category"
         }
    },
    {$lookup:
        {
            from:"entitymasters",
            localField: "corporateId",
            foreignField: "_id",
            as:"company"
         }
        },
    { $match :{"approvalRequired" : "Yes"}},
    { $match :{"statusValue" :{$in:req.body.status}}},
    // { $match :{"status.value" :'PR Admin Edited'}},
    // { $match :{"status.value" :{$nin:['PR Manager Approved','PR Manager Rejected']}}},
    ])
    .exec()
    .then(data=>{
        res.status(200).json(data);
    })
    .catch(err =>{
        res.status(500).json({ error: err });
    });
};

exports.getAllApprovedBookings = (req, res, next)=>{
     BookingMaster.aggregate([
        { $match :{$or:
          [
            {"managerId1":ObjectId(req.params.managerId)},
            {"managerId2":ObjectId(req.params.managerId)},
            {"managerId3":ObjectId(req.params.managerId)}
          ]
        }},
    {$lookup:
        {
            from:"personmasters",
            localField: "employeeId",
            foreignField: "_id",
            as:"person"
         }
    },
    {$lookup:
        {
            from:"categorymasters",
            localField: "vehicleCategoryId",
            foreignField: "_id",
            as:"category"
         }
    },
    {$lookup:
        {
            from:"entitymasters",
            localField: "corporateId",
            foreignField: "_id",
            as:"company"
         }
        },
    { $match :{"approvalRequired" : "Yes"}},
    { $match :{$or:[{"status.value" :"Manager Approved"},{"status.value" :"Edited Manager Approved"},{"status.value" :"PR Manager Approved"}]}},
    {$sort: { "status.statusAt": -1 }},
    ])
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        });
};

exports.getAllRejectedBookings = (req, res, next)=>{
     BookingMaster.aggregate([
        { $match :{$or:
          [
            {"managerId1":ObjectId(req.params.managerId)},
            {"managerId2":ObjectId(req.params.managerId)},
            {"managerId3":ObjectId(req.params.managerId)}
          ]
        }},
    {$lookup:
        {
            from:"personmasters",
            localField: "employeeId",
            foreignField: "_id",
            as:"person"
         }
    },
    {$lookup:
        {
            from:"categorymasters",
            localField: "vehicleCategoryId",
            foreignField: "_id",
            as:"category"
         }
    },
    {$lookup:
        {
            from:"entitymasters",
            localField: "corporateId",
            foreignField: "_id",
            as:"company"
         }
        },
    { $match :{"approvalRequired" : "Yes"}},
    { $match :{$or:[{"status.value" :"Manager Rejected"},{"status.value" :"Edited Manager Rejected"},{"status.value" :"PR Manager Rejected"}]}},
    {$sort: { "status.statusAt": -1 }},
    ])
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        });
};

exports.getAllBookingsForAdmin = (req, res, next)=>{
     BookingMaster.aggregate([
    {$lookup:
        {
            from:"personmasters",
            localField: "employeeId",
            foreignField: "_id",
            as:"person"
         }
    },
    {$lookup:
        {
            from:"categorymasters",
            localField: "vehicleCategoryId",
            foreignField: "_id",
            as:"category"
         }
    },
    // { $match :{"approvalRequired" : "Yes"}},
    ])
    // BookingMaster.find({"approvalRequired" : "Yes","statusValue" :req.body.status,"managerId":req.body.managerId})
        .sort({createdAt : -1})
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        });
};
exports.getAllBookingsForAdmin_ByStatus = (req, res, next)=>{
     BookingMaster.aggregate([
    {$lookup:
        {
            from:"personmasters",
            localField: "employeeId",
            foreignField: "_id",
            as:"person"
         }
    },
    {$lookup:
        {
            from:"categorymasters",
            localField: "vehicleCategoryId",
            foreignField: "_id",
            as:"category"
         }
    },
    { $match :{"statusValue" :req.params.status}},
    // { $match :{"approvalRequired" : "Yes"}},
    ])
    // BookingMaster.find({"approvalRequired" : "Yes","statusValue" :req.body.status,"managerId":req.body.managerId})
        .sort({createdAt : -1})
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        });
};

exports.countBookings = (req,res,next)=>{
    // BookingMaster.find({createdBy: req.params.createdBy}).count()
    BookingMaster.find({ $or: [ { "createdBy": req.params.createdBy }, { "employeeUserId": req.params.createdBy } ] }).count()
        .exec()
        .then(data=>{
            res.status(200).json({ count : data } );
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        });
};

exports.countAllBookings = (req,res,next)=>{
    BookingMaster.find({}).count()
        .exec()
        .then(data=>{
            res.status(200).json({ count : data } );
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        });
};


exports.countDateRangeBookings = (req,res,next)=>{
    BookingMaster.find({'createdAt':{$gte : new Date(req.params.startDate), $lt : new Date(req.params.endDate) }}).count()
        .exec()
        .then(data=>{
            res.status(200).json({count:data});
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        });
};

function getempType(empId){
   return new Promise(function(resolve,reject){
        PersonMaster.findOne({"_id" : empId},{"type":1})
             .exec()
             .then(type=>{
                resolve(type);
             })
            .catch(err =>{
                reject(err)
            });
    });
}

exports.TravelCount = (req,res,next)=>{
    BookingMaster.find({'corporateId':req.params.company,'createdAt':{$gte : new Date(req.params.startDate), $lt : new Date(req.params.endDate) }})
    .exec()
    .then(data=>{
        main();
        async function main(){
            if(data && data.length > 0){
                var count = 0;
                for(var i=0 ; i<data.length ; i++){
                   var empDetail = await getempType(data[i].employeeId)
                    if(req.params.type === empDetail.type){
                        count = parseInt(count) + 1
                    }
                    
                }//i
                res.status(200).json({count:count});
            }//data
        }
       
        
    })
    .catch(err =>{
        res.status(500).json({ error: err });
    });
}

exports.countCorporateDateRangeBookings = (req,res,next)=>{
    BookingMaster.find({'corporateId':req.params.company,'createdAt':{$gte : new Date(req.params.startDate), $lt : new Date(req.params.endDate) }}).count()
        .exec()
        .then(data=>{
            res.status(200).json({count:data});
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        });
};

exports.countUserDateRangeBookings = (req,res,next)=>{
    BookingMaster.find({$or: [ { "createdBy": req.params.user }, { "employeeUserId": req.params.user } ] ,'corporateId':req.params.company,'createdAt':{$gte : new Date(req.params.startDate), $lt : new Date(req.params.endDate) }}).count()
        .exec()
        .then(data=>{
            res.status(200).json({count:data});
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        });
};

exports.countCorporateApprovalDateRangeBookings = (req,res,next)=>{
    BookingMaster.find({'corporateId':req.params.company,'employeeUserId':req.params.user,'status.value':req.params.status,'createdAt':{$gte : new Date(req.params.startDate), $lt : new Date(req.params.endDate) }}).count()
        .exec()
        .then(data=>{
            res.status(200).json({count:data});
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        });
};

exports.getCompanyMonthwiseBooking = (req,res,next)=>{
    BookingMaster.aggregate([
        {$match:{'corporateId':ObjectId(req.params.company)}},
        {$match:{'createdAt':{$gte : new Date(req.params.startDate), $lt : new Date(req.params.endDate) }}},
        {$group: {
            _id: {$month: "$createdAt"}, 
            totalCost: {$sum: "$estimatedCost"}, 
            numberofbookings: {$sum: 1} 
        }}
    ])
    .exec()
    .then(bookingDetails=>{
        var returnData = []

        var totalCost = "" ;
        var totalBooking = "" ;
        var dataArray = {};
        var month = "";
        var allMonths = [{"name":"Jan"}, 
                         {"name":"Feb"},
                         {"name":"Mar"},
                         {"name":"Apr"},
                         {"name":"May"},
                         {"name":"Jun"},
                         {"name":"Jul"},
                         {"name":"Aug"},
                         {"name":"Sep"},
                         {"name":"Oct"},
                         {"name":"Nov"},
                         {"name":"Dec"}];
        for(var i=0 ; i<bookingDetails.length ; i++){
            totalCost = bookingDetails[i].totalCost;
            month = moment(bookingDetails[i]._id, 'M').format('MMM');
            totalBooking = bookingDetails[i].numberofbookings;
            dataArray={
                name : month,
                totalBooking : totalBooking,
                totalCost : totalCost
            }
            returnData.push(dataArray)
            allMonths.map(function(data,index){
              if(data.name == month){
                  allMonths[index].totalBooking = totalBooking;
                  allMonths[index].totalCost = totalCost
              }
            })
        }//i

        res.status(200).json(allMonths);
    })
    .catch(err =>{
        res.status(500).json({ error: err });
    });
}

exports.getUserMonthwiseBooking = (req,res,next)=>{
    BookingMaster.aggregate([
        {$match:{'corporateId':ObjectId(req.params.company)}},
        {$match:{'employeeUserId':ObjectId(req.params.user)}},
        {$match:{'createdAt':{$gte : new Date(req.params.startDate), $lt : new Date(req.params.endDate) }}},
        {$group: {
            _id: {$month: "$createdAt"}, 
            totalCost: {$sum: "$estimatedCost"}, 
            numberofbookings: {$sum: 1} 
        }}
    ])
    .exec()
    .then(bookingDetails=>{
        var returnData = []

        var totalCost = "" ;
        var totalBooking = "" ;
        var dataArray = {};
        var month = "";
        var allMonths = [{"name":"Jan"}, 
                         {"name":"Feb"},
                         {"name":"Mar"},
                         {"name":"Apr"},
                         {"name":"May"},
                         {"name":"Jun"},
                         {"name":"Jul"},
                         {"name":"Aug"},
                         {"name":"Sep"},
                         {"name":"Oct"},
                         {"name":"Nov"},
                         {"name":"Dec"}];
        for(var i=0 ; i<bookingDetails.length ; i++){
            totalCost = bookingDetails[i].totalCost;
            month = moment(bookingDetails[i]._id, 'M').format('MMM');
            totalBooking = bookingDetails[i].numberofbookings;
            dataArray={
                name : month,
                totalBooking : totalBooking,
                totalCost : totalCost
            }
            returnData.push(dataArray)
            allMonths.map(function(data,index){
              if(data.name == month){
                  allMonths[index].totalBooking = totalBooking;
                  allMonths[index].totalCost = totalCost
              }
            })
        }//i

        res.status(200).json(allMonths);
    })
    .catch(err =>{
        res.status(500).json({ error: err });
    });
}

function getPersonData(empId){
   return new Promise(function(resolve,reject){
        PersonMaster.findOne({"_id" : empId},{"type":1,"firstName":1,"lastName":1,"gender":1,"contactNo":1,"email":1,"employeeId":1})
         .populate('designationId')
         .populate('departmentId')
         .exec()
         .then(data=>{
            var personDetails = {
                type:data.type,
                name:data.firstName+" "+data.lastName,
                gender:data.gender,
                contact:data.contactNo,
                email:data.email,
                employeeId:data.employeeId,
                destination:data.designationId.designation,
                department:data.departmentId.department
            }
            resolve(personDetails);
         })
        .catch(err =>{
            reject(err)
        });
    });
}

exports.EmployeeTravelled_Company = (req,res,next)=> {

    var startDate = moment().startOf('day'); // set to 12:00 am today
    var endDate = moment().endOf('day'); // set to 23:59 pm today
    BookingMaster.find({'corporateId':req.params.company,'pickupDate':{$gte : new Date(startDate), $lt : new Date(endDate) }})
    .populate("vehicleID")
    .populate("corporateId")
    .exec()
    .then(data=>{
        main();
        async function main(){
            try{
                if(data && data.length > 0){
                    var returnData = [];
                    for(var i=0 ; i<data.length ; i++){
                        var personData = await getPersonData(data[i].employeeId)
                        if(personData.gender === 'Female'){
                            var driverInfo = data[i].status.filter((elem)=>{return elem.value==="Trip Allocated To Driver"});
                            var driverDetails = {
                                firstName   : "",
                                middleName  : "",
                                lastName    : "",
                                contactNo   : "",
                            };
                            if( driverInfo && driverInfo.length > 0){
                                driverDetails = await getDriverDetails(driverInfo[driverInfo.length-1].allocatedToDriver);
                            }
                            returnData.push({
                                name:personData.name,
                                contact:personData.contact,
                                email:personData.email,
                                department:personData.department,
                                destination:personData.designation,
                                _id:data[i]._id,
                                corporateId:data[i].corporateId._id,
                                companyName:data[i].corporateId.companyName,
                                companyID:data[i].corporateId.companyID,
                                bookingId:data[i].bookingId,
                                from:data[i].from,
                                pickupDate:data[i].pickupDate,
                                pickupTime:data[i].pickupTime,
                                to:data[i].to,
                                statusValue:data[i].statusValue,
                                employeeId:data[i].employeeId,
                                returnDate:data[i].returnDate,
                                returnTime:data[i].returnTime,
                                createdAt:data[i].createdAt,
                                driverDetails:driverDetails,
                                vehicleNumber:data[i].vehicleID ? data[i].vehicleID.vehicleNumber:"",
                                vehiclecolor:data[i].vehicleID ? data[i].vehicleID.vehiclecolor:"",
                                vehicleBrand:data[i].vehicleID ? data[i].vehicleID.brand:"",
                                vehicleCategory:data[i].vehicleID ? data[i].vehicleID.category:""
                            })
                        }

                    }//i
                    res.status(200).json(returnData);
                }
            }
            catch(err) {
                console.log(err)
            }
        }
        
    })
    .catch(err =>{
        res.status(500).json({ error: err });
    });
}

function getCategoryBookingData(startDate,endDate,vehicle_id){
   return new Promise(function(resolve,reject){
        BookingMaster.find({'createdAt':{$gte : new Date(startDate), $lt : new Date(endDate) },vehicleCategoryId:vehicle_id})
             .populate('vehicleCategoryId')
             .exec()
             .then(bookingDetails=>{
                var totalCost = 0 ;
                var dataArray = {};
                var category = ""
                for(var i=0 ; i<bookingDetails.length ; i++){
                    totalCost += parseInt(bookingDetails[i].estimatedCost);
                    category = bookingDetails[i].vehicleCategoryId.category;
                }//i
                dataArray={
                    name : category,
                    totalBooking : bookingDetails.length,
                    totalCost : totalCost
                }
                resolve(dataArray);
             })
            .catch(err =>{
                reject(err)
            });
    });
}

function getCategoryBookingDataForVendor(company,startDate,endDate,vehicle_id){
   return new Promise(function(resolve,reject){
        BookingMaster.find({allocatedToVendor : company,'createdAt':{$gte : new Date(startDate), $lt : new Date(endDate) },vehicleCategoryId:vehicle_id})
             .populate('vehicleCategoryId')
             .exec()
             .then(bookingDetails=>{
                var totalCost = 0 ;
                var dataArray = {};
                var category = ""
                for(var i=0 ; i<bookingDetails.length ; i++){
                    totalCost += parseInt(bookingDetails[i].estimatedCost);
                    category = bookingDetails[i].vehicleCategoryId.category;
                }//i
                dataArray={
                    name : category,
                    totalBooking : bookingDetails.length,
                    totalCost : totalCost
                }
                resolve(dataArray);
             })
            .catch(err =>{
                reject(err)
            });
    });
}

function getcorporateBookingData(startDate,endDate,corporate){
   return new Promise(function(resolve,reject){
        BookingMaster.find({'createdAt':{$gte : new Date(startDate), $lt : new Date(endDate) },corporateId:corporate})
             .populate('corporateId')
             .exec()
             .then(bookingDetails=>{
                var totalCost = 0 ;
                var dataArray = {};
                var corporate = ""
                for(var i=0 ; i<bookingDetails.length ; i++){
                    totalCost += parseInt(bookingDetails[i].estimatedCost);
                    corporate = bookingDetails[i].corporateId.companyName;
                }//i
                dataArray={
                    name : corporate,
                    totalBooking : bookingDetails.length,
                    totalCost : totalCost
                }
                resolve(dataArray);
             })
            .catch(err =>{
                reject(err)
            });
    });
}

function getcorporateBookingDataForVendor(company,startDate,endDate,corporate){
   return new Promise(function(resolve,reject){
        BookingMaster.find({allocatedToVendor : company,'createdAt':{$gte : new Date(startDate), $lt : new Date(endDate) },corporateId:corporate})
             .populate('corporateId')
             .exec()
             .then(bookingDetails=>{
                var totalCost = 0 ;
                var dataArray = {};
                var corporate = ""
                for(var i=0 ; i<bookingDetails.length ; i++){
                    totalCost += parseInt(bookingDetails[i].estimatedCost);
                    corporate = bookingDetails[i].corporateId.companyName;
                }//i
                dataArray={
                    name : corporate,
                    totalBooking : bookingDetails.length,
                    totalCost : totalCost
                }
                resolve(dataArray);
             })
            .catch(err =>{
                reject(err)
            });
    });
}

function getmonthlyBookingData(selectedDate){
    var startDate = moment(selectedDate).startOf('day'); // set to 12:00 am today
    var endDate = moment(selectedDate).endOf('day'); // set to 23:59 pm today
   return new Promise(function(resolve,reject){
        BookingMaster.find({'createdAt':{$gte : new Date(startDate), $lt : new Date(endDate) }})
             .exec()
             .then(bookingDetails=>{
                var totalCost = 0 ;
                var dataArray = {};
                for(var i=0 ; i<bookingDetails.length ; i++){
                    totalCost += parseInt(bookingDetails[i].estimatedCost);
                }//i
                dataArray={
                    name : selectedDate,
                    totalBooking : bookingDetails.length,
                    totalCost : totalCost
                }
                resolve(dataArray);
             })
            .catch(err =>{
                reject(err)
            });
    });
}

exports.CompanyMonthlyBooking = (req,res,next) => {
    BookingMaster.find({'corporateId':req.params.company,'createdAt':{$gte : new Date(req.params.startDate), $lt : new Date(req.params.endDate) }})
    .exec()
    .then(data=>{
        main();
        async function main(){
            try{
               var date       = [];
               var returnData     = [];
               for (var i = 0; i < data.length; i++) {
                    date.push(moment(data[i].createdAt).format('YYYY-MM-DD'));
                }// i
                var uniqueDate  = _.uniq(date);
                if(uniqueDate){
                    for(k=0;k<uniqueDate.length;k++){
                        var totalBooking = 0 ;
                        var totalCost = 0 ;
                        var BookingData = await getmonthlyBookingData(uniqueDate[k])
                        returnData.push(BookingData)
                    }// k
                }//if uniquecategory_id
                res.status(200).json(returnData);
            }
            catch(err) {
                console.log(err)
            }
        }

    })
    .catch(err =>{
        res.status(500).json({ error: err });
    });
}

exports.UserMonthlyBooking = (req,res,next) => {
    BookingMaster.find({'corporateId':req.params.company,'employeeUserId':req.params.user,'createdAt':{$gte : new Date(req.params.startDate), $lt : new Date(req.params.endDate) }})
    .exec()
    .then(data=>{
        main();
        async function main(){
            try{
               var date       = [];
               var returnData     = [];
               for (var i = 0; i < data.length; i++) {
                    date.push(moment(data[i].createdAt).format('YYYY-MM-DD'));
                }// i
                var uniqueDate  = _.uniq(date);
                if(uniqueDate){
                    for(k=0;k<uniqueDate.length;k++){
                        var totalBooking = 0 ;
                        var totalCost = 0 ;
                        var BookingData = await getmonthlyBookingData(uniqueDate[k])
                        returnData.push(BookingData)
                    }// k
                }//if uniquecategory_id
                res.status(200).json(returnData);
            }
            catch(err) {
                console.log(err)
            }
        }

    })
    .catch(err =>{
        res.status(500).json({ error: err });
    });
}

exports.categorywiseBooking = (req,res,next) => {
    BookingMaster.find({'createdAt':{$gte : new Date(req.params.startDate), $lt : new Date(req.params.endDate) }})
    .exec()
    .then(data=>{
        main();
        async function main(){
            try{
               var category       = [];
               var returnData     = [];
               for (var i = 0; i < data.length; i++) {
                    category.push((data[i].vehicleCategoryId).toString());
                }// i
                var uniquecategory_id  = _.uniq(category);
                if(uniquecategory_id){
                    for(k=0;k<uniquecategory_id.length;k++){
                        var totalBooking = 0 ;
                        var totalCost = 0 ;
                        var BookingData = await getCategoryBookingData(req.params.startDate,req.params.endDate,uniquecategory_id[k])
                        returnData.push(BookingData)
                    }// k
                }//if uniquecategory_id
                res.status(200).json(returnData);
            }
            catch(err) {
                console.log(err)
            }
        }

    })
    .catch(err =>{
        res.status(500).json({ error: err });
    });
}

exports.categorywiseBooking_vendor = (req,res,next) => {
    BookingMaster.find({allocatedToVendor : req.params.company , 'createdAt':{$gte : new Date(req.params.startDate), $lt : new Date(req.params.endDate) }})
    .exec()
    .then(data=>{
        main();
        async function main(){
            try{
               var category       = [];
               var returnData     = [];
               for (var i = 0; i < data.length; i++) {
                    category.push((data[i].vehicleCategoryId).toString());
                }// i
                var uniquecategory_id  = _.uniq(category);
                if(uniquecategory_id){
                    for(k=0;k<uniquecategory_id.length;k++){
                        var totalBooking = 0 ;
                        var totalCost = 0 ;
                        var BookingData = await getCategoryBookingDataForVendor(req.params.company,req.params.startDate,req.params.endDate,uniquecategory_id[k])
                        returnData.push(BookingData)
                    }// k
                }//if uniquecategory_id
                res.status(200).json(returnData);
            }
            catch(err) {
                console.log(err)
            }
        }

    })
    .catch(err =>{
        res.status(500).json({ error: err });
    });
}

exports.corporatewiseBooking = (req,res,next)=>{
    BookingMaster.find({'createdAt':{$gte : new Date(req.params.startDate), $lt : new Date(req.params.endDate) }})
    .exec()
    .then(data=>{
        main();
        async function main(){
            try{
               var corporate       = [];
               var returnData     = [];
               for (var i = 0; i < data.length; i++) {
                    corporate.push((data[i].corporateId).toString());
                }// i
                var uniquecorporate_id  = _.uniq(corporate);
                if(uniquecorporate_id){
                    for(k=0;k<uniquecorporate_id.length;k++){
                        var totalBooking = 0 ;
                        var totalCost = 0 ;
                        var BookingData = await getcorporateBookingData(req.params.startDate,req.params.endDate,uniquecorporate_id[k])
                        returnData.push(BookingData)
                    }// k
                }//if uniquecategory_id
                res.status(200).json(returnData);
            }
            catch(err) {
                console.log(err)
            }
        }

    })
    .catch(err =>{
        res.status(500).json({ error: err });
    });
}

exports.corporatewiseBooking_vendor = (req,res,next)=>{
    BookingMaster.find({allocatedToVendor : req.params.company , 'createdAt':{$gte : new Date(req.params.startDate), $lt : new Date(req.params.endDate) }})
    .exec()
    .then(data=>{
        main();
        async function main(){
            try{
               var corporate       = [];
               var returnData     = [];
               for (var i = 0; i < data.length; i++) {
                    corporate.push((data[i].corporateId).toString());
                }// i
                var uniquecorporate_id  = _.uniq(corporate);
                if(uniquecorporate_id){
                    for(k=0;k<uniquecorporate_id.length;k++){
                        var totalBooking = 0 ;
                        var totalCost = 0 ;
                        var BookingData = await getcorporateBookingDataForVendor(req.params.company,req.params.startDate,req.params.endDate,uniquecorporate_id[k])
                        returnData.push(BookingData)
                    }// k
                }//if uniquecategory_id
                res.status(200).json(returnData);
            }
            catch(err) {
                console.log(err)
            }
        }

    })
    .catch(err =>{
        res.status(500).json({ error: err });
    });
}

function getBookingCountByStatus(company,status){
    var startDate = moment().startOf('day'); // set to 12:00 am today
    var endDate = moment().endOf('day'); // set to 23:59 pm today
    var statusVar = ['Manager Rejected','Cancelled By User','Cancelled By Vendor','Vendor Rejected','Driver Rejected','Cancelled']

    return new Promise(function(resolve,reject){
        BookingMaster.find(
            {
                allocatedToVendor:company,
                statusValue:{$nin:statusVar},
                $or:[
                    {pickupDate:{$gte : new Date(startDate), $lt : new Date(endDate)}},
                    {returnDate:{$gte : new Date(startDate), $lt : new Date(endDate)}},   
                    ]
            }
        )
        .then(booking=>{
            if(booking){
                var count = booking.length;
            }else{
                var count = 0
            }
            resolve(count)
        }) 
        .catch(err =>{
            reject(err)
        });
    });     
}

exports.getPendingTrip = (req,res,next)=>{
    var startDate = moment().startOf('day'); // set to 12:00 am today
    var endDate = moment().endOf('day'); // set to 23:59 pm today
    if(req.params.status == 'start'){
        var status = ['New','Manager Approved','Allocated To Vendor','Trip Allocated To Driver','Driver Accepted','Started From Garage']
    }else if(req.params.status == 'end'){
        var status = ['New','Manager Approved','Allocated To Vendor','Trip Allocated To Driver','Driver Accepted','Started From Garage','Reached Pickup Location','Start From Pickup','Intermediate Stop']
    }else{
        var status = ['New','Manager Approved','Allocated To Vendor','Trip Allocated To Driver','Driver Accepted','Started From Garage','Reached Pickup Location','Start From Pickup','Intermediate Stop','Reached Destination', 'Reached Drop Location','Reached Garage','Expense Submitted']
    }
    BookingMaster.find(
        {
            allocatedToVendor:req.params.company,
            statusValue:{$in:status},
            $or:[
                {pickupDate:{$gte : new Date(startDate), $lt : new Date(endDate)}},
                {returnDate:{$gte : new Date(startDate), $lt : new Date(endDate)}},   
                ]
        }
    )
    .then(booking=>{
        main();
        async function main(){
            try{
               var returnData     = [];
               var totalAvailable       = 0;
                if(booking){
                    var count = booking.length;
                }else{
                    var count = 0
                }
                var total = await getBookingCountByStatus(req.params.company)
                returnData.push({'value':count,'total':total})
               res.status(200).json(returnData);
            }
            catch(err) {
                console.log(err)
            }
        }
        
    }) 
    .catch(err =>{
        reject(err)
    });
}

function getDriverAllocatedBookingCount(company,driver){
    var startDate = moment().startOf('day'); // set to 12:00 am today
    var endDate = moment().endOf('day'); // set to 23:59 pm today
    return new Promise(function(resolve,reject){
        BookingMaster.find(
            {
                allocatedToVendor:company,
                allocatedToDriver:driver,
                statusValue:{$in:['Trip Allocated To Driver','Driver Accepted','Started From Garage','Reached Pickup Location','Start From Pickup','Intermediate Stop','Reached Destination', 'Reached Drop Location','Reached Garage','Expense Submitted']},
                $or:[
                    {pickupDate:{$gte : new Date(startDate), $lt : new Date(endDate)}},
                    {returnDate:{$gte : new Date(startDate), $lt : new Date(endDate)}},   
                    ]
            }
        )
        .then(booking=>{
            if(booking){
                var count = booking.length;
            }else{
                var count = 0
            }
            resolve(count)
        }) 
        .catch(err =>{
            reject(err)
        });
    });     
}

function getAllBookingOfTheDay(company){
    var startDate = moment().startOf('day'); // set to 12:00 am today
    var endDate = moment().endOf('day'); // set to 23:59 pm today
    var status = ['Manager Rejected','Cancelled By User','Cancelled By Vendor','Vendor Rejected','Driver Rejected','Cancelled']
    return new Promise(function(resolve,reject){
        BookingMaster.find(
            {
                allocatedToVendor:company,
                statusValue:{$nin:status},
                pickupDate:{$gte : new Date(startDate), $lt : new Date(endDate)}
            }
        )
        .then(booking=>{
            if(booking){
                var count = booking.length;
            }else{
                var count = 0
            }
            resolve(count)
        }) 
        .catch(err =>{
            reject(err)
        });
    });     
}

exports.getCurrentTripEvent = (req,res,next)=>{
    var startDate = moment().startOf('day'); // set to 12:00 am today
    var endDate = moment().endOf('day'); // set to 23:59 pm today
    if(req.params.status == 'arrived'){
        var status = ['New','Manager Approved','Allocated To Vendor','Trip Allocated To Driver','Driver Accepted','Started From Garage']
    }else{
        var status = ['New','Manager Approved','Allocated To Vendor','Trip Allocated To Driver','Driver Accepted','Started From Garage','Reached Pickup Location','Start From Pickup']
    }
    BookingMaster.find(
        {
            allocatedToVendor:req.params.company,
            statusValue:{$in:status},
            pickupDate:{$gte : new Date(startDate), $lt : new Date(endDate)}
        }
    )
    .then(booking=>{
        main();
        async function main(){
            try{
                var returnData     = [];
                var totalAvailable       = 0;
                if(booking && booking.length > 0){
                    for (var i = 0; i < booking.length; i++) {
                        var mPickupDate = moment(moment(booking[i].pickupDate).format('YYYY-MM-DD') + " " + booking[i].pickupTime);
                        var isafter = moment().isAfter(mPickupDate);
                        if(isafter){
                            totalAvailable++
                        }
                    }//i

                }
                var total = await getAllBookingOfTheDay(req.params.company)
                returnData.push({'value':totalAvailable,'total':total})
                res.status(200).json(returnData);
            }
            catch(err) {
                console.log(err)
            }
        }
    }) 
    .catch(err =>{
        res.status(500).json({ error: err });
    });
}

exports.getDriverUnassigned = (req,res,next)=>{
    PersonMaster.find({"type":"driver","company_Id":req.params.company,"status":"Active"})
    .exec()
    .then(data=>{
        main();
        async function main(){
            try{
               var returnData     = [];
               var totalAvailable       = 0;
               if(data && data.length > 0){
                   for (var i = 0; i < data.length; i++) {
                        var allocatedDriverCount = await getDriverAllocatedBookingCount(req.params.company,data[i]._id)
                        var available = parseInt(data.length) - parseInt(allocatedDriverCount);
                    }// i
                    totalAvailable = totalAvailable + parseInt(available)
                    returnData.push({'value':totalAvailable,'total':data.length})
                }
                res.status(200).json(returnData);
            }
            catch(err) {
                console.log(err)
            }
        }
        
    })
    .catch(err =>{
        res.status(500).json({ error: err });
    });
    
}

exports.monthwiseBooking = (req,res,next)=>{
    
    BookingMaster.aggregate([
        {$match:{'createdAt':{$gte : new Date(req.params.startDate), $lt : new Date(req.params.endDate) }}},
        {$group: {
            _id: {$month: "$createdAt"}, 
            totalCost: {$sum: "$estimatedCost"}, 
            numberofbookings: {$sum: 1} 
        }}
    ])
    .exec()
    .then(bookingDetails=>{
        var returnData = []

        var totalCost = "" ;
        var totalBooking = "" ;
        var dataArray = {};
        var month = "";
        var allMonths = [{"name":"Jan"}, 
                         {"name":"Feb"},
                         {"name":"Mar"},
                         {"name":"Apr"},
                         {"name":"May"},
                         {"name":"Jun"},
                         {"name":"Jul"},
                         {"name":"Aug"},
                         {"name":"Sep"},
                         {"name":"Oct"},
                         {"name":"Nov"},
                         {"name":"Dec"}];
        for(var i=0 ; i<bookingDetails.length ; i++){
            totalCost = bookingDetails[i].totalCost;
            month = moment(bookingDetails[i]._id, 'M').format('MMM');
            totalBooking = bookingDetails[i].numberofbookings;
            dataArray={
                name : month,
                totalBooking : totalBooking,
                totalCost : totalCost
            }
            returnData.push(dataArray)
            allMonths.map(function(data,index){
              if(data.name == month){
                  allMonths[index].totalBooking = totalBooking;
                  allMonths[index].totalCost = totalCost
              }
            });   
        }//i

        res.status(200).json(allMonths);
    })
    .catch(err =>{
        res.status(500).json({ error: err });
    });
}

exports.pendingStatusCount = (req,res,next)=>{
    var startDate = moment().startOf('day'); // set to 12:00 am today
    var endDate = moment().endOf('day'); // set to 23:59 pm today
    
    BookingMaster.find(
        {
            corporateId:req.params.company,
            approvalRequired : "Yes",
            statusValue:req.params.status,
            $or:
              [
                {"managerId1":ObjectId(req.params.manager)},
                {"managerId2":ObjectId(req.params.manager)},
                {"managerId3":ObjectId(req.params.manager)}
              ],
            $or:[
                {pickupDate:{$gte : new Date(startDate), $lt : new Date(endDate)}},
                {createdAt:{$gte : new Date(startDate), $lt : new Date(endDate)}},   
                ]
        }
    )
    .then(booking=>{
        if(booking){
            var count = booking.length;
        }else{
            var count = 0
        }
        res.status(200).json({count:count});
    }) 
    .catch(err =>{
        res.status(500).json({ error: err });
    });
}
exports.EmployeePendingApprovalCount = (req,res,next)=>{
    var startDate = moment().startOf('day'); // set to 12:00 am today
    var endDate = moment().endOf('day'); // set to 23:59 pm today
    
    BookingMaster.find(
        {
            corporateId:req.params.company,
            approvalRequired : "Yes",
            statusValue:req.params.status,
            employeeUserId:req.params.user,
            $or:[
                {pickupDate:{$gte : new Date(startDate), $lt : new Date(endDate)}},
                {createdAt:{$gte : new Date(startDate), $lt : new Date(endDate)}},   
                ]
        }
    )
    .then(booking=>{
        if(booking){
            var count = booking.length;
        }else{
            var count = 0
        }
        res.status(200).json({count:count});
    }) 
    .catch(err =>{
        res.status(500).json({ error: err });
    });
}

exports.EmployeeUpcomingTripCount = (req,res,next)=>{
    var startDate = moment().startOf('day'); // set to 12:00 am today
    var endDate = moment().endOf('day'); // set to 23:59 pm today
    BookingMaster.find(
        {
            corporateId:req.params.company,
            employeeUserId:req.params.user,
            $or:[
                {pickupDate:{$gte : new Date(startDate)}},
                {returnDate:{$gte : new Date(startDate)}},   
                ]
        }
    )
    .then(booking=>{
        if(booking){
            var count = booking.length;
        }else{
            var count = 0
        }
        res.status(200).json({count:count});
    }) 
    .catch(err =>{
        res.status(500).json({ error: err });
    });
}

exports.latestAllocatedToVendorBookings = (req,res,next)=>{
    BookingMaster.find({'statusValue':'Allocated To Vendor'})
        .limit(5)
        .sort({createdAt : -1})
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        });
}

exports.latestReadyToBillBookings = (req,res,next)=>{
    BookingMaster.find({'statusValue':'Ready To Bill'})
        .limit(5)
        .sort({createdAt : -1})
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        });
}

exports.EmployeeRecentBookings = (req,res,next)=>{
    BookingMaster.find({corporateId:req.params.company,$or: [ { "createdBy": req.params.user }, { "employeeUserId": req.params.user } ]})
        .limit(5)
        .sort({createdAt : -1})
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        });
}

exports.RejectedByDriverBookings = (req,res,next)=>{
     BookingMaster.find({allocatedToVendor : req.params.company,statusValue:"Driver Rejected",'createdAt':{$gte : new Date(req.params.startDate), $lt : new Date(req.params.endDate) }})
    .limit(5)
    .sort({createdAt : -1})
    .exec()
    .then(booking=>{
        // if(booking && booking.length > 0){
        //     var returnDate = [];
        //     for(var i=0 ; i< booking.length ; i++){
        //         if(booking[i].status){
        //             var checkDriver = booking[i].status.slice().reverse().find(e=> e.value === "Driver Rejected");
        //             if(checkDriver){
        //                 returnDate.push(booking[i])
        //             }
        //         }
        //     }//i
        // }//if
        res.status(200).json(booking);
    })
    .catch(err =>{
        res.status(500).json({ error: err });
    });
}

exports.getBookings_User = (req,res,next)=>{
    // BookingMaster.find({createdBy: req.params.userID})
    // BookingMaster.find({ $or: [ { "createdBy": req.params.userID }, { "employeeUserId": req.params.userID } ] })
     BookingMaster.aggregate([
        {$match:{ $or: [ { "createdBy": ObjectId(req.params.userID) }, { "employeeUserId": ObjectId(req.params.userID) } ] }},
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
            localField: "employeeId",
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
        {$lookup:
        {
            from:"personmasters",
            localField: "managerId1",
            foreignField: "_id",
            as:"manager1"
        }
         },
        {$lookup:
        {
            from:"personmasters",
            localField: "managerId2",
            foreignField: "_id",
            as:"manager2"
         }
        },
        {$lookup:
        {
            from:"personmasters",
            localField: "managerId3",
            foreignField: "_id",
            as:"manager3"
         }
        },
        { "$lookup": {
        "from": "entitymasters",
        localField:"allocatedToVendor",
        foreignField:"_id",
        "as": "vendor"
        }}
    ])
    .sort({createdAt : -1})
    .exec()
    .then(data=>{
        res.status(200).json(data);
    })
    .catch(err =>{
        res.status(500).json({ error: err });
    });
};

exports.getBookings_User_status = (req,res,next)=>{
    BookingMaster.find({ $or: [ { "createdBy": req.body.userId }, { "employeeUserId": req.body.userId } ] ,statusValue: req.body.status})
        .sort({createdAt : -1})
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        });
};
exports.getBookings_By_status = (req,res,next)=>{
    BookingMaster.find({statusValue: req.params.status})
        .sort({createdAt : -1})
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        });
};

exports.countApprovalReqBookings = (req,res,next)=>{
    BookingMaster.aggregate([
    {$match:
        {$or:
          [
            {"managerId1":ObjectId(req.params.managerId)},
            {"managerId2":ObjectId(req.params.managerId)},
            {"managerId3":ObjectId(req.params.managerId)}
          ]
        }
     },
     {$match:{"approvalRequired" : "Yes"}},
     {$match:{"statusValue" : {$in:["New","Manager Approved","Manager Rejected","Cancelled By Vendor","Cancelled By User","Cancelled"]}}},
     {$count:"count"}
    ])
    // BookingMaster.find({"approvalRequired" : "Yes","statusValue" : {$in:["New","Manager Approved","Manager Rejected","Cancel By Vendor","Cancel By User"]},"managerId1":req.params.managerId}).count()
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        });
};

exports.fetchBookings = (req,res,next)=>{
    BookingMaster.aggregate([{
        $lookup:
            {
               from: "packagetypemasters",
               localField: "packageTypeId",
               foreignField: "_id",
               as: "packageType"
            }
        },
        {
        $lookup:
            {
               from: "packagemasters",
               localField: "packageId",
               foreignField: "_id",
               as: "package"
            }
        },
        { "$unwind": "$packageType" },{$addFields: { packageType : "$packageType.packageType"} },
        { "$unwind": "$package" },{$addFields: { packageName : "$package.packageName"} },
        { "$match" : req.body.selector }
        ])
       
        .sort({createdAt : -1})
        .then(data=>{
            res.status(200).json( data );
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        });
};



exports.getBookings = (req,res,next)=>{
    var selector = {};
    if(req.params.status === "Trip Allocated To Driver"){
        selector = {
            $and: [
                    {
                        allocatedToDriver : req.params.personId
                    }, 
                    {
                        statusValue:req.params.status
                    },
                ]
            }
    }else if(req.params.status==="Running"){
        selector = {
            $and: [
                    {
                        allocatedToDriver : req.params.personId
                    },
                    {
                        statusValue:{$in:["Driver Accepted","Started From Garage","Reached Pickup Location","Start OTP Verified","Start From Pickup","Intermediate Stop","Reached Destination","End OTP Verified","Reached Drop Location","Reached Garage","Expense Submitted"]}
                    }
                ]
        } 
    }else if(req.params.status==="Trip Completed" || req.params.status==="Driver Rejected"){
        selector = {status: { $elemMatch: { allocatedToDriver: req.params.personId, value : req.params.status } } } 
    }else if(req.params.status==="Cancelled"){
        selector = {status: { $elemMatch: { allocatedToDriver: req.params.personId,  value: {$in:["Driver Changed By Vendor","Cancelled By Vendor","Rejected By Manager"]}}}}
    }
    BookingMaster.find(selector,{bookingId:1,tripType:1,from:1,to:1,pickupDate:1,pickupTime:1,returnDate:1,returnTime:1,statusValue:1,createdAt:1})
    .exec()
    .then(data=>{
        res.status(200).json(data);
    })
    .catch(err =>{
        console.log("error",err);
        res.status(500).json({ error: err });
    });
};

exports.getBookingByID = (req,res,next)=>{
    BookingMaster.find({_id: req.params.bookingID})
        .exec()
        .then(data=>{
            res.status(200).json({ data : data } );
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        });
};

exports.matchBookingStatus = (req,res,next)=>{
   
    BookingMaster.aggregate([
        {$match:{"_id":ObjectId(req.params.bookingID)}},
        // {$match:{$or:[{"statusValue":"Manager Rejected"},{"statusValue":"Manager Approved"},{"statusValue":"Edited Manager Rejected"},{"statusValue":"Edited Manager Approved"}]}},
        {$project:{
           status: {$filter:{
               input:'$status',
               as: 'status',
               cond: { $or:[
                   {$eq: ['$$status.value','Manager Approved']},
                   {$eq: ['$$status.value','Manager Rejected']},
                   {$eq: ['$$status.value','Edited Manager Approved']},
                   {$eq: ['$$status.value','Edited Manager Rejected']}
                ]
           }
       },
     }}
     },
     {$unwind : '$status'},
     {$sort: { "status.statusAt": -1 }},
     ])
    // BookingMaster.find({_id: req.params.bookingID, status:{$elemMatch:{value:'Manager Approved'}}})
    .exec()
        .then(data=>{
            res.status(200).json({ data : data } );
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        });
},

exports.getManagerBookingStatus = (req,res,next)=>{
   
    BookingMaster.findOne({"_id":req.params.bookingID})
    .exec()
    .then(bookingList=>{
        main();
        async function main(){
            var k = 0 ;
            var returnData = [];
            if(bookingList.status && bookingList.status.length > 0){
                for(k = 0 ; k < bookingList.status.length ; k++){
                    var elem = bookingList.status[k];
                    var managerDetails = {
                        firstName   : "",
                        middleName  : "",
                        lastName    : "",
                        contactNo   : "",
                    };
                    if(elem.value==="Manager Rejected" || elem.value === 'Manager Approved' || elem.value === 'Edited Manager Rejected' || elem.value==='Edited Manager Approved'){
                        managerDetails = await getManagerDetails(elem.statusBy);
                        returnData.push({
                            manager : managerDetails,
                            date:elem.statusAt,
                            remark:elem.remark,
                            status:elem.value
                        })
                    }
                    
                }
            }
            res.status(200).json(returnData);
        }
    })
    .catch(err =>{
        res.status(500).json({ error: err });
    });
}

exports.matchCRBookingStatus = (req,res,next)=>{
   
    BookingMaster.aggregate([
        {$match:{"_id":ObjectId(req.params.bookingID)}},
        {$project:{
           status: {$filter:{
               input:'$status',
               as: 'status',
               cond: { $or:[
                   {$eq: ['$$status.value','Change Request']},
                ]
           }
       },
     }}
     },
     {$unwind : '$status'},
     {$sort: { "status.statusAt": -1 }},
     ])
    // BookingMaster.find({_id: req.params.bookingID, status:{$elemMatch:{value:'Manager Approved'}}})
    .exec()
        .then(data=>{
            res.status(200).json({ data : data } );
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        });
},

exports.getAllCRBookingsForManager = (req, res, next)=>{
     BookingMaster.aggregate([
        { $match :{$or:
          [
            {"managerId1":ObjectId(req.body.managerId)},
            {"managerId2":ObjectId(req.body.managerId)},
            {"managerId3":ObjectId(req.body.managerId)},
          ]
        }},
        {$match:{"corporateId":ObjectId(req.body.corporate_id)}},
    {$lookup:
        {
            from:"personmasters",
            localField: "employeeId",
            foreignField: "_id",
            as:"person"
         }
    },
    {$lookup:
        {
            from:"categorymasters",
            localField: "vehicleCategoryId",
            foreignField: "_id",
            as:"category"
         }
    },
    { $match :{"approvalRequired" : "Yes"}},
    { $match :{"status.value" :'PR Admin Edited'}},
    { $match :{"status.value" :{$nin:['PR Manager Approved','PR Manager Rejected']}}},
    ])
    .exec()
    .then(data=>{
        res.status(200).json(data);
    })
    .catch(err =>{
        res.status(500).json({ error: err });
    });
};

exports.getAllCRBookingsForAdmin = (req, res, next)=>{
     BookingMaster.aggregate([
        
        {$match:{"corporateId":ObjectId(req.body.corporate_id)}},
        {$lookup:
            {
                from:"personmasters",
                localField: "employeeId",
                foreignField: "_id",
                as:"person"
             }
        },
        {$lookup:
            {
                from:"categorymasters",
                localField: "vehicleCategoryId",
                foreignField: "_id",
                as:"category"
             }
        },
        { $match :{"approvalRequired" : "No"}},
        { $match :{"status.value" :'PR Admin Edited'}},
        { $match :{"status.value" :{$nin:['PR Manager Approved','PR Manager Rejected']}}},
    ])
    .exec()
    .then(data=>{
        res.status(200).json(data);
    })
    .catch(err =>{
        res.status(500).json({ error: err });
    });
};

exports.getBookingByID_empDetails = (req,res,next)=>{
    BookingMaster.aggregate([
        {"$match":{_id: ObjectId(req.params.bookingID)}},
        {
            $lookup:
            {
               from: "personmasters",
               localField: "employeeId",
               foreignField: "_id",
               as: "user"
            }
        }
        ])
        .exec()
        .then(data=>{
            res.status(200).json({ data : data } );
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        });
};

exports.singleBookingForDriver = (req, res, next)=>{
    BookingMaster.aggregate([
        { "$match" : {_id: ObjectId(req.params.bookingID)} },
        {
            $lookup:
            {
               from: "personmasters",
               localField: "employeeId",
               foreignField: "_id",
               as: "employee"
            }
        },
        {
            $lookup:
            {
               from: "entitymasters",
               localField: "corporateId",
               foreignField: "_id",
               as: "company"
            }
        },
        {
            $lookup:
            {
               from: "vehiclemasters",
               localField: "vehicleID",
               foreignField: "_id",
               as: "vehicle"
            }
        },
        { "$unwind": "$employee" },
        { "$unwind": "$company" },
        { "$unwind": "$vehicle" },
        {
            $project:
            {
                "_id"                 : 1,
                "bookingId"           : 1,
                "status"              : 1,
                "statusValue"         : 1,
                "tripType"            : 1,
                "from"                : 1,
                "to"                  : 1,
                "pickupDate"          : 1,
                "pickupTime"          : 1,
                "returnDate"          : 1,
                "returnTime"          : 1,
                "intermediateStops"   : 1,
                "specialInstruction"  : 1,
                "tripExpenses"        : 1,
                "employeeUserId"      : 1,
                "corporateId"         : 1,
                "ratingToPassenger"   : 1,
                "firstName"           : "$employee.firstName",
                "middleName"          : "$employee.middleName",
                "lastName"            : "$employee.lastName",
                "employeeID"          : "$employee.employeeId",
                "employeeMobile"      : "$employee.contactNo",
                "vehicleCategory"     : "$vehicle.category",
                "vehicleBrand"        : "$vehicle.brand",
                "vehicleModel"        : "$vehicle.model",
                "vehicleNumber"       : "$vehicle.vehicleNumber",
                "vehicleColor"        : "$vehicle.vehiclecolor",
                "vehicleImage"        : "$vehicle.vehicleImage",
                "companyName"         : "$corporate.companyName"
            }
        },
        ])
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        });
};


exports.updateBooking = (req, res, next)=>{
    BookingMaster.updateOne(
            { _id:req.body.bookingID },  
            {
                $set:   {   "packageTypeId"           : req.body.packageTypeId,
                            "packageId"               : req.body.packageId,
                            "package"                 : req.body.package,
                            "contractId"              : req.body.contractId,
                            "tripType"                : req.body.tripType,
                            "pickupFrom"              : req.body.pickupFrom,
                            "from"                    : req.body.from,
                            "to"                      : req.body.to,
                            "pickupDate"              : req.body.pickupDate,
                            "pickupTime"              : req.body.pickupTime,
                            "returnDate"              : req.body.returnDate,
                            "returnTime"              : req.body.returnTime,   
                            "vehicleCategoryId"       : req.body.vehicleCategoryId,
                            "employeeId"              : req.body.employeeId,
                            "employeeUserId"          : req.body.employeeUserId,
                            "empId"                   : req.body.empId,
                            "employeeName"            : req.body.employeeName,
                            "departmentId"            : req.body.departmentId,
                            "corporateId"             : req.body.corporateId,
                            "managerId1"               : req.body.managerId1,
                            "managerId2"               : req.body.managerId2,
                            "managerId3"               : req.body.managerId3,
                            "managerID1"                  : req.body.managerID1,
                            "managerID2"                  : req.body.managerID2,
                            "managerID3"                  : req.body.managerID3,
                            "approver1exist"               : req.body.approver1exist,
                            "approver2exist"               : req.body.approver2exist,
                            "approver3exist"               : req.body.approver3exist,
                            "approvalRequired"              : req.body.approvalRequired,
                            "intermediateStops"       : req.body.intermediateStops,
                            "vehicleID"                   : req.body.vehicleID,
                            "estimatedCost"               : req.body.estimatedCost,
                            "specialInstruction"          : req.body.specialInstruction,
                            "purposeOfTravel"             : req.body.purposeOfTravel,
                            "purposeOfTravelOther"             : req.body.purposeOfTravelOther,
                            "reasonForSelectingVehicle"   : req.body.reasonForSelectingVehicle,
                            "browser"   : req.body.browser,
                            "statusValue"                 : req.body.statusValue,
                        }
            }
        )
        .exec()
        .then(data=>{
            if(data.nModified == 1){
                BookingMaster.updateOne(
                { _id:req.body.bookingID},
                {
                    $push:  { 'updateLog' : [{  updatedAt      : new Date(),
                                                updatedBy      : req.body.updatedBy
                                            }],
                             'status': req.body.status,
                            }
                } )
                .exec()
                .then(data=>{
                    res.status(200).json({ updated : true });
                })
            }else{
                res.status(200).json({ updated : false });
            }
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({ error: err });
        });
};

exports.deleteBooking = (req, res, next)=>{
    BookingMaster.deleteOne({_id: req.params.bookingID})
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
exports.filterBookings = (req,res,next)=>{
    var selector = {}; 
    selector['$and']=[];

    if (req.body.userId){
    selector["$and"].push({"createdBy": ObjectId(req.body.userId) })
    selector["$and"].push({"employeeUserId": ObjectId(req.body.userId) })
    }
    if (req.body.filteredMonth && req.body.filteredMonth != 'All') {
        selector["$and"].push({'createdAt':{$gte : new Date(req.body.monthStart), $lt : new Date(req.body.monthEnd) }})
    }
    if (req.body.filteredYear && req.body.filteredYear != 'All') {
        selector["$and"].push({'createdAt':{$gte : new Date(req.body.yearStart), $lt : new Date(req.body.yearEnd) }})
    }
    if (req.body.filteredStatus && req.body.filteredStatus != 'All') {
        selector["$and"].push({ statusValue : req.body.filteredStatus })
    }
    if (req.body.filteredStatus == 'All' && req.body.filteredMonth == 'All'){
        selector["$and"].push({'createdAt':{$gte : new Date(req.body.yearStart), $lt : new Date(req.body.yearEnd) }})
    }
    if (req.body.filteredStatus && req.body.filteredMonth == 'All'){
        selector["$and"].push({'createdAt':{$gte : new Date(req.body.yearStart), $lt : new Date(req.body.yearEnd) }})
    }
    // BookingMaster.find(selector)
    BookingMaster.aggregate([
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
            localField: "employeeId",
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
        {$lookup:
        {
            from:"personmasters",
            localField: "managerId1",
            foreignField: "_id",
            as:"manager1"
        }
         },
        {$lookup:
        {
            from:"personmasters",
            localField: "managerId2",
            foreignField: "_id",
            as:"manager2"
         }
        },
        {$lookup:
        {
            from:"personmasters",
            localField: "managerId3",
            foreignField: "_id",
            as:"manager3"
         }
        },
        { "$lookup": {
        "from": "entitymasters",
        localField:"allocatedToVendor",
        foreignField:"_id",
        "as": "vendor"
        }}
    ])
    .sort({createdAt : -1})
    .exec()
    .then(data=>{
        res.status(200).json(data);
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        });
    });
};

exports.getparameterdata = (req,res,next)=>{
    console.log('================getparameterdata================')
    console.log(req.body)
    console.log('===============****=================')
    BookingMaster.find({'employeeId':req.body.user,'pickupDate':{$gte : new Date(req.body.start), $lt : new Date(req.body.end) },statusValue:{$nin:['Manager Rejected','Cancelled By User','Cancelled By Vendor','Vendor Rejected','Driver Rejected','Cancelled']}})
    .exec()
    .then(data=>{
        // console.log('data==>',data)
        var returnData = []
        if(req.body.parameter == "preApprovedAmount"){
            if(data && data.length > 0){
                var amount = 0;
                for(var i=0 ; i<data.length ; i++){
                    amount = amount + parseFloat(data[i].estimatedCost)
                }//i
                console.log('returnData amount: ',amount)
                returnData.push(amount)
            }
        }else if(req.body.parameter == "preApprovedRides"){
            if(data && data.length > 0){
                var ride = 0;
                for(var i=0 ; i<data.length ; i++){
                    ride = ride + 1
                }//i
                console.log('returnData ride: ',ride)
                returnData.push(ride)
            }
        }else{
            if(data && data.length > 0){
                for(var i=0 ; i<data.length ; i++){
                    var ride = 0;
                    if(data[i].routeCoordinates && data[i].routeCoordinates.length > 0){
                        for(var j=0 ; j<data[i].routeCoordinates.length ; j++){
                            ride = ride + parseFloat(data[0].routeCoordinates[0].distanceTravelled)
                        }//j
                        returnData.push(ride)
                    }
                }//i
                console.log('returnData KM: ',ride)
            }
            
        }
        console.log('returnData:',returnData)
        console.log('================End getparameterdata================')
        res.status(200).json(returnData);
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        });
    });
}

exports.cancelAllPastBookings = (req,res,next)=>{
    var status = ['New','Manager Approved','Allocated To Vendor','Vendor Accepted','Trip Allocated To Driver','Driver Accepted','Started From Garage']

    BookingMaster.find({statusValue:{$in:status}})
    .exec()
    .then(bookingData=>{
        res.status(200).json(bookingData);
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        });
    });
}

exports.updateCancelStatus = (req,res,next)=>{
    BookingMaster.updateOne(
        { _id:req.body.booking_id },  
        {
            $push:  {  
                        "status"      : req.body.status,
                    },
            $set:  {"statusValue"   : req.body.status.value},
        }
    )
    .exec()
    .then(data=>{
        if(data.nModified == 1){
            BookingMaster.updateOne(
            { _id:req.body.booking_id},
            {
                $push:  { 'updateLog' : [{  updatedAt      : new Date(),
                                            updatedBy      : req.body.userId
                                        }]
                        }
            } )
            .exec()
            .then(data=>{
                res.status(200).json({ updated : true });
            })
        }else{
            res.status(200).json({ updated : false });
        }
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({ error: err });
    });
}

exports.updateStatus = (req,res,next)=>{
     BookingMaster.findOne({_id:req.body.bookingID})
    .then(booking=>{
        main();
        async function main(){
            var {status,worklocation_id,company_id} = req.body;
            if(!status.allocatedToDriver){
                var checkDriver = booking.status.slice().reverse().find(e=> e.value === "Trip Allocated To Driver");
                if(checkDriver){
                    status.allocatedToDriver = checkDriver.allocatedToDriver;
                }
            }
            if(!status.allocatedToVendor){
                var checkVendor = booking.status.slice().reverse().find(e=> e.value === "Allocated To Vendor");
                if(checkVendor){
                    status.allocatedToVendor = checkVendor.allocatedToVendor;
                }
            }
            var updateObj = {
                "statusValue"   : status.value,
            }
            if(req.body.vehicleID){
                updateObj.vehicleID     = req.body.vehicleID;
                updateObj.statusValue   = status.value;
            }
            if(status.allocatedToDriver){
                updateObj.allocatedToDriver = status.allocatedToDriver
            }
            if(status.value === "Allocated To Vendor"){
                updateObj.allocatedToVendor = status.allocatedToVendor
            }

            if(status.value === "Started From Garage" || status.value === "Reached Drop Location"){
                var elements = await getDistanceAndTime(status.value,status.latitude,status.longitude,company_id,worklocation_id)
                console.log("elements",elements);
                if(elements.length > 0 ){
                    status.destinationDistance = elements[0].distance,
                    status.destinationTime = elements[0].duration
                }
            }
            BookingMaster.updateOne(
                { _id:req.body.bookingID },  
                {
                    $push:  {  
                                "status"      : status,
                            },
                    $set:  updateObj,
                }
            )
            .exec()
            .then(data=>{
                if(data.nModified == 1){
                    BookingMaster.updateOne(
                    { _id:req.body.bookingID},
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
                    res.status(200).json({ updated : false });
                }
            })
            .catch(err =>{
                console.log(err);
                res.status(500).json({ error: err });
            });
        }    
    })
    .catch(err=>{
        console.log("err",err)
        res.status(500).json({ error: err });
    })     
}

function getDistanceAndTime(status,latitude,longitude,company_id,worklocation_id){
    console.log("status",status)
    console.log("latitude",latitude)
    console.log("longitude",longitude)
    console.log("company_id",company_id)
    console.log("worklocation_id",worklocation_id)
    return new Promise(function(resolve,reject){
        EntityMaster
        .aggregate([
          { $match : {
             _id:ObjectId(company_id),
          }},
          { $unwind : "$locations" },
          { $match : {
             "locations._id": ObjectId(worklocation_id)
          }},
          { $project : { _id: 0, locations : 1  } }
        ])
        .then(worklocation=>{
            console.log("worklocation",worklocation);
            var origin      = "";
            var destination = ""
            if(status === "Started From Garage"){
                origin      = worklocation[0].locations.latitude+","+worklocation[0].locations.longitude;
                destination = latitude+","+longitude;
            }else{
                origin      = worklocation[0].locations.latitude+","+worklocation[0].locations.longitude;;
                destination = latitude+","+longitude;
            }
            ProjectSetting.findOne({type:'GOOGLE'},{googleapikey:1,_id:0})
            .then(res => {
                var url = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins='+origin+'&destinations='+destination+'&key='+res.googleapikey;
                axios.get(url)
                .then(result=>{
                    console.log("ggogleapi=>",result.data.rows[0])
                    if(result.data.rows.length > 0){
                        resolve(result.data.rows[0].elements);
                    }else{
                        resolve([]);
                    }
                })
                .catch(error=>{
                  console.log("error",error)
                })
            })
            .catch((error) =>{
                console.log("err",error)
            })
        })
        .catch(error=>{
          console.log("error",error)
        })
    });
}


exports.changeDriver = (req,res,next)=>{
    BookingMaster.findOne({_id:req.body.bookingID})
    .then(booking=>{
        var allocatedTo = booking.status.slice().reverse().find(e=> e.value === "Trip Allocated To Driver").allocatedToDriver;
        if(allocatedTo){
            var previousStatus = {
                value             : "Driver Changed By Vendor",
                allocatedToDriver : allocatedTo,
                statusBy          :  req.body.status.statusBy,
                statusAt          : new Date()
            }
            BookingMaster.updateOne(
                { _id:req.body.bookingID },  
                {
                    $push:  {  
                                "status"      : previousStatus,
                            },
                    $set:  {
                                "statusValue"       : previousStatus.value,
                                "allocatedToDriver" : previousStatus.allocatedToDriver,
                            }
                }
            )
            .exec()
            .then(booking=>{
                if(booking.nModified == 1){
                    BookingMaster.updateOne(
                        { _id:req.body.bookingID },  
                        {
                            $push:  {  
                                        "status"      : req.body.status,
                                    },
                            $set:  {
                                        "statusValue" : req.body.status.value,
                                        "allocatedToDriver" : req.body.status.allocatedToDriver,
                                    }
                        }
                    )
                    .exec()
                    .then(booking=>{
                        if(booking.nModified == 1){
                            BookingMaster.updateOne(
                            { _id:req.body.bookingID},
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
                            res.status(200).json({ updated : false });
                        }
                    })
                    .catch(err =>{
                        console.log(err);
                        res.status(500).json({ error: err });
                    });
                }else{
                    res.status(200).json({ updated : false });
                }
            })
            .catch(err =>{
                console.log(err);
                res.status(500).json({ error: err });
            });
        }
    })
    .catch(err=>{
        console.log("err",err)
    })     
    
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};


exports.changeVehicle = (req,res,next)=>{
    BookingMaster.updateOne(
        { _id:req.body.bookingID },  
        {
            $set:  {
                        "vehicleID"   : req.body.vehicleID
                    },
        }
    )
    .exec()
    .then(data=>{
        if(data.nModified == 1){
            BookingMaster.updateOne(
            { _id:req.body.bookingID},
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
            res.status(200).json({ updated : false });
        }
    })
    .catch(err =>{
        res.status(500).json({ error: err });
    });
}

//Get Status
exports.getStatus = (req,res,next)=>{
    BookingMaster.aggregate([
      {
        $match: {
          "_id":ObjectId(req.params.bookingID)
        }
      },
      {
        $project: {
          status: {
            $slice: [ "$status", -1 ]
          }
        }
      }
    ])
    .exec()
    .then(data=>{
      res.status(200).json({data});
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({ error: err });
    });
}


exports.insert_trip_expenses = (req,res,next)=>{
    BookingMaster.updateOne(
        { _id:req.body.bookingID },  
        {
            $set:   {  
                        "tripExpenses"                  : req.body.tripExpenses,
                        "statusValue"                   : 'Expense Submitted'
                    },
            $push:  {
                       status:{
                            "value"    : 'Expense Submitted',
                            "statusBy" : req.body.updatedBy,
                            "statusAt" : new Date(),
                       }
                    }        
        }
    )
    .exec()
    .then(data=>{
        if(data.nModified == 1){
            BookingMaster.updateOne(
            { _id:req.body.bookingID},
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
            res.status(200).json({ updated : false });
        }
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({ error: err });
    });
}

exports.update_trip_expenses = (req,res,next)=>{
    BookingMaster.updateOne(
        { _id:req.body.bookingID },  
        {
            $push:  {
                       "tripExpenses" : req.body.tripExpenses,
                    }        
        }
    )
    .exec()
    .then(data=>{
        if(data.nModified == 1){
            BookingMaster.updateOne(
            { _id:req.body.bookingID},
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
            res.status(200).json({ updated : false });
        }
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({ error: err });
    });
}

exports.ratingToPassenger = (req,res,next)=>{
    BookingMaster.updateOne(
        { _id:req.body.bookingID },  
        {
            $set:   {  
                        "ratingToPassenger" : {
                            rating:req.body.rating,
                            remark:req.body.remark
                        }
                    },
        }
    )
    .exec()
    .then(data=>{
        if(data.nModified == 1){
            BookingMaster.updateOne(
            { _id:req.body.bookingID},
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
            res.status(200).json({ updated : false });
        }
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({ error: err });
    });
}


exports.update_routeCoordinates = (req,res,next)=>{
    var routeCoordinates = req.body.routeCoordinates;
    console.log("routeCoordinates",routeCoordinates);
    BookingMaster.findOne({_id:req.body.bookingID},{routeCoordinates:{ $slice: -1 }})
    .exec()
    .then(prevCoordinate=>{
        console.log("prevCoordinate",prevCoordinate);
        if(prevCoordinate && prevCoordinate.routeCoordinates.length > 0){
            var prevLatLng ={
                latitude:prevCoordinate.routeCoordinates[0].latitude,
                longitude:prevCoordinate.routeCoordinates[0].longitude,
            }
            var newLatLng ={
                latitude:routeCoordinates.latitude,
                longitude:routeCoordinates.longitude,
            }
            routeCoordinates.distanceTravelled = haversine(prevLatLng,newLatLng);
        }else{
            routeCoordinates.distanceTravelled = 0;
        }
        
        BookingMaster.updateOne(
        { _id:req.body.bookingID},
        {
            $push : {
                "routeCoordinates" : routeCoordinates,
            },
        })
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
    
};

//Billing API

exports.getAllBookingListForGenerateBill = (req,res,next)=>{
    BookingMaster.aggregate([
    {$lookup:
        {
            from:"personmasters",
            localField: "employeeId",
            foreignField: "_id",
            as:"person"
         }
    },
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
            from:"packagemasters",
            localField: "packageId",
            foreignField: "_id",
            as:"package"
         }
    },
   //  { "$match": { "status.value": "Driver Accepted" } },
   // { "$lookup": {
   //   "from": "personmasters",
   //   "localField": "status.statusBy",
   //   "foreignField": "_id",
   //   "as": "driver"
   // }},
    { $match :{"statusValue" :"Ready To Bill"}},
    {$facet: {
            paginatedResults: [{ $skip: req.body.startRange }, { $limit: req.body.limitRange-req.body.startRange }],
            totalCount: [
              {
                $count: 'count'
              }
            ]
          }
    },
 //    {
 //        $group:{
 //            "_id":"$tripExpenses.ticketPrice"
 //           ,
 //         "Total Price : ":{
 //             $sum:{
 //                 $sum: "$tripExpenses.ticketPrice"
 //             }
 //         }
 //     }
 // },
    ])
    .sort({createdAt : -1})
    .exec()
    .then(data=>{
        console.log("ready to bill => ",data)
        res.status(200).json(data);
    })
    .catch(err =>{
        res.status(500).json({ error: err });
    });  
},

exports.getSingleBookingListForGenerateBill = (req,res,next)=>{
    BookingMaster.aggregate([
     {
        $match: {
          "_id":ObjectId(req.params.id)
        }
      },
    {$lookup:
        {
            from:"personmasters",
            localField: "employeeId",
            foreignField: "_id",
            as:"person"
         }
    },
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
            from:"expensetypemasters",
            localField: "tripExpenses.ticketName",
            foreignField: "type",
            as:"expense"
         }
    },
    { "$match": { "status.value": "Driver Accepted" } },
   { "$lookup": {
     "from": "personmasters",
     "localField": "status.statusBy",
     "foreignField": "_id",
     "as": "driver"
   }},
    { $match :{"statusValue" :"Ready To Bill"}},
 
    ])
    .sort({createdAt : -1})
    .exec()
    .then(data=>{
        res.status(200).json(data);
    })
    .catch(err =>{
        res.status(500).json({ error: err });
    });  
},


//Vendor App API

exports.LatestbookingListForVendor = (req,res,next)=>{
    var selector = [
            {
                'statusValue' : "Allocated To Vendor"
            },
            {
                'status'      : { $elemMatch: { allocatedToVendor: req.params.company } }
            },
            {
                'createdAt'   : {$gte : new Date(req.params.startDate), $lt : new Date(req.params.endDate) }
            }
        ];
     
    BookingMaster.find({$and: selector} )
    .sort({createdAt : -1})
    .exec()
    .then(data=>{
        res.status(200).json(data);
    })
    .catch(err =>{
        res.status(500).json({ error: err });
    });  
}

exports.countbookingListForVendor = (req,res,next)=>{
    var selector = [
            {
                'statusValue' : "Allocated To Vendor"
            },
            {
                'status'      : { $elemMatch: { allocatedToVendor: req.params.company } }
            },
            {
                'createdAt'   : {$gte : new Date(req.params.startDate), $lt : new Date(req.params.endDate) }
            }
        ];
     
    BookingMaster.find({$and: selector} ).count()
    .exec()
    .then(data=>{
        res.status(200).json({ count : data });
    })
    .catch(err =>{
        res.status(500).json({ error: err });
    });  
}

exports.getCancelledbookingCountForVendor = (req,res,next)=>{
    var selector = [
            {
                'statusValue' : { $in:["Cancelled By Vendor","Vendor Rejected"]}
            },
            {
                'status'      : { $elemMatch: { allocatedToVendor: req.params.company } }
            },
            {
                'status.statusAt'   : {$gte : new Date(req.params.startDate), $lt : new Date(req.params.endDate) }
            }
        ];
    BookingMaster.find({$and: selector} ).count()
    .exec()
    .then(data=>{
        res.status(200).json({ count : data });
    })
    .catch(err =>{
        res.status(500).json({ error: err });
    }); 
}

exports.getAcceptedbookingCountForVendor = (req,res,next)=>{
    var selector = [
            {
                'statusValue' : { $in:["Vendor Accepted"]}
            },
            {
                'status'      : { $elemMatch: { allocatedToVendor: req.params.company } }
            },
            {
                'status.statusAt'   : {$gte : new Date(req.params.startDate), $lt : new Date(req.params.endDate) }
            }
        ];

    BookingMaster.find({$and: selector} ).count()
    .exec()
    .then(data=>{
        res.status(200).json({ count : data });
    })
    .catch(err =>{
        res.status(500).json({ error: err });
    }); 
}

exports.getbookingListForVendor = (req,res,next)=>{
    if(req.body.tab==="Cancelled"){
        var selector = [{status: { $elemMatch: { allocatedToVendor: req.body.company_Id, value : { $in:req.body.status} } } },
                        {
                                'createdAt'   : {$gte : new Date(req.body.startDate), $lt : new Date(req.body.endDate) }
                            }
                        ];
    }else if(req.body.tab === "Rejected"){
        var selector = [{status: { $elemMatch: { allocatedToVendor: req.body.company_Id, value : { $in:req.body.status} } } },
                        {
                                'createdAt'   : {$gte : new Date(req.body.startDate), $lt : new Date(req.body.endDate) }
                            }
                        ];
    }else{
        var selector = [
                {
                    'statusValue' : { $in:req.body.status}
                },
                {
                    'allocatedToVendor': req.body.company_Id
                },
                {
                    'createdAt'   : {$gte : new Date(req.body.startDate), $lt : new Date(req.body.endDate) }
                }
            ];
    }
    if(req.body.companyIds.length > 0){
        selector.push({'corporateId' : {$in:req.body.companyIds}})
    }  
     if(req.body.searchText){
        var searchArray = [];
        if(!isNaN(req.body.searchText)){
             if(typeof parseInt(req.body.searchText) === "number"){
                console.log("Inside")
                searchArray.push({"bookingId"  :  parseInt(req.body.searchText)});      
            }  
        }
        searchArray.push({"employeeName"  : {"$regex": req.body.searchText, $options: "i"}});      
        selector.push({$or : searchArray });
    }
    console.log('selector=>',selector)
    BookingMaster.find({$and: selector} )
   .populate('corporateId')
   .populate('employeeId')
   .populate('vehicleCategoryId')
   .populate('vehicleID')
   .sort({createdAt:1})
   .exec()
   .then(bookingList=>{
        main();
        async function main(){
            var k = 0 ;
            var returnData = [];
            for(k = 0 ; k < bookingList.length ; k++){
                if(bookingList[k].corporateId && bookingList[k].employeeId && bookingList[k].vehicleCategoryId){
                    // var driverInfo = bookingList[k].status.find(elem => elem.value === 'Vendor Allocated to Driver');
                    var driverInfo = bookingList[k].status.filter((elem)=>{return elem.value==="Trip Allocated To Driver"});
                    var driverDetails = {
                        firstName   : "",
                        middleName  : "",
                        lastName    : "",
                        contactNo   : "",
                    };
                    if( driverInfo && driverInfo.length > 0){
                        driverDetails = await getDriverDetails(driverInfo[driverInfo.length-1].allocatedToDriver);
                        console.log("driverDetails",driverDetails);
                    }
                    var reasonData = bookingList[k].status.filter((elem)=>{return elem.value==="Driver Rejected"});
                    var reamrk = "";
                    if( reasonData && reasonData.length > 0){
                        reamrk = reasonData[reasonData.length-1].remark
                    }
                    returnData.push({
                        "_id"                     : bookingList[k]._id,
                        "bookingId"               : bookingList[k].bookingId,
                        "companyName"             : bookingList[k].corporateId.companyName,
                        "companyId"               : bookingList[k].corporateId.companyId,
                        "companyID"               : bookingList[k].corporateId.companyID,
                        "company_id"              : bookingList[k].corporateId._id,
                        "employee_id"             : bookingList[k].employeeId._id,
                        "employeeName"            : bookingList[k].employeeId.firstName+" "+(bookingList[k].employeeId.middleName ? bookingList[k].employeeId.middleName : "") +" "+bookingList[k].employeeId.lastName,
                        "employeeMobile"          : bookingList[k].employeeId.contactNo,
                        "vehicleCategory"         : bookingList[k].vehicleCategoryId.category,
                        "vehicle_id"              : bookingList[k].vehicleID ? bookingList[k].vehicleID._id : null,
                        "vehicleBrand"            : bookingList[k].vehicleID ? bookingList[k].vehicleID.brand : null ,
                        "vehicleModel"            : bookingList[k].vehicleID ? bookingList[k].vehicleID.model : null ,
                        "vehicleNumber"           : bookingList[k].vehicleID ? bookingList[k].vehicleID.vehicleNumber : null ,
                        "vehicleColor"            : bookingList[k].vehicleID ? bookingList[k].vehicleID.vehiclecolor : null ,
                        "driverDetails"           : driverDetails,
                        "statusValue"             : bookingList[k].statusValue,
                        "status"                  : bookingList[k].status, 
                        "reamrk"                  : reamrk,
                        "from"                    : bookingList[k].from,
                        "to"                      : bookingList[k].to,
                        "pickupDate"              : bookingList[k].pickupDate,
                        "pickupTime"              : bookingList[k].pickupTime,
                        "returnDate"              : bookingList[k].returnDate,
                        "returnTime"              : bookingList[k].returnTime,
                        "allocatedToVendor"       : bookingList[k].allocatedToVendor,
                    })
                }
             }   
            if(k >= bookingList.length){
                res.status(200).json(returnData);
            }
        }    
    })
    .catch(err =>{
        console.log("err",err);
        res.status(500).json({ error: err });
    });
};

function getDriverDetails(driver_id){
   return new Promise(function(resolve,reject){
        PersonMaster.findOne({"_id" : driver_id,"status":"Active"},{"firstName":1,middleName:1,lastName:1,contactNo:1})
             .exec()
             .then(driverDetails=>{
                resolve(driverDetails);
             })
            .catch(err =>{
                res.status(500).json({
                    message : "driver not found.",
                    error: err
                   });
            });
    });
}


exports.singleBookingForVendor = (req, res, next)=>{
    BookingMaster.find({_id: ObjectId(req.params.bookingID)})
    .populate('vehicleCategoryId')
    .populate('employeeId')
    .populate('vehicleID')
    .then(data=>{
        main();
        async function main(){
            try{
            var returnData = data[0];
            var driverInfo = returnData.status.filter((elem)=>{return elem.value==="Trip Allocated To Driver"});
            console.log("driverInfo",driverInfo);
            var driverDetails = {
                firstName   : "",
                middleName  : "",
                lastName    : "",
                contactNo   : "",
            };
            var vendor = "";
            var vendorId = ""
            if( driverInfo && driverInfo.length > 0){
                driverDetails = await getDriverDetails(driverInfo[driverInfo.length-1].allocatedToDriver);
                vendor = driverInfo[driverInfo.length-1].statusBy ;
                vendorId = driverInfo[driverInfo.length-1].allocatedToVendor ;
            }

           
            var reasonData = returnData.status.filter((elem)=>{return elem.value==="Driver Rejected"});
            var remark = "";
            if( reasonData && reasonData.length > 0){
                remark = reasonData[reasonData.length-1].remark
            }

            res.status(200).json({
                "_id"                 : returnData._id,
                "bookingId"           : returnData.bookingId,
                "status"              : returnData.status,
                "statusValue"         : returnData.statusValue,
                "tripType"            : returnData.tripType,
                "from"                : returnData.from,
                "to"                  : returnData.to,
                "pickupDate"          : returnData.pickupDate,
                "pickupTime"          : returnData.pickupTime,
                "returnDate"          : returnData.returnDate,
                "returnTime"          : returnData.returnTime,
                "intermediateStops"   : returnData.intermediateStops,
                "specialInstruction"  : returnData.specialInstruction,
                "purposeOfTravel"     : returnData.purposeOfTravel,
                "purposeOfTravelOther": returnData.purposeOfTravelOther,
                "createdAt"           : returnData.createdAt,
                "managerID"           : returnData.managerID1,
                "managerId1"          : returnData.managerId1,
                "tripExpenses"        : returnData.tripExpenses,
                "routeCoordinates"    : returnData.routeCoordinates,
                "estimatedCost"       : returnData.estimatedCost,
                "firstName"           : returnData.employeeId.firstName,
                "middleName"          : returnData.employeeId.middleName,
                "lastName"            : returnData.employeeId.lastName,
                "contactNo"           : returnData.employeeId.contactNo,
                "employeeEmail"       : returnData.employeeId.email,
                "employeeID"          : returnData.employeeId.employeeId,
                "companyName"         : returnData.employeeId.companyName,
                "profilePhoto"        : returnData.employeeId.profilePhoto,
                "vehicleCategory"     : returnData.vehicleCategoryId.category,
                "vehicleBrand"        : returnData.vehicleID ? returnData.vehicleID.brand : null ,
                "vehicleModel"        : returnData.vehicleID ? returnData.vehicleID.model : null ,
                "vehicleNumber"       : returnData.vehicleID ? returnData.vehicleID.vehicleNumber : null ,
                "vehicleColor"        : returnData.vehicleID ? returnData.vehicleID.vehiclecolor : null ,
                "vehicle_id"          : returnData.vehicleID ? returnData.vehicleID._id : null ,
                'driverDetails'       : driverDetails,
                'vendor'              : vendor,
                'vendorId'              : vendorId,
                'remark'              : remark,
            });
            }
            catch(err) {
                console.log(err)
              }
         }   
    })
    .catch(err =>{
        res.status(500).json({ error: err });
    });
};


exports.vehicleListForAllocation = (req, res, next)=>{
    BookingMaster.aggregate([
        { "$match" : {_id: ObjectId(req.params.bookingID)}},
        {
            $lookup:
            {
               from: "vehiclemasters",
               localField: "vehicleCategoryId",
               foreignField: "categoryId",
               as: "vehicles"
            }
        },
        { "$unwind": "$vehicles" },
        {
            $project:
            {
                "_id"                 : 1,
                "bookingId"           : 1,
                "pickupDate"          : 1,
                "pickupTime"          : 1,
                "returnDate"          : 1,
                "returnTime"          : 1,
                "vehicles"            : 1,
            }
        },
        
        ])
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        });
};


exports.trip_otp_verification = (req, res, next) => {
    var selector = {}
    if(req.body.startOTP){
       selector = {"startOTP": req.body.startOTP}
    }else if(req.body.endOTP){
       selector = {"endOTP": req.body.endOTP}
    }
    BookingMaster.find({ _id: ObjectId(req.body.booking_id), status:{$elemMatch:selector}})
        .exec()
        .then(data => {
            if (data.length > 0) {
                 res.status(200).json({ message: "SUCCESS"});
            } else {
                res.status(200).json({ message: "FAILED"});
            }
        })
        .catch(err => {
            res.status(500).json({
                message: "Failed to find the booking",
                error: err
            });
        });
};

function getManagerDetails(id){
   return new Promise(function(resolve,reject){
        PersonMaster.findOne({"_id" : id},{"firstName":1,employeeId:1,lastName:1,contactNo:1})
             .exec()
             .then(managerDetails=>{
                resolve(managerDetails);
             })
            .catch(err =>{
                res.status(500).json({
                    message : "employee not found.",
                    error: err
                   });
            });
    });
}

exports.managerDetail_ByID = (req, res, next)=>{
    BookingMaster.find({_id: ObjectId(req.params.bookingID)})
    .populate('employeeId')
    .then(data=>{
        main();
        async function main(){
            var returnData = data[0];
            var managerInfo = returnData.status.filter((elem)=>{return elem.value===req.params.status});
            var managerDetails = {
                firstName   : "",
                lastName    : "",
                employeeId  : "",
                contactNo   : "",
            };
            var DateVar = ""
            if( managerInfo && managerInfo.length > 0){
                managerDetails = await getManagerDetails(managerInfo[managerInfo.length-1].statusBy);
                DateVar = (managerInfo[managerInfo.length-1].statusAt);

            }
            res.status(200).json({
                "booking_id"          : returnData._id,
                "bookingId"           : returnData.bookingId,
                "from"                : returnData.from.address,
                "fromCity"            : returnData.from.city,
                "fromDistrict"        : returnData.from.district,
                "to"                  : returnData.to.address,
                "pickupDate"          : returnData.pickupDate,
                "pickupTime"          : returnData.pickupTime,
                "returnDate"          : returnData.returnDate,
                "returnTime"          : returnData.returnTime,
                "intermediateStops"   : returnData.intermediateStops,
                "specialInstruction"  : returnData.specialInstruction,
                "purposeOfTravel"     : returnData.purposeOfTravel,
                "purposeOfTravelOther"  : returnData.purposeOfTravelOther,
                "employeeId"          : returnData.employeeId.employeeId,
                "corporateId"         : returnData.corporateId,
                "firstName"           : returnData.employeeId.firstName,
                "middleName"          : returnData.employeeId.middleName,
                "lastName"            : returnData.employeeId.lastName,
                "employeeID"            : returnData.employeeId.userId,
                "contactNo"           : returnData.employeeId.contactNo,
                'managerDetails'      : managerDetails,
                "Date"                : DateVar
            });
         }   
    })
    .catch(err =>{
        res.status(500).json({ error: err });
    });
};

function getvendorDetails(company){
   return new Promise(function(resolve,reject){
     EntityMaster.findOne({'_id':company})
        .exec()
        .then(result => {
            User
            .findOne({"roles":"vendoradmin","profile.companyID":result.companyID},{"profile.fullName":1,"profile.companyName":1,"profile.mobile":1})
            .exec()
            .then(vendorDetails=>{
                resolve(vendorDetails);
             })
            .catch(err => {
                console.log(err);
                reject({
                    error: err
                });
            });
        })
        .catch(err =>{
            console.log('entityMaster error: ',err)
        })
        
    });
}

exports.getVendorDetail_ByBookingID = (req, res, next)=>{
    BookingMaster.find({_id: ObjectId(req.params.bookingID)})
    .populate('employeeId')
    .then(data=>{
        main();
        async function main(){
            var returnData = data[0];
            var vendorInfo = returnData.status.filter((elem)=>{return elem.value==="Allocated To Vendor"});
            var vendorDetails = {
                fullName   : "",
                companyName    : "",
                mobile  : "",
            };
            if( vendorInfo && vendorInfo.length > 0){
                vendorDetails = await getvendorDetails(vendorInfo[vendorInfo.length-1].allocatedToVendor);
            }
            console.log('vendorDetails: ',vendorDetails)
            res.status(200).json({
                "bookingId"           : returnData.bookingId,
                "from"                : returnData.from.address,
                "to"                  : returnData.to.address,
                "pickupDate"          : returnData.pickupDate,
                "pickupTime"          : returnData.pickupTime,
                "returnDate"          : returnData.returnDate,
                "returnTime"          : returnData.returnTime,
                "intermediateStops"   : returnData.intermediateStops,
                "specialInstruction"  : returnData.specialInstruction,
                "employeeId"          : returnData.employeeId.employeeId,
                "corporateId"         : returnData.corporateId,
                "firstName"           : returnData.employeeId.firstName,
                "middleName"          : returnData.employeeId.middleName,
                "lastName"            : returnData.employeeId.lastName,
                "employeeID"            : returnData.employeeUserId,
                "contactNo"           : returnData.employeeId.contactNo,
                'vendorDetails'      : vendorDetails,
            });
         }   
    })
    .catch(err =>{
        res.status(500).json({ error: err });
    });
};

exports.filedetails = (req, res, next) => {
    var finaldata = {};
    BookingMaster.aggregate([
        {
            $lookup:
            {
                from: "personmasters",
                localField: "employeeId",
                foreignField: "_id",
                as: "person"
            }
        },
        { $match: {fileName: req.params.fileName } }
    ])
        .exec()
        .then(data => {
            //finaldata.push({goodrecords: data})
            finaldata.goodrecords = data;
            FailedRecords.find({ fileName: req.params.fileName })
                .exec()
                .then(badData => {
                    finaldata.failedRecords = badData[0].failedRecords
                    finaldata.totalRecords = badData[0].totalRecords
                    res.status(200).json(finaldata);
                })

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};
var fetchAllBookingData = async (type) => {
    return new Promise(function (resolve, reject) {
        BookingMaster.find({ type: type })
            .sort({ createdAt: -1 })
            // .skip(req.body.startRange)
            // .limit(req.body.limitRange)
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            });
    });
};
var fetchPersonMaster = async (companyID,employeeId,type) => {
    return new Promise(function (resolve, reject) {
        PersonMaster.find({type:type,companyID:companyID,employeeId:employeeId})
            .exec()
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            });
    });
};   


var insertFailedRecords = async (invalidData, updateBadData) => {
    //console.log('invalidData',invalidData);
    return new Promise(function (resolve, reject) {
        FailedRecords.find({ fileName: invalidData.fileName })
            .exec()
            .then(data => {
                if (data.length > 0) {
                    //console.log('data',data[0].failedRecords.length)   
                    if (data[0].failedRecords.length > 0) {
                        if (updateBadData) {
                            FailedRecords.updateOne({ fileName: invalidData.fileName },
                                { $set: { 'failedRecords': [] } })
                                .then(data => {
                                    if (data.nModified == 1) {
                                        FailedRecords.updateOne({ fileName: invalidData.fileName },
                                            {
                                                $set: { 'totalRecords': invalidData.totalRecords },
                                                $push: { 'failedRecords': invalidData.FailedRecords }
                                            })
                                            .then(data => {
                                                if (data.nModified == 1) {
                                                    resolve(data);
                                                } else {
                                                    resolve(data);
                                                }
                                            })
                                            .catch(err => { reject(err); });
                                    } else {
                                        resolve(0);
                                    }
                                })
                                .catch(err => { reject(err); });
                        } else {
                            FailedRecords.updateOne({ fileName: invalidData.fileName },
                                {
                                    $set: { 'totalRecords': invalidData.totalRecords },
                                    $push: { 'failedRecords': invalidData.FailedRecords }
                                })
                                .then(data => {
                                    if (data.nModified == 1) {
                                        resolve(data);
                                    } else {
                                        resolve(data);
                                    }
                                })
                                .catch(err => { reject(err); });
                        }

                    } else {
                        FailedRecords.updateOne({ fileName: invalidData.fileName },
                            {
                                $set: { 'totalRecords': invalidData.totalRecords },
                                $push: { 'failedRecords': invalidData.FailedRecords }
                            })
                            .then(data => {
                                if (data.nModified == 1) {
                                    resolve(data);
                                } else {
                                    resolve(data);
                                }
                            })
                            .catch(err => { reject(err); });
                    }
                } else {
                    const failedRecords = new FailedRecords({
                        _id: new mongoose.Types.ObjectId(),
                        failedRecords: invalidData.FailedRecords,
                        fileName: invalidData.fileName,
                        totalRecords: invalidData.totalRecords,
                        createdAt: new Date()
                    });

                    failedRecords
                        .save()
                        .then(data => {
                            resolve(data._id);
                        })
                        .catch(err => {
                            console.log(err);
                            reject(err);
                        });
                }
            })

    })
}

var fetchVehicleCategoryData = async (category) => {
    return new Promise(function (resolve, reject) {
        CategoryMaster.find({'category':category})
            .exec()
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            });
    });
}; 

function getBookingNumber(){
    return new Promise(function (resolve, reject) {
        BookingMaster.find({})
        .sort({createdAt: -1})
        .exec()
        .then(data=>{
            if(data && data.length > 0){
              var bookingId = data[0].bookingId + 1;
            }else{
              var bookingId = 1;
            }
            resolve(bookingId)
        })
        .catch(err => {
                reject(err);
            });
    });
};  



exports.bulkUploadBooking = (req, res, next) => {
     var bookingdata    = req.body.data;

    var validData = [];
    var validObjects = [];
    var invalidData = [];
    var invalidObjects = [];
    var remark = '';
    var failedRecords = [];
    var Count = 0;
    var DuplicateCount = 0;
    processData();
    async function processData() {

       
          for(var k = 0 ; k < bookingdata.length ; k++){
           
           if (bookingdata[k].tripType == '-') {
                remark += "trip type not found, ";
            }
            if (bookingdata[k].fromaddress == '-') {
                remark += "from address not found, ";
            }
            if (bookingdata[k].fromarea == '-') {
                remark += "from area not found, ";
            }
            if (bookingdata[k].fromcity == '-') {
                remark += "from city not found, ";
            }
            if (bookingdata[k].fromstate == '-') {
                remark += "from state not found, ";
            }
            if (bookingdata[k].fromcountry == '-') {
                remark += "from country not found, ";
            }
            if (bookingdata[k].frompincode == '-') {
                remark += "from pincode not found, ";
            }
            if (bookingdata[k].toaddress == '-') {
                remark += "to address not found, ";
            }
            if (bookingdata[k].toarea == '-') {
                remark += "to area not found, ";
            }
            if (bookingdata[k].tocity == '-') {
                remark += "to city not found, ";
            }
            if (bookingdata[k].tostate == '-') {
                remark += "to state not found, ";
            }
            if (bookingdata[k].tocountry == '-') {
                remark += "to country not found, ";
            }
            if (bookingdata[k].topincode == '-') {
                remark += "to pincode not found, ";
            }
             if (bookingdata[k].pickupDate == '-') {
                remark += "pickup date not found, ";
            } 
            if (bookingdata[k].pickupTime == '-') {
                remark += "pickup time not found, ";
            }
             if (bookingdata[k].returnDate == '-') {
                remark += "return date not found, ";
            }
            if (bookingdata[k].returnTime == '-') {
                remark += "return time not found, ";
            }
            // if (bookingdata[k].specialInstruction == '-') {
            //     remark += "specialInstruction not found, ";
            // }
            if (bookingdata[k].purposeOfTravel == '-') {
                remark += "purpose of travel not found, ";
            }
            if (bookingdata[k].vehicleCategory == '-') {
                remark += "vehicle category not found, ";
            }
            // if (bookingdata[k].personType == '-') {
            //     remark += "person type not found, ";
            // }
            /*if (bookingdata[k].intermediateStops == '-') {
                remark += "intermediateStops not found, ";
            }*/
            var vehicleData = await fetchVehicleCategoryData(bookingdata[k].vehicleCategory)
            if(vehicleData.length > 0){
                validObjects.vehicleCategoryId = vehicleData[0]._id;
            }else{
                remark += "Vehicle category not found";
            }
            
            if (remark == '') {
                var companyID = bookingdata[k].companyID
                var employeeId = bookingdata[k].employeeID
                var personData = await fetchPersonMaster(companyID,employeeId,"employee");
                
                if (personData.length>0) {
                    var managerData1 = [];
                    var managerData2 = [];
                    var managerData3 = [];
                    var manager_id1 = ""
                    var manager_id2 = ""
                    var manager_id3 = ""
                    var managerData1 = await fetchPersonMaster(companyID,personData[0].approvingAuthorityId1,"employee");
                    if(managerData1.length>0){
                       var approver1exist = 'Yes'
                       manager_id1 = managerData1[0]._id
                    }else{
                        var approver1exist = 'No'
                         manager_id1 = null
                    }

                    var managerData2 = await fetchPersonMaster(companyID,personData[0].approvingAuthorityId2,"employee");
                    if(managerData2.length>0){
                       var approver2exist = 'Yes'
                       manager_id2 = managerData1[0]._id
                    }else{
                        var approver2exist = 'No'
                         manager_id2 = null
                    }

                    var managerData3 = await fetchPersonMaster(companyID,personData[0].approvingAuthorityId3,"employee");
                    if(managerData3.length>0){
                       var approver3exist = 'Yes'
                       manager_id3 = managerData1[0]._id
                    }else{
                        var approver3exist = 'No'
                         manager_id3 = null
                    }

                    if(personData[0].bookingApprovalRequired == 'Yes'){
                        var statusVal = 'New'
                    }else{
                        var statusVal = 'Manager Approved'
                    }

                    var bookingNo = await getBookingNumber()
                        validObjects = bookingdata[k]; 
                        validObjects.bookingId = bookingNo; 
                        validObjects.from = {
                                        address1       : "",
                                        address        : bookingdata[k].fromaddress,
                                        area           : bookingdata[k].fromarea,
                                        city           : bookingdata[k].fromcity,
                                        state          : bookingdata[k].fromstate,
                                        country        : bookingdata[k].fromcountry,
                                        pincode        : bookingdata[k].frompincode, 
                                      };
                        validObjects.to ={
                                        address1        : "",
                                        address        : bookingdata[k].toaddress,
                                        area           : bookingdata[k].toarea,
                                        city           : bookingdata[k].tocity,
                                        state          : bookingdata[k].tostate,
                                        country        : bookingdata[k].tocountry,
                                        pincode        : bookingdata[k].topincode,
                                      };
                        validObjects.pickupTime = bookingdata[k].pickupTime; 
                        validObjects.returnTime = bookingdata[k].returnTime; 
                        validObjects.corporateId = req.body.reqdata.corporateId;
                        validObjects.employeeId  = personData[0]._id;      
                        validObjects.employeeName   = personData[0].firstName+' '+personData[0].lastName;      
                        validObjects.empId          = personData[0].employeeId;      
                        validObjects.employeeUserId = personData[0].userId;      
                        validObjects.departmentId   = personData[0].departmentId;      
                        validObjects.managerID1     = personData[0].approvingAuthorityId1;      
                        validObjects.managerID2     = personData[0].approvingAuthorityId2;      
                        validObjects.managerID3     = personData[0].approvingAuthorityId3;      
                        validObjects.managerId1          = manager_id1;      
                        validObjects.managerId2          = manager_id2;      
                        validObjects.managerId3          = manager_id3;      
                        validObjects.fileName            = req.body.fileName;
                        validObjects.estimatedCost            = '5000';
                        validObjects.approvalRequired            = personData[0].bookingApprovalRequired;
                        validObjects.approver1exist            = approver1exist;
                        validObjects.approver2exist            = approver2exist;
                        validObjects.approver3exist            = approver3exist;
                        validObjects.statusValue            = statusVal;
                        validObjects.vehicleCategoryId = vehicleData[0]._id;
                        validObjects.status            = {
                                                            "value"           : statusVal,
                                                            "statusBy"        : req.body.reqdata.createdBy,
                                                            statusAt        : new Date(),
                                                        };
                        validObjects.createdBy           = req.body.reqdata.createdBy;
                        validObjects.createdAt           = new Date();
                        const booking = new BookingMaster({
                                _id                         : new mongoose.Types.ObjectId(),
                                // packageTypeId               : req.body.packageTypeId,
                                // packageId                   : req.body.packageId,
                                // contractId                  : req.body.contractId,
                                bookingId                   : bookingNo,
                                tripType                    : bookingdata[k].tripType,
                                pickupFrom                  : "Home",
                                from                        : validObjects.from,
                                to                          : validObjects.to,
                                pickupDate                  : bookingdata[k].pickupDate,
                                pickupTime                  : bookingdata[k].pickupTime,
                                returnDate                  : bookingdata[k].returnDate,
                                returnTime                  : bookingdata[k].returnTime,   
                                vehicleCategoryId           : vehicleData[0]._id,
                                fileName                    : validObjects.fileName,
                                // vehicleID                   : req.body.vehicleID,
                                employeeId                  : validObjects.employeeId,
                                employeeUserId              : validObjects.employeeUserId,
                                departmentId                : validObjects.departmentId,
                                corporateId                 : validObjects.corporateId,
                                managerId1                  : validObjects.managerId1,
                                managerId2                  : validObjects.managerId2,
                                managerId3                  : validObjects.managerId3,
                                managerID1                  : validObjects.managerID1,
                                managerID2                  : validObjects.managerID2,
                                managerID3                  : validObjects.managerID3,
                                approver1exist              : validObjects.approver1exist,
                                approver2exist              : validObjects.approver2exist,
                                approver3exist              : validObjects.approver3exist,
                                approvalRequired            : validObjects.approvalRequired,
                                estimatedCost               : validObjects.estimatedCost,
                                intermediateStops           : [],
                                specialInstruction          : bookingdata[k].specialInstruction,
                                purposeOfTravel             : bookingdata[k].purposeOfTravel,
                                // purposeOfTravelOther        : req.body.purposeOfTravelOther,
                                // reasonForSelectingVehicle   : req.body.reasonForSelectingVehicle,
                                status                      : validObjects.status,
                                statusValue                 : validObjects.statusValue,
                                createdBy                   : validObjects.createdBy,
                                createdAt                   : new Date()
                            })
                            booking.save()
                            .then(data=>{
                                console.log('inserted')
                            })
                            .catch(err =>{
                                console.log('insert error: ',err)
                            });
                        // validData.push(validObjects); 
                    
                }else{
                    invalidObjects = bookingdata[k];
                    invalidObjects.failedRemark = "Employee not found";
                    invalidData.push(invalidObjects);   
                }
                
            }else{
                invalidObjects = bookingdata[k];
                invalidObjects.failedRemark = remark;
                invalidData.push(invalidObjects);
            }
            remark= '';
        }

        //console.log("validData",validData);

        // BookingMaster.insertMany(validData)
        // .then(data=>{
        //     console.log("data",data);
        // })
        // .catch(err =>{
        //     console.log(err);
        // });
        failedRecords.FailedRecords = invalidData
        failedRecords.fileName = req.body.fileName;
        failedRecords.totalRecords = req.body.totalRecords;

        await insertFailedRecords(failedRecords, req.body.updateBadData);
        
        res.status(200).json({
            "message": "Bulk upload process is completed successfully!",
            "completed": true
            });
    }

   
};

exports.start_trip = (req,res,next)=>{ 
    console.log("req.body",req.body);
    var {returnDate,pickupDate,tripType,personId,booking_id,current_time} = req.body;
    console.log("booking_id",booking_id);
    if(tripType === "Local"){
         BookingMaster.find(
             {$and: [
                {
                    _id: ObjectId(booking_id) 
                },
                {
                    status: { $elemMatch: { allocatedToDriver: personId}}
                },
                {
                    statusValue:{$nin:["Cancel By User","Cancel By Vendor","Cancel By Admin","Ready To Bill","Expense Submitted","Reached Garage","End OTP Verified","Reached Drop Location","Trip Completed"]}
                },
                {
                    pickupDate: { $eq: new Date(pickupDate)}
                },
            ]}
        )
        .exec()
        .then(booking => {
            console.log("booking1",booking)
            if(booking.length > 0){
                res.status(200).json({startTrip:true,booking:booking});
            }else{
                 res.status(200).json({startTrip:false});
            }
        })
        .catch(err => {
            console.log("err",err);
            res.status(500).json({ error: err });
        });
    }else{
        BookingMaster.find(
             {$and: [
                {
                    _id: { $nin: booking_id }
                },
                {
                    status: { $elemMatch: { allocatedToDriver: personId}}
                },
                {
                    statusValue:{$nin:["Cancel By User","Cancel By Vendor","Cancel By Admin","Ready To Bill","Expense Submitted","Reached Garage","End OTP Verified","Reached Drop Location","Trip Completed"]}
                },
                {
                    pickupDate: { $gte: new Date()}
                },
                {
                    returnDate: { $lte: new Date(returnDate)}
                }
            ]}
        )
        .exec()
        .then(booking => {
            console.log("booking",booking)
            main();
            async function main(){
                if(booking.length > 0){
                    res.status(200).json({startTrip:false});
                }else{
                    res.status(200).json({startTrip:true});
                }
            }    
        })
        .catch(err => {
            console.log("err",err);
            res.status(500).json({ error: err });
        });
    }    
};




exports.get_routeCoordinates = (req,res,next)=>{
    BookingMaster.find({_id:req.params.booking_id})
    .exec()
    .then(booking=>{
        res.status(200).json(booking);
    })
    .catch(err=>{
        console.log("err",err);
        res.status(500).json({ error: err });
    })
}

exports.getFilteredBookingList = (req,res,next)=>{
    console.log("getFilteredBookingList => ",req.body);
    var selector = {}; 
    selector['$and']=[];

    if(req.body.company && req.body.company != "All"){
        selector["$and"].push({"corporateId": ObjectId(req.body.company) })
    }else{
        selector["$and"].push({"corporateId": {$ne: ""} })
    }
    if(req.body.vendor && req.body.vendor != "All"){
        selector["$and"].push({"status.allocatedToVendor": ObjectId(req.body.vendor) })
    }else{
        selector["$and"].push({"status.allocatedToVendor": {$ne: ""} })
    }
    if(req.body.department && req.body.department != "All"){
        selector["$and"].push({"departmentId": ObjectId(req.body.department) })
    }else{
        selector["$and"].push({"departmentId": {$ne: ""} })
    }
    if(req.body.category && req.body.category != "All"){
        selector["$and"].push({"vehicleCategoryId": ObjectId(req.body.category) })
    }else{
        selector["$and"].push({"vehicleCategoryId": {$ne: ""} })
    }
    if(req.body.packageType && req.body.packageType != "All"){
        selector["$and"].push({"packageTypeId": ObjectId(req.body.packageType) })
    }else{
        selector["$and"].push({"packageTypeId": {$ne: ""} })
    }
    if(req.body.startDate && req.body.endDate){
        selector["$and"].push({"createdAt": {$gte : new Date(req.body.startDate), $lt : new Date(req.body.endDate) } })
    }
    if(req.body.originatingCity){
        selector["$and"].push({"from.city": req.body.originatingCity })
    }
    if(req.body.destinationCity){
        selector["$and"].push({"to.city": req.body.destinationCity })
    }
    
    BookingMaster.aggregate([
        {$match : selector},
        {$match : { "statusValue" : "Ready To Bill"}},
        {$lookup:
            {
               from         : "entitymasters",
               localField   : "corporateId",
               foreignField : "_id",
               as           : "company"
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
    .sort({pickupDate : 1})
    .exec()
    .then(data=>{
        console.log("filterBookings => ",data);
        res.status(200).json(data);
    })
    .catch(err =>{
        res.status(500).json({ error: err });
    });
}

exports.send_push_notification = (req, res, next)=>{
    BookingMaster.find({statusValue:"Driver Accepted",is_send : { $exists: false }})
    .exec()
    .then(bookings=>{
        main();
        async function main(){
            var firebaseAPIkey = await getFirebaseKey();
            for (var i = 0; i < bookings.length; i++) {
                var pickupDate      = bookings[i].pickupDate;
                var pickupTime      = bookings[i].pickupTime;
                var reqDateTime     = await getAlertTime(pickupDate,pickupTime);
                var newPickupTime   = moment(moment(pickupDate).format('YYYY-MM-DD') + " " + pickupTime)._d;
                var newDate         = moment().tz("Asia/Kolkata").format('YYYY-MM-DD HH:mm');
                if(moment(newDate).isBetween(moment(reqDateTime),moment(newPickupTime))) {
                   var response  = await send_notification(bookings[i],firebaseAPIkey)
                   if(response === "Sent successfully"){
                        var sent_true = await bookingmasterUpdate(bookings[i]._id)
                   }
                } 
            }
            if(i>=bookings.length){
                res.status(200).json({message:"Sent successfully"});
            }
        }    
    })
    .catch(err =>{
        res.status(500).json({ error: err });
    });
};

function bookingmasterUpdate(booking_id){
     return new Promise((resolve,reject)=>{
        BookingMaster.updateOne(
                { _id:booking_id },  
                {
                    $set:  {  
                                "is_send" : true,
                            },
                }
            )
            .exec()
            .then(data=>{
               resolve(data)
            })
            .catch(err =>{
                reject(err)
            });
    })
}

function getAlertTime(pickupDate,pickupTime){
    return new Promise((resolve,reject)=>{
        var mPickupDate = moment(moment(pickupDate).format('YYYY-MM-DD') + " " + pickupTime);
        var pickupDateTime = moment(mPickupDate).add(-120,"minutes"); //Minus 120 minutes
        var time = pickupDateTime._d;
        resolve(time);
    })    
}

function getFirebaseKey(){
    return new Promise((resolve,reject)=>{
        ProjectSetting.findOne({type:'PUSH_NOTIFICATION'},{key:1,_id:0})
        .then(res => {
          resolve(res.key);  
        })
        .catch((error) =>{
            reject(error)
        })
    })
}

function send_notification(booking,firebaseAPIkey){
    return new Promise((resolve,reject)=>{
        PersonMaster.findOne({_id:booking.allocatedToDriver},{notificationToken:1})
        .exec()
        .then(data=>{
            var mPickupDate = moment(moment(booking.pickupDate).format('YYYY-MM-DD') + " " + booking.pickupTime)._d;
            var newDate     = moment().tz("Asia/Kolkata").format('YYYY-MM-DD HH:mm');
            var payload = {
                "notification": {
                    "title": "Trip Reminder",
                    "body": booking.bookingId +" Trip will get started in "+moment(mPickupDate).from(moment(newDate)),
                    "click_action": "http://localhost:3000/",
                    "icon": "http://url-to-an-icon/icon.png"
                },
                "to":data.notificationToken
            } 
            var headers = {
                'Content-Type': 'application/json',
                'Authorization': 'key='+firebaseAPIkey
            }  
            axios.post('https://fcm.googleapis.com/fcm/send',payload,{headers:headers})
            .then(res=>{
                resolve("Sent successfully")
            })
            .catch(err=>{
                console.log("err",err);
            })
        })
        .catch(err =>{
            reject(err)
        });
    })
}
