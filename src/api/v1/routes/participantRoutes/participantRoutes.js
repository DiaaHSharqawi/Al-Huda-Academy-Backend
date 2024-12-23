const express = require("express");

// Controllers imports :
const getParticipantByUserIdController = require("./../../controllers/participantControllers/getParticipantByUserIdController");

// Validators imports :

const router = express.Router();

router.post("/get-participant-by-user-id", getParticipantByUserIdController);

module.exports = router;
