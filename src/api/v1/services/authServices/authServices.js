import logger from "../../../../../config/logger.js";
//import User from "../../models/UserModel/User";
import bcrypt from "bcrypt";
const authServices = {
  registerUser: async (userData) => {
    logger.info("Im in registerUserService ");
    console.log(userData.password);
  },
};
export default authServices;
