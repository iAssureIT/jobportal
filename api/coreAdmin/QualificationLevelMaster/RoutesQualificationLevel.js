const express 	= require("express");
const router 	= express.Router();

const qualificationLevelMaster = require('./ControllerQualificationLevel.js');
const checkAuth 	 = require('../../middleware/check-auth.js');

router.post('/post', qualificationLevelMaster.insertQualificationLevel);

router.post('/get/list', checkAuth, qualificationLevelMaster.fetchQualificationLevels);

router.get('/get/list', qualificationLevelMaster.getQualificationLevels);

router.get('/get/count', qualificationLevelMaster.countQualificationLevels);

router.get('/get/one/:fieldID', qualificationLevelMaster.fetchSingleQualificationLevel);

router.get('/search/:str', qualificationLevelMaster.searchQualificationLevel);

router.patch('/patch', qualificationLevelMaster.updateQualificationLevel);

router.delete('/delete/:fieldID', qualificationLevelMaster.deleteQualificationLevel);

router.post('/bulkUploadQualificationLevel',qualificationLevelMaster.bulkUploadQualificationLevel);

router.post('/get/files', qualificationLevelMaster.fetch_file); 

router.get('/get/filedetails/:fileName', qualificationLevelMaster.filedetails);

module.exports = router;