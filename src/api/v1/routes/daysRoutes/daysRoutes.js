const express = require("express");

// Controllers imports :
const getAllDaysController = require("../../controllers/daysControllers/getAllDaysControllers.js");

const router = express.Router();

router.get("/", getAllDaysController);

module.exports = router;
