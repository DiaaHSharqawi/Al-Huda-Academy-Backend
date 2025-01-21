const express = require("express");

const router = express.Router();

// Controllers imports :
const getAllSupervisorGroupJoinRequestController = require("./../../controllers/supervisorControllers/getAllSupervisorGroupJoinRequestController");

const acceptSupervisorGroupJoinRequestController = require("./../../controllers/supervisorControllers/acceptGroupJoinRequestController.js");
const rejectSupervisorGroupJoinRequestController = require("./../../controllers/supervisorControllers/rejectGroupJoinRequestController.js");

// Middlewares imports :
const verifyParticipantExistenceMiddleware = require("./../../middlewares/participant/verifyParticipantExistenceMiddleware.js");

// Validation imports :

// SubRoutes imports :
const supervisorGroupPlanRoutes = require("./supervisorGroupPlanRoutes.js");

// SupervisorGroups Routes /supervisor/groups/:groupId/join-requests

router.get("/", getAllSupervisorGroupJoinRequestController);

router.post(
  "/:participantId/accept",
  verifyParticipantExistenceMiddleware, // participant details
  acceptSupervisorGroupJoinRequestController
);

router.post(
  "/:participantId/reject",
  verifyParticipantExistenceMiddleware, // participant details
  rejectSupervisorGroupJoinRequestController
);

module.exports = router;
