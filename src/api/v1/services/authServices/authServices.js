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
    try {
      const userAccountDetails = await User.findOne({
        $or: [{ userName: userIdentifier }, { email: userIdentifier }],
      });

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
};

export default authServices;
