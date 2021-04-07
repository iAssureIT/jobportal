const express 	= require("express");
const router 	= express.Router();

const stateMaster = require('./ControllerStates.js');


router.get('/get/list/:countryCode', stateMaster.getAllStates);

module.exports = router;