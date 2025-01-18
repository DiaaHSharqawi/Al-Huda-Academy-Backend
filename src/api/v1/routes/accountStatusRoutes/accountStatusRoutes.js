const express = require("express");

// Controllers imports :
const getAllAccountStatusController = require("../../controllers/accountStatusControllers/getAllAccountStatusController.js");

const router = express.Router();

router.get("/", getAllAccountStatusController);

module.exports = router;
