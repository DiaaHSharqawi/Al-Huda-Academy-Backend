const Joi = require("joi");

const createSupervisorGroupPlanSchema = Joi.object({
  weekNumber: Joi.string()
    .pattern(/^[0-9][0-9]*$/)
    .required()
    .messages({
      "string.empty": "validations.weekNumber.weekNumber_cannot_be_empty",
      "string.pattern.base":
        "validations.weekNumber.must_be_a_valid_week_number",
      "any.required": "validations.weekNumber.weekNumber_is_required",
    }),
  startWeekDayDate: Joi.date().iso().required().messages({
    "date.base": "validations.startWeekDayDate.must_be_a_valid_date",
    "date.format": "validations.startWeekDayDate.must_be_in_ISO_format",
    "any.required": "validations.startWeekDayDate.startWeekDayDate_is_required",
  }),
});

// Middleware for validation
const validateCreateSupervisorGroupPlanValidation = (req, res, next) => {
  console.log("validateWeekNumber");
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
