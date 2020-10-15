const express 	= require("express");
const router 	= express.Router();

const subIndustryMaster = require('./ControllerSubIndustryMaster.js');

router.post('/post', subIndustryMaster.insertSubIndustry);

router.post('/get/list', subIndustryMaster.fetchSubIndustries);

router.get('/get/list', subIndustryMaster.getSubIndustries);

router.get('/get/functionalArealist/:id', subIndustryMaster.fetchSubIndustryData); 

router.get('/get/count', subIndustryMaster.countSubIndustries);
 
router.get('/get/one/:fieldID', subIndustryMaster.fetchSingleSubIndustry);

router.get('/search/:str', subIndustryMaster.searchSubIndustry);

router.patch('/patch', subIndustryMaster.updateSubIndustry);

router.delete('/delete/:fieldID', subIndustryMaster.deleteSubIndustry);

router.post('/bulkUploadModel',subIndustryMaster.bulkUploadSubIndustry);

router.get('/get/filedetails/:fileName', subIndustryMaster.filedetails);

router.post('/get/files', subIndustryMaster.fetch_file); 


module.exports = router;