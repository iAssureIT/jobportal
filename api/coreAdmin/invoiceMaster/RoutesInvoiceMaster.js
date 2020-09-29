const express 	= require("express");
const router 	= express.Router();

const InvoiceMasterContoller = require('./ControllerInvoiceMaster.js');

router.post('/post',             	  			InvoiceMasterContoller.insertInvoice);

router.post('/changeStatusToPaid',  			InvoiceMasterContoller.changeStatusToPaid);

router.post('/get/filteredUnpaidMasterBills',  	InvoiceMasterContoller.filteredUnpaidMasterBills);

router.post('/get/filteredPaidMasterBills',  	InvoiceMasterContoller.filteredPaidMasterBills);

router.get('/singleInvoice/:id', 				InvoiceMasterContoller.singleInvoice);

router.post('/get/unpaid/allList',   			InvoiceMasterContoller.allUnpaidInvoice);

router.post('/get/paid/allList',     			InvoiceMasterContoller.allPaidInvoice);

module.exports = router;


