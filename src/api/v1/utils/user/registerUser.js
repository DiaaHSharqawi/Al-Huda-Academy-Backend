const axios = require("axios");
const registerUser = async (userData) => {
  const { email, password, role_id, accountStatusId } = userData;

  try {
    console.log(`registerUser Utils`);
    console.log(`email : ${email}, password : ${password}`);

    const registerUserResponse = await axios.post(
      `${process.env.BASE_URL}/auth/register/user`,
      {
        email: email,
        password: password,
        roleId: role_id.toString(),
        accountStatusId: accountStatusId.toString(),
      }
    );

    return registerUserResponse;
  } catch (error) {
    console.error(`Error registering user: ${error.message}`);
    return error;
  }
};

module.exports = registerUser;
