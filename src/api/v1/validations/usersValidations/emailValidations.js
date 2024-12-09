const Joi = require("joi");

const verifyEmailSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "validations.email.email_cannot_be_empty",
    "string.email": "validations.email.must_be_a_valid_email_address",
    "string.required": "validations.email.email_is_required",
  }),
});

const validateEmail = (req, res, next) => {
  console.log("validateEmail");
  const { error } = verifyEmailSchema.validate(req.body, {
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

module.exports = validateEmail;
