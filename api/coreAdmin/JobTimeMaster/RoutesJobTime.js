const express 	= require("express");
const router 	= express.Router();

const jobTimeMaster = require('./ControllerJobTime.js');
const checkAuth 	 = require('../../middleware/check-auth.js');

router.post('/post', jobTimeMaster.insertJobTime);

router.post('/get/list', checkAuth, jobTimeMaster.fetchJobTimes);

router.get('/get/list', jobTimeMaster.getJobTimes);

router.get('/get/count', jobTimeMaster.countJobTimes);

router.get('/get/one/:fieldID', jobTimeMaster.fetchSingleJobTime);

router.get('/search/:str', jobTimeMaster.searchJobTime);

router.patch('/patch', jobTimeMaster.updateJobTime);

router.delete('/delete/:fieldID', jobTimeMaster.deleteJobTime);

router.post('/bulkUploadIndustry',jobTimeMaster.bulkUploadJobTime);

router.post('/get/files', jobTimeMaster.fetch_file); 

router.get('/get/filedetails/:fileName', jobTimeMaster.filedetails);

module.exports = router;