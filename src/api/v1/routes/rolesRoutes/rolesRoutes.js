const express = require("express");
const multer = require("multer");

const router = express.Router();

const upload = multer();

const createRoleController = require("../../controllers/rolesControllers/createRoleController");
const getRoleByRoleNameController = require("../../controllers/rolesControllers/getRoleByRoleNameController");
const getRoleByRoleIdController = require("../../controllers/rolesControllers/getRoleByRoleIdController");
// Roles Routes

router.post("/create-role", createRoleController);
router.post("/get-role-by-name", getRoleByRoleNameController);
router.post("/get-role-by-role-id", getRoleByRoleIdController);

module.exports = router;
