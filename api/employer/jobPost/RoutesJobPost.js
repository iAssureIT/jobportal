const express		 =	require('express');
const router 		 =	express.Router();
const jobsController =	require("./ControllerJobPost.js");

router.post  ("/post"			   				, jobsController.insertJobs);
router.get   ("/get/one/:job_id"  				, jobsController.getJob);
router.get   ("/get/searchlist/:searchTxt"  	, jobsController.getSearchList);
router.get   ("/list"	   						, jobsController.getJobList);
router.patch ("/update"		   					, jobsController.updateJob);
router.delete("/delete/:job_id"					, jobsController.deleteJob);

module.exports = router ;