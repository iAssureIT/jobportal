const express 	= require("express");
const router 	= express.Router();

const skillMaster = require('./ControllerSkill.js');

router.post('/post', skillMaster.insertSkill);

router.post('/get/list', skillMaster.fetchSkills);

router.get('/get/list', skillMaster.getSkills);

router.get('/get/count', skillMaster.countSkills);

router.get('/get/one/:fieldID', skillMaster.fetchSingleSkill);

router.get('/search/:str', skillMaster.searchSkill);

router.patch('/patch', skillMaster.updateSkill);

router.delete('/delete/:fieldID', skillMaster.deleteSkill);

router.post('/bulkUploadSkill',skillMaster.bulkUploadSkill);

router.post('/get/files', skillMaster.fetch_file); 

router.get('/get/filedetails/:fileName', skillMaster.filedetails);

module.exports = router;