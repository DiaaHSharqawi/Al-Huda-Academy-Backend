const express = require("express");

const router = express.Router();

// Controllers imports :
const getSurahsController = require("../../controllers/quranControllers/getSurahsController");

// Roles Routes

router.get("/surahs", getSurahsController);

module.exports = router;
