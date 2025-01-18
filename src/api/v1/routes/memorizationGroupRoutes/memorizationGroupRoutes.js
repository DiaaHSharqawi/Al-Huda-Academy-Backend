const express = require("express");

// Controllers imports :
const createMemorizationGroupController = require("./../../controllers/memorizationGroupControllers/createMemorizationGroupController");
const getMemorizationGroupByGroupNameController = require("./../../controllers/memorizationGroupControllers/getMemorizationGroupByGroupNameController");
const getPendingGroupCreationRequestsController = require("./../../controllers/memorizationGroupControllers/getPendingGroupCreationRequestsController");
const getMemorizationGroupController = require("./../../controllers/memorizationGroupControllers/getMemorizationGroupController");
const getMemorizationGroupByGroupIdController = require("./../../controllers/memorizationGroupControllers/getMemorizationGroupByGroupIdController");
const getAllGroupDetailsController = require("./../../controllers/memorizationGroupControllers/getAllGroupDetailsController");

// Validators imports :
const validateGetMemorizationGroupByGroupName = require("./../../validations/memorizationGroupValidations/getMemorizationGroupByGroupNameValidations");
const validateCreateMemorizationGroup = require("./../../validations/memorizationGroupValidations/createMemorizationGroupValidations");

// Middleware imports :
const verifyJwtTokenMiddleware = require("../../middlewares/verifyJwtMiddleware");
const verifyParticipantExistenceMiddleware = require("./../../middlewares/participant/verifyParticipantExistenceMiddleware");

const router = express.Router();

router.get(
  "/",
  verifyJwtTokenMiddleware,
  verifyParticipantExistenceMiddleware,
  getMemorizationGroupController
);

router.get("/all", getAllGroupDetailsController);

router.get("/id/:id", getMemorizationGroupByGroupIdController);

router.post(
  "/create",
  validateCreateMemorizationGroup,
  createMemorizationGroupController
);

router.post(
  "/get-by-name",

  validateGetMemorizationGroupByGroupName,
  getMemorizationGroupByGroupNameController
);

router.post("/pending", getPendingGroupCreationRequestsController);

module.exports = router;
