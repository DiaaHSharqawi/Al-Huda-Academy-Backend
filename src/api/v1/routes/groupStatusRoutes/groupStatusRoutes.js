const express = require("express");

// Controllers imports :
const getAllGroupStatusController = require("./../../controllers/groupStatusControllers/getAllGroupStatusController");

// Validators imports :

const router = express.Router();

router.get("/", getAllGroupStatusController);

module.exports = router;
