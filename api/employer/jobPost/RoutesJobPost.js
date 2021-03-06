const express		 =	require('express');
const router 		 =	express.Router();
const jobsController =	require("./ControllerJobPost.js");
const checkAuth 	 = require('../../middleware/check-auth.js');

router.post  ("/post"			   				, checkAuth, jobsController.insertJobs);
router.post  ("/post/insertBulk"			   	, jobsController.insertBulkJobs);
router.post  ("/post/bulk-upload-jobs"			, jobsController.bulkUploadJobs);

router.get   ("/get/one/:job_id"  				, jobsController.getJob);
router.get   ("/get/searchlist/:searchTxt"  	, jobsController.getSearchList);
router.post   ("/list"	   						, jobsController.getJobList);
router.post   ("/joblist-for-employer"	   		, checkAuth, jobsController.getJobListForEmployer);
router.patch ("/update"		   					, checkAuth, jobsController.updateJob);

router.post ("/job-count"		   				, jobsController.jobCount);
router.post ("/mapwise-jobs"		   			, jobsController.mapwiseJobs);
//router.post ("/functional-jobs-count"		   	, jobsController.functonalAreaJobsCount);
router.post ("/functional-jobs"		   			, jobsController.functonalAreaJobs);
router.post ("/subfunctional-jobs"		   		, jobsController.subfunctionalAreaJobs);
router.post ("/industrial-jobs"		   			, jobsController.industrialJobs);

router.delete("/delete/:job_id"					, checkAuth, jobsController.deleteJob);

router.patch("/active/:job_id"					, checkAuth, jobsController.activeJob);

router.patch("/inactive/:job_id"				, checkAuth, jobsController.inactiveJob);

router.get('/get/filedetails/:fileName'			, jobsController.filedetails);

router.post('/get/files'						,jobsController.fetch_file); 

router.get('/get/files/count'					,jobsController.fetch_file_count);

router.delete('/file/delete/:fileName/:uploadTime',jobsController.delete_file);

module.exports = router ;