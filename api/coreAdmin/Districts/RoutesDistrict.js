const express 	= require("express");
const router 	= express.Router();

const districtMaster = require('./ControllerDistricts.js');


router.get('/get/list/:countryCode/:stateCode', districtMaster.getDistricts);

router.post('/post/bulkinsert', districtMaster.bulkinsert);

//router.get('/get/files',districtMaster.fetch_file);

//router.get('/get/files/count',districtMaster.fetch_file_count);

router.get('/get/filedetails/:fileName',districtMaster.filedetails);

 
module.exports = router;