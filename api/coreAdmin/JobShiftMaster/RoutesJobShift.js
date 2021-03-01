const express 	= require("express");
const router 	= express.Router();

const jobShiftMaster = require('./ControllerJobShift.js');

router.post('/post', jobShiftMaster.insertJobShift);

router.post('/get/list', jobShiftMaster.fetchJobShifts);

router.get('/get/list', jobShiftMaster.getJobShifts);

router.get('/get/count', jobShiftMaster.countJobShifts);

router.get('/get/one/:fieldID', jobShiftMaster.fetchSingleJobShift);

router.get('/search/:str', jobShiftMaster.searchJobShift);

router.patch('/patch', jobShiftMaster.updateJobShift);

router.delete('/delete/:fieldID', jobShiftMaster.deleteJobShift);

router.post('/bulkUploadIndustry',jobShiftMaster.bulkUploadJobShift);

router.post('/get/files', jobShiftMaster.fetch_file); 

router.get('/get/filedetails/:fileName', jobShiftMaster.filedetails);

module.exports = router;