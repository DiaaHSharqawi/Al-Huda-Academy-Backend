const userControllers = require("../../controllers/userControllers/userControllers");
const validateEmail = require("../../validations/usersValidations/emailValidations");
const express = require("express");
const multer = require("multer");

const router = express.Router();

router.get("/user", validateEmail, userControllers.getUserByEmail);

module.exports = router;
