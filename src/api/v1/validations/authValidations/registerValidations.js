import Joi from "joi";

const registerSchema = Joi.object({
  userName: Joi.string().alphanum().min(3).max(4).required().messages({
    "string.empty": "Username is required.",
    "string.alphanum": "Username must be alphanumeric.",
    "string.min": "Username must be at least 3 characters long.",
    "string.max": "Username must be at most 30 characters long.",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required.",
    "string.email": "Must be a valid email address.",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required.",
    "string.min": "Password must be at least 6 characters long.",
  }),
  firstName: Joi.string().required().messages({
    "string.empty": "First name is required.",
  }),
  lastName: Joi.string().required().messages({
    "string.empty": "Last name is required.",
  }),
  birthdate: Joi.string().required().messages({
    "string.empty": "Birthdate is required.",
  }),
  phone: Joi.string()
    .pattern(/^\d{10}$/)
    .required()
    .messages({
      "string.empty": "Phone number is required.",
      "string.pattern.base": "Phone number must be a 10-digit number.",
    }),
  city: Joi.string().required().messages({
    "string.empty": "City is required.",
  }),
  country: Joi.string().required().messages({
    "string.empty": "Country is required.",
  }),
});

const validateRegisterData = (req, res, next) => {
  const { error } = registerSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      message: "Validation error",
      errors: error.details.map((err) => err.message),
    });
  }
  if (!req.file) {
    return res.status(400).json({
      message: "Validation error",
      error: "Profile image is required.",
    });
  }
  next();
};
export default validateRegisterData;
