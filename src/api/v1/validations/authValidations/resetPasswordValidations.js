import Joi from "joi";

const resetPasswordSchema = Joi.object({
  userName: Joi.string().alphanum().min(3).max(30).optional().messages({
    "string.empty": "Username cannot be empty.",
    "string.alphanum": "Username must be alphanumeric.",
    "string.min": "Username must be at least 3 characters long.",
    "string.max": "Username must be at most 30 characters long.",
  }),
  email: Joi.string().email().optional().messages({
    "string.empty": "Email cannot be empty.",
    "string.email": "Must be a valid email address.",
  }),
  verificationCode: Joi.string().optional().messages({
    "string.empty": "Verification code cannot be empty.",
  }),
  newPassword: Joi.string().min(8).optional().messages({
    "string.empty": "New password cannot be empty.",
    "string.min": "New password must be at least 8 characters long.",
  }),
})
  .xor("userName", "email") // Ensures only one of these is provided
  .messages({
    "object.missing":
      "You must provide either a username or an email, but not both.",
    "object.xor":
      "You can only provide either a username or an email, not both.",
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
