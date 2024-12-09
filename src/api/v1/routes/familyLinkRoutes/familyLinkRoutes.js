const express = require("express");

const validateSendChildVerificationCodeData = require("../../validations/authValidations/sendChildVerificationCodeValidations.js");
const validateVerifyChildVerificationCodeData = require("../../validations/familyLinkValidations/vertifyChildVerificationCodeValidations.js");
const validateAddChildToFamilyLinkData = require("../../validations/familyLinkValidations/addChildToFamilyLinkValidations.js");

// Controllers imports :
const sendChildVerificationCodeController = require("./../../controllers/familyLinkControllers/sendChildVerificationCodeController.js");
const vertifyChildVerificationCodeController = require("./../../controllers/familyLinkControllers/verifyChildVerificationCodeController.js");
const addChildToFamilyLinkController = require("./../../controllers/familyLinkControllers/addChildToFamilyLinkController.js");
const getChildsByUserIdController = require("./../../controllers/familyLinkControllers/getChildsByUserIdController.js");

const router = express.Router();

router.post(
  "/send-child-verification-code",
  validateSendChildVerificationCodeData,
  sendChildVerificationCodeController
);

router.post(
  "/verify-child-verification-code",
  validateVerifyChildVerificationCodeData,
  vertifyChildVerificationCodeController
);

router.post(
  "/add-child-to-family-link",
  validateAddChildToFamilyLinkData,
  addChildToFamilyLinkController
);

router.post("/childs", getChildsByUserIdController);

module.exports = router;
