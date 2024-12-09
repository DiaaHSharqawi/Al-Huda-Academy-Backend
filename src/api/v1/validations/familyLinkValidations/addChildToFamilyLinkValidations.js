const Joi = require("joi");
const addChildToFamilyLinkSchema = Joi.object({
  parentEmail: Joi.string().email().required().messages({
    "string.empty": "validations.userEmail.user_email_cannot_be_empty",
    "string.email": "validations.userEmail.user_email_must_be_valid",
    "any.required": "validations.userEmail.user_email_is_required",
  }),

  familyMemberEmail: Joi.string().email().required().messages({
    "string.empty":
      "validations.familyMemberEmail.family_member_email_cannot_be_empty",
    "string.email":
      "validations.familyMemberEmail.family_member_email_must_be_valid",
    "any.required":
      "validations.familyMemberEmail.family_member_email_is_required",
  }),

  relationType: Joi.string()
    .valid("father", "mother", "child", "sibling")
    .required()
    .messages({
      "string.empty": "validations.relationType.relation_type_cannot_be_empty",
      "any.only": "validations.relationType.relation_type_must_be_valid",
      "any.required": "validations.relationType.relation_type_is_required",
    }),
});

const validateAddChildToFamilyLinkData = (req, res, next) => {
  console.log("validateAddChildToFamilyLinkData");
  console.dir(req.body, { depth: null });
  const { error } = addChildToFamilyLinkSchema.validate(req.body, {
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

module.exports = validateAddChildToFamilyLinkData;
