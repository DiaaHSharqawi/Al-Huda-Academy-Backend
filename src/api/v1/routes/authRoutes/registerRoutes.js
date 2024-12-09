const express = require("express");
const multer = require("multer");

const router = express.Router();

const upload = multer();

// controllers imports :
const userRegisterController = require("./../../controllers/authControllers/registerControllers/userRegisterController");
const supervisorRegisterController = require("./../../controllers/authControllers/registerControllers/supervisorRegisterController");
const participantRegisterController = require("../../controllers/authControllers/registerControllers/participantRegisterController.js");

const validateUserRegisterData = require("./../../validations/authValidations/userRegisterValidations.js");
const validateParticipantRegisterData = require("./../../validations/authValidations/participantRegisterValidations.js");
const validateSupervisorRegisterData = require("./../../validations/authValidations/supervisorRegisterValidations.js");

// Public Routes

router.post("/user", validateUserRegisterData, userRegisterController);

router.post(
  "/supervisor",
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "certificatesImages", maxCount: 10 },
  ]),
  validateSupervisorRegisterData,
  supervisorRegisterController
);

router.post(
  "/participant",
  upload.fields([{ name: "profileImage", maxCount: 1 }]),
  validateParticipantRegisterData,
  participantRegisterController
);

module.exports = router;
