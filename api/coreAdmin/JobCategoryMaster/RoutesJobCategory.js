const express 	= require("express");
const router 	= express.Router();

const jobCategoryMaster = require('./ControllerJobCategory.js');

router.post('/post', jobCategoryMaster.insertJobCategory);

router.post('/get/list', jobCategoryMaster.fetchJobCategories);

router.get('/get/list', jobCategoryMaster.getJobCategories);

router.get('/get/count', jobCategoryMaster.countJobCategories);

router.get('/get/one/:fieldID', jobCategoryMaster.fetchSingleJobCategory);

router.get('/search/:str', jobCategoryMaster.searchJobCategory);

router.patch('/patch', jobCategoryMaster.updateJobCategory);

router.delete('/delete/:fieldID', jobCategoryMaster.deleteJobCategory);

router.post('/bulkUploadIndustry',jobCategoryMaster.bulkUploadJobCategory);

router.post('/get/files', jobCategoryMaster.fetch_file); 

router.get('/get/filedetails/:fileName', jobCategoryMaster.filedetails);

module.exports = router;