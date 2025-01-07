const express = require("express");

// Controllers imports :
const getRequestsForCreatingGroupsController = require("../../controllers/adminControllers/getRequestsForCreatingGroupsController.js");
const getAllSupervisorRequestRegistrationController = require("../../controllers/adminControllers/getAllSupervisorRequestRegistrationController.js");
const getSupervisorRequestRegistrationDetailsController = require("../../controllers/adminControllers/getSupervisorRequestRegistrationDetailsController.js");

const router = express.Router();

router.get("/groups/requests/pending", getRequestsForCreatingGroupsController);

router.get(
  "/supervisor/requests/pending",
  getAllSupervisorRequestRegistrationController
);

router.get(
  "/supervisor/requests/pending/:supervisorId",
  getSupervisorRequestRegistrationDetailsController
);

module.exports = router;
