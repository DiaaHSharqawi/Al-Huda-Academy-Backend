const Joi = require("joi");

const updateGroupMembersFollowUpRecordsSchema = Joi.object({
  grade_of_memorization: Joi.number().min(0).max(100).required().messages({
    "number.base": "Grade of memorization must be a number.",
    "number.min": "Grade of memorization must be at least 0.",
    "number.max": "Grade of memorization cannot exceed 100.",
    "any.required": "Grade of memorization is required.",
  }),
  grade_of_review: Joi.number().min(0).max(100).required().messages({
    "number.base": "Grade of review must be a number.",
    "number.min": "Grade of review must be at least 0.",
    "number.max": "Grade of review cannot exceed 100.",
    "any.required": "Grade of review is required.",
  }),
  attendance_status_id: Joi.number().integer().min(1).required().messages({
    "number.base": "Attendance Status ID must be a number.",
    "number.min": "Attendance Status ID must be at least 1.",
    "any.required": "Attendance Status ID is required.",
  }),
  note: Joi.string().optional().allow("").messages({
    "string.base": "Note must be a string.",
    "string.empty": "Note can be empty.",
  }),
});

const validateUpdateGroupMembersFollowUpRecords = (req, res, next) => {
  console.log("validate day date");

  console.dir(req.body, { depth: null });
  const { error } = updateGroupMembersFollowUpRecordsSchema.validate(req.body, {
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

module.exports = validateUpdateGroupMembersFollowUpRecords;
