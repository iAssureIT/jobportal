const express 	= require("express");
const router 	= express.Router();

const universityMaster = require('./ControllerUniversity.js');
const checkAuth 	 = require('../../middleware/check-auth.js');

router.post('/post', universityMaster.insertUniversity);

router.post('/get/list', checkAuth, universityMaster.fetchUniversities);

router.get('/get/list', universityMaster.getUniversities);

router.get('/get/count', universityMaster.countUniversities);

router.get('/get/one/:fieldID', universityMaster.fetchSingleUniversity);

router.get('/search/:str', universityMaster.searchUniversity);

router.patch('/patch', universityMaster.updateUniversity);

router.delete('/delete/:fieldID', universityMaster.deleteUniversity);

router.post('/bulkUploadIndustry',universityMaster.bulkUploadUniversity);

router.post('/get/files', universityMaster.fetch_file); 

router.get('/get/filedetails/:fileName', universityMaster.filedetails);

module.exports = router;