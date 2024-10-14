import authServices from "./../../services/authServices/authServices.js";
import logger from "./../../../../../config/logger.js";
const authControllers = {
  registerUser: async (req, res) => {
    try {
      logger.info(req.body);
      authServices.registerUser(req.body);
    } catch (error) {
      logger.error(error);
    }
  },
};
export default authControllers;
