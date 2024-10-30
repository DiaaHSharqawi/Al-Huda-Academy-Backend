import Joi from "joi";

const sendPasswordResetCodeSchema = Joi.object({
  email: Joi.string().email().optional().messages({
    "string.empty": "Email cannot be empty.",
    "string.email": "Must be a valid email address.",
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

    return res.status(400).json({
      message: "Validation error",
      errors: errorMessages,
    });
  }
  next();
};

export default validateSendPasswordResetCodeData;
