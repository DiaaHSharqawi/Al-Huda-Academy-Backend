const Joi = require("joi");

const createMemorizationGroupSchema = Joi.object({
  groupName: Joi.string().required().messages({
    "string.empty": "Group name cannot be empty",
    "any.required": "Group name is required",
  }),

  group_description: Joi.string().required().messages({
    "string.empty": "Group description cannot be empty",
    "any.required": "Group description is required",
  }),

  capacity: Joi.number().integer().positive().required().messages({
    "number.base": "Capacity must be a number",
    "number.positive": "Capacity must be positive",
    "any.required": "Capacity is required",
  }),

  start_time: Joi.string()
    .pattern(/^([0-1]?\d|2[0-3]):([0-5]?\d)$/)
    .required()
    .messages({
      "string.empty": "Start time cannot be empty",
      "string.pattern.base": "Start time must be valid",
      "any.required": "Start time is required",
    }),

  end_time: Joi.string()
    .pattern(/^([0-1]?\d|2[0-3]):([0-5]?\d)$/)
    .required()
    .messages({
      "string.empty": "End time cannot be empty",
      "string.pattern.base": "End time must be valid",
      "any.required": "End time is required",
    }),

  days: Joi.array()
    .items(Joi.number().integer().min(1).max(7))
    .min(1)
    .required()
    .messages({
      "array.base": "Days must be an array",
      "array.min": "Days cannot be empty",
      "any.required": "Days are required",
      "number.min": "Days must be between 1 and 7",
      "number.max": "Days must be between 1 and 7",
    }),

  participants_gender_id: Joi.number().valid(1, 2).required().messages({
    "any.only": "Participants gender must be valid",
    "any.required": "Participants gender is required",
  }),

  group_goal_id: Joi.number().integer().min(1).max(3).required().messages({
    "number.base": "Group goal must be a number",
    "number.min": "Group goal must be at least 1",
    "number.max": "Group goal must be at most 3",
    "any.required": "Group goal is required",
  }),

  supervisor_id: Joi.number().integer().required().messages({
    "number.base": "Supervisor ID must be a number",
    "any.required": "Supervisor ID is required",
  }),
  teaching_method_id: Joi.number().integer().min(1).max(5).required().messages({
    "number.base": "Teaching method must be a number",
    "number.min": "Teaching method must be at least 1",
    "number.max": "Teaching method must be at most 5",
    "any.required": "Teaching method is required",
  }),
  group_completion_rate_id: Joi.number().integer().required().messages({
    "number.base": "Group completion rate must be a number",
    "any.required": "Group completion rate is required",
  }),
  surah_ids: Joi.array()
    .items(Joi.number().integer().min(1).max(114))
    .optional()
    .messages({
      "array.base": "Surahs must be an array",
      "number.min": "Surahs must be between 1 and 114",
      "number.max": "Surahs must be between 1 and 114",
    })
    .allow(null),
  juza_ids: Joi.array()
    .items(Joi.number().integer().min(1).max(30))
    .optional()
    .messages({
      "array.base": "Juza IDs must be an array",
      "number.min": "Juza IDs must be between 1 and 30",
      "number.max": "Juza IDs must be between 1 and 30",
    })
    .allow(null),

  extracts: Joi.array()
    .optional()
    .items(
      Joi.object({}).keys({
        surah_id: Joi.number().integer().min(1).max(114).required(),
        ayat: Joi.string().required(),
      })
    )
    .optional()
    .allow(null),
}).custom((value, helpers) => {
  const startTime = value.start_time;
  const endTime = value.end_time;
  if (startTime && endTime && startTime >= endTime) {
    return helpers.message("End time must be after start time");
  }
  /* if (
    !(
      value.surah_ids?.length > 0 ||
      value.juza_ids?.length > 0 ||
      (value.extracts && value.extracts.length > 0)
    )
  ) {
    return helpers.message("Surah IDs, Juza IDs, or extracts must be provided");
  }*/
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
