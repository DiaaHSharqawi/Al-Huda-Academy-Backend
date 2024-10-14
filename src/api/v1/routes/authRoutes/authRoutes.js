import express from "express";
import authControllers from "../../controllers/authControllers/authControllers.js";
import validateRegisterData from "../../validations/authValidations/authValidations.js";
import multer from "multer";

const router = express.Router();

const upload = multer();
// Public Routes
router.post(
  "/register",
  upload.none(),
  validateRegisterData,
  authControllers.registerUser
);

export default router;
