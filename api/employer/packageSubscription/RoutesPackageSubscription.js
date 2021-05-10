const express 			= require("express");
const router 			= express.Router();
const PackageSelection 	= require('./ControllerPackageSubscription.js');

router.post('/post', PackageSelection.create_order);

module.exports = router;