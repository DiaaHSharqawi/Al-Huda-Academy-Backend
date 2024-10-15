import authServices from "./../../services/authServices/authServices.js";
import logger from "./../../../../../config/logger.js";
import dotenv from "dotenv";
import axios from "axios";
import tokenUtils from "../../utils/tokenUtils.js";

dotenv.config();

const authControllers = {
  registerUser: async (req, res) => {
    try {
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

      const registeredUser = await authServices.registerUser(
        userToRegisterData
      );
      logger.info(registeredUser._id);
      const accessToken = tokenUtils.generateAccessToken(registeredUser._id);
      const refreshToken = tokenUtils.generateRefreshToken(registeredUser._id);
      console.log(accessToken, refreshToken);

      res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: { user: registeredUser, accessToken, refreshToken },
      });
    } catch (error) {
      logger.error("Registration error: ", { error: error.message });

      if (error.message.includes("email")) {
        return res.status(400).json({
          success: false,
          message: error.message,
        });
      }
      if (error.message.includes("username")) {
        return res.status(400).json({
          success: false,
          message: error.message,
        });
      }

      res.status(500).json({
        success: false,
        message: "An unexpected error occurred. Please try again later.",
        details: error,
      });
    }
  },
};
export default authControllers;
