const VERIFICATION_CODE_LENGTH = parseInt(process.env.VERIFICATION_CODE_LENGTH);
const CHAR_SET_NANOID = process.env.NANOID_CHAR_SET;

const resetPasswordMessageTemplate = require("./../../../views/sendPasswordResetCodeMessageTemplate");

const getUserByEmail = require("./../../../utils/user/getUserByEmail");
const db = require("./../../../../../../models/index");
const getPasswordResetToken = require("./../../../utils/auth/getPasswordResetToken");

const customAlphabet = require("nanoid").customAlphabet;
const bcrypt = require("bcrypt");

const HASH_PASSWORD_SALT = parseInt(process.env.BCRYPT_SALT);

const nodemailer = require("nodemailer");
const handlebars = require("handlebars");

const sendPasswordResetCodeService = async (userIdentifier) => {
  const getUserByEmailResponse = await getUserByEmail(userIdentifier);

  if (getUserByEmailResponse.status === 422) {
    console.log(`${getUserByEmailResponse?.response?.data?.message}`);
    const error = new Error(
      `Failed to send code, ${getUserByEmailResponse?.response?.data?.message}`
    );
    error.statusCode = 422;
    throw error;
  } else if (getUserByEmailResponse.status === 404) {
    console.log(`${getUserByEmailResponse?.response?.data?.message}`);
    const error = new Error(
      `Failed to send code, ${getUserByEmailResponse?.response?.data?.message}`
    );
    error.statusCode = 404;
    throw error;
  }

  console.dir(getUserByEmailResponse, { depth: null });

  await db.PasswordResetCode.deleteExpiredTokens();

  const userAccountDetails = getUserByEmailResponse.data.user;
  const userId = userAccountDetails.id;

  const getPasswordResetTokenResponse = await getPasswordResetToken(
    userAccountDetails.email
  );

  console.log(`get password reset token response: `);
  console.dir(getPasswordResetTokenResponse, { depth: null });

  if (getPasswordResetTokenResponse.status === 200) {
    console.log(`reset passoword already sent`);
    const error = new Error(
      `sendResetPasswordCode.password_reset_code_already_sent`
    );
    error.statusCode = 409;
    throw error;
  }

  if (getPasswordResetTokenResponse.status !== 404) {
    console.log("error in sending password reset code");

    const error = new Error(
      `${getPasswordResetTokenResponse?.response?.data?.message}`
    );
    error.statusCode = getPasswordResetTokenResponse.status;
    throw error;
  }

  const generateSecureVerificationCode = customAlphabet(
    CHAR_SET_NANOID,
    VERIFICATION_CODE_LENGTH
  );

  const verificationCode = generateSecureVerificationCode();

  console.log(`verificationCode geenerated: ${verificationCode}`);

  const hashedVerificationCode = await bcrypt.hash(
    verificationCode,
    HASH_PASSWORD_SALT
  );

  console.log(`hashedVerificationCode geenerated: ${hashedVerificationCode}`);

  await db.PasswordResetCode.create({
    userId: userId,
    token: hashedVerificationCode,
    expiresAt: new Date(Date.now() + 10 * 60 * 1000), // Expires after 10 minutes
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

  const template = handlebars.compile(resetPasswordMessageTemplate);
  const emailHTML = template({ verificationCode });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userAccountDetails.email,
    subject: "Password Reset Code",
    html: emailHTML,
  };

  await transporter.sendMail(mailOptions);
  return;
};

module.exports = sendPasswordResetCodeService;
