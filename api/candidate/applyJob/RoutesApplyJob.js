const express 	= require("express");
const router 	= express.Router();

const ControllerApplyJob = require('./ControllerApplyJob');
const checkAuth 	 = require('../../middleware/check-auth.js');

router.post('/post', checkAuth, ControllerApplyJob.applyJob);

// router.patch('/', wishlistsController.update_wishlists);
router.get('/get/appliedJobCount/:candidate_id',checkAuth, ControllerApplyJob.appliedJobCount);

router.post('/get/appliedJobList',checkAuth, ControllerApplyJob.appliedJobList);

router.post('/get/totalApplicantsCountList',ControllerApplyJob.totalApplicantsCountList); 

router.post('/get/countryApplicantsCountList',ControllerApplyJob.countryApplicantsCountList); 

router.post('/get/stateApplicantsCountList',ControllerApplyJob.stateApplicantsCountList); 

router.post('/get/districtApplicantsCountList',ControllerApplyJob.districtApplicantsCountList); 

router.post('/get/maleApplicantsCountList',ControllerApplyJob.maleApplicantsCountList); 

router.post('/get/femaleApplicantsCountList',ControllerApplyJob.femaleApplicantsCountList); 

router.post('/get/otherApplicantsCountList',ControllerApplyJob.otherApplicantsCountList); 

router.post('/get/expApplicantsCountList',ControllerApplyJob.expApplicantsCountList); 

router.post('/get/candidatesAppliedToJob',checkAuth, ControllerApplyJob.candidatesAppliedToJob);

router.post('/removeApplication',checkAuth, ControllerApplyJob.removeApplication);


module.exports = router;