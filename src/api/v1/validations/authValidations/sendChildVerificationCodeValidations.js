import Joi from "joi";

const sendChildVerificationCodeSchema = Joi.object({
  senderIdentifier: Joi.string().required().messages({
    "string.empty":
      "validations.senderIdentifer.sender_identifer_cannot_be_empty",
    "string.required":
      "validations.senderIdentifer.sender_identifer_cannot_be_empty",
  }),

  reciverIdentifier: Joi.string().email().required().messages({
    "string.empty": "validations.email.email_cannot_be_empty",
    "string.email": "validations.email.must_be_a_valid_email_address",
    "string.required": "validations.email.sadasdasdasdasd",
  }),
});

const validateSendChildVerificationCodeData = (req, res, next) => {
  console.log("validateSendChildVerificationCodeData");
  const { error } = sendChildVerificationCodeSchema.validate(req.body, {
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

export default validateSendChildVerificationCodeData;
