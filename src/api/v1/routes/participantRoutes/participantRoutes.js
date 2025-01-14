const express = require("express");

// Controllers imports :
const getParticipantByUserIdController = require("./../../controllers/participantControllers/getParticipantByUserIdController");

// Sub-routes imports :
const participantGroupsRoutes = require("./participantGroupsRoutes");

// Validators imports :

const router = express.Router();

router.use("/groups", participantGroupsRoutes);

router.post("/get-participant-by-user-id", getParticipantByUserIdController);

module.exports = router;
