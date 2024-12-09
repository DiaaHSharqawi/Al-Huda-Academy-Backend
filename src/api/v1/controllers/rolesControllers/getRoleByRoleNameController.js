const db = require("../../../../../models/index.js");
const asyncHandler = require("express-async-handler");

const getRoleByRoleNameService = require("./../../services/roleServices/getRoleByNameService.js");

const getRoleByNameController = asyncHandler(async (req, res) => {
  const roleData = req.body;
  const { roleName } = roleData;

  const role = await getRoleByRoleNameService(roleName);

  res.status(200).json({
    success: true,
    message: "Role found",
    role,
  });
});

module.exports = getRoleByNameController;
