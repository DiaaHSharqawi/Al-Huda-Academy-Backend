const Joi = require("joi");

const registerSchema = Joi.object({
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
  fullName: Joi.string().required().messages({
    "string.empty": "validations.full_name.full_name_cannot_be_empty",
    "any.required": "validations.full_name.full_name_is_required",
  }),
  age: Joi.number().integer().min(6).max(100).required().messages({
    "number.base": "validations.age.age_must_be_a_number",
    "number.integer": "validations.age.age_must_be_an_integer",
    "number.min": "validations.age.age_must_be_at_least_6",
    "number.max": "validations.age.age_must_be_at_most_100",
    "any.required": "validations.age.age_is_required",
  }),
  phone: Joi.string()
    .pattern(/^\d{10}$/)
    .required()
    .messages({
      "string.empty": "validations.phone_number.phone_number_is_required",
      "string.pattern.base":
        "validations.phone_number.phone_number_must_be_10_digits",
      "any.required": "validations.phone_number.phone_number_is_required",
    }),
  city: Joi.string().required().messages({
    "string.empty": "validations.city.city_cannot_be_empty",
    "any.required": "validations.city.city_is_required",
  }),
  country: Joi.string().required().messages({
    "string.empty": "validations.country.country_cannot_be_empty",
    "any.required": "validations.country.country_is_required",
  }),
  gender: Joi.string().valid("male", "female").required().messages({
    "string.empty": "validations.gender.gender_cannot_be_empty",
    "any.only": "validations.gender.gender_must_be_one_of_male_female",
    "any.required": "validations.gender.gender_is_required",
  }),
  profileImage: Joi.object().optional().messages({
    "string.uri": "validations.profile_image.profile_image_must_be_a_valid_url",
    "any.required": "validations.profile_image.profile_image_is_required",
  }),
});

const validateRegisterData = (req, res, next) => {
  const { error } = registerSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errorMessage = error.details
      .map((err) => req.t(err.message.replace(/"/g, "")))
      .join(", ");

    return res.status(422).json({
      success: false,
      message: errorMessage,
    });
  }
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: req.t("validations.profile_image.profile_image_is_required"),
    });
  }
  next();
};

module.exports = validateRegisterData;
