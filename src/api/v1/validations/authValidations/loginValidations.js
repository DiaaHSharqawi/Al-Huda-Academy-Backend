const Joi = require("joi");

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "validations.email.email_cannot_be_empty",
    "string.email": "validations.email.must_be_a_valid_email_address",
    "any.required": "validations.email.email_is_required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "validations.password.password_cannot_be_empty",
    "string.min": "validations.password.password_must_be_at_least_6_characters",
    "any.required": "validations.password.password_is_required",
  }),
});

const validateLoginData = (req, res, next) => {
  const { error } = loginSchema.validate(req.body, { abortEarly: false });
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

module.exports = validateLoginData;
