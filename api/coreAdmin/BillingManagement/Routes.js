const express 	= require("express");
const router 	= express.Router();

const billingManagement = require('./Controller.js');

router.post('/post', 						billingManagement.generateBill);

router.post('/get/allPaidList', 		    billingManagement.getAllPaidInvoices);

router.post('/get/allUnpaidList', 			billingManagement.getAllUnpaidInvoices);

router.post('/get/allList', 				billingManagement.getAllInvoices);

router.get('/get/invoice/:invoiceID', 		billingManagement.getOneInvoice);

router.post('/get/getCompanywiseInvoice', 	billingManagement.getCompanywiseInvoices);

router.post('/get/getEmployeewiseInvoice', 	billingManagement.getEmployeeWiseInvoices);


module.exports = router;