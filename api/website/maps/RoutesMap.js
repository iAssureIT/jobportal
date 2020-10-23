const express = require('express');
const router = express.Router();

const mapController = require("./ControllerMap.js");
router.post("/post", mapController.insertStateJobs);
router.get("/list", mapController.getStateJobsList);
module.exports = router ;