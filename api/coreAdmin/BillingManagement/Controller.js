const mongoose          = require("mongoose");
const BillingManagement = require('./Model');
const BookingMaster     = require('../bookingMaster/ModelBookingMaster');
const AutomatedSequence = require('../AutomatedSequenceMaster/Model');
const ExpenseType       = require('../expenseTypeMaster/ModelExpenseTypeMaster');
const InvoiceNumber     = require('../InvoiceNumbers/Model');
const Contracts         = require('../contract/ModelContract');
const PersonMaster      = require('../personMaster/ModelPersonMaster');
var ObjectId            = require('mongodb').ObjectID;
var moment              = require('moment');

var billingObjFun = async (sequence, ratein, qtyin, tax, unit, billingCode,cgstp,sgstp) => {
    return new Promise(function (resolve, reject) {
        var sequenceNumber = sequence.sequenceNum;
        var lineItem       = sequence.expenseItem;
        var rate           = parseFloat(ratein);
        var qty            = qtyin;
        var amount         = parseFloat((rate * qty).toFixed(2));                            
        var taxPercentage  = tax;
        var taxAmount      = parseFloat(((tax/100 * amount)).toFixed(2));
        var cgstAmount     = parseFloat(((cgstp/100 * amount)).toFixed(2));
        var sgstAmount     = parseFloat(((sgstp/100 * amount)).toFixed(2));

        var billingObj = {
                            sequenceNumber : sequenceNumber,
                            billingCode    : billingCode,
                            rate           : rate,
                            qty            : qty,
                            lineItem       : lineItem,
                            taxPercentage  : taxPercentage,
                            taxAmount      : taxAmount,
                            amount         : amount,
                            unit           : unit,
                            cgstAmount     : cgstAmount, 
                            sgstAmount     : sgstAmount, 
                        }; 
        resolve(billingObj);
    });
};

