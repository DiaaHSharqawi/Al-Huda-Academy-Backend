import Joi from "joi";

const verifyChildVerificationCodeSchema = Joi.object({
  senderIdentifier: Joi.string().required().messages({
    "string.empty":
      "validations.senderIdentifier.sender_identifier_cannot_be_empty",
    "string.required":
      "validations.senderIdentifier.sender_identifier_is_required",
  }),

  receiverIdentifier: Joi.string().email().required().messages({
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

export default validateVerifyChildVerificationCodeData;
