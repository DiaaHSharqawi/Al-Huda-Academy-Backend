const express = require("express");
const multer = require("multer");

const router = express.Router();

// Controllers imports :
const getSupervisorByUserIdController = require("./../../controllers/supervisorControllers/getSupervisorController");
const getSupervisorBySupervisorIdController = require("./../../controllers/supervisorControllers/getSupervisorBySupervisorIdController");

const getAllSupervisorGroupJoinRequestController = require("./../../controllers/supervisorControllers/getAllSupervisorGroupJoinRequestController");
const getAllSupervisorGroupsController = require("./../../controllers/supervisorControllers/getAllSupervisorGroupsController");

// Middlewares imports :
const verifyJwtTokenMiddleWare = require("./../../middlewares/verifyJwt.js");
const verifySupervisorGroupAuthorization = require("./../../middlewares/verifySupervisorGroupAuthorization.js");

// Supervisor SubRoutes
const supervisorGroupsRoutes = require("./supervisorGroupsRoutes.js");

// Supervisor Routes

router.use("/groups", supervisorGroupsRoutes);

router.post("/get-supervisor-by-user-id", getSupervisorByUserIdController);

router.post(
  "/get-supervisor-by-supervisor-id",
  getSupervisorBySupervisorIdController
);

module.exports = router;
