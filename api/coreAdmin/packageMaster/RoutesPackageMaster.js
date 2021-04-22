const express 	= require("express");
const router 	= express.Router();

const packageMaster = require('./ControllerPackageMaster.js');

router.post('/post', packageMaster.insertPackage);

router.post('/get/list', packageMaster.fetchPackages);

router.get('/get/list', packageMaster.fetchListPackages);

router.get('/get/count', packageMaster.countPackages);

router.get('/get/one/:package_id', packageMaster.fetchSinglePackage);

router.patch('/patch', packageMaster.updatePackage);

router.delete('/delete/:package_id', packageMaster.deletePackage);

module.exports = router;