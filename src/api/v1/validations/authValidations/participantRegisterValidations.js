const Joi = require("joi");

const participantRegisterSchema = Joi.object({
  fullName: Joi.string().min(1).required().messages({
    "string.empty": "validations.fullName.full_name_cannot_be_empty",
    "any.required": "validations.fullName.full_name_is_required",
  }),
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
  dateOfBirth: Joi.date().iso().required().messages({
    "date.base": "validations.dateOfBirth.must_be_a_valid_date",
    "any.required": "validations.dateOfBirth.date_of_birth_is_required",
  }),
  phone: Joi.string().min(8).required().messages({
    "string.empty": "validations.phone.phone_cannot_be_empty",
    "string.min": "validations.phone.phone_must_be_at_least_8_characters",
    "any.required": "validations.phone.phone_is_required",
  }),
  city: Joi.string().min(1).required().messages({
    "string.empty": "validations.city.city_cannot_be_empty",
    "any.required": "validations.city.city_is_required",
  }),
  country: Joi.string().min(1).required().messages({
    "string.empty": "validations.country.country_cannot_be_empty",
    "any.required": "validations.country.country_is_required",
  }),
  gender: Joi.string().valid("male", "female", "other").required().messages({
    "string.empty": "validations.gender.gender_cannot_be_empty",
    "any.only": "validations.gender.gender_must_be_one_of_male_female_other",
    "any.required": "validations.gender.gender_is_required",
  }),
  numberOfMemorizedSurahs: Joi.number().min(0).max(114).required().messages({
    "number.base": "validations.numberOfMemorizedSurahs.must_be_a_valid_number",
    "number.min":
      "validations.numberOfMemorizedSurahs.must_be_between_0_and_114",
    "number.max":
      "validations.numberOfMemorizedSurahs.must_be_between_0_and_114",
    "any.required":
      "validations.numberOfMemorizedSurahs.number_of_memorized_surahs_is_required",
  }),
  numberOfMemorizedParts: Joi.number().min(0).max(30).required().messages({
    "number.base": "validations.numberOfMemorizedParts.must_be_a_valid_number",
    "number.min": "validations.numberOfMemorizedParts.must_be_between_0_and_30",
    "number.max": "validations.numberOfMemorizedParts.must_be_between_0_and_30",
    "any.required":
      "validations.numberOfMemorizedParts.number_of_memorized_parts_is_required",
  }),
  details: Joi.string().optional().allow("").messages({
    "string.empty": "validations.details.details_can_be_empty",
  }),
});

const validateParticipantRegisterData = (req, res, next) => {
  console.dir(req.files, { depth: null });
  const profileImage = req.files["profileImage"] ?? [];
  console.log(profileImage);

  if (profileImage.length !== 1 || !profileImage) {
    res.status(400).json({
      success: false,
      message: "Please upload a profile image",
    });
  }
  const { error } = participantRegisterSchema.validate(req.body, {
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

module.exports = validateParticipantRegisterData;
