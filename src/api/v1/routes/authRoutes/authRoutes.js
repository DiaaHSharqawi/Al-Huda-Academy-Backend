const express = require("express");
const multer = require("multer");

// Middlewares Validations imports :
const validateLoginData = require("../../validations/authValidations/loginValidations.js");
const validateSendPasswordResetCodeData = require("../../validations/authValidations/sendPasswordResetCodeValidations.js");
const resetPasswordValidationData = require("../../validations/authValidations/resetPasswordValidations.js");

// Controllers imports :
const loginController = require("../../controllers/authControllers/loginControllers/loginController.js");
const sendPasswordResetCodeController = require("../../controllers/authControllers/passwordResetControllers/sendPasswordResetCodeController.js");

const getPasswordResetTokenController = require("../../controllers/authControllers/passwordResetControllers/getPasswordResetTokenController.js");
const resetPasswordController = require("../../controllers/authControllers/passwordResetControllers/resetPasswordController.js");

// Routes imports :
const registerRoutes = require("./registerRoutes.js");

const router = express.Router();
const upload = multer();

// Public Routes
router.use("/register", registerRoutes);

router.post("/login", upload.none(), validateLoginData, loginController);

// Password Reset Routes :

router.post("/get-password-reset-code", getPasswordResetTokenController);

router.post(
  "/send-password-reset-code",
  validateSendPasswordResetCodeData,
  sendPasswordResetCodeController
);

router.post(
  "/reset-password",
  resetPasswordValidationData,
  resetPasswordController
);

module.exports = router;
