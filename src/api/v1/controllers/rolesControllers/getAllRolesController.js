const asyncHandler = require("express-async-handler");
const getAllRolesService = require("./../../services/roleServices/getAllRolesService");

const getAllRolesController = asyncHandler(async (req, res) => {
  const roles = await getAllRolesService();

  res.status(200).json({
    success: true,
    message: "Roles retrieved successfully",
    roles: roles,
  });
});

module.exports = getAllRolesController;
