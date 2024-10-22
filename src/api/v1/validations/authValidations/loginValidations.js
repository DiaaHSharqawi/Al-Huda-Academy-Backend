import Joi from "joi";

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email cannot be empty.",
    "string.email": "Must be a valid email address.",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required.",
    "string.min": "Password must be at least 6 characters long.",
  }),
});

const validateLoginData = (req, res, next) => {
  const { error } = loginSchema.validate(req.body, { abortEarly: false });
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

export default validateLoginData;
