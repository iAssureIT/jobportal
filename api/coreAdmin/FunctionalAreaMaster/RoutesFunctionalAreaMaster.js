const express 	= require("express");
const router 	= express.Router();

const functionalAreaMaster = require('./ControllerFunctionalAreaMaster.js');
const checkAuth 	 = require('../../middleware/check-auth.js');

router.post('/post', functionalAreaMaster.insertFunctionalArea);

router.post('/get/list',  checkAuth, functionalAreaMaster.fetchFunctionalAreas);

router.get('/get/list', functionalAreaMaster.getFunctionalAreas);

router.get('/get/functionalArealist/:id', functionalAreaMaster.fetchFunctionalAreas); 

router.get('/get/count', functionalAreaMaster.countFunctionalAreas);
 
router.get('/get/one/:fieldID', functionalAreaMaster.fetchSingleFunctionalArea);

router.get('/search/:str', functionalAreaMaster.searchFunctionalArea);

router.patch('/patch', functionalAreaMaster.updateFunctionalArea);

router.delete('/delete/:fieldID', functionalAreaMaster.deleteFunctionalArea);

//router.post('/bulkUploadModel',functionalAreaMaster.bulkUploadFunctionalArea);

//router.get('/get/filedetails/:fileName', functionalAreaMaster.filedetails);

//router.post('/get/files', functionalAreaMaster.fetch_file); 


module.exports = router;