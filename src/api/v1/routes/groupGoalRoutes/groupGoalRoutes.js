const express = require("express");

// Controllers imports :
const getAllGroupGoalController = require("./../../controllers/groupGoalControllers/getAllGroupGoalController");

// Validators imports :

const multer = require("multer");
const upload = multer();

const router = express.Router();

router.get("/", getAllGroupGoalController);

module.exports = router;
