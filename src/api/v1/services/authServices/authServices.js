import logger from "../../../../../config/logger.js";
import User from "../../models/UserModel/User.js";
import bcrypt from "bcrypt";

const HASHE_PASSWORD_SALT = 10;

const authServices = {
  registerUser: async (userData) => {
    try {
      const isUserExist = await User.findOne({
        $or: [{ email: userData.email }, { userName: userData.userName }],
      });
      if (isUserExist) {
        logger.info("User already exist");
        if (isUserExist.email === userData.email) {
          throw new Error(
            "This email is already registered. Please use a different email address or log in to your account."
          );
        }
        if (isUserExist.userName === userData.userName) {
          throw new Error(
            "This username is already taken. Please choose a different username."
          );
        }
      }
      const hashedPassword = await bcrypt.hash(
        userData.password,
        HASHE_PASSWORD_SALT
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
};
export default authServices;
