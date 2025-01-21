const express = require("express");

const router = express.Router();

// Controllers imports :
const getAllSupervisorGroupJoinRequestController = require("./../../controllers/supervisorControllers/getAllSupervisorGroupJoinRequestController");
const getAllSupervisorGroupsController = require("./../../controllers/supervisorControllers/getAllSupervisorGroupsController");
const getSupervisorGroupDashboardController = require("./../../controllers/supervisorControllers/getSupervisorGroupDashboardController");

const getAllGroupMembersController = require("../../controllers/supervisorControllers/getAllGroupMembersController.js");

const acceptSupervisorGroupJoinRequestController = require("./../../controllers/supervisorControllers/acceptGroupJoinRequestController.js");
const rejectSupervisorGroupJoinRequestController = require("./../../controllers/supervisorControllers/rejectGroupJoinRequestController.js");

const getAllGroupDayController = require("./../../controllers/supervisorControllers/getAllGroupDayController.js");

// Middlewares imports :
const verifyJwtTokenMiddleware = require("../../middlewares/verifyJwtMiddleware.js");
const verifyGroupExistenceMiddleware = require("./../../middlewares/groups/verifyGroupExistence.js");
const verifySupervisorExistenceMiddleware = require("./../../middlewares/supervisor/verifySupervisorExistenceMiddleware.js");
const verifySupervisorGroupAuthorizationMiddleware = require("./../../middlewares/verifySupervisorGroupAuthorizationMiddleWare.js");

// Validation imports :

// SubRoutes imports :
const supervisorGroupPlanRoutes = require("./supervisorGroupPlanRoutes.js");
const supervisorGroupJoinRequests = require("./supervisorGroupJoinRequests.js");

// SupervisorGroups Routes /supervisor/groups

router.post("/", getAllSupervisorGroupsController);

router.use(
  "/:groupId/group-plan",
  verifyJwtTokenMiddleware,
  verifyGroupExistenceMiddleware,
  verifySupervisorExistenceMiddleware,
  verifySupervisorGroupAuthorizationMiddleware,
  supervisorGroupPlanRoutes
);

router.get(
  "/:groupId/group-days",
  verifyJwtTokenMiddleware,
  verifyGroupExistenceMiddleware,
  verifySupervisorExistenceMiddleware,
  verifySupervisorGroupAuthorizationMiddleware,
  getAllGroupDayController
);

router.use(
  "/:groupId/join-requests",
  verifyJwtTokenMiddleware,
  verifyGroupExistenceMiddleware,
  verifySupervisorExistenceMiddleware,
  verifySupervisorGroupAuthorizationMiddleware,
  supervisorGroupJoinRequests
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

module.exports = router;
