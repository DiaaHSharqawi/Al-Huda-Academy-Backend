import Joi from "joi";

const addChildToFamilyLinkSchema = Joi.object({
  parentId: Joi.string().required().messages({
    "string.empty": "validations.parentId.parent_id_cannot_be_empty",
    "string.required": "validations.parentId.parent_id_is_required",
  }),

  childId: Joi.string().required().messages({
    "string.empty": "validations.childId.child_id_cannot_be_empty",
    "string.required": "validations.childId.child_id_is_required",
  }),
});

const validateAddChildToFamilyLinkData = (req, res, next) => {
  console.log("validateAddChildToFamilyLinkData");
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

export default validateAddChildToFamilyLinkData;
