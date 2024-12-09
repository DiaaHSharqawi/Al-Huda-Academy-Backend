const axios = require("axios");
const registerUser = async (userData) => {
  const { email, password, roleName } = userData;

  try {
    console.log(`registerUser Utils`);
    console.log(`email : ${email}, password : ${password}`);

    const registerUserResponse = await axios.post(
      `${process.env.BASE_URL}/auth/register/user`,
      {
        email: email,
        password: password,
        roleName: roleName,
      }
    );

    return registerUserResponse;
  } catch (error) {
    console.error(`Error registering user: ${error.message}`);
    return error;
  }
};

module.exports = registerUser;
