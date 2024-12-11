const express = require("express");
const multer = require("multer");

const router = express.Router();

const upload = multer();

// Controllers imports :
const getSupervisorByUserIdController = require("./../../controllers/supervisorControllers/getSupervisorController");

// Supervisor Routes

router.post("/get-supervisor-by-user-id", getSupervisorByUserIdController);

module.exports = router;
