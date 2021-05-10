const express = require('express');
const router = express.Router();

const CandidateProfileController = require("./ControllerCandidateProfile.js");
const checkAuth 	 = require('../../middleware/check-auth.js');

router.post("/post", CandidateProfileController.insertCandidateBasicInfo);

router.get("/get/candidate_id/:userID", checkAuth, CandidateProfileController.getcandidate_id);

router.get("/get/one/:candidate_id", checkAuth, CandidateProfileController.getSingleCandidate);

router.patch("/patch/updateCandidateBasicInfo", checkAuth, CandidateProfileController.updateCandidateBasicInfo);

// =========================== candidate address =====================================//
router.patch("/patch/addCandidateAddress", checkAuth, CandidateProfileController.addCandidateAddress);

router.post("/post/getOneCandidateAddress", checkAuth, CandidateProfileController.getOneCandidateAddress);

router.patch("/patch/updateOneCandidateAddress", checkAuth, CandidateProfileController.updateOneCandidateAddress);

router.delete('/deleteAddress/:candidate_id/delete/:addressID/:profileCompletion', checkAuth, CandidateProfileController.deleteAddress);

router.patch("/patch/updateCandidateContact", checkAuth, CandidateProfileController.updateCandidateContact);

// =========================== candidate academics =====================================//
router.patch("/patch/addCandidateAcademics", checkAuth, CandidateProfileController.addCandidateAcademics);

router.post("/post/getOneCandidateAcademics", checkAuth, CandidateProfileController.getOneCandidateAcademics);

router.patch("/patch/updateOneCandidateAcademics", checkAuth, CandidateProfileController.updateOneCandidateAcademics);

router.delete('/deleteAcademics/:candidate_id/delete/:academicsID/:profileCompletion', checkAuth, CandidateProfileController.deleteAcademics);

// =========================== candidate Experience =====================================//
router.patch("/patch/updateCandidateTotalExperience", checkAuth, CandidateProfileController.updateCandidateTotalExperience);

router.patch("/patch/addCandidateExperience", checkAuth, CandidateProfileController.addCandidateExperience);

router.post("/post/getOneCandidateExperience", checkAuth, CandidateProfileController.getOneCandidateExperience);

router.patch("/patch/updateOneCandidateExperience", checkAuth, CandidateProfileController.updateOneCandidateExperience);

router.delete('/deleteExperience/:candidate_id/delete/:experienceID/:profileCompletion',CandidateProfileController.deleteExperience);
 
// =========================== candidate Experience =====================================//
router.patch("/patch/addCandidateSkill", checkAuth, CandidateProfileController.addCandidateSkill); 

router.post("/get/getCandidateSkills", checkAuth, CandidateProfileController.getCandidateSkills); 
 
router.delete('/deleteSkill/:candidate_id/delete/:skill_id',checkAuth, CandidateProfileController.deleteSkill);

// ========================== candidate certification ================================== //
router.patch("/patch/addCandidateCertification", checkAuth, CandidateProfileController.addCandidateCertification); 

router.post("/post/getOneCandidateCertification", checkAuth, CandidateProfileController.getOneCandidateCertification);

router.patch("/patch/updateOneCandidateCertification", checkAuth, CandidateProfileController.updateOneCandidateCertification);

router.delete('/deleteCertification/:candidate_id/delete/:certificationID',checkAuth, CandidateProfileController.deleteCertification);

router.post("/get/count", checkAuth, CandidateProfileController.getCandidateCount);

router.post("/get/list", checkAuth, CandidateProfileController.getCandidateList);

router.delete("/delete/:candidate_id", checkAuth, CandidateProfileController.deleteCandidate);

module.exports = router ;