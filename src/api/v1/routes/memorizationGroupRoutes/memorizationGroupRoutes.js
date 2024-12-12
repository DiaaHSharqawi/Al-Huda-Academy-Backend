const express = require("express");

// Controllers imports :
const createMemorizationGroupController = require("./../../controllers/memorizationGroupControllers/createMemorizationGroupController");
const getMemorizationGroupByGroupNameController = require("./../../controllers/memorizationGroupControllers/getMemorizationGroupByGroupNameController");

// Validators imports :
const validateGetMemorizationGroupByGroupName = require("./../../validations/memorizationGroupValidations/getMemorizationGroupByGroupNameValidations");
const validateCreateMemorizationGroup = require("./../../validations/memorizationGroupValidations/createMemorizationGroupValidations");

const multer = require("multer");
const upload = multer();

const router = express.Router();

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
module.exports = router;
