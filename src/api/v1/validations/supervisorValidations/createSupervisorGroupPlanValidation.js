const Joi = require("joi");

const createSupervisorGroupPlanSchema = Joi.object({
  dayDate: Joi.date().iso().required().messages({
    "date.base": "validations.startWeekDayDate.must_be_a_valid_date",
    "date.format": "validations.startWeekDayDate.must_be_in_ISO_format",
    "any.required": "validations.startWeekDayDate.startWeekDayDate_is_required",
  }),
  contentToMemorize: Joi.array()
    .optional()
    .items(
      Joi.object({
        surahId: Joi.string().required().messages({
          "string.base": "validations.contentToReview.surahId.must_be_a_string",
          "any.required": "validations.contentToReview.surahId.is_required",
        }),
        startAyah: Joi.number().integer().min(1).required().messages({
          "number.base":
            "validations.contentToReview.startAyah.must_be_a_number",
          "number.min":
            "validations.contentToReview.startAyah.must_be_greater_than_zero",
          "any.required": "validations.contentToReview.startAyah.is_required",
        }),
        endAyah: Joi.number().integer().min(1).required().messages({
          "number.base": "validations.contentToReview.endAyah.must_be_a_number",
          "number.min":
            "validations.contentToReview.endAyah.must_be_greater_than_zero",
          "any.required": "validations.contentToReview.endAyah.is_required",
        }),
      }).custom((value, helpers) => {
        if (value.startAyah >= value.endAyah) {
          return helpers.message(
            "validations.contentToMemorize.startAyah.must_be_less_than_endAyah"
          );
        }
        return value;
      })
    )

    .messages({
      "array.base": "validations.contentToMemorize.must_be_an_array",
      "array.min": "validations.contentToMemorize.cannot_be_empty",
    }),
  contentToReview: Joi.array()
    .optional()
    .items(
      Joi.object({
        surahId: Joi.string().required().messages({
          "string.base": "validations.contentToReview.surahId.must_be_a_string",
          "any.required": "validations.contentToReview.surahId.is_required",
        }),
        startAyah: Joi.number().integer().min(1).required().messages({
          "number.base":
            "validations.contentToReview.startAyah.must_be_a_number",
          "number.min":
            "validations.contentToReview.startAyah.must_be_greater_than_zero",
          "any.required": "validations.contentToReview.startAyah.is_required",
        }),
        endAyah: Joi.number().integer().min(1).required().messages({
          "number.base": "validations.contentToReview.endAyah.must_be_a_number",
          "number.min":
            "validations.contentToReview.endAyah.must_be_greater_than_zero",
          "any.required": "validations.contentToReview.endAyah.is_required",
        }),
      }).custom((value, helpers) => {
        if (value.startAyah >= value.endAyah) {
          return helpers.message(
            "validations.contentToReview.startAyah.must_be_less_than_endAyah"
          );
        }
        return value;
      })
    )
    .messages({}),
  note: Joi.string().optional().messages({
    "string.base": "validations.note.must_be_a_string",
  }),
})
  .or("contentToMemorize", "contentToReview")
  .messages({
    "object.missing":
      "At least one of contentToMemorize or contentToReview must be provided",
  });

const validateCreateSupervisorGroupPlanValidation = (req, res, next) => {
  console.log("validate day date");

  console.dir(req.body, { depth: null });
  const { error } = createSupervisorGroupPlanSchema.validate(req.body, {
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

module.exports = validateCreateSupervisorGroupPlanValidation;
