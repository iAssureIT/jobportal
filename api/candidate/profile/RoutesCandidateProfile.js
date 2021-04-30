const express = require('express');
const router = express.Router();

const CandidateProfileController = require("./ControllerCandidateProfile.js");

router.post("/post", CandidateProfileController.insertCandidateBasicInfo);

router.get("/get/candidate_id/:userID", CandidateProfileController.getcandidate_id);

router.get("/get/one/:candidate_id", CandidateProfileController.getSingleCandidate);

router.patch("/patch/updateCandidateBasicInfo", CandidateProfileController.updateCandidateBasicInfo);

// =========================== candidate address =====================================//
router.patch("/patch/addCandidateAddress", CandidateProfileController.addCandidateAddress);

router.post("/post/getOneCandidateAddress", CandidateProfileController.getOneCandidateAddress);

router.patch("/patch/updateOneCandidateAddress", CandidateProfileController.updateOneCandidateAddress);

router.delete('/deleteAddress/:candidate_id/delete/:addressID/:profileCompletion',CandidateProfileController.deleteAddress);

router.patch("/patch/updateCandidateContact", CandidateProfileController.updateCandidateContact);

// =========================== candidate academics =====================================//
router.patch("/patch/addCandidateAcademics", CandidateProfileController.addCandidateAcademics);

router.post("/post/getOneCandidateAcademics", CandidateProfileController.getOneCandidateAcademics);

router.patch("/patch/updateOneCandidateAcademics", CandidateProfileController.updateOneCandidateAcademics);

router.delete('/deleteAcademics/:candidate_id/delete/:academicsID/:profileCompletion',CandidateProfileController.deleteAcademics);

// =========================== candidate Experience =====================================//
router.patch("/patch/updateCandidateTotalExperience", CandidateProfileController.updateCandidateTotalExperience);

router.patch("/patch/addCandidateExperience", CandidateProfileController.addCandidateExperience);

router.post("/post/getOneCandidateExperience", CandidateProfileController.getOneCandidateExperience);

router.patch("/patch/updateOneCandidateExperience", CandidateProfileController.updateOneCandidateExperience);

router.delete('/deleteExperience/:candidate_id/delete/:experienceID/:profileCompletion',CandidateProfileController.deleteExperience);
 
// =========================== candidate Experience =====================================//
router.patch("/patch/addCandidateSkill", CandidateProfileController.addCandidateSkill); 

router.post("/get/getCandidateSkills", CandidateProfileController.getCandidateSkills); 
 
router.delete('/deleteSkill/:candidate_id/delete/:skill_id',CandidateProfileController.deleteSkill);

// ========================== candidate certification ================================== //
router.patch("/patch/addCandidateCertification", CandidateProfileController.addCandidateCertification); 

router.post("/post/getOneCandidateCertification", CandidateProfileController.getOneCandidateCertification);

router.patch("/patch/updateOneCandidateCertification", CandidateProfileController.updateOneCandidateCertification);

router.delete('/deleteCertification/:candidate_id/delete/:certificationID',CandidateProfileController.deleteCertification);

router.post("/get/count", CandidateProfileController.getCandidateCount);

router.post("/get/list", CandidateProfileController.getCandidateList);

router.delete("/delete/:candidate_id", CandidateProfileController.deleteCandidate);

module.exports = router ;