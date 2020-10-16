const express = require('express');
const router = express.Router();

const jobsController = require("./ControllerJobPost.js");
router.post("/post", jobsController.insertJobs);
router.get("/api/jobs/get/one/:job_id", jobsController.getOneJob);
router.get("/api/jobs/get/list", jobsController.getJobList);
router.put("/api/jobs/put", jobsController.updateJob);
router.delete("/api/jobs/delete", jobsController.deleteJob);



module.exports = router ;