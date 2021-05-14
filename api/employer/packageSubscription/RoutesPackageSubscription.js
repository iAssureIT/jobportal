const express 			= require("express");
const router 			= express.Router();
const PackageSubscription 	= require('./ControllerPackageSubscription.js');

router.post('/post', PackageSubscription.create_order);

router.get('/paymentOrderDetails/:paymentOrderId', PackageSubscription.paymentOrderDetails);

router.get('/payment-response/:order_id', PackageSubscription.payment_response);

module.exports = router;