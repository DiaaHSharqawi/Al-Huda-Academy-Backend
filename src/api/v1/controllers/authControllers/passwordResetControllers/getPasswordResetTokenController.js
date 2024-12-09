const asyncHandler = require("express-async-handler");

const getresetPasswordTokenService = require("../../../services/authServices/passwordResetServices/getPasswordResetTokenService");

const getPasswordResetTokenController = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const resetPasswordToken = await getresetPasswordTokenService(email);
  console.log(resetPasswordToken);

  res.status(200).json({
    success: true,
    message: req.t("reset password retreived successfully"),
    resetPasswordToken,
  });
});

module.exports = getPasswordResetTokenController;
