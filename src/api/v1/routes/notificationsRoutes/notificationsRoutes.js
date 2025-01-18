const express = require("express");

// Controllers imports :
const sendNotificationController = require("../../controllers/notificationsControllers/sendNotificationController.js");

// Validators imports :

const router = express.Router();

router.post("/", sendNotificationController);

module.exports = router;
