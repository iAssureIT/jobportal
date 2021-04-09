const express 	= require("express");
const router 	= express.Router();

const stateMaster = require('./ControllerStates.js');


router.get('/get/list/:countryCode', stateMaster.getAllStates);

router.post('/post/stateBulkinsert', stateMaster.stateBulkinsert);

router.get('/get/files',stateMaster.fetch_file);

router.get('/get/files/count',stateMaster.fetch_file_count);

router.get('/get/filedetails/:fileName',stateMaster.filedetails);


module.exports = router;