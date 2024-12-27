const express = require("express");

const router = express.Router();

// Controllers :

const getAllTeachingMethodsController = require("../../controllers/teachingMethodsControllers/getAllTeachingMethodsController");

// Routes

router.get("/", getAllTeachingMethodsController);

module.exports = router;
