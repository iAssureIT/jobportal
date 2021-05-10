const express 	= require("express");
const router 	= express.Router();

const jobTypeMaster = require('./ControllerJobType.js');
const checkAuth 	 = require('../../middleware/check-auth.js');

router.post('/post', jobTypeMaster.insertJobType);

router.post('/get/list', checkAuth, jobTypeMaster.fetchJobTypes);

router.get('/get/list', jobTypeMaster.getJobTypes);

router.get('/get/count', jobTypeMaster.countJobTypes);

router.get('/get/one/:fieldID', jobTypeMaster.fetchSingleJobType);

router.get('/search/:str', jobTypeMaster.searchJobType);

router.patch('/patch', jobTypeMaster.updateJobType);

router.delete('/delete/:fieldID', jobTypeMaster.deleteJobType);

router.post('/bulkUploadIndustry',jobTypeMaster.bulkUploadJobType);

router.post('/get/files', jobTypeMaster.fetch_file); 

router.get('/get/filedetails/:fileName', jobTypeMaster.filedetails);

module.exports = router;