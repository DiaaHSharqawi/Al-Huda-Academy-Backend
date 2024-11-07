import logger from "../../../../../config/logger.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import handlebars from "handlebars";
import { customAlphabet } from "nanoid";
import jwt from "jsonwebtoken";

import User from "../../models/UserModel/User.js";
import PasswordResetCode from "../../models/PasswordResetCodeModel/PasswordResetCodeModel.js";

dotenv.config();

const HASH_PASSWORD_SALT = parseInt(process.env.BCRYPT_SALT);
const VERIFICATION_CODE_LENGTH = parseInt(process.env.VERIFICATION_CODE_LENGTH);
const CHAR_SET_NANOID = process.env.NANOID_CHAR_SET;

const authServices = {
  registerUser: async (userData) => {
    try {
      const isUserExist = await User.findOne({
        email: userData.email,
      });

      if (isUserExist) {
        logger.info("User already exist");

        if (isUserExist.email === userData.email) {
          const error = new Error("register.email_already_registered");
          error.statusCode = 400;
          throw error;
        }
      }

      const hashedPassword = await bcrypt.hash(
        userData.password,
        HASH_PASSWORD_SALT
      );

      const newUser = new User({
        ...userData,
        password: hashedPassword,
      });

      const savedUser = await newUser.save();
      return savedUser;
    } catch (error) {
      logger.error("Error occurred during user registration.", {
        error: error.message,
      });
      throw error;
    }
  },

  loginUser: async (userIdentifier, password) => {
    try {
      const userAccountDetails = await User.findOne({ email: userIdentifier });
      console.log(userAccountDetails);

      if (!userAccountDetails) {
        const error = new Error("login.invalid_credentials");
        error.statusCode = 401;
        throw error;
      }

      const isPasswordMatch = await bcrypt.compare(
        password,
        userAccountDetails.password
      );
      if (!isPasswordMatch) {
        const error = new Error("login.invalid_credentials");
        error.statusCode = 401;
        throw error;
      }

      console.log("userAccountDetails");
      console.log(userAccountDetails);

      const { password: _, ...userDetailsWithoutPassword } =
        userAccountDetails.toObject();
      return userDetailsWithoutPassword;
    } catch (error) {
      logger.error("Error occurred during user login.", {
        error: error.message,
      });
      throw error;
    }
  },

  sendResetPasswordCode: async (userIdentifier) => {
    const userAccountDetails = await User.findOne(
      { email: userIdentifier },
      { _id: 1, email: 1 }
    );

    if (!userAccountDetails) {
      const error = new Error("sendResetPasswordCode.invalid_credentials");
      error.statusCode = 401;
      throw error;
    }
    console.log(userAccountDetails);
    const isPasswordResetCodeSent = await PasswordResetCode.findOne({
      userId: userAccountDetails._id,
    });
    console.log(isPasswordResetCodeSent);
    if (isPasswordResetCodeSent) {
      const error = new Error(
        "sendResetPasswordCode.password_reset_code_already_sent"
      );
      error.statusCode = 409;
      throw error;
    }

    const generateSecureVerificationCode = customAlphabet(
      CHAR_SET_NANOID,
      VERIFICATION_CODE_LENGTH
    );

    const verificationCode = generateSecureVerificationCode();

    const hashedVerificationCode = await bcrypt.hash(
      verificationCode,
      HASH_PASSWORD_SALT
    );

    const resetToken = new PasswordResetCode({
      userId: userAccountDetails._id,
      code: hashedVerificationCode,
    });
    await resetToken.save();

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

    const resetPasswordMessageTemplate = `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f9f9f9;
          }
          .container {
            background-color: white;
            padding: 20px;
            border: 1px solid #332885;
            border-radius: 5px;
            text-align: center;
            max-width: 600px;
            margin: 0 auto;
          }
          h1 {
            color: #332885;
            font-size: 24px;
          }
          .greeting {
            font-size: 18px;
            color: #333;
            margin-bottom: 20px;
          }
          .code {
            font-size: 24px;
            font-weight: bold;
            color: #332885;
            margin: 20px 0;
          }
          p {
            font-size: 16px;
            color: #555;
            margin: 10px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <span> Al Huda Academy for the Holy Quran</span> 
          <h1>Reset Password</h1>
          <p class="greeting">As-salamu alaykum</p>
          <p>We received a request to reset your password. Please use the code below to reset your password:</p>
          <p class="code">{{verificationCode}}</p>
          <p>Please enter this code along with your new password.</p>
        </div>
      </body>
    </html>
    `;

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
  },

  resetPassword: async (verificationCode, userIdentifier, newPassword) => {
    const userAccount = await User.findOne(
      { email: userIdentifier },
      { _id: 1 }
    );

    if (!userAccount) {
      const error = new Error("resetPassword.no_user_found");
      error.statusCode = 404;
      throw error;
    }

    const resetToken = await PasswordResetCode.findOne({
      userId: userAccount._id,
    });
    console.log("resetToken");
    console.log(resetToken);
    if (!resetToken) {
      const error = new Error("resetPassword.invalid_or_expired_code");
      error.statusCode = 400;
      throw error;
    }

    const isValidToken = await bcrypt.compare(
      verificationCode,
      resetToken.code
    );

    if (!isValidToken) {
      const error = new Error("resetPassword.invalid_or_expired_code");
      error.statusCode = 400;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(newPassword, HASH_PASSWORD_SALT);
    await User.findByIdAndUpdate(userAccount._id, { password: hashedPassword });

    await PasswordResetCode.deleteOne({
      userId: userAccount._id,
      code: resetToken.code,
    });
  },

  refreshToken: async (refreshToken) => {
    console.log("===========> refreshToken");
    console.log(refreshToken);
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    console.log(decoded);
    if (!decoded || !decoded.UserInfo) {
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      throw error;
    }

    const userAccountDetails = await User.findOne({ _id: decoded.UserInfo.id });
    console.log(userAccountDetails);
    if (!userAccountDetails) {
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      throw error;
    }
    console.log("---------------------");
    console.log(userAccountDetails);
    console.log("---------------------");
    const accessToken = jwt.sign(
      { UserInfo: { id: userAccountDetails.id } },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_SECRET_EXPIRATION }
    );

    return accessToken;
  },
};

export default authServices;
