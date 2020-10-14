const express 	= require("express");
const router 	= express.Router();

const qualificationMaster = require('./ControllerQualification.js');

router.post('/post', qualificationMaster.insertQualification);

router.post('/get/list', qualificationMaster.fetchQualifications);

router.get('/get/list', qualificationMaster.getQualifications);

router.get('/get/count', qualificationMaster.countQualifications);

router.get('/get/one/:fieldID', qualificationMaster.fetchSingleQualification);

router.get('/search/:str', qualificationMaster.searchQualification);

router.patch('/patch', qualificationMaster.updateQualification);

router.delete('/delete/:fieldID', qualificationMaster.deleteQualification);

router.post('/bulkUploadQualification',qualificationMaster.bulkUploadQualification);

router.post('/get/files', qualificationMaster.fetch_file); 

router.get('/get/filedetails/:fileName', qualificationMaster.filedetails);

module.exports = router;