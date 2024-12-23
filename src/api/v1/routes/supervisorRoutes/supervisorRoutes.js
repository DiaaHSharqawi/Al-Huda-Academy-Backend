const express = require("express");
const multer = require("multer");

const router = express.Router();

const upload = multer();

// Controllers imports :
const getSupervisorByUserIdController = require("./../../controllers/supervisorControllers/getSupervisorController");
const getSupervisorBySupervisorIdController = require("./../../controllers/supervisorControllers/getSupervisorBySupervisorIdController");
// Supervisor Routes

router.post("/get-supervisor-by-user-id", getSupervisorByUserIdController);

router.post(
  "/get-supervisor-by-supervisor-id",
  getSupervisorBySupervisorIdController
);

module.exports = router;
