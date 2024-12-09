const asyncHandler = require("express-async-handler");

const resetPasswordService = require("./../../../services/authServices/passwordResetServices/resetPasswordService");

const resetPasswordController = asyncHandler(async (req, res) => {
  const { verificationCode, email, newPassword } = req.body;

  console.info(req.body);

  const resetPasswordData = req.body;

  await resetPasswordService(resetPasswordData);

  return res.status(200).json({
    success: true,
    message: req.t("resetPassword.password_reset_ssuccessfully"),
  });
});

module.exports = resetPasswordController;
