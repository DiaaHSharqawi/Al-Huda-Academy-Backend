import Joi from "joi";

const resetPasswordSchema = Joi.object({
  email: Joi.string().email().optional().messages({
    "string.empty": "Email cannot be empty.",
    "string.email": "Must be a valid email address.",
  }),
  verificationCode: Joi.string().optional().messages({
    "string.empty": "Verification code cannot be empty.",
  }),
  newPassword: Joi.string().min(6).optional().messages({
    "string.empty": "New password cannot be empty.",
    "string.min": "New password must be at least 8 characters long.",
  }),
});

const resetPasswordValidationData = (req, res, next) => {
  const { error } = resetPasswordSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    const errorMessages = error.details.map((err) => {
      return err.message.replace(/"/g, "");
    });

    return res.status(400).json({
      message: "Validation error",
      errors: errorMessages,
    });
  }
  next();
};

export default resetPasswordValidationData;
