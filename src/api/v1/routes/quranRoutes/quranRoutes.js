const express = require("express");

const router = express.Router();

// Controllers imports :
const getSurahsController = require("../../controllers/quranControllers/getSurahsController");
const getJuzaController = require("../../controllers/quranControllers/getJuzaController");

// Roles Routes

router.get("/surahs", getSurahsController);

router.get("/juzas", getJuzaController);

module.exports = router;
