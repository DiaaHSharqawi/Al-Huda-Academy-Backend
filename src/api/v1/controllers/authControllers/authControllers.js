import authServices from "./../../services/authServices/authServices.js";
import logger from "./../../../../../config/logger.js";
import dotenv from "dotenv";
import axios from "axios";
import tokenUtils from "../../utils/tokenUtils.js";
import convertTimeToMilliseconds from "./../../utils/millisecondsConverter.js";
import asyncHandler from "express-async-handler";

dotenv.config();

const authControllers = {
  registerUser: asyncHandler(async (req, res) => {
    const userToRegisterData = req.body;

    if (req.file) {
      const formData = new FormData();
      const blob = new Blob([req.file.buffer], { type: req.file.mimetype });
      formData.append("profileImage", blob, req.file.originalname);

      const uploadResponse = await axios.post(
        `${process.env.BASE_URL}/api/uploadFile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      userToRegisterData.profileImage = {
        secure_url: uploadResponse.data.secure_url,
      };

      logger.info(userToRegisterData);
    }

    const registeredUser = await authServices.registerUser(userToRegisterData);
    logger.info(registeredUser._id);
    const accessToken = tokenUtils.generateAccessToken(registeredUser._id);
    const refreshToken = tokenUtils.generateRefreshToken(registeredUser._id);
    console.log(accessToken, refreshToken);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: { user: registeredUser, accessToken, refreshToken },
    });
  }),

  loginUser: asyncHandler(async (req, res) => {
    const { userName, email, password } = req.body;
    const userIdentifier = email || userName;

    const loginResult = await authServices.loginUser(userIdentifier, password);
    console.log("Login controller !");
    console.log(loginResult._id);

    const accessToken = tokenUtils.generateAccessToken(loginResult._id);
    const refreshToken = tokenUtils.generateRefreshToken(loginResult._id);
    const refreshTokenExpiration = process.env.REFRESH_TOKEN_SECRET_EXPIRATION;

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: convertTimeToMilliseconds(refreshTokenExpiration),
    });
    res.status(200).json({
      success: true,
      message: "Login successful!",
      userData: loginResult,
      accessToken,
    });
  }),

  forgotPassword: asyncHandler(async (req, res) => {
    const { email, userName } = req.body;
    const userIdentifier = userName || email;

    await authServices.sendResetPasswordCode(userIdentifier);
    res.status(200).json({ message: "Password reset code sent to your email" });
  }),
};

export default authControllers;
