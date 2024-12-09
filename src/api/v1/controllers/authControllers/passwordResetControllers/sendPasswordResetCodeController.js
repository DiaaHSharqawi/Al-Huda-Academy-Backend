const asyncHandler = require("express-async-handler");

const sendPasswordResetCodeService = require("./../../../services/authServices/passwordResetServices/sendPasswordResetCodeService");

const sendPasswordResetCodeController = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const userIdentifier = email;

  await sendPasswordResetCodeService(userIdentifier);
  res.status(200).json({
    success: true,
    message: req.t("sendResetPasswordCode.password_reset_code_sent"),
  });
});

module.exports = sendPasswordResetCodeController;
