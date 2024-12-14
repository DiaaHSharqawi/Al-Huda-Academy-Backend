const Joi = require("joi");

const createMemorizationGroupSchema = Joi.object({
  groupName: Joi.string().required().messages({
    "string.empty": "validations.groupName.group_name_cannot_be_empty",
    "any.required": "validations.groupName.group_name_is_required",
  }),

  group_description: Joi.string().required().messages({
    "string.empty":
      "validations.groupDescription.group_description_cannot_be_empty",
    "any.required":
      "validations.groupDescription.group_description_is_required",
  }),

  capacity: Joi.number().integer().positive().required().messages({
    "number.base": "validations.capacity.capacity_must_be_a_number",
    "number.positive": "validations.capacity.capacity_must_be_positive",
    "any.required": "validations.capacity.capacity_is_required",
  }),

  start_time: Joi.string()
    .pattern(/^([0-1]?\d|2[0-3]):([0-5]?\d)$/)
    .required()
    .messages({
      "string.empty": "validations.startTime.start_time_cannot_be_empty",
      "string.pattern.base": "validations.startTime.start_time_must_be_valid",
      "any.required": "validations.startTime.start_time_is_required",
    }),

  end_time: Joi.string()
    .pattern(/^([0-1]?\d|2[0-3]):([0-5]?\d)$/)
    .required()
    .messages({
      "string.empty": "validations.endTime.end_time_cannot_be_empty",
      "string.pattern.base": "validations.endTime.end_time_must_be_valid",
      "any.required": "validations.endTime.end_time_is_required",
    }),

  group_status: Joi.string()
    .valid("active", "inactive", "completed", "cancelled", "pending", "full")
    .required()
    .messages({
      "any.only": "validations.groupStatus.group_status_must_be_valid",
      "any.required": "validations.groupStatus.group_status_is_required",
    }),

  days: Joi.array()
    .items(
      Joi.string()
        .trim()
        .valid(
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
          "السبت",
          "الأحد",
          "الاثنين",
          "الثلاثاء",
          "الأربعاء",
          "الخميس",
          "الجمعة"
        )
    )
    .min(1)
    .required()
    .messages({
      "array.base": "validations.days.days_must_be_an_array",
      "array.min": "validations.days.days_cannot_be_empty",
      "any.required": "validations.days.days_are_required",
      "any.only": "validations.days.days_must_be_valid_days_of_week",
    }),
  supervisor_id: Joi.string().required().messages({
    "string.empty": "validations.supervisorId.supervisor_id_cannot_be_empty",
    "any.required": "validations.supervisorId.supervisor_id_is_required",
  }),
}).custom((value, helpers) => {
  const startTime = value.start_time;
  const endTime = value.end_time;
  if (startTime && endTime && startTime >= endTime) {
    return helpers.message(
      "validations.time.end_time_must_be_after_start_time"
    );
  }
  return value;
});

const validateCreateMemorizationGroup = (req, res, next) => {
  console.log("validateCreateMemorizationGroup");
  console.dir(req.body, { depth: null });
  const { error } = createMemorizationGroupSchema.validate(req.body, {
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

module.exports = validateCreateMemorizationGroup;
