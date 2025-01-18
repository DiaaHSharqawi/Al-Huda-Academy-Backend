const express = require("express");

// Controllers imports :
const getRequestsForCreatingGroupsController = require("../../controllers/adminControllers/getRequestsForCreatingGroupsController.js");
const getAllSupervisorRequestRegistrationController = require("../../controllers/adminControllers/getAllSupervisorRequestRegistrationController.js");
const getSupervisorRequestRegistrationDetailsController = require("../../controllers/adminControllers/getSupervisorRequestRegistrationDetailsController.js");
const acceptSupervisorRequestRegistrationController = require("../../controllers/adminControllers/acceptSupervisorRequestRegistrationController.js");
const rejectSupervisorRequestRegistrationController = require("../../controllers/adminControllers/rejectSupervisorRequestRegistrationController.js");

const router = express.Router();

router.get("/groups/requests/pending", getRequestsForCreatingGroupsController);

router.get(
  "/supervisor/requests/registration/pending",
  getAllSupervisorRequestRegistrationController
);

router.get(
  "/supervisor/requests/registration/pending/:supervisorId",
  getSupervisorRequestRegistrationDetailsController
);

router.post(
  "/supervisor/requests/registration/pending/:supervisorId/accept",
  acceptSupervisorRequestRegistrationController
);

router.post(
  "/supervisor/requests/registration/pending/:supervisorId/reject",
  rejectSupervisorRequestRegistrationController
);

module.exports = router;
