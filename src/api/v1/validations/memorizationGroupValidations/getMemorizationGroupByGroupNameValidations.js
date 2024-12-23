const Joi = require("joi");

const getMemorizationGroupByGroupNameSchema = Joi.object({
  groupName: Joi.string().required().messages({
    "string.empty": "validations.groupName.group_name_cannot_be_empty",
    "any.required": "validations.groupName.group_name_is_required",
  }),
});

const validateGetMemorizationGroupByGroupName = (req, res, next) => {
  console.log("validateGetMemorizationGroupByGroupName");
  console.log(req.body);

  const { error } = getMemorizationGroupByGroupNameSchema.validate(req.body, {
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

module.exports = validateGetMemorizationGroupByGroupName;
