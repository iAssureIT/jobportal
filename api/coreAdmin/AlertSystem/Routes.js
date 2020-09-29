const express 	= require("express");
const router 	= express.Router();

const alertSystem = require('./Controller.js');

router.get('/vendorAcceptanceAlert', alertSystem.vendorAcceptanceAlert);

module.exports = router;