const express = require("express");

const router = express.Router();

// Controllers imports :
const getAllSupervisorGroupJoinRequestController = require("./../../controllers/supervisorControllers/getAllSupervisorGroupJoinRequestController");
const getAllSupervisorGroupsController = require("./../../controllers/supervisorControllers/getAllSupervisorGroupsController");
const getSupervisorGroupDashboardController = require("./../../controllers/supervisorControllers/getSupervisorGroupDashboardController");

const getAllGroupMembersController = require("../../controllers/supervisorControllers/getAllGroupMembersController.js");

const acceptSupervisorGroupJoinRequestController = require("./../../controllers/supervisorControllers/acceptGroupJoinRequestController.js");
const rejectSupervisorGroupJoinRequestController = require("./../../controllers/supervisorControllers/rejectGroupJoinRequestController.js");

const getAllSupervisorGroupPlanController = require("../../controllers/supervisorControllers/getAllSupervisorGroupPlanController.js");
const createSupervisorGroupPlanController = require("./../../controllers/supervisorControllers/createSupervisorGroupPlanController.js");

const getAllGroupDayController = require("./../../controllers/supervisorControllers/getAllGroupDayController.js");

// Middlewares imports :
const verifyJwtTokenMiddleware = require("../../middlewares/verifyJwtMiddleware.js");
const verifyGroupExistenceMiddleware = require("./../../middlewares/groups/verifyGroupExistence.js");
const verifySupervisorExistenceMiddleware = require("./../../middlewares/supervisor/verifySupervisorExistenceMiddleware.js");
const verifySupervisorGroupAuthorizationMiddleware = require("./../../middlewares/verifySupervisorGroupAuthorizationMiddleWare.js");
const verifyParticipantExistenceMiddleware = require("./../../middlewares/participant/verifyParticipantExistenceMiddleware.js");

// Validation imports :
const validateCreateSupervisorGroupPlanValidation = require("./../../validations/supervisorValidations/createSupervisorGroupPlanValidation.js");

// SupervisorGroups Routes /supervisor/groups

router.post("/", getAllSupervisorGroupsController);

router.get(
  "/:groupId/group-days",
  verifyJwtTokenMiddleware,
  verifyGroupExistenceMiddleware,
  verifySupervisorExistenceMiddleware,
  verifySupervisorGroupAuthorizationMiddleware,
  getAllGroupDayController
);

router.get(
  "/:groupId/group-plan",
  verifyJwtTokenMiddleware,
  verifyGroupExistenceMiddleware,
  verifySupervisorExistenceMiddleware,
  verifySupervisorGroupAuthorizationMiddleware,
  getAllSupervisorGroupPlanController
);

/*router.get(
  "/:groupId/group-plan/:planId",
  verifyJwtTokenMiddleware,
  verifyGroupExistenceMiddleware,
  verifySupervisorExistenceMiddleware,
  verifySupervisorGroupAuthorizationMiddleware
);*/

router.post(
  "/:groupId/group-plan/create",
  verifyJwtTokenMiddleware,
  verifyGroupExistenceMiddleware,
  verifySupervisorExistenceMiddleware,
  verifySupervisorGroupAuthorizationMiddleware,
  validateCreateSupervisorGroupPlanValidation,
  createSupervisorGroupPlanController
);

router.get(
  "/:groupId/members",
  verifyJwtTokenMiddleware,
  verifyGroupExistenceMiddleware,
  verifySupervisorExistenceMiddleware,
  verifySupervisorGroupAuthorizationMiddleware,
  getAllGroupMembersController
);

router.get("/:groupId/dashboard", getSupervisorGroupDashboardController);

router.get(
  "/:groupId/join-requests",
  verifyJwtTokenMiddleware,
  verifyGroupExistenceMiddleware, // group details
  verifySupervisorExistenceMiddleware, // supervisor details
  verifySupervisorGroupAuthorizationMiddleware,
  getAllSupervisorGroupJoinRequestController
);

router.post(
  "/:groupId/join-requests/:participantId/accept",
  verifyJwtTokenMiddleware,
  verifyGroupExistenceMiddleware, // group details
  verifySupervisorExistenceMiddleware, // supervisor details
  verifySupervisorGroupAuthorizationMiddleware,
  verifyParticipantExistenceMiddleware, // participant details
  acceptSupervisorGroupJoinRequestController
);

router.post(
  "/:groupId/join-requests/:participantId/reject",
  verifyJwtTokenMiddleware,
  verifyGroupExistenceMiddleware, // group details
  verifySupervisorExistenceMiddleware, // supervisor details
  verifySupervisorGroupAuthorizationMiddleware,
  verifyParticipantExistenceMiddleware, // participant details
  rejectSupervisorGroupJoinRequestController
);

module.exports = router;
