const express = require('express');
const router = express.Router();

const jobsController = require("./ControllerJobPost.js");
router.post("/api/jobs/addJob", jobsController.insertJobs);
router.get("/api/jobs/getJob", jobsController.getJobs);
router.get("/api/jobs/getJobList", jobsController.getJobList);
router.put("/api/jobs/updateJob", jobsController.updateJob);
router.delete("/api/jobs/deleteJob", jobsController.deleteJob);



module.exports = router ;