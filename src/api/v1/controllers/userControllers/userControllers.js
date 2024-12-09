const userServices = require("../../services/userServices/userServices");

const asyncHandler = require("express-async-handler");

const userControllers = {
  getUserByEmail: asyncHandler(async (req, res) => {
    const userIdentifier = req.body.email;
    const user = await userServices.getUserByEmail(userIdentifier);
    res.status(200).json({
      success: true,
      message: "User found",
      user,
    });
  }),
};

module.exports = userControllers;
