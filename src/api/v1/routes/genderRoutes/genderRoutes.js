const express = require("express");

// Controllers imports :
const getAllGendersController = require("../../controllers/genderControllers/getAllGendersController.js");

const router = express.Router();

router.get("/", getAllGendersController);

module.exports = router;
