const express = require("express");

// Controllers imports :
const getAllLanguagesController = require("../../controllers/languageControllers/getAllLanguagesController.js");

// Validators imports :

const router = express.Router();

router.get("/", getAllLanguagesController);

module.exports = router;
