import logger from "../../../../../config/logger.js";
import User from "../../models/UserModel/User.js";
import bcrypt from "bcrypt";

const HASH_PASSWORD_SALT = 10;

const authServices = {
  registerUser: async (userData) => {
    try {
      const isUserExist = await User.findOne({
        $or: [{ email: userData.email }, { userName: userData.userName }],
      });

      if (isUserExist) {
        logger.info("User already exist");
        if (isUserExist.userName === userData.userName) {
          throw new Error(
            "This username is already taken. Please choose a different username."
          );
        }
        if (isUserExist.email === userData.email) {
          throw new Error(
            "This email is already registered. Please use a different email address or log in to your account."
          );
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
  loginUser: async (userName, email, password) => {
    try {
      const userAccountDetails = await User.findOne({
        $or: [{ userName: userName }, { email: email }],
      });
      console.log("userAccountDetails");

      console.log(userAccountDetails);

      if (!userAccountDetails) {
        return {
          error:
            "Invalid credentials. Please check your username or email and password, then try again.",
        };
      }

      const isPasswordMatch = await bcrypt.compare(
        password,
        userAccountDetails.password
      );
      if (!isPasswordMatch) {
        return {
          error:
            "Invalid credentials. Please check your username or email and password, then try again.",
        };
      }
      const { password: _, ...userDetailsWithoutPassword } =
        userAccountDetails.toObject();
      return userDetailsWithoutPassword;
    } catch (error) {
      logger.info(error);
    }
  },
};

export default authServices;
