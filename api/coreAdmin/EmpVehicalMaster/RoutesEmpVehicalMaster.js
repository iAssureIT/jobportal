const express 	= require("express");
const router 	= express.Router();

const empVehicalMaster = require('./ControllerEmpVehicalMaster.js');

router.post('/post', empVehicalMaster.insertEmpVehicalMaster);

router.get('/get/list', empVehicalMaster.getEmpVehicalMaster);

//router.post('/get/list', empVehicalMaster.fetchEmpVehicalMaster); 

router.get('/get/count', empVehicalMaster.countEmpVehicalMaster);
 
router.get('/get/one/:fieldID', empVehicalMaster.fetchSingleEmpVehicalMaster);

//router.get('/search/:str', empVehicalMaster.searchModel);

router.patch('/patch', empVehicalMaster.updateEmpVehicalMaster);

router.delete('/delete/:fieldID', empVehicalMaster.deleteEmpVehicalMaster);

//router.post('/bulkUploadModel',empVehicalMaster.bulkUploadVehicleModel);

//router.get('/get/filedetails/:fileName', empVehicalMaster.filedetails);

//router.post('/get/files', empVehicalMaster.fetch_file); 


module.exports = router;