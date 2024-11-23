import express from "express";

import familyLinkControllers from "./../../controllers/familyLinkControllers/familyLinkControllers.js";

import validateSendChildVerificationCodeData from "../../validations/authValidations/sendChildVerificationCodeValidations.js";
import validateVerifyChildVerificationCodeData from "../../validations/familyLinkValidations/vertifyChildVerificationCodeValidations.js";
import validateAddChildToFamilyLinkData from "../../validations/familyLinkValidations/addChildToFamilyLinkValidations.js";

const router = express.Router();

router.post(
  "/send-child-verification-code",
  validateSendChildVerificationCodeData,
  familyLinkControllers.sendChildVerificationCode
);

router.post(
  "/verify-child-verification-code",
  validateVerifyChildVerificationCodeData,
  familyLinkControllers.vertifyChildVerificationCode
);

router.post(
  "/add-child-to-family-link",
  validateAddChildToFamilyLinkData,
  familyLinkControllers.addChildToFamilyLink
);

router.get("/childs", familyLinkControllers.getChildsByUserId);

export default router;
