const express 	= require("express");
const router 	= express.Router();

const industryMaster = require('./ControllerIndustryMaster.js');
const checkAuth 	 = require('../../middleware/check-auth.js');

router.post('/post', industryMaster.insertIndustry);

router.post('/get/list', checkAuth, industryMaster.fetchIndustries);

router.get('/get/list', industryMaster.getIndustries);

router.get('/get/count', industryMaster.countIndustries);

router.get('/get/one/:fieldID', industryMaster.fetchSingleIndustry);

router.get('/search/:str', industryMaster.searchIndustry);

router.patch('/patch', industryMaster.updateIndustry);

router.delete('/delete/:fieldID', industryMaster.deleteIndustry);

router.post('/bulkUploadIndustry',industryMaster.bulkUploadIndustry);

router.post('/get/files', industryMaster.fetch_file); 

router.get('/get/filedetails/:fileName', industryMaster.filedetails);

module.exports = router;