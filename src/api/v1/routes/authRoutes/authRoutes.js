import express from "express";
import multer from "multer";

import authControllers from "../../controllers/authControllers/authControllers.js";

import validateRegisterData from "../../validations/authValidations/registerValidations.js";
import validateLoginData from "../../validations/authValidations/loginValidations.js";
import validateSendPasswordResetCodeData from "../../validations/authValidations/sendPasswordResetCodeValidations.js";

const router = express.Router();

const upload = multer();

// Public Routes
router.post(
  "/register",
  upload.single("profileImage"),
  validateRegisterData,
  authControllers.registerUser
);

router.post(
  "/login",
  upload.none(),
  validateLoginData,
  authControllers.loginUser
);

router.post(
  "/send-password-reset-code",
  validateSendPasswordResetCodeData,
  authControllers.sendPasswordResetCode
);

router.post("/reset-password", authControllers.resetPassword);

export default router;
