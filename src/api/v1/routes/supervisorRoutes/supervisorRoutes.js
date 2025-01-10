const express = require("express");
const multer = require("multer");

const router = express.Router();

// Controllers imports :
const getSupervisorByUserIdController = require("./../../controllers/supervisorControllers/getSupervisorController");
const getSupervisorBySupervisorIdController = require("./../../controllers/supervisorControllers/getSupervisorBySupervisorIdController");
const getAllSupervisorGroupJoinRequestController = require("./../../controllers/supervisorControllers/getAllSupervisorGroupJoinRequestController");
const getAllSupervisorGroupsController = require("./../../controllers/supervisorControllers/getAllSupervisorGroupsController");
// Supervisor Routes

router.post("/groups", getAllSupervisorGroupsController);

router.post(
  "/groups/:groupId/join-requests",
  getAllSupervisorGroupJoinRequestController
);

router.post("/get-supervisor-by-user-id", getSupervisorByUserIdController);

router.post(
  "/get-supervisor-by-supervisor-id",
  getSupervisorBySupervisorIdController
);

module.exports = router;
