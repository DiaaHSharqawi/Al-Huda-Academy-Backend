const asyncHandler = require("express-async-handler");
const getRoleByRoleIdService = require("./../../services/roleServices/getRoleByRoleIdService");

const getRoleByRoleIdController = asyncHandler(async (req, res) => {
  console.info("Get Role By Role Id Controller");

  const getRoleByRoleIdData = req.body;
  console.log("getRoleByRoleIdData");
  console.dir(getRoleByRoleIdData, { depth: null });

  const roleDetails = await getRoleByRoleIdService(getRoleByRoleIdData);

  console.log("roleDetails");
  console.dir(roleDetails, { depth: null });

  res.status(200).json({
    success: true,
    message: "Role By Role Id",
    roleDetails,
  });
});

module.exports = getRoleByRoleIdController;
