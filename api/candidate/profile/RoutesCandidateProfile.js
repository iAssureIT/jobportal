const express = require('express');
const router = express.Router();

const CandidateProfileController = require("./ControllerCandidateProfile.js");
router.post("/post", CandidateProfileController.insertCandidateBasicInfo);

module.exports = router ;