const express = require("express");

const router = express.Router();

// Controllers imports :
const sendRequestToJoinGroupController = require("./../../controllers/participantControllers/sendRequestToJoinGroupController");

// Middlewares imports :
const verifyJwtTokenMiddleware = require("../../middlewares/verifyJwtMiddleware.js");
const verifyParticipantAuthorization = require("./../../middlewares/verifyParticipantAuthorizationMiddleware.js");

// participantGroupsRoutes  /participant/groups

router.post(
  "/:groupId/send-request-to-join-group",
  verifyJwtTokenMiddleware,
  verifyParticipantAuthorization,
  sendRequestToJoinGroupController
);

module.exports = router;
