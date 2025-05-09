const express = require("express");

const router = express.Router();

// Controllers imports :
const getAllSupervisorGroupsController = require("./../../controllers/supervisorControllers/getAllSupervisorGroupsController");
const getSupervisorGroupDashboardController = require("./../../controllers/supervisorControllers/getSupervisorGroupDashboardController");

const getAllGroupDayController = require("./../../controllers/supervisorControllers/getAllGroupDayController.js");

const getGroupContentController = require("./../../controllers/supervisorControllers/getGroupContentController.js");

// Middlewares imports :
const verifyJwtTokenMiddleware = require("../../middlewares/verifyJwtMiddleware.js");
const verifyGroupExistenceMiddleware = require("./../../middlewares/groups/verifyGroupExistence.js");
const verifySupervisorExistenceMiddleware = require("./../../middlewares/supervisor/verifySupervisorExistenceMiddleware.js");
const verifySupervisorGroupAuthorizationMiddleware = require("./../../middlewares/verifySupervisorGroupAuthorizationMiddleWare.js");

// Validation imports :

// SubRoutes imports :
const supervisorGroupPlanRoutes = require("./supervisorGroupPlanRoutes.js");
const supervisorGroupJoinRequestsRoutes = require("./supervisorGroupJoinRequestsRoutes.js");
const supervisorGroupMembersRoutes = require("./supervisorGroupMemberRoutes.js");

// SupervisorGroups Routes /supervisor/groups

router.post("/", getAllSupervisorGroupsController);

router.get(
  "/:groupId/content",
  verifyJwtTokenMiddleware,
  verifyGroupExistenceMiddleware,
  verifySupervisorExistenceMiddleware,
  verifySupervisorGroupAuthorizationMiddleware,
  getGroupContentController
);

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
  supervisorGroupJoinRequestsRoutes
);

router.use(
  "/:groupId/members",
  verifyJwtTokenMiddleware,
  verifyGroupExistenceMiddleware,
  verifySupervisorExistenceMiddleware,
  verifySupervisorGroupAuthorizationMiddleware,
  supervisorGroupMembersRoutes
);

router.get("/:groupId/dashboard", getSupervisorGroupDashboardController);

module.exports = router;
