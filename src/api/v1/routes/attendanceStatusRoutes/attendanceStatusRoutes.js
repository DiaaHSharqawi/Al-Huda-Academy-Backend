const express = require("express");

// Controllers imports :
const getAllAttendanceStatusController = require("../../controllers/attendanceStatusControllers/getAllAttendanceStatusController.js");

const router = express.Router();

router.get("/", getAllAttendanceStatusController);

module.exports = router;
