const asyncHandler = require("express-async-handler");

const userRegisterService = require("../../../services/authServices/registerServices/userRegisterService");

const userRegisterController = asyncHandler(async (req, res) => {
  console.log("userRegisterController");

  const userData = req.body;

  const userRegisterResult = await userRegisterService(userData);
  res.status(200).json({
    success: true,
    message: "User Registered",
    userRegisterResult,
  });
});
module.exports = userRegisterController;
