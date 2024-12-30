const express = require("express");

// Controllers imports :

const getAllParticipantLevelController = require("../../controllers/participantLevelControllers/getAllParticipantLevelController.js");

const router = express.Router();

router.get("/", getAllParticipantLevelController);

module.exports = router;
