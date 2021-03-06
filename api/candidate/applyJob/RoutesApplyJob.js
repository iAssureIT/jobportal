const express 	= require("express");
const router 	= express.Router();

const ControllerApplyJob = require('./ControllerApplyJob');

router.post('/post', ControllerApplyJob.applyJob);

// router.patch('/', wishlistsController.update_wishlists);
router.get('/get/appliedJobCount/:candidate_id',ControllerApplyJob.appliedJobCount);

router.post('/get/appliedJobList',ControllerApplyJob.appliedJobList);

router.post('/get/applicantsCountList',ControllerApplyJob.applicantsCountList);

router.post('/get/candidatesAppliedToJob',ControllerApplyJob.candidatesAppliedToJob);

router.delete('/removeApplication',ControllerApplyJob.removeApplication);


module.exports = router;