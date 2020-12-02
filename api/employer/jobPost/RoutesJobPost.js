const express		 =	require('express');
const router 		 =	express.Router();
const jobsController =	require("./ControllerJobPost.js");

router.post  ("/post"			   				, jobsController.insertJobs);
router.get   ("/get/one/:job_id"  				, jobsController.getJob);
router.get   ("/get/searchlist/:searchTxt"  	, jobsController.getSearchList);
router.post   ("/list"	   						, jobsController.getJobList);
router.patch ("/update"		   					, jobsController.updateJob);

router.post ("/mapwise-jobs"		   			, jobsController.mapwiseJobs);
router.post ("/functional-jobs"		   			, jobsController.functonalAreaJobs);
router.post ("/subfunctional-jobs"		   		, jobsController.subfunctionalAreaJobs);
router.post ("/industrial-jobs"		   			, jobsController.industrialJobs);

router.delete("/delete/:job_id"					, jobsController.deleteJob);

module.exports = router ;