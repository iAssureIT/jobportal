const express = require('express');
const router = express.Router();

const jobsController = require("./ControllerJobPost.js");
router.post("/post", jobsController.insertJobs);
router.get("/get/one/:job_id", jobsController.getJob);
router.get("/getJobList", jobsController.getJobList);
router.put("/update", jobsController.updateJob);
router.delete("/delete/:job_id", jobsController.deleteJob);

module.exports = router ;