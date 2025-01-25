const express = require("express");

const router = express.Router();

// Controllers imports :
const getAllSupervisorGroupJoinRequestController = require("../../controllers/supervisorControllers/groupControllers/groupJoinRequestControllers/getAllSupervisorGroupJoinRequestController.js");

const acceptSupervisorGroupJoinRequestController = require("../../controllers/supervisorControllers/groupControllers/groupJoinRequestControllers/acceptGroupJoinRequestController.js");
const rejectSupervisorGroupJoinRequestController = require("../../controllers/supervisorControllers/groupControllers/groupJoinRequestControllers/rejectGroupJoinRequestController.js");

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
