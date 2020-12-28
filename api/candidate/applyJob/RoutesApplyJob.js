const express 	= require("express");
const router 	= express.Router();

const ControllerApplyJob = require('./ControllerApplyJob');

router.post('/post', ControllerApplyJob.applyJob);

// router.patch('/', wishlistsController.update_wishlists);

router.post('/get/applicantsCountList',ControllerApplyJob.applicantsCountList);

router.post('/get/candidateAppliedJobList',ControllerApplyJob.getCandidateAppliedJobList);

router.post('/get/candidatesAppliedToJob',ControllerApplyJob.candidatesAppliedToJob);

router.get('/get/appliedJobCount/:candidateID',ControllerApplyJob.appliedJobCount);

//router.delete('/delete/:wishlistID',wishlistsController.delete_wishlist);


module.exports = router;