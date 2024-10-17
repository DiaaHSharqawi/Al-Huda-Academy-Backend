import express from "express";
import multer from "multer";

import authControllers from "../../controllers/authControllers/authControllers.js";

import validateRegisterData from "../../validations/authValidations/registerValidations.js";
import validateLoginData from "../../validations/authValidations/loginValidations.js";

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

router.post("/forgot-password", authControllers.forgotPassword);

export default router;
