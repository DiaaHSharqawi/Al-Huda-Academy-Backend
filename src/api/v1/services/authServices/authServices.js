import logger from "../../../../../config/logger.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import randomstring from "randomstring";
import nodemailer from "nodemailer";
import handlebars from "handlebars";
import { customAlphabet } from "nanoid";

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
          const error = new Error(
            "This email is already registered. Please use a different email address or log in to your account."
          );
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
    const isEmail = userIdentifier.includes("@");
    logger.info(isEmail);
    try {
      const userAccountDetails = await User.findOne({ email: userIdentifier });
      console.table(userAccountDetails);

      if (!userAccountDetails) {
        const error = new Error(
          "Invalid credentials. Please check your email and password, then try again."
        );
        error.statusCode = 401;
        throw error;
      }

      const isPasswordMatch = await bcrypt.compare(
        password,
        userAccountDetails.password
      );
      if (!isPasswordMatch) {
        const error = new Error(
          "Invalid credentials. Please check your username or email and password, then try again."
        );
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
    const isEmail = userIdentifier.includes("@");

    const userAccountDetails = await User.findOne(
      { email: userIdentifier },
      { _id: 1, email: 1 }
    );

    if (!userAccountDetails) {
      const error = new Error(
        "Invalid credentials. Please check your email, then try again."
      );
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
        "A password reset code has already been sent to your email. Please check your inbox or request a new code after a few minutes."
      );
      error.statusCode = 401;
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
      const error = new Error("No user found with the given identifier.");
      error.statusCode = 404;
      throw error;
    }

    const resetToken = await PasswordResetCode.findOne({
      userId: userAccount._id,
    });
    console.log("resetToken");
    console.log(resetToken);
    if (!resetToken) {
      const error = new Error("Invalid or expired code");
      error.statusCode = 400;
      throw error;
    }

    const isValidToken = await bcrypt.compare(
      verificationCode,
      resetToken.code
    );

    if (!isValidToken) {
      const error = new Error("Invalid or expired code");
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
};

export default authServices;
