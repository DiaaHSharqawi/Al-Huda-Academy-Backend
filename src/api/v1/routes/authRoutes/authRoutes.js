import express from "express";
import validateRegisterData from "../../validations/authValidations/authValidations.js";
import multer from "multer";

import authControllers from "../../controllers/authControllers/authControllers.js";

const router = express.Router();

const upload = multer();

// Public Routes
router.post(
  "/register",
  upload.single("profileImage"),
  validateRegisterData,
  authControllers.registerUser
);

router.post("/login", upload.none(), authControllers.loginUser);

export default router;