exports.generateBill = (req,res,next)=>{
    console.log("body : ", req.body);

    var generateMultipleBills = async () => {
      var bookingID_Arr = req.body.bookingID;
      for (var i=0; i<bookingID_Arr.length; i++) {
       var result = await returnInvoice(bookingID_Arr[i], req.body.createdBy);
       console.log("result => ",bookingID_Arr[i] + " ====== "+result);
      }
      console.log('after forEach');
    }     
    
    generateMultipleBills().then(() => {
        res.status(200).json({ 
            created   : true,  
            // data      : billdata 
        });
      console.log('done');
    })

};
/*======== getInvoiceNumber() =========*/
var returnInvoice = async (bookingID, createdBy) => {
      return new Promise((resolve, reject) => {
        console.log("bookingID => ",bookingID);
        console.log("createdBy => ",createdBy);

    // BookingMaster.find({ _id : ObjectId(req.body.bookingID) })
    BookingMaster.find({ _id : ObjectId(bookingID) })
    .exec()
    .then(data=>{
        console.log("record : ", data);
        if(data && data.length > 0){
            processData();
            async function processData(){ 
                // var createdBy = req.body.createdBy;
                
                /*=========== ContractData ===========*/
                var contractId      = data[0].contractId;
                var contractDetails = await getContractDetails(contractId);
                // console.log("contractDetails = ",contractDetails);
                /*=========== Applied Package ===========*/
                if (data[0].status && data[0].status.length > 0) {
                    for (var i = 0; i < data[0].status.length; i++) {
                        if (data[0].status[i].value === "Start From Pickup") {
                            var startFromPickup  = data[0].status[i].statusAt;
                        }
                        if (data[0].status[i].value === "Reached Drop Location") {
                            var reachedDropLocation = data[0].status[i].statusAt;
                        }
                    }
                }
                /*=========== Applied Package ===========*/
                var appliedPackageId    = data[0].packageId;
                var processPackageData  = await processPackage(appliedPackageId, contractId, data[0]);
                console.log("processPackageData => ",processPackageData);
                async function processPackage(appliedPackageId, contractId, data){                    
                    var appliedPackagesData = await getAppliedPackagesData(appliedPackageId, contractId);
                    console.log("appliedPackagesData = ",appliedPackagesData);


                    /*=========== Automated Billing Sequence ===========*/
                    var AutomatedBillingSequence = await getAutomatedBillingSequence();
                    // console.log("AutomatedBillingSequence = ",AutomatedBillingSequence[0]);
                    var listItemsArray           = [];

                    if (AutomatedBillingSequence.length>0) {
                        var sequence = AutomatedBillingSequence[0].sequence;

                        for (var i = 0; i < sequence.length; i++) {
                            var sequenceElem    = sequence[i];
                            var billingCode     = sequence[i].billingCode;
                            var expenseTypeId   = sequence[i].expenseTypeId;
                            var expenseType     = await getExpenseType(expenseTypeId);
                            var taxPercent      = expenseType.GSTRate;
                            var CGSTPercent     = expenseType.CGSTRate;
                            var SGSTPercent     = expenseType.SGSTRate;
                            var ratein          = 0;
                            var qtyin           = 0;
                            var unit            = "";
                            switch(billingCode){
                                case 101 : 
                                    /*=========== FixCharges ===========*/
                                    billingCode     = billingCode;
                                    ratein          = appliedPackagesData.fixCharges.toFixed(2);                            
                                    qtyin           = 1;
                                    var billingObj  = await billingObjFun(sequenceElem, ratein, qtyin, taxPercent, unit, billingCode, CGSTPercent, SGSTPercent); 
                                    break;
                                case 201 : 
                                    /*=========== Fuel Surcharge ===========*/
                                    billingCode     = billingCode;
                                    ratein          = 0;                            
                                    qtyin           = 0;
                                    var billingObj  = await billingObjFun(sequenceElem, ratein, qtyin, taxPercent, unit, billingCode, CGSTPercent, SGSTPercent); 
                                    break;
                                case 202 : 
                                    /*=========== ExtraKm Charges ===========*/
                                    var totalKms    = await getTotalKms(data.routeCoordinates);
                                    console.log("************************************* ");
                                    console.log("total Kms => ", totalKms);                                    
                                    var maxKm       = appliedPackagesData.maxKm;
                                    var extraKms    = totalKms > maxKm ? parseFloat((totalKms - maxKm).toFixed(2)) : 0;
                                    console.log("extra Kms => ", extraKms);
                                    console.log("************************************* ");

                                    billingCode     = billingCode;
                                    ratein          = appliedPackagesData.extraKms;
                                    qtyin           = totalKms > maxKm ? parseFloat((totalKms - maxKm).toFixed(2)) : 0;
                                    unit            = qtyin === 0 ? "" : (qtyin > 1 ? "Kms" : "Km");
                                    var billingObj  = await billingObjFun(sequenceElem, ratein, qtyin, taxPercent, unit, billingCode, CGSTPercent, SGSTPercent); 
                                    break;
                                case 203 : 
                                    /*=========== ExtraHr Charges ===========*/                                    
                                    // var totalHrs        = await getTotalHrs(data.pickupTime, data.pickupDate, data.returnTime, data.returnDate);
                                    var totalHrs        = await getTotalHrs(startFromPickup, reachedDropLocation);
                                    var totalHrsInFloat = await convertTimeStringtoFloat(totalHrs);
                                    var maxHours        = appliedPackagesData.maxHours;
                                    var extraHrs        = totalHrsInFloat > maxHours ? await getExtraHrs(totalHrs, maxHours) : 0;
                                    billingCode         = billingCode;
                                    ratein              = appliedPackagesData.extraHr;
                                    qtyin               = totalHrsInFloat > maxHours ? parseFloat((totalHrsInFloat - maxHours).toFixed(2)) : 0;
                                    unit                = qtyin === 0 ? "" : (qtyin > 1 ? "Hrs" : "Hr");
                                    var billingObj      = await billingObjFun(sequenceElem, ratein, qtyin, taxPercent, unit, billingCode, CGSTPercent, SGSTPercent); 
                                    break;
                                case 204 : 
                                    /*=========== Driver Allowance ===========*/
                                    // var totalHrs        = await getTotalHrs(data.pickupTime, data.pickupDate, data.returnTime, data.returnDate);
                                    var totalHrs        = await getTotalHrs(startFromPickup, reachedDropLocation);
                                    var totalHrsInFloat = await convertTimeStringtoFloat(totalHrs);
                                    billingCode         = billingCode;
                                    ratein              = totalHrsInFloat >= 12 ? appliedPackagesData.driverAllowance : 0;
                                    qtyin               = ratein ? 1 : 0;
                                    var billingObj      = await billingObjFun(sequenceElem, ratein, qtyin, taxPercent, unit, billingCode, CGSTPercent, SGSTPercent); 
                                    break;
                                case 205 : 
                                    /*=========== Night Halt Charges ===========*/
                                    var nightHalt = await getNightHaltCharges(data.pickupTime, data.pickupDate, data.returnTime, data.returnDate, appliedPackagesData.nightHalt, data.tripType);
                                    console.log("nightHalt = ",nightHalt);
                                    // var totalHrsInFloat  = await convertTimeStringtoFloat(totalHrs);
                                    billingCode          = billingCode;
                                    ratein               = appliedPackagesData.nightHalt;
                                    qtyin                = nightHalt;
                                    var billingObj       = await billingObjFun(sequenceElem, ratein, qtyin, taxPercent, unit, billingCode, CGSTPercent, SGSTPercent); 
                                    break;
                                case 206 : 
                                    /*=========== Early Morning Charges ===========*/
                                    var earlyMorningChargesFromTime = contractDetails.earlyMorningChargesFromTime;
                                    var earlyMorningChargesToTime   = contractDetails.earlyMorningChargesToTime;
                                    billingCode                     = billingCode;
                                    ratein                          = await getEarlyMorningCharges(data.pickupTime, data.returnTime, earlyMorningChargesFromTime, earlyMorningChargesToTime, appliedPackagesData.morningCharges); 
                                    qtyin                           = ratein ? 1 : 0;
                                    var billingObj                  = await billingObjFun(sequenceElem, ratein, qtyin, taxPercent, unit, billingCode, CGSTPercent, SGSTPercent); 
                                    break;
                                case 207 : 
                                    /*=========== Night Charges ===========*/
                                    var nightChargesFromTime = contractDetails.nightChargesFromTime;
                                    var nightChargesToTime   = contractDetails.nightChargesToTime;
                                    billingCode              = billingCode;
                                    ratein                   = await getNightCharges(data.pickupTime, data.returnTime, nightChargesFromTime, nightChargesToTime, appliedPackagesData.nightCharges);
                                    qtyin                    = ratein ? 1 : 0;
                                    var billingObj           = await billingObjFun(sequenceElem, ratein, qtyin, taxPercent, unit, billingCode, CGSTPercent, SGSTPercent); 
                                    break;
                            }
                            /*=========== Total ===========*/
                            if(billingCode === 001){
                                sequenceNumber  = sequence[i].sequenceNum;
                                lineItem        = sequence[i].expenseItem;
                                var amount      = 0;
                                var taxAmount   = 0;
                                var cgstAmount  = 0;
                                var sgstAmount  = 0;
                                for (var i = 0; i < listItemsArray.length; i++) {
                                    if (sequence[i].billingCode === 11 || 
                                        sequence[i].billingCode === 12 ||
                                        sequence[i].billingCode === 13 ||
                                        sequence[i].billingCode === 14) {
                                        amount     = parseFloat((amount + parseFloat(listItemsArray[i].amount)));                                    
                                    }                               
                                    if (sequence[i].billingCode === 11 || 
                                        sequence[i].billingCode === 12 ) {
                                        taxAmount  = parseFloat((taxAmount + parseFloat(listItemsArray[i].taxAmount)));
                                        cgstAmount = parseFloat((cgstAmount + parseFloat(listItemsArray[i].cgstAmount ? listItemsArray[i].cgstAmount : 0)));
                                        sgstAmount = parseFloat((sgstAmount + parseFloat(listItemsArray[i].sgstAmount ? listItemsArray[i].sgstAmount : 0)));
                                    }                               
                                }
                                var totalAmount = (Math.round(amount)).toFixed(2);
                                var billingObj = {
                                    sequenceNumber : sequence[i].sequenceNum,
                                    lineItem       : sequence[i].expenseItem,
                                    billingCode    : billingCode,
                                    amount         : (Math.round(amount)).toFixed(2),
                                    taxAmount      : taxAmount,
                                    cgstAmount     : cgstAmount,
                                    sgstAmount     : sgstAmount
                                }
                            }else if(billingCode === 901){
                                /*=========== SubTotal A ===========*/
                                sequenceNumber  = sequence[i].sequenceNum;
                                lineItem        = sequence[i].expenseItem;
                                var totalForRounding = 0;
                                for (var i = 0; i < listItemsArray.length; i++) {
                                    if (sequence[i].billingCode === 11 || 
                                        sequence[i].billingCode === 12 ||
                                        sequence[i].billingCode === 13 ||
                                        sequence[i].billingCode === 14) {
                                        totalForRounding = parseFloat((totalForRounding + parseFloat(listItemsArray[i].amount)));                                    
                                    }
                                }
                                // console.log("totalForRounding ==== > ",totalForRounding);
                                var amount      = (Math.round(totalForRounding)-totalForRounding).toFixed(2);
                                var roundingOff = amount;
                                var billingObj = {
                                    sequenceNumber : sequence[i].sequenceNum,
                                    lineItem       : sequence[i].expenseItem,
                                    billingCode    : billingCode,
                                    amount         : amount,
                                    // taxAmount      : taxAmount,
                                    // cgstAmount     : cgstAmount,
                                    // sgstAmount     : sgstAmount
                                }
                            }else if(billingCode === 11){
                                /*=========== SubTotal A ===========*/
                                sequenceNumber  = sequence[i].sequenceNum;
                                lineItem        = sequence[i].expenseItem;
                                var amount      = 0;
                                var taxAmount   = 0;
                                var cgstAmount  = 0;
                                var sgstAmount  = 0;
                                for (var i = 0; i < listItemsArray.length; i++) {
                                    // console.log("SubTotal A = ",listItemsArray[i].amount);
                                    amount     = parseFloat(amount + parseFloat(listItemsArray[i].amount));
                                    taxAmount  = parseFloat((taxAmount + parseFloat(listItemsArray[i].taxAmount)));
                                    cgstAmount = parseFloat((cgstAmount + parseFloat(listItemsArray[i].cgstAmount ? listItemsArray[i].cgstAmount : 0)));
                                    sgstAmount = parseFloat((sgstAmount + parseFloat(listItemsArray[i].sgstAmount ? listItemsArray[i].sgstAmount : 0)));
                                }
                                var billingObj = {
                                    sequenceNumber : sequence[i].sequenceNum,
                                    lineItem       : sequence[i].expenseItem,
                                    billingCode    : billingCode,
                                    amount         : amount,
                                    taxAmount      : taxAmount,
                                    cgstAmount     : cgstAmount,
                                    sgstAmount     : sgstAmount
                                }
                            }else if(billingCode === 12){
                                /*=========== SubTotal B ===========*/
                                sequenceNumber  = sequence[i].sequenceNum;
                                lineItem        = sequence[i].expenseItem;
                                var amount      = 0;
                                var taxAmount   = 0;
                                var cgstAmount  = 0;
                                var sgstAmount  = 0;
                                const subTotalA_index   = sequence.findIndex(obj => obj.billingCode === 11);
                                for (var i = subTotalA_index+1; i < listItemsArray.length; i++) {
                                    amount     = parseFloat(amount + parseFloat(listItemsArray[i].amount));
                                    taxAmount  = parseFloat((taxAmount + parseFloat(listItemsArray[i].taxAmount)));
                                    cgstAmount = parseFloat((cgstAmount + parseFloat(listItemsArray[i].cgstAmount ? listItemsArray[i].cgstAmount : 0)));
                                    sgstAmount = parseFloat((sgstAmount + parseFloat(listItemsArray[i].sgstAmount ? listItemsArray[i].sgstAmount : 0)));
                                }
                                var billingObj = {
                                    sequenceNumber : sequence[i].sequenceNum,
                                    lineItem       : sequence[i].expenseItem,
                                    billingCode    : billingCode,
                                    amount         : amount,
                                    taxAmount      : taxAmount,
                                    cgstAmount     : cgstAmount,
                                    sgstAmount     : sgstAmount
                                }
                            }else if(billingCode === 13){
                                /*=========== SubTotal C ===========*/
                                sequenceNumber  = sequence[i].sequenceNum;
                                lineItem        = sequence[i].expenseItem;
                                var amount      = 0;
                                var taxAmount   = 0;
                                var cgstAmount  = 0;
                                var sgstAmount  = 0;
                                const subTotalB_index   = sequence.findIndex(obj => obj.billingCode === 12);
                                for (var i = subTotalB_index+1; i < listItemsArray.length; i++) {
                                    if (listItemsArray[i].billingCode === 403) {
                                        amount     = parseFloat(amount + 0);
                                        taxAmount  = parseFloat(taxAmount + 0);
                                        cgstAmount = parseFloat(cgstAmount + 0);
                                        sgstAmount = parseFloat(sgstAmount + 0);
                                    }else{
                                        amount     = parseFloat(amount + parseFloat(listItemsArray[i].amount));
                                        taxAmount  = parseFloat((taxAmount + parseFloat(listItemsArray[i].taxAmount)));
                                        cgstAmount = parseFloat((cgstAmount + parseFloat(listItemsArray[i].cgstAmount ? listItemsArray[i].cgstAmount : 0)));
                                        sgstAmount = parseFloat((sgstAmount + parseFloat(listItemsArray[i].sgstAmount ? listItemsArray[i].sgstAmount : 0)));
                                    }
                                }
                                var billingObj = {
                                    sequenceNumber : sequence[i].sequenceNum,
                                    lineItem       : sequence[i].expenseItem,
                                    billingCode    : billingCode,
                                    amount         : amount,
                                    taxAmount      : taxAmount,
                                    cgstAmount     : cgstAmount,
                                    sgstAmount     : sgstAmount
                                }
                            }else if(billingCode === 14){
                                /*=========== SubTotal D ===========*/
                                sequenceNumber  = sequence[i].sequenceNum;
                                lineItem        = sequence[i].expenseItem;
                                var amount      = 0;
                                var taxAmount   = 0;
                                var cgstAmount  = 0;
                                var sgstAmount  = 0;
                                const subTotalC_index   = sequence.findIndex(obj => obj.billingCode === 13);
                                for (var i = subTotalC_index+1; i < listItemsArray.length; i++) {
                                    amount     = parseFloat((amount + parseFloat(listItemsArray[i].amount)));
                                    taxAmount  = parseFloat((taxAmount + parseFloat(listItemsArray[i].taxAmount)));
                                    cgstAmount = parseFloat((cgstAmount + parseFloat(listItemsArray[i].cgstAmount ? listItemsArray[i].cgstAmount : 0)));
                                    sgstAmount = parseFloat((sgstAmount + parseFloat(listItemsArray[i].sgstAmount ? listItemsArray[i].sgstAmount : 0)));
                                }
                                var billingObj = {
                                    sequenceNumber : sequence[i].sequenceNum,
                                    lineItem       : sequence[i].expenseItem,
                                    billingCode    : billingCode,
                                    amount         : amount,
                                    taxAmount      : taxAmount,
                                    cgstAmount     : cgstAmount,
                                    sgstAmount     : sgstAmount
                                }
                            }else if(billingCode === 301){
                                /*=========== Toll ===========*/
                                sequenceNumber     = sequence[i].sequenceNum;
                                lineItem           = sequence[i].expenseItem;
                                var amount         = await getTripExpenses(data.tripExpenses);
                                var taxAmount      = parseFloat(((taxPercent/100 * amount)).toFixed(2));
                                var cgstAmount     = parseFloat(((CGSTPercent/100 * amount)).toFixed(2));
                                var sgstAmount     = parseFloat(((SGSTPercent/100 * amount)).toFixed(2));
                                var billingObj  = {
                                    sequenceNumber : sequence[i].sequenceNum,
                                    lineItem       : sequence[i].expenseItem,
                                    billingCode    : billingCode,
                                    amount         : amount,
                                    taxPercentage  : taxPercent,
                                    taxAmount      : taxAmount,
                                    cgstAmount     : cgstAmount,
                                    sgstAmount     : sgstAmount
                                }
                            }else if(billingCode === 302){
                                /*=========== Parking ===========*/
                                sequenceNumber  = sequence[i].sequenceNum;
                                lineItem        = sequence[i].expenseItem;
                                var amount      = parseFloat((0).toFixed(2));
                                var taxAmount   = parseFloat((0).toFixed(2));
                                var cgstAmount  = parseFloat((0).toFixed(2));
                                var sgstAmount  = parseFloat((0).toFixed(2));
                                var billingObj  = {
                                    sequenceNumber : sequence[i].sequenceNum,
                                    lineItem       : sequence[i].expenseItem,
                                    billingCode    : billingCode,
                                    amount         : amount,
                                    taxAmount      : taxAmount,
                                    cgstAmount     : cgstAmount,
                                    sgstAmount     : sgstAmount
                                }
                            }else if(billingCode === 401){
                                /*=========== CGST ===========*/
                                sequenceNumber  = sequence[i].sequenceNum;
                                lineItem        = sequence[i].expenseItem;
                                var amount      = 0;
                                var taxAmount   = 0;
                                for (var i = 0; i < listItemsArray.length; i++) {
                                    if (sequence[i].billingCode === 11 || 
                                        sequence[i].billingCode === 12 ) {
                                        amount     = parseFloat((amount + parseFloat(listItemsArray[i].cgstAmount)));
                                        taxAmount  = parseFloat((taxAmount + parseFloat(listItemsArray[i].cgstAmount)));
                                    }                                
                                }
                                var billingObj = {
                                    sequenceNumber : sequence[i].sequenceNum,
                                    lineItem       : sequence[i].expenseItem,
                                    billingCode    : billingCode,
                                    amount         : amount,
                                    taxAmount      : taxAmount,
                                }
                            }else if(billingCode === 402){
                                /*=========== SGST ===========*/
                                sequenceNumber  = sequence[i].sequenceNum;
                                lineItem        = sequence[i].expenseItem;
                                var amount      = 0;
                                var taxAmount   = 0;
                                for (var i = 0; i < listItemsArray.length; i++) {
                                    if (sequence[i].billingCode === 11 || 
                                        sequence[i].billingCode === 12 ) {
                                        amount     = parseFloat((amount + parseFloat(listItemsArray[i].sgstAmount)));
                                        taxAmount  = parseFloat((taxAmount + parseFloat(listItemsArray[i].sgstAmount)));
                                    }                                
                                }
                                var billingObj  = {
                                    sequenceNumber : sequence[i].sequenceNum,
                                    lineItem       : sequence[i].expenseItem,
                                    billingCode    : billingCode,
                                    amount         : amount,
                                    taxAmount      : taxAmount
                                }
                            }else if(billingCode === 403){
                                /*=========== IGST ===========*/
                                sequenceNumber  = sequence[i].sequenceNum;
                                lineItem        = sequence[i].expenseItem;
                                var amount      = 0;
                                var taxAmount   = 0;
                                for (var i = 0; i < listItemsArray.length; i++) {
                                    if (sequence[i].billingCode === 11 || 
                                        sequence[i].billingCode === 12 ) {
                                        amount     = parseFloat((amount + parseFloat(listItemsArray[i].taxAmount)));
                                        taxAmount  = parseFloat((taxAmount + parseFloat(listItemsArray[i].taxAmount)));
                                    }                                
                                }
                                var billingObj  = {
                                    sequenceNumber : sequence[i].sequenceNum,
                                    lineItem       : sequence[i].expenseItem,
                                    billingCode    : billingCode,
                                    amount         : amount,
                                    taxAmount      : taxAmount,
                                }
                            }
                            listItemsArray.push(billingObj)
                        }                   
                    }
                    console.log("listItemsArray => ",listItemsArray);
                    /*=========== Total Days ===========*/
                    var totalDays = await getTotalDays(data.pickupDate, data.returnDate);

                    return({
                        listItemsArray  : listItemsArray,
                        totalHrs        : totalHrs,
                        maxHours        : maxHours,
                        totalKms        : totalKms,
                        maxKm           : maxKm,
                        extraHrs        : extraHrs,
                        extraKms        : extraKms,
                        totalAmount     : totalAmount,
                        roundingOff     : roundingOff
                    })
                }
                console.log("processPackageData extraKms => ",processPackageData.extraKms);
                console.log("processPackageData extraHrs => ",processPackageData.extraHrs);

                if (processPackageData.extraKms || processPackageData.extraHrs) {
                    var appliedPackage   = contractDetails.packages.filter( x =>x.packageID.equals(appliedPackageId));
                    var suitablePackages = contractDetails.packages.filter( x => (
                        (x.maxKm         >   appliedPackage[0].maxKm) && 
                        (x.maxHours      >   appliedPackage[0].maxHours) && 
                        (x.carCategoryId === appliedPackage[0].carCategoryId) && 
                        (x.packageTypeId === appliedPackage[0].packageTypeId) && 
                        (x.cityClassId   === appliedPackage[0].cityClassId)));
                    // console.log("packageID = ",appliedPackageId);
                    console.log("package = ",appliedPackage);
                    console.log("suitable Packages = ",suitablePackages);
                    // console.log("packages = ",contractDetails.packages);
                    if(suitablePackages && suitablePackages.length > 0){
                        var appliedPackageTotal = processPackageData.totalAmount;
                        var tempAmount       = 0;
                        for (var i = 0; i < suitablePackages.length; i++) {
                            var suitablePackagesElem = await processPackage(suitablePackages[i].packageID, contractId, data[0]);
                            if (suitablePackagesElem.totalAmount < appliedPackageTotal) {
                                appliedPackageTotal       = suitablePackagesElem.totalAmount;
                                var finalAppliedPackageId = suitablePackagesElem.packageID;
                            } else {
                                var finalAppliedPackageId = appliedPackageId;
                            }
                            console.log("Process Package => ",processPackageData.totalAmount);
                            console.log("suitablePackage[i] => ",suitablePackagesElem.totalAmount);
                            console.log("Min Total => ",appliedPackageTotal);
                        }
                        console.log("suitablePackageId => ",finalAppliedPackageId);
                        var finalAppliedPackage = await processPackage(finalAppliedPackageId, contractId, data[0]);
                        
                        if (appliedPackageId !== finalAppliedPackageId) {
                            var suitableAppliedPackage = finalAppliedPackageId;
                        }                        
                    }else{
                        console.log("no packages found")
                        var finalAppliedPackage = await processPackage(appliedPackageId, contractId, data[0]);
                    }
                } else {
                    console.log("extra in limit")
                    var finalAppliedPackage = await processPackage(appliedPackageId, contractId, data[0]);
                }
                console.log("suitableAppliedPackage = ",suitableAppliedPackage ? suitableAppliedPackage : "");
                /*=========== Invoice Number ===========*/
                var invoiceNumberData = await getInvoiceNumber(createdBy);
                if(invoiceNumberData){
                    var nextYear = parseInt(invoiceNumberData.finantialYear) + 1;
                    var invoiceNumber = "FY" + invoiceNumberData.finantialYear 
                        + "-"+ moment(nextYear, 'YYYY').format('YY')
                        + "/" +invoiceNumberData.invoiceNumber;
                } 

                /*=========== Create Invoice ===========*/
                const billingManagement = new BillingManagement({
                    _id                         : new mongoose.Types.ObjectId(),
                    invoiceNumber               : invoiceNumber,
                    packageTypeId               : data[0].packageTypeId,
                    packageId                   : data[0].packageId,
                    contractId                  : data[0].contractId,
                    booking_Id                  : data[0]._id,
                    bookingId                   : data[0].bookingId,
                    tripType                    : data[0].tripType,
                    pickupFrom                  : data[0].pickupFrom,
                    from                        : data[0].from,
                    to                          : data[0].to,
                    pickupDate                  : data[0].pickupDate,
                    pickupTime                  : data[0].pickupTime,
                    returnDate                  : data[0].returnDate,
                    returnTime                  : data[0].returnTime,   
                    vehicleCategoryId           : data[0].vehicleCategoryId,
                    vehicleID                   : data[0].vehicleID,
                    employeeName                : data[0].employeeName,
                    empId                       : data[0].empId,
                    employeeId                  : data[0].employeeId,
                    employeeUserId              : data[0].employeeUserId,
                    departmentId                : data[0].departmentId,
                    corporateId                 : data[0].corporateId,
                    estimatedCost               : data[0].estimatedCost,
                    intermediateStops           : data[0].intermediateStops,
                    tripExpenses                : data[0].tripExpenses,
                    statusValue                 : data[0].statusValue,
                    routeCoordinates            : data[0].routeCoordinates,
                    allocatedToDriver           : data[0].allocatedToDriver,
                    suitableAppliedPackage      : suitableAppliedPackage,
                    lineItems                   : finalAppliedPackage.listItemsArray,
                    totalHrs                    : finalAppliedPackage.totalHrs,
                    allowedHrs                  : finalAppliedPackage.maxHours,
                    totalKms                    : finalAppliedPackage.totalKms,
                    allowedKms                  : finalAppliedPackage.maxKm,
                    extraHrs                    : finalAppliedPackage.extraHrs,
                    extraKms                    : finalAppliedPackage.extraKms,
                    payment                     : 0,
                    totalAmount                 : finalAppliedPackage.totalAmount,
                    balance                     : finalAppliedPackage.totalAmount,
                    roundingOff                 : finalAppliedPackage.roundingOff,
                    status                      : data[0].status,
                    statusValue                 : "Unpaid",
                    masterinvoice               : "No",
                    createdBy                   : createdBy,
                    // createdBy                   : req.body.createdBy,
                    createdAt                   : new Date()
                })
                billingManagement.save()
                .then(billdata=>{
                    console.log("billdata = ",billdata);
                    if (billdata) {
                        var status = {
                            value             : "Bill Generated",
                            statusBy          : createdBy,
                            statusAt          : new Date()
                        }
                        processStatus();
                        async function processStatus(){ 
                            var changeStatus = await changeBookingStatus(bookingID, status, createdBy,billdata._id);
                            console.log("changeStatus = ", changeStatus);
                        }                        
                    }
                    // res.status(200).json({ 
                    //     created   : true,  
                    //     data      : billdata 
                    // });
                    resolve(true);
                })
                .catch(err =>{
                    // res.status(500).json({ error : err });
                    reject(err);
                });
             }
        }else{
          console.log("no data = ")
        }
    })
    .catch(err =>{
        // res.status(500).json({error : err})
        reject(err);
    }) 


    });
    }
