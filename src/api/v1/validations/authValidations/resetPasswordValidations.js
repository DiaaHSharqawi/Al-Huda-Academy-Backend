const Joi = require("joi");

const resetPasswordSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "validations.email.email_cannot_be_empty",
    "string.email": "validations.email.must_be_a_valid_email_address",
    "any.required": "validations.email.email_is_required",
  }),
  verificationCode: Joi.string().required().messages({
    "string.empty":
      "validations.verification_code.verification_code_cannot_be_empty",
    "any.required":
      "validations.verification_code.verification_code_is_required",
  }),
  newPassword: Joi.string().min(6).required().messages({
    "string.empty": "validations.password.password_cannot_be_empty",
    "string.min":
      "validations.verification_code.new_password_must_be_at_least_6_characters_long",
  }),
});

const resetPasswordValidationData = (req, res, next) => {
  const { error } = resetPasswordSchema.validate(req.body, {
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

module.exports = resetPasswordValidationData;
