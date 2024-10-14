import authServices from "./../../services/authServices/authServices.js";
import logger from "./../../../../../config/logger.js";

const authControllers = {
  registerUser: async (req, res) => {
    try {
      const userToRegisterData = req.body;
      logger.info("userToRegisterData", userToRegisterData);
      const result = await authServices.registerUser(req.body);
      console.log(result);
      res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: result,
      });
    } catch (error) {
      logger.error("Registration error: ", { error: error.message });
      if (error.message.includes("email")) {
        return res.status(400).json({
          message: error.message,
        });
      }
      if (error.message.includes("username")) {
        return res.status(400).json({
          message: error.message,
        });
      }
      res.status(500).json({
        message: "An unexpected error occurred. Please try again later.",
        details: error,
      });
    }
  },
};
export default authControllers;
