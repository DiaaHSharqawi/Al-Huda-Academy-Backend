const express = require("express");
const multer = require("multer");

const router = express.Router();

// Controllers imports :
const getAllSupervisorGroupJoinRequestController = require("./../../controllers/supervisorControllers/getAllSupervisorGroupJoinRequestController");
const getAllSupervisorGroupsController = require("./../../controllers/supervisorControllers/getAllSupervisorGroupsController");
const getSupervisorGroupDashboardController = require("./../../controllers/supervisorControllers/getSupervisorGroupDashboardController");

// Middlewares imports :
const verifyJwtTokenMiddleWare = require("./../../middlewares/verifyJwt.js");
const verifySupervisorGroupAuthorization = require("./../../middlewares/verifySupervisorGroupAuthorization.js");

// SupervisorGroups Routes /supervisor/groups

router.post("/", getAllSupervisorGroupsController);

router.get("/:groupId/dashboard", getSupervisorGroupDashboardController);

router.get(
  "/:groupId/join-requests",
  verifyJwtTokenMiddleWare,
  verifySupervisorGroupAuthorization,
  getAllSupervisorGroupJoinRequestController
);

module.exports = router;
