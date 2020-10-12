const express 	= require("express");
const router 	= express.Router();

const collageMaster = require('./ControllerCollage.js');

router.post('/post', collageMaster.insertCollage);

router.post('/get/list', collageMaster.fetchCollages);

router.get('/get/list', collageMaster.getCollages);

router.get('/get/count', collageMaster.countCollages);

router.get('/get/one/:fieldID', collageMaster.fetchSingleCollage);

router.get('/search/:str', collageMaster.searchCollage);

router.patch('/patch', collageMaster.updateCollage);

router.delete('/delete/:fieldID', collageMaster.deleteCollage);

router.post('/bulkUploadIndustry',collageMaster.bulkUploadCollage);

router.post('/get/files', collageMaster.fetch_file); 

router.get('/get/filedetails/:fileName', collageMaster.filedetails);

module.exports = router;