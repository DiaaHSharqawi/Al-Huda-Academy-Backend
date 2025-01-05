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
  gender_id: Joi.string().required().messages({
    "string.empty": "validations.gender_id.gender_cannot_be_empty",
    "any.only": "validations.gender_id.gender_must_be_one_of_male_female_other",
    "any.required": "validations.gender_id.gender_is_required",
  }),
  quranMemorizingAmountsId: Joi.number().min(1).max(7).required().messages({
    "number.base":
      "validations.quranMemorizingAmountsId.must_be_a_valid_number",
    "number.min":
      "validations.quranMemorizingAmountsId.must_be_between_1_and_7",
    "number.max":
      "validations.quranMemorizingAmountsId.must_be_between_1_and_7",
    "any.required":
      "validations.quranMemorizingAmountsId.memorized_quran_memorizing_amounts_id_is_required",
  }),
  details: Joi.string().optional().allow("").messages({
    "string.empty": "validations.details.details_can_be_empty",
  }),
  juza_ids: Joi.array()
    .optional()
    .items(Joi.number().integer().min(1).max(30))
    .optional()
    .messages({
      "array.base": "Juza IDs must be an array",
      "number.min": "Juza IDs must be between 1 and 30",
      "number.max": "Juza IDs must be between 1 and 30",
    }),
  selectedMemorizingOption: Joi.string()
    .valid("none", "all", "parts")
    .required()
    .messages({
      "string.empty":
        "validations.selectedMemorizingOption.selected_memorizing_option_cannot_be_empty",
      "any.only":
        "validations.selectedMemorizingOption.selected_memorizing_option_must_be_one_of_none_all_custom",
      "any.required":
        "validations.selectedMemorizingOption.selected_memorizing_option_is_required",
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
  console.log("validateParticipantRegisterData");
  console.dir(req.body.juza_ids, { depth: null });

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
