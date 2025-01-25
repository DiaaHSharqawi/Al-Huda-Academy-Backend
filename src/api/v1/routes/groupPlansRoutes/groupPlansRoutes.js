const express = require("express");

// Controllers imports :
const getAllGroupPlansController = require("../../controllers/groupPlansControllers/getAllGroupPlansController.js");

// Validators imports :

const router = express.Router();

router.get("/", getAllGroupPlansController);

module.exports = router;
