const Joi = require("joi");

const createSupervisorGroupPlanSchema = Joi.object({
  dayDate: Joi.date().iso().required().messages({
    "date.base": "validations.startWeekDayDate.must_be_a_valid_date",
    "date.format": "validations.startWeekDayDate.must_be_in_ISO_format",
    "any.required": "validations.startWeekDayDate.startWeekDayDate_is_required",
  }),
});

// Middleware for validation
const validateCreateSupervisorGroupPlanValidation = (req, res, next) => {
  console.log("validate day date");
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
