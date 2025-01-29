const express = require("express");

const router = express.Router();

// Controllers imports :

const getAllSupervisorGroupPlanController = require("../../controllers/supervisorControllers/groupControllers/groupPlanControllers/getAllSupervisorGroupPlanController.js");
const createSupervisorGroupPlanController = require("../../controllers/supervisorControllers/groupControllers/groupPlanControllers/createSupervisorGroupPlanController.js");

const updateSupervisorGroupPlanController = require("../../controllers/supervisorControllers/groupControllers/groupPlanControllers/updateSupervisorGroupPlanController.js");
const deleteSupervisorGroupPlanController = require("../../controllers/supervisorControllers/groupControllers/groupPlanControllers/deleteSupervisorGroupPlanController.js");

const getSupervisorGroupPlanDetailsController = require("../../controllers/supervisorControllers/groupControllers/groupPlanControllers/getSupervisorGroupPlanDetailsController.js");
const getAllSupervisorGroupPlanDatesController = require("../../controllers/supervisorControllers/groupControllers/groupPlanControllers/getAllSupervisorGroupPlanDatesController.js");

// Middlewares imports :
const verifyGroupPlanExistenceMiddleware = require("./../../middlewares/groupPlans/verifyGroupPlanExistenceMiddleware.js");

// Validation imports :
const validateCreateSupervisorGroupPlanValidation = require("./../../validations/supervisorValidations/createSupervisorGroupPlanValidation.js");

// SupervisorGroups Routes /supervisor/groups/:groupId/group-plan

router.get("/", getAllSupervisorGroupPlanController);

router.get("/dates", getAllSupervisorGroupPlanDatesController);

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

router.put(
  "/:planId/update",
  verifyGroupPlanExistenceMiddleware,
  validateCreateSupervisorGroupPlanValidation,
  updateSupervisorGroupPlanController
);

router.delete(
  "/:planId/delete",
  verifyGroupPlanExistenceMiddleware,
  deleteSupervisorGroupPlanController
);

module.exports = router;
