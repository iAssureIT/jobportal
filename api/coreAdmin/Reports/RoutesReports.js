const express 	= require("express");
const router 	= express.Router();
const checkAuth = require('../middlerware/check-auth.js');

const reports = require('./ControllersReports.js');

router.get('/getCompany/:entityType', reports.getCompanyLocationData);

router.post('/get/getcorporateBookingList', reports.getCorporateReports);

router.post('/get/corporateReportsfilter', reports.corporateReportsfilter);

router.post('/get/getVendorBookingList', reports.getVendorReports);

router.post('/get/vendorReportsfilter', reports.vendorReportsfilter);

router.post('/get/userlist', reports.getdUserReports);

router.post('/get/filtereduserlist', reports.getAdminfilteredUserReports);

router.post('/get/getEmployeeBookingList', reports.getEmployeeReport);

router.post('/get/employeeReportsfilter', reports.employeeReportsfilter);



module.exports = router;