import Joi from "joi";

const sendPasswordResetCodeSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "validations.email.email_cannot_be_empty",
    "string.email": "validations.email.must_be_a_valid_email_address",
    "any.required": "validations.email.email_is_required",
  }),
});

const validateSendPasswordResetCodeData = (req, res, next) => {
  const { error } = sendPasswordResetCodeSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    const errorMessages = error.details.map((err) => {
      return err.message.replace(/"/g, "");
    });

    return res.status(422).json({
      success: false,
      message: errorMessages,
    });
  }
  next();
};

export default validateSendPasswordResetCodeData;
