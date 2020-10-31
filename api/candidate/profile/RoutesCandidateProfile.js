const express = require('express');
const router = express.Router();

const CandidateProfileController = require("./ControllerCandidateProfile.js");

router.post("/post", CandidateProfileController.insertCandidateBasicInfo);

router.get("/get/candidateID/:userID", CandidateProfileController.getcandidateID);

router.get("/get/one/:candidateID", CandidateProfileController.getSingleCandidate);

router.patch("/patch/updateCandidateBasicInfo", CandidateProfileController.updateCandidateBasicInfo);

// =========================== candidate address =====================================//
router.patch("/patch/addCandidateAddress", CandidateProfileController.addCandidateAddress);

router.post("/post/getOneCandidateAddress", CandidateProfileController.getOneCandidateAddress);

router.patch("/patch/updateOneCandidateAddress", CandidateProfileController.updateOneCandidateAddress);

router.delete('/deleteAddress/:candidateID/delete/:addressID',CandidateProfileController.deleteAddress);

router.patch("/patch/updateCandidateContact", CandidateProfileController.updateCandidateContact);

// =========================== candidate academics =====================================//
router.patch("/patch/addCandidateAcademics", CandidateProfileController.addCandidateAcademics);

router.post("/post/getOneCandidateAcademics", CandidateProfileController.getOneCandidateAcademics);

router.patch("/patch/updateOneCandidateAcademics", CandidateProfileController.updateOneCandidateAcademics);

router.delete('/deleteAcademics/:candidateID/delete/:academicsID',CandidateProfileController.deleteAcademics);

// =========================== candidate Experience =====================================//
router.patch("/patch/addCandidateExperience", CandidateProfileController.addCandidateExperience);

router.post("/post/getOneCandidateExperience", CandidateProfileController.getOneCandidateExperience);

router.patch("/patch/updateOneCandidateExperience", CandidateProfileController.updateOneCandidateExperience);

router.delete('/deleteExperience/:candidateID/delete/:experienceID',CandidateProfileController.deleteExperience);

// =========================== candidate Experience =====================================//
router.patch("/patch/addCandidateSkill", CandidateProfileController.addCandidateSkill);

router.post("/post/getOneCandidateSkill", CandidateProfileController.getOneCandidateSkill);

router.patch("/patch/updateOneCandidateSkill", CandidateProfileController.updateOneCandidateSkill);

router.delete('/deleteSkill/:candidateID/delete/:skillID',CandidateProfileController.deleteSkill);

router.get("/get/list", CandidateProfileController.getCandidateList);

router.delete("/delete/:candidateID", CandidateProfileController.deleteCandidate);

module.exports = router ;