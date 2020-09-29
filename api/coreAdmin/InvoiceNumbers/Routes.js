const express 	= require("express");
const router 	= express.Router();

const invoiceNumber = require('./Controller.js');

router.post('/post', invoiceNumber.insertInvoiceNumber);

module.exports = router;