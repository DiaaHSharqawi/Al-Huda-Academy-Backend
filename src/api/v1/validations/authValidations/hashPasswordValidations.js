const Joi = require("joi");

const validateHashedPasswordSchema = Joi.object({
  password: Joi.string().required().messages({
    "string.empty": "validations.password.password_cannot_be_empty",
    "any.required": "validations.password.password_is_required",
  }),
});

const validateHashedPassword = (req, res, next) => {
  const { error } = validateHashedPasswordSchema.validate(req.body, {
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

module.exports = validateHashedPassword;
