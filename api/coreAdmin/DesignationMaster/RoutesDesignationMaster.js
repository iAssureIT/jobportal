const express 	= require("express");
const router 	= express.Router();

const designationMaster = require('./ControllerDesignationMaster.js');

router.post('/post', designationMaster.insertDesignation);

router.post('/get/list', designationMaster.fetchDesignations);

router.get('/get/list', designationMaster.getDesignations);

router.get('/get/count', designationMaster.countDesignations);

router.get('/get/one/:fieldID', designationMaster.fetchSingleDesignation);

router.get('/search/:str', designationMaster.searchDesignation);

router.patch('/patch', designationMaster.updateDesignation);

router.delete('/delete/:fieldID', designationMaster.deleteDesignation);

router.post('/bulkUploadDesignation',designationMaster.bulkUploadDesignation);

router.post('/get/files', designationMaster.fetch_file); 

router.get('/get/filedetails/:fileName', designationMaster.filedetails);

module.exports = router;