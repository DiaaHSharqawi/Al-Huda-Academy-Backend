const getUserByEmail = require("../../../utils/getUserByEmail");

const bcrypt = require("bcrypt");

const loginService = async (userLoginData) => {
  console.log(`\n ---------- Login Service ---------- \n`);

  const { email, password } = userLoginData;

  const getUserByEmailResponse = await getUserByEmail(email);

  if (getUserByEmailResponse.status !== 200) {
    console.log(`error : ${getUserByEmailResponse?.response?.data?.message}`);
    const error = new Error(
      ` ${getUserByEmailResponse?.response?.data?.message}`
    );
    error.statusCode = 422;
    throw error;
  }

  const userAccountDetails = getUserByEmailResponse.data.user;
  const userAccountPassword = getUserByEmailResponse.data.user.password;

  console.log(`userAccountPassword : ${userAccountPassword}`);

  const isPasswordMatch = await bcrypt.compare(password, userAccountPassword);

  if (!isPasswordMatch) {
    const error = new Error(
      "Invalid Credentials, Please make sure you have entered the correct email and password."
    );
    error.statusCode = 422;
    throw error;
  }

  const { password: _, ...userDetailsWithoutPassword } = userAccountDetails;
  return userDetailsWithoutPassword;
};
module.exports = loginService;
