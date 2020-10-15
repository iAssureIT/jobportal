const express 	= require("express");
const router 	= express.Router();

const subfunctionalAreaMaster = require('./ControllerSubFunctionalAreaMaster.js');

router.post('/post', subfunctionalAreaMaster.insertSubFunctionalArea);

router.post('/get/list', subfunctionalAreaMaster.fetchSubFunctionalAreas);

router.get('/get/list', subfunctionalAreaMaster.getSubFunctionalAreas);

router.get('/get/subfunctionalArealist/:id', subfunctionalAreaMaster.fetchSubFunctionalAreaData); 

router.get('/get/count', subfunctionalAreaMaster.countSubFunctionalAreas);
 
router.get('/get/one/:fieldID', subfunctionalAreaMaster.fetchSingleSubFunctionalArea);

router.get('/search/:str', subfunctionalAreaMaster.searchSubFunctionalArea);

router.patch('/patch', subfunctionalAreaMaster.updateSubFunctionalArea);

router.delete('/delete/:fieldID', subfunctionalAreaMaster.deleteSubFunctionalArea);

router.post('/bulkUploadModel',subfunctionalAreaMaster.bulkUploadSubFunctionalArea);

router.get('/get/filedetails/:fileName', subfunctionalAreaMaster.filedetails);

router.post('/get/files', subfunctionalAreaMaster.fetch_file); 


module.exports = router; 