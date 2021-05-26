const express 			= require("express");
const router 			= express.Router();
const PackageSubscription 	= require('./ControllerPackageSubscription.js');

router.post('/post', PackageSubscription.create_order);

router.get('/paymentOrderDetails/:paymentOrderId', PackageSubscription.paymentOrderDetails);

router.get('/subscription-details/:company_id', PackageSubscription.subscriptionDetails);

router.patch('/payment-response', PackageSubscription.payment_response);

module.exports = router;