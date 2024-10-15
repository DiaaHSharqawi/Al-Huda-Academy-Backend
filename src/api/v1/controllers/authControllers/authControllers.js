import authServices from "./../../services/authServices/authServices.js";
import logger from "./../../../../../config/logger.js";
import dotenv from "dotenv";
import axios from "axios";

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

      const result = await authServices.registerUser(userToRegisterData);
      res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: result,
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
