import logger from "../../../../../config/logger.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import randomstring from "randomstring";
import nodemailer from "nodemailer";
import handlebars from "handlebars";

import User from "../../models/UserModel/User.js";
import PasswordResetCode from "../../models/PasswordResetCodeModel/PasswordResetCodeModel.js";

dotenv.config();

const HASH_PASSWORD_SALT = parseInt(process.env.BCRYPT_SALT);
const VERIFICATION_CODE_LENGTH = parseInt(process.env.VERIFICATION_CODE_LENGTH);

const authServices = {
  registerUser: async (userData) => {
    try {
      const isUserExist = await User.findOne({
        $or: [{ email: userData.email }, { userName: userData.userName }],
      });

      if (isUserExist) {
        logger.info("User already exist");
        if (isUserExist.userName === userData.userName) {
          const error = new Error(
            "This username is already taken. Please choose a different username."
          );
          error.statusCode = 400;
          throw error;
        }
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

    try {
      const userAccountDetails = await User.findOne(
        isEmail ? { email: userIdentifier } : { userName: userIdentifier }
      );

      if (!userAccountDetails) {
        const error = new Error(
          "Invalid credentials. Please check your username or email and password, then try again."
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
      isEmail ? { email: userIdentifier } : { userName: userIdentifier },
      { _id: 1, email: 1 }
    );

    if (!userAccountDetails) {
      const error = new Error(
        "Invalid credentials. Please check your username or email, then try again."
      );
      error.statusCode = 401;
      throw error;
    }

    const isPasswordResetCodeSent = await PasswordResetCode.findOne({
      userId: userAccountDetails._id,
    });
    if (isPasswordResetCodeSent) {
      const error = new Error(
        "A password reset code has already been sent to your email. Please check your inbox or request a new code after a few minutes."
      );
      error.statusCode = 401;
      throw error;
    }

    const verificationCode = randomstring.generate({
      length: VERIFICATION_CODE_LENGTH,
      charset: "alphanumeric",
    });

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
        border: 1px solid #4CAF50;
        border-radius: 5px;
        text-align: center;
        max-width: 600px;
        margin: 0 auto;
      }
      h1 {
        color: #4CAF50;
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
        color: red;
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
};

export default authServices;
