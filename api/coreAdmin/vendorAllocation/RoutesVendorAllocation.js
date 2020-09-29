const express 	= require("express");
const router 	= express.Router();

const VendorAllocation = require('./ControllerVendorAllocation.js');

router.post('/post', VendorAllocation.insertVendorAllocation);

router.post('/get/list', VendorAllocation.fetchVendorAllocations);

router.get('/get/list', VendorAllocation.getVendorAllocations);

router.get('/get/count', VendorAllocation.countVendorAllocations);

router.get('/get/joinentities/:mappingID', VendorAllocation.joinentities);

router.get('/get/joinentitieslist', VendorAllocation.joinentitieslist);

router.get('/get/one/:mappingID', VendorAllocation.fetchSingleVendorAllocation);

router.get('/get/getCompanyCount/:company', VendorAllocation.getCompanyCount);

router.patch('/patch', VendorAllocation.updateVendorAllocation);

router.post('/filterVendorAllocation', VendorAllocation.filterVendorAllocation);

router.get('/search/:str', VendorAllocation.searchVendorAllocation);

router.delete('/delete/:mappingID', VendorAllocation.deleteVendorAllocation);

module.exports = router;