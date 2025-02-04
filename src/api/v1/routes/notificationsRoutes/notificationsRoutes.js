const express = require("express");

// Controllers imports :
const sendNotificationController = require("../../controllers/notificationsControllers/sendNotificationController.js");
const getAllUserNotificationsController = require("../../controllers/notificationsControllers/getAllUserNotificationsController.js");

// Middlewares imports :
const verifyJwtTokenMiddleware = require("../../middlewares/verifyJwtMiddleware.js");
const verifyUserExistenceMiddleware = require("./../../middlewares/user/verifyUserExistenceMiddleware.js");

// Validators imports :

const router = express.Router();

router.post("/", sendNotificationController);

router.get(
  "/",
  verifyJwtTokenMiddleware,
  verifyUserExistenceMiddleware,
  getAllUserNotificationsController
);

module.exports = router;