/*======== getInvoiceNumber() =========*/
var getInvoiceNumber = async (createdBy) => {
    return new Promise(function (resolve, reject) {
        var currentYear = moment().year();
        InvoiceNumber.find({"finantialYear" : currentYear})
            .sort({createdAt: -1})
            .exec()
            .then(data=>{
                if(data && data.length > 0){
                  var invoiceNo = data[0].invoiceNumber + 1;
                }else{
                  var invoiceNo = 1;
                } 
                const invoiceNumber = new InvoiceNumber({
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
};
/*======== getContractDetails() =========*/
var getContractDetails = async (contractId) => {
    return new Promise(function (resolve, reject) {
        Contracts.findOne({_id : contractId})
            .exec()
            .then(data=>{                
                if(data){   
                    // console.log("contract = ",data);               
                    resolve(data);                              
                }           
            })
            .catch(err =>{
                reject(err);
            });
        });
};
/*======== getExpenseType() =========*/
var getExpenseType = async (expenseTypeId) => {
    return new Promise(function (resolve, reject) {
        ExpenseType.findOne({_id : expenseTypeId})
            .exec()
            .then(data=>{                
                if(data){                  
                    resolve(data);                              
                }           
            })
            .catch(err =>{
                reject(err);
            });
        });
};
/*======== getAutomatedBillingSequence() =========*/
var getAutomatedBillingSequence = async () => {
    return new Promise(function (resolve, reject) {
        AutomatedSequence.find()
            .exec()
            .then(data=>{                
                if(data){ 
                    // console.log("AutomatedSequence Data = ",data[0]);                 
                    resolve(data);                              
                }           
            })
            .catch(err =>{
                reject(err);
            });
        });
};
/*======== getAppliedPackagesData() =========*/
var getAppliedPackagesData = async (packageId, contractId) => {
    console.log("packageId => ",packageId);
    console.log("contractId => ",contractId);
    return new Promise(function (resolve, reject) {
        Contracts.findOne({_id : contractId})
            .exec()
            .then(data=>{                
                if(data){
                  var packages = data.packages;
                  if(packages.length > 0){
                    for (var i = 0; i < packages.length; i++) {                      
                        if(packageId.equals(packages[i].packageID)){
                            resolve(packages[i]);                              
                        }
                    }
                  }
                }              
            })
            .catch(err =>{
                reject(err);
            });
        });
};
/*======== changeBookingStatus() =========*/
var changeBookingStatus = async (bookingID, status, createdBy, invoiceId) => {
    return new Promise(function (resolve, reject) {

        BookingMaster.updateOne(
            { _id:bookingID },  
            {
                $push:  {  
                            "status"  : status,
                        },
                $set:  {
                            "statusValue"  : status.value,
                            "invoiceId"    :invoiceId
                        }
            }
        )                        
        .exec()
        .then(booking=>{
            if(booking.nModified == 1){
                BookingMaster.updateOne(
                { _id:bookingID},
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
/*======== getExtraKmCharges() =========*/
var getExtraKmCharges = async (totalKms, minKms, extraKmCharges) => {
    return new Promise(function (resolve) {
        var chargesForExtraKms = ((totalKms - minKms) * extraKmCharges);
        resolve(chargesForExtraKms);
    })
};
/*======== getTotalKms() =========*/
var getTotalKms = async (routeCoordinates) => {
    return new Promise(function (resolve) {
        // console.log("routeCoordinates = ",routeCoordinates);
        if (routeCoordinates.length > 0) {
            var totalDistance = 0;            
            for (var i = 0; i < routeCoordinates.length; i++) {
                totalDistance += parseFloat(routeCoordinates[i].distanceTravelled ? routeCoordinates[i].distanceTravelled : 0);
            }
        }else{
            var totalDistance = 0; 
        }
        resolve(totalDistance.toFixed(2));
    })
};
/*======== getTripExpenses() =========*/
var getTripExpenses = async (tripExpenses) => {
    return new Promise(function (resolve) {
        if (tripExpenses && tripExpenses.length > 0) {
            var expenseAmt = 0;
            for (var i = 0; i < tripExpenses.length; i++) {
                expenseAmt = expenseAmt + parseFloat(tripExpenses[i].ticketPrice);
            }
            resolve(expenseAmt);
        }else{
            resolve(0);
        }
    })
};
/*======== getExtraHrCharges() =========*/
var getExtraHrCharges = async (totalHrs, minHrs, extraHrCharges) => {
    return new Promise(function (resolve) {
        var chargesForExtraHrs = ((totalHrs - minHrs) * extraHrCharges).toFixed(2);
        resolve(chargesForExtraHrs);
    })
};
/*======== getTotalHrs() =========*/
// var getTotalHrs = async (pickupTime, pickupDate, returnTime, returnDate) => {
//     return new Promise(function (resolve) {
//         var startTime = moment(pickupTime, "HH:mm").format("HH:mm");
//         var startDate = moment(pickupDate, "DD/MM/YYYY").format("DD/MM/YYYY");
//         var endTime   = moment(returnTime, "HH:mm").format("HH:mm");
//         var endDate   = moment(returnDate, "DD/MM/YYYY").format("DD/MM/YYYY");

//         var startDateTime = startDate + " " + startTime;
//         var endDateTime   = endDate + " " + endTime;
//         var ms            = moment(endDateTime,"DD/MM/YYYY HH:mm").diff(moment(startDateTime,"DD/MM/YYYY HH:mm"));
//         var duration      = moment.duration(ms);
//         var timeDiffrence = Math.floor(duration.asHours()) + moment.utc(ms).format(":mm");
        
//         console.log("timeDiffrence => ",timeDiffrence);

//         resolve(timeDiffrence);
//     })
// };
var getTotalHrs = async (pickupDateTime, returnDateTime) => {
    return new Promise(function (resolve) {
        var startDateTime = moment(pickupDateTime, "DD/MM/YYYY HH:mm").format("DD/MM/YYYY HH:mm");
        var endDateTime   = moment(returnDateTime, "DD/MM/YYYY HH:mm").format("DD/MM/YYYY HH:mm");

        var ms            = moment(endDateTime,"DD/MM/YYYY HH:mm").diff(moment(startDateTime,"DD/MM/YYYY HH:mm"));
        var duration      = moment.duration(ms);
        var timeDiffrence = Math.floor(duration.asHours()) + moment.utc(ms).format(":mm");
        
        console.log("****************");
        console.log("timeDiffrence => ",timeDiffrence);
        console.log("****************");

        resolve(timeDiffrence);
    })
};
/*======== getExtraHrs() =========*/
var getExtraHrs = async (totalTime, allowedTime) => {
    return new Promise(function (resolve) {
        var now = Date.now();
        var startTime = moment.utc(allowedTime, "HH:mm");
        var endTime   = moment.utc(totalTime, "HH:mm");
        var duration  =  moment.duration(endTime.diff(startTime));
        var extraHrs  = moment.utc(+duration).format('HH:mm');

        console.log("extraHrs => ",extraHrs);
        resolve(extraHrs);
    })
};
/*======== convertTimeStringtoFloat() =========*/
var convertTimeStringtoFloat = async (timeString) => {
    return new Promise(function (resolve) {
        var hoursMinutes         = timeString.split(/[.:]/);
        var hours                = parseInt(hoursMinutes[0], 10);
        var minutes              = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
        var timeDiffrenceInFloat = (hours + minutes / 60).toFixed(2);

        resolve(timeDiffrenceInFloat);       
    })
};
/*======== getTotalDays() =========*/
var getTotalDays = async (pickupDate, returnDate) => {
    return new Promise(function (resolve) {
        var startDate   = new Date(pickupDate);
        var endDate     = new Date(returnDate);
        var timeDiff    = Math.abs(endDate.getTime() - startDate.getTime());
        var totalDays   = Math.ceil(timeDiff / (1000 * 3600 * 24));
        
        console.log("totalDays => ",totalDays+1);

        resolve(totalDays+1);
    })
};
/*======== getNightHaltCharges() =========*/
var getNightHaltCharges = async (pickupTime, pickupDate, returnTime, returnDate, nightHaltCharges, tripType) => {
    return new Promise(function (resolve) {
        if (tripType.toLowerCase() === "local") {
            var startTime   = moment(pickupTime, "HH:mm");
            var endTime     = moment(returnTime, "HH:mm");
            var beforeTime  = moment("23:00", "HH:mm");
            var afterTime   = moment("18:00", "HH:mm");
            afterTime.add(1, "days");
            
            if ((moment(startDate).isBefore(beforeTime) && moment(endTime).isAfter(afterTime))) 
            {
                console.log("local night halts = ",1);
                resolve(1);            
            }else{  
                console.log("local night halts = ",0);          
                resolve(0);
            } 
        }else{
            var startDate       = new Date(pickupDate);
            var endDate         = new Date(returnDate);
            var timeDiff        = Math.abs(endDate.getTime() - startDate.getTime());
            var numberOfNights  = Math.ceil(timeDiff/ (1000 * 3600 * 24));

            console.log("outstation night Halts => ",numberOfNights);
            resolve(numberOfNights);
        }
    })
};
/*======== getEarlyMorningCharges() =========*/
var getEarlyMorningCharges = async (pickupTime, returnTime, earlyMorningChargesFromTime, earlyMorningChargesToTime, earlyMorningCharges) => {
    return new Promise(function (resolve) {
        console.log("morning charges start = ",earlyMorningChargesFromTime);
        console.log("morning charges end = ",earlyMorningChargesToTime);
        console.log("pickupTime = ",pickupTime);
        console.log("returnTime = ",returnTime);

        var startTime   = moment(pickupTime, "HH:mm");
        var endTime     = moment(returnTime, "HH:mm");

        var earlyMorningChargesFromTime1 = moment(earlyMorningChargesFromTime, "HH:mm");
        var earlyMorningChargesToTime1   = moment(earlyMorningChargesToTime, "HH:mm");
        
        if ((startTime.isBefore(earlyMorningChargesFromTime1) && endTime.isAfter(earlyMorningChargesToTime1)) || 
            (startTime.isBetween(moment(earlyMorningChargesFromTime1), moment(earlyMorningChargesToTime1))) ||
            (endTime.isBetween(moment(earlyMorningChargesFromTime1), moment(earlyMorningChargesToTime1))) || 
            (startTime.isSame(earlyMorningChargesFromTime1))){
            console.log("earlyMorningCharges = ", earlyMorningCharges);
            resolve(earlyMorningCharges);
        }else{  
            console.log("earlyMorningCharges = ", 0);          
            resolve(0);
        }       
    })
};
/*======== getNightCharges() =========*/
var getNightCharges = async (pickupTime, returnTime, nightChargesFromTime, nightChargesToTime, nightCharges) => {
    return new Promise(function (resolve) {
        console.log("night charges start = ",nightChargesFromTime);
        console.log("night charges end = ",nightChargesToTime); 

        var startTime = moment(pickupTime, "HH:mm");
        var endTime   = moment(returnTime, "HH:mm");

        var nightChargesFromTime1 = moment(nightChargesFromTime, "HH:mm");
        var nightChargesToTime1   = moment(nightChargesToTime, "HH:mm");
        
        if((nightChargesFromTime1.hour() >=12 && nightChargesToTime1.hour() <=12 ) || nightChargesToTime1.isBefore(nightChargesFromTime1)){
            nightChargesToTime1.add(1, "days");
            // endTime.add(1, "days");
            if (endTime.hour() <= 12){
                endTime.add(1, "days");
            }
            if (startTime.hour() <= 12){
                startTime.add(1, "days");
            }

            if(((startTime.isBetween(moment(nightChargesFromTime1), moment(nightChargesToTime1))) || 
                (endTime.isBetween(moment(nightChargesFromTime1), moment(nightChargesToTime1))) || 
                (startTime.isBefore(nightChargesFromTime1) && endTime.isAfter(nightChargesToTime1)) || 
                (startTime.isBefore(nightChargesFromTime1) && endTime.isSame(nightChargesToTime1)) || 
                (startTime.isSame(nightChargesFromTime1) && endTime.isAfter(nightChargesToTime1)) || 
                (startTime.isSame(nightChargesFromTime1) && endTime.isSame(nightChargesToTime1)))){
                resolve(nightCharges);
                console.log("nightcharges 1 if = ",nightCharges);
            }else{
                resolve(0);
                console.log("nightcharges 1 else = ",0);
            }  
        }else{
            if (nightChargesToTime1.hour() > endTime.hour()){
                endTime.add(1, "days");
            }
            if(((startTime.isBetween(moment(nightChargesFromTime1), moment(nightChargesToTime1))) || 
                (endTime.isBetween(moment(nightChargesFromTime1), moment(nightChargesToTime1))) || 
                (startTime.isBefore(nightChargesFromTime1) && endTime.isAfter(nightChargesToTime1)) || 
                (startTime.isBefore(nightChargesFromTime1) && endTime.isSame(nightChargesToTime1)) || 
                (startTime.isSame(nightChargesFromTime1) && endTime.isAfter(nightChargesToTime1)) || 
                (startTime.isSame(nightChargesFromTime1) && endTime.isSame(nightChargesToTime1)))){
                resolve(nightCharges);
                console.log("nightcharges 2 if = ",nightCharges);
            }else{
                resolve(0);
                console.log("nightcharges 2 else = ",0);
            }
        }  
    })
};
/*======== calculateTotalAmount() =========*/
var calculateTotalAmount = async (fixCharges, chargesForExtraKms, chargesForExtraHrs, driverAllowance, nightHaltCharges, earlyMorningCharges, nightCharges) => {
    return new Promise(function (resolve) {        
        var totalAmount = (fixCharges + chargesForExtraKms + chargesForExtraHrs + driverAllowance + nightHaltCharges + earlyMorningCharges + nightCharges);
        resolve(totalAmount);             
    })
};
/*======== getAllInvoices() =========*/
exports.getAllInvoices = (req, res, next)=>{
    console.log("limits => ",req.body)
    BillingManagement.aggregate([{
            $lookup:
                {
                   from         : "entitymasters",
                   localField   : "corporateId",
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
        .sort({createdAt : -1})
        .exec()
        .then(data=>{
            console.log("data => ",data);
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        });
};
/*======== getAllInvoices() =========*/
exports.getAllPaidInvoices = (req, res, next)=>{
    BillingManagement.aggregate([{
            $lookup:
                {
                   from         : "entitymasters",
                   localField   : "corporateId",
                   foreignField : "_id",
                   as           : "companyDetails"
                }
            },
            { "$match": 
                { 
                    "statusValue": "Paid" 
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
        .sort({createdAt : -1})
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        });
};
/*======== getAllInvoices() =========*/
exports.getAllUnpaidInvoices = (req, res, next)=>{
    BillingManagement.aggregate([{
            $lookup:
                {
                   from         : "entitymasters",
                   localField   : "corporateId",
                   foreignField : "_id",
                   as           : "companyDetails"
                }
            },
            { "$match": 
                { 
                    "statusValue": "Unpaid" 
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
        .sort({createdAt : -1})
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        });
};
/*======== getOneInvoice() =========*/
exports.getOneInvoice = (req, res, next)=>{
    console.log("id : ", req.params.invoiceID)
    BillingManagement.aggregate([{
            $lookup:
                {
                   from         : "entitymasters",
                   localField   : "corporateId",
                   foreignField : "_id",
                   as           : "companyDetails"
                }
            },
            {$lookup:
                {
                   from         : "vehiclemasters",
                   localField   : "vehicleID",
                   foreignField : "_id",
                   as           : "vehicleDetails"
                }
            },
            {$lookup:
                {
                   from         : "personmasters",
                   localField   : "employeeId",
                   foreignField : "_id",
                   as           : "employeeDetails"
                }
            },
            {$lookup:
                {
                   from         : "departmentmasters",
                   localField   : "employeeDetails.departmentId",
                   foreignField : "_id",
                   as           : "employeeDepartment"
                }
            },
            {$lookup:
                {
                   from         : "designationmasters",
                   localField   : "employeeDetails.designationId",
                   foreignField : "_id",
                   as           : "employeeDesignation"
                }
            },
            {"$match" :
                {
                    "_id" : ObjectId(req.params.invoiceID)
                }
            },
            { "$match": 
                { 
                    "status.value": "Trip Allocated To Driver" 
                } 
            },
            { $lookup: 
                {
                     from         : "personmasters",
                     localField   : "allocatedToDriver",
                     foreignField : "_id",
                     as           : "driver"
                }
            },
            { $lookup: 
                {
                     from         : "contracts",
                     localField   : "contractId",
                     foreignField : "_id",
                     as           : "contract"
                }
            },
        ])
        .sort({createdAt : 1})
        .exec()
        .then(data=>{
            main();
            async function main(){
            var indata = data[0];
            if (indata.vehicleDetails && indata.vehicleDetails.length > 0) {
                var vehicleDetails = {
                    category        : indata.vehicleDetails[0].category,
                    brand           : indata.vehicleDetails[0].brand,
                    model           : indata.vehicleDetails[0].model,
                    vehicleNumber   : indata.vehicleDetails[0].vehicleNumber,
                    vehiclecolor    : indata.vehicleDetails[0].vehiclecolor,
                }
            }

            if (indata.employeeDepartment && indata.employeeDepartment.length > 0) {
                var employeeDepartment = indata.employeeDepartment[0].department;
            }

            if (indata.employeeDesignation && indata.employeeDesignation.length > 0) {
                var employeeDesignation = indata.employeeDesignation[0].designation;
            }

            if (indata.employeeDetails && indata.employeeDetails.length > 0) {
                var employeeDetails = {
                    companyName     : indata.employeeDetails[0].companyName,
                    companyID       : indata.employeeDetails[0].companyID,
                    firstName       : indata.employeeDetails[0].firstName,
                    middleName      : indata.employeeDetails[0].middleName,
                    lastName        : indata.employeeDetails[0].lastName,
                    contactNo       : indata.employeeDetails[0].contactNo,
                    altContactNo    : indata.employeeDetails[0].altContactNo,
                    email           : indata.employeeDetails[0].email,
                    employeeId      : indata.employeeDetails[0].employeeId,
                    department      : employeeDepartment,
                    designation     : employeeDesignation,
                }
            }

            if (indata.driver && indata.driver.length > 0) {
                var driver = {
                    companyName     : indata.driver[0].companyName,
                    companyID       : indata.driver[0].companyID,
                    firstName       : indata.driver[0].firstName,
                    middleName      : indata.driver[0].middleName,
                    lastName        : indata.driver[0].lastName,
                    contactNo       : indata.driver[0].contactNo,
                    altContactNo    : indata.driver[0].altContactNo,
                    email           : indata.driver[0].email,
                    employeeId      : indata.driver[0].employeeId,
                }
            }

            if (indata.status && indata.status.length > 0) {

                for (var i = 0; i < indata.status.length; i++) {
                    if (indata.status[i].value === "Started From Garage") {
                        var startFromGarage = {
                            status          : indata.status[i].value,
                            odometerReading : indata.status[i].odometerReading,
                            dateTime        : indata.status[i].statusAt,
                        };
                    }
                    if (indata.status[i].value === "Start From Pickup") {
                        var startFromPickup     = {
                            status          : indata.status[i].value,
                            odometerReading : indata.status[i].odometerReading,
                            dateTime        : indata.status[i].statusAt,
                        };
                    }
                    if (indata.status[i].value === "Reached Drop Location") {
                        var reachedDropLocation = {
                            status          : indata.status[i].value,
                            odometerReading : indata.status[i].odometerReading,
                            dateTime        : indata.status[i].statusAt,
                        };
                    }
                    if (indata.status[i].value === "Reached Garage") {
                        var reachedGarage = {
                            status          : indata.status[i].value,
                            odometerReading : indata.status[i].odometerReading,
                            dateTime        : indata.status[i].statusAt,
                        };
                    }
                }

                var travelDetails = {
                    startFromGarage    : startFromGarage,
                    startFromPickup    : startFromPickup,
                    reachedDropLocation: reachedDropLocation,
                    reachedGarage      : reachedGarage,
                    totalHrs           : indata.totalHrs,
                    allowedHrs         : indata.allowedHrs,
                    extraHrs           : indata.extraHrs,
                    totalKms           : indata.totalKms,
                    allowedKms         : indata.allowedKms,
                    extraKms           : indata.extraKms,
                }
            }

            if (indata.contract.length > 0 && indata.contract[0].packages.length > 0) {
                var packagesin = indata.contract[0].packages;
                console.log("packagesin => ",packagesin);
                console.log("package Id => ",indata.packageId);
                var appliedPackage = packagesin.filter((elem)=>{
                    return elem.packageID.equals(indata.packageId)
                });
                console.log("appliedPackage => ",appliedPackage);
            }

            res.status(200).json({
                invoice_id      : indata._id,
                tripExpenses    : indata.tripExpenses,
                invoiceNumber   : indata.invoiceNumber,
                booking_Id      : indata.booking_Id,
                bookingId       : indata.bookingId,
                lineItems       : indata.lineItems,
                payment         : indata.payment,
                totalAmount     : indata.totalAmount,
                balance         : indata.balance,
                companyDetails  : indata.companyDetails,
                vehicleDetails  : vehicleDetails,
                employeeDetails : employeeDetails,
                driver          : driver,
                appliedPackage  : appliedPackage,
                travelDetails   : travelDetails,
                routeDetails    : indata.routeCoordinates,
                createdAt       : indata.createdAt,
            });
        }
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        });
};
/*======== getCompanyWiseInvoices() =========*/
exports.getCompanywiseInvoices = (req, res, next)=>{
    console.log("getCompanywiseInvoices => ",req.body);
    if(req.body.company && req.body.company != "All"){
        var company          = {"corporateId" : ObjectId(req.body.company) }
        var masterinvoiceVar = 'No'
    }else{
        var company          = {"corporateId": {$ne : ""} }
        var masterinvoiceVar = {$ne : ""}
    }
    if(req.body.department && req.body.company != "All"){
        var department = {"departmentId" : ObjectId(req.body.department) }
    }else{
        var department = {"departmentId" : {$ne : ""} }
    }
    if(req.body.employee && req.body.company != "All"){
        var empId        = { $regex : req.body.employee, $options : "i" };
        var employeeName = { $regex : req.body.employee, $options : "i" };
    }else{
        var empId        = {$ne : ""}
        var employeeName = {$ne : ""}
    }
    if(req.body.status === "All"){
        var status       = {"statusValue" : {$ne : ""} }
    }else if(req.body.status === "Paid"){
        var status       = { "statusValue" : "Paid"}
    }else if(req.body.status === "Unpaid"){
        var status       = { "statusValue" : "Unpaid", "masterinvoice" : masterinvoiceVar}
    }


    BillingManagement.aggregate([
        {$match : company},
        {$match : department},
        {$match:
            {
                $or :
                    [
                        { "empId"        : empId },
                        { "employeeName" : employeeName },
                    ]
            }
        },
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
               localField   : "corporateId",
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
        // console.log("data=>",data);
        res.status(200).json(data);
    })
    .catch(err =>{
        res.status(500).json({ error: err });
    });
}
/*======== getEmployeeWiseInvoices() =========*/
exports.getEmployeeWiseInvoices = (req,res,next)=>{
    console.log("req.body = ", req.body);
    BillingManagement.aggregate([
        {$match:
            {
                $or:
                    [
                        { "empId"        : { $regex: req.body.str, $options: "i" } },
                        { "employeeName" : { $regex: req.body.str, $options: "i" } },
                    ]
            }
        },
        {$lookup:
            {
               from         : "entitymasters",
               localField   : "corporateId",
               foreignField : "_id",
               as           : "companyDetails"
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
       
};