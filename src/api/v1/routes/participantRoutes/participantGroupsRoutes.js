const express = require("express");

const router = express.Router();

// Controllers imports :
const sendRequestToJoinGroupController = require("./../../controllers/participantControllers/sendRequestToJoinGroupController");
const getAllParticipantGroupsController = require("./../../controllers/participantControllers/groupControllers/getAllParticipantGroupsController.js");
const getParticipantGroupDashboardController = require("./../../controllers/participantControllers/groupControllers/getParticipantGroupDashboardController.js");

// Middlewares imports :
const verifyJwtTokenMiddleware = require("../../middlewares/verifyJwtMiddleware.js");
const verifyParticipantExistenceMiddleware = require("./../../middlewares/participant/verifyParticipantExistenceMiddleware.js");
const verifyGroupExistenceMiddleware = require("./../../middlewares/groups/verifyGroupExistence.js");

//const verifyParticipantAuthorization = require("./../../middlewares/verifyParticipantAuthorizationMiddleware.js");

// participantGroupsRoutes:
// participant/groups

router.get(
  "/",
  verifyJwtTokenMiddleware,
  verifyParticipantExistenceMiddleware,
  getAllParticipantGroupsController
);

router.get(
  "/:groupId/dashboard",
  verifyJwtTokenMiddleware,
  verifyParticipantExistenceMiddleware,
  verifyGroupExistenceMiddleware,
  getParticipantGroupDashboardController
);

router.post(
  "/:groupId/send-request-to-join-group",
  verifyJwtTokenMiddleware,
  //verifyParticipantAuthorization,
  verifyParticipantExistenceMiddleware,
  sendRequestToJoinGroupController
);

module.exports = router;
