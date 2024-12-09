const asyncHandler = require("express-async-handler");

const verifyChildVerificationCodeService = require("./../../services/familyLinkServices/verifyChildVerificationCodeService");

const verifyChildVerificationCodeController = asyncHandler(async (req, res) => {
  console.log("vertifyChildVerificationCode");

  const verifyChildVerificationCodeData = req.body;

  console.log("verifyChildVerificationCodeData");
  console.dir(verifyChildVerificationCodeData, { depth: null });

  await verifyChildVerificationCodeService(verifyChildVerificationCodeData);

  res.status(200).json({
    success: true,
    message: req.t("تم التحقق من الرمز بنجاح"),
  });
});

module.exports = verifyChildVerificationCodeController;
