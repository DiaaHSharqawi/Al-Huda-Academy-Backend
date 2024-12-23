const getUserByEmail = require("./../../utils/user/getUserByEmail.js");

const dotenv = require("dotenv");
dotenv.config();

const db = require("./../../../../../models/index");
const customAlphabet = require("nanoid").customAlphabet;
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const handlebars = require("handlebars");

const sendChildVerificationCodeMessageTemplate = require("./../../views/sendChildVerificationCodeMessageTemplate.js");

const HASH_PASSWORD_SALT = parseInt(process.env.BCRYPT_SALT);
const CHAR_SET_NANOID = process.env.NANOID_CHAR_SET;
const VERIFICATION_CODE_LENGTH = parseInt(process.env.VERIFICATION_CODE_LENGTH);

const sendChildVerificationCodeService = async (
  sendChildVerificationCodeData
) => {
  const { senderUserEmail, receiverUserEmail } = sendChildVerificationCodeData;

  console.log(`senderUserEmail : ${senderUserEmail}`);
  console.log(`receiverUserEmail : ${receiverUserEmail}`);

  const getSenderUserByEmailResponse = await getUserByEmail(senderUserEmail);

  if (getSenderUserByEmailResponse.status !== 200) {
    const error = new Error(
      `Failed to get Sender User by email, ${getSenderUserByEmailResponse?.response?.data?.message}`
    );
    error.statusCode = getSenderUserByEmailResponse.status;
    throw error;
  }
  const senderUserAccountDetails = getSenderUserByEmailResponse.data.user;

  const getReceiverUserByEmailResponse = await getUserByEmail(
    receiverUserEmail
  );

  if (getReceiverUserByEmailResponse.status !== 200) {
    const error = new Error(
      `Failed to get Receiver User by email, ${getReceiverUserByEmailResponse?.response?.data?.message}`
    );
    error.statusCode = getReceiverUserByEmailResponse.status;
    throw error;
  }
  const receiverUserAccountDetails = getReceiverUserByEmailResponse.data.user;

  if (senderUserAccountDetails.id === receiverUserAccountDetails.id) {
    const error = new Error("sendResetPasswordCode.invalid_credentials");
    error.statusCode = 401;
    throw error;
  }

  await db.ChildFamilyLinkVerificationCode.deleteExpiredCodes();

  const isCodeAlreadySent = await db.ChildFamilyLinkVerificationCode.findOne({
    senderId: senderUserAccountDetails.id,
    recipientId: receiverUserAccountDetails.id,
  });

  if (isCodeAlreadySent) {
    const error = new Error("لقد تم ارسال الرمز مسبقا");
    error.statusCode = 409;
    throw error;
  }

  console.log("isCodeAlreadySent");
  console.log(isCodeAlreadySent);

  const generateSecureVerificationCode = customAlphabet(
    CHAR_SET_NANOID,
    VERIFICATION_CODE_LENGTH
  );

  const verificationCode = generateSecureVerificationCode();
  console.log(`child verification code : ${verificationCode}`);

  const hashedVerificationCode = await bcrypt.hash(
    verificationCode,
    HASH_PASSWORD_SALT
  );
  console.log(hashedVerificationCode);

  await db.ChildFamilyLinkVerificationCode.create({
    senderId: senderUserAccountDetails.id,
    recipientId: receiverUserAccountDetails.id,
    code: hashedVerificationCode,
  });

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const template = handlebars.compile(sendChildVerificationCodeMessageTemplate);
  const emailHTML = template({
    senderEmail: senderUserAccountDetails.email,
    receiverEmail: receiverUserAccountDetails.email,
    verificationCode: verificationCode,
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: receiverUserAccountDetails.email,
    subject: "Family Link Request",
    html: emailHTML,
  };

  await transporter.sendMail(mailOptions);
  return;
};

module.exports = sendChildVerificationCodeService;
