import Joi from "joi";

const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required.",
    "string.email": "Must be a valid email address.",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required.",
    "string.min": "Password must be at least 6 characters long.",
  }),
  fullName: Joi.string().required().messages({
    "string.empty": "Full name is required.",
  }),
  age: Joi.number().integer().min(6).max(100).required().messages({
    "number.base": "Age must be a number.",
    "number.integer": "Age must be an integer.",
    "number.min": "Age must be at least 6.",
    "number.max": "Age must be at most 100.",
    "any.required": "Age is required.",
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
  gender: Joi.string().valid("male", "female").required().messages({
    "string.empty": "Gender is required.",
    "any.only": "Gender must be one of 'male', 'female'.",
  }),
  profileImage: Joi.object().optional().messages({
    "string.uri": "Profile image must be a valid URL.",
  }),
});

const validateRegisterData = (req, res, next) => {
  const { error } = registerSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      message: "Validation error",
      errors: error.details.map((err) => err.message.replace(/"/g, "")),
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
