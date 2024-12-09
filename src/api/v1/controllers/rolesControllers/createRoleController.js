const asyncHandler = require("express-async-handler");

const createRoleService = require("./../../services/roleServices/createRoleService.js");

const createRoleController = asyncHandler(async (req, res) => {
  const roleData = req.body;

  const createdRole = await createRoleService(roleData);

  res.status(201).json({
    success: true,
    message: "Role created",
    createdRole,
  });
});

module.exports = createRoleController;
