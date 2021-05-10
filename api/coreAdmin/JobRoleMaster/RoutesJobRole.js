const express 	= require("express");
const router 	= express.Router();

const jobRoleMaster = require('./ControllerJobRole.js');
const checkAuth 	 = require('../../middleware/check-auth.js');

router.post('/post', jobRoleMaster.insertJobRole);

router.post('/get/list', checkAuth, jobRoleMaster.fetchJobRoles);

router.get('/get/list', jobRoleMaster.getJobRoles);

router.get('/get/count', jobRoleMaster.countJobRoles);

router.get('/get/one/:fieldID', jobRoleMaster.fetchSingleJobRole);

router.get('/search/:str', jobRoleMaster.searchJobRole);

router.patch('/patch', jobRoleMaster.updateJobRole);

router.delete('/delete/:fieldID', jobRoleMaster.deleteJobRole);

router.post('/bulkUploadIndustry',jobRoleMaster.bulkUploadJobRole);

router.post('/get/files', jobRoleMaster.fetch_file); 

router.get('/get/filedetails/:fileName', jobRoleMaster.filedetails);

module.exports = router;