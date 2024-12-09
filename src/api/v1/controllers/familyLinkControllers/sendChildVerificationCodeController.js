const asyncHandler = require("express-async-handler");

const sendChildVerificationCodeService = require("./../../services/familyLinkServices/sendChildVerificationCodeService");

const sendChildVerificationCodeController = asyncHandler(async (req, res) => {
  const sendChildVerificationCodeData = req.body;

  console.log("sendChildVerificationCodeController");
  console.log("sendChildVerificationCodeData");
  console.dir(sendChildVerificationCodeData, { depth: null });

  await sendChildVerificationCodeService(sendChildVerificationCodeData);
  res.status(200).json({
    success: true,
    message: req.t("تم ارسال الرمز بنجاح"),
  });
});

module.exports = sendChildVerificationCodeController;
