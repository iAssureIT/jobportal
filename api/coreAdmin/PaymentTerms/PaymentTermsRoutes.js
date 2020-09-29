const express 	= require("express");
const router 	= express.Router();

const paymentTerms = require('./PaymentTermsController.js');

router.post('/post', paymentTerms.insertPaymentTerms);

router.patch('/patch', paymentTerms.updatePaymentTerms); 

router.get('/get/list', paymentTerms.getPaymentTerms);

router.get('/get/one/:paymentTerms_id', paymentTerms.fetchSinglePaymentTerms);

router.delete('/delete/:paymentTerms_id', paymentTerms.deletePaymentTerms);


module.exports = router;