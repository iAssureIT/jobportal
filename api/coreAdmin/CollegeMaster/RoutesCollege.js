const express 	= require("express");
const router 	= express.Router();

const collegeMaster = require('./ControllerCollege.js');
const checkAuth 	 = require('../../middleware/check-auth.js');

router.post('/post', collegeMaster.insertCollege);

router.post('/get/list', checkAuth, collegeMaster.fetchColleges);

router.get('/get/list', collegeMaster.getColleges);

router.get('/get/count', collegeMaster.countColleges);

router.get('/get/one/:fieldID', collegeMaster.fetchSingleCollege);

router.get('/search/:str', collegeMaster.searchCollege);

router.patch('/patch', collegeMaster.updateCollege);

router.delete('/delete/:fieldID', collegeMaster.deleteCollege);

router.post('/bulkUploadIndustry',collegeMaster.bulkUploadCollege);

router.post('/get/files', collegeMaster.fetch_file); 

router.get('/get/filedetails/:fileName', collegeMaster.filedetails);

module.exports = router;