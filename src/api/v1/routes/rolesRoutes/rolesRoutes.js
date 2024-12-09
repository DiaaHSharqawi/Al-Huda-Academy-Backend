const express = require("express");
const multer = require("multer");

const router = express.Router();

const upload = multer();

const createRoleController = require("../../controllers/rolesControllers/createRoleController");
const getRoleByRoleNameController = require("../../controllers/rolesControllers/getRoleByRoleNameController");

// Roles Routes

router.post("/create-role", createRoleController);
router.post("/get-role-by-name", getRoleByRoleNameController);

module.exports = router;
