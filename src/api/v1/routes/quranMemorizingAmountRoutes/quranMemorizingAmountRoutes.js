const express = require("express");

const router = express.Router();

// Controllers imports :
const getAllQuranMemorizingAmountController = require("../../controllers/quranMemorizingAmountControllers/getAllQuranMemorizingAmountController");

// Roles Routes
router.get("/", getAllQuranMemorizingAmountController);

module.exports = router;
