const express = require("express");

const router = express.Router();

// Controllers imports :
const getAllSupervisorGroupsMeetingController = require("./../../controllers/supervisorControllers/groupMeetingControllers/getAllSupervisorGroupsMeetingController.js");

// Middlewares imports :

// Validation imports :

// SubRoutes imports :

router.get("/groups", getAllSupervisorGroupsMeetingController);

module.exports = router;
