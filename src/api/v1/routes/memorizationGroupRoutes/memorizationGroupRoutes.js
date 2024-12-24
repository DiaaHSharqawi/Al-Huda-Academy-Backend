const express = require("express");

// Controllers imports :
const createMemorizationGroupController = require("./../../controllers/memorizationGroupControllers/createMemorizationGroupController");
const getMemorizationGroupByGroupNameController = require("./../../controllers/memorizationGroupControllers/getMemorizationGroupByGroupNameController");
const getPendingGroupCreationRequestsController = require("./../../controllers/memorizationGroupControllers/getPendingGroupCreationRequestsController");
const getMemorizationGroupController = require("./../../controllers/memorizationGroupControllers/getMemorizationGroupController");
const getMemorizationGroupByGroupIdController = require("./../../controllers/memorizationGroupControllers/getMemorizationGroupByGroupIdController");

// Validators imports :
const validateGetMemorizationGroupByGroupName = require("./../../validations/memorizationGroupValidations/getMemorizationGroupByGroupNameValidations");
const validateCreateMemorizationGroup = require("./../../validations/memorizationGroupValidations/createMemorizationGroupValidations");

const multer = require("multer");
const upload = multer();

const router = express.Router();

router.get("/", getMemorizationGroupController);

router.get("/id/:id", getMemorizationGroupByGroupIdController);

router.post(
  "/create",
  upload.none(),
  validateCreateMemorizationGroup,
  createMemorizationGroupController
);

router.post(
  "/get-by-name",
  upload.none(),
  validateGetMemorizationGroupByGroupName,
  getMemorizationGroupByGroupNameController
);

router.post("/pending", getPendingGroupCreationRequestsController);

module.exports = router;
