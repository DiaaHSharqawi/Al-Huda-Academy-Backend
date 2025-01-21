const express = require("express");

const router = express.Router();

// Controllers imports :

const getAllSupervisorGroupPlanController = require("../../controllers/supervisorControllers/getAllSupervisorGroupPlanController.js");
const createSupervisorGroupPlanController = require("./../../controllers/supervisorControllers/createSupervisorGroupPlanController.js");

const getSupervisorGroupPlanDetailsController = require("./../../controllers/supervisorControllers/getSupervisorGroupPlanDetailsController.js");

// Middlewares imports :
const verifyGroupPlanExistenceMiddleware = require("./../../middlewares/groupPlans/verifyGroupPlanExistenceMiddleware.js");

// Validation imports :
const validateCreateSupervisorGroupPlanValidation = require("./../../validations/supervisorValidations/createSupervisorGroupPlanValidation.js");

// SupervisorGroups Routes /supervisor/groups/:groupId/group-plan

router.get("/", getAllSupervisorGroupPlanController);

router.get(
  "/:planId",
  verifyGroupPlanExistenceMiddleware,
  getSupervisorGroupPlanDetailsController
);

router.post(
  "/create",
  validateCreateSupervisorGroupPlanValidation,
  createSupervisorGroupPlanController
);

module.exports = router;
