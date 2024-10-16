import Joi from "joi";

const loginSchema = Joi.object({
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
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required.",
    "string.min": "Password must be at least 6 characters long.",
  }),
}).or("userName", "email");

const validateLoginData = (req, res, next) => {
  const { error } = loginSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errorMessages = error.details.map((err) => {
      if (err.message.includes("must contain at least one of")) {
        return "You must provide either a username or an email.";
      }
      return err.message.replace(/"/g, "");
    });

    return res.status(400).json({
      message: "Validation error",
      errors: errorMessages,
    });
  }
  next();
};

export default validateLoginData;
