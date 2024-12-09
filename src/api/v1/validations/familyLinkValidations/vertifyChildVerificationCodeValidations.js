const Joi = require("joi");

const verifyChildVerificationCodeSchema = Joi.object({
  senderUserEmail: Joi.string().required().messages({
    "string.empty":
      "validations.senderUserEmail.sender_user_email_cannot_be_empty",
    "string.required":
      "validations.senderUserEmail.sender_user_email_is_required",
  }),

  receiverUserEmail: Joi.string().email().required().messages({
    "string.empty": "validations.email.email_cannot_be_empty",
    "string.email": "validations.email.must_be_a_valid_email_address",
    "string.required": "validations.email.email_is_required",
  }),

  verificationCode: Joi.string().required().messages({
    "string.empty":
      "validations.verificationCode.verification_code_cannot_be_empty",
    "string.required":
      "validations.verificationCode.verification_code_is_required",
  }),
});

const validateVerifyChildVerificationCodeData = (req, res, next) => {
  console.log("validateVerifyChildVerificationCodeData");
  const { error } = verifyChildVerificationCodeSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    const errorMessage = error.details
      .map((err) => req.t(err.message.replace(/"/g, "")))
      .join(", ");

    return res.status(422).json({
      success: false,
      message: errorMessage,
    });
  }
  next();
};

module.exports = validateVerifyChildVerificationCodeData;
