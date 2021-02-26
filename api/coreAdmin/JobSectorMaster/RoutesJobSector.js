const express 	= require("express");
const router 	= express.Router();

const jobSectorMaster = require('./ControllerJobSector.js');

router.post('/post', jobSectorMaster.insertJobSector);

router.post('/get/list', jobSectorMaster.fetchJobSectors);

router.get('/get/list', jobSectorMaster.getJobSectors);

router.get('/get/count', jobSectorMaster.countJobSectors);

router.get('/get/one/:fieldID', jobSectorMaster.fetchSingleJobSector);

router.get('/search/:str', jobSectorMaster.searchJobSector);

router.patch('/patch', jobSectorMaster.updateJobSector);

router.delete('/delete/:fieldID', jobSectorMaster.deleteJobSector);

router.post('/bulkUploadIndustry',jobSectorMaster.bulkUploadJobSector);

router.post('/get/files', jobSectorMaster.fetch_file); 

router.get('/get/filedetails/:fileName', jobSectorMaster.filedetails);

module.exports = router;