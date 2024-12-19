const asyncHandler = require("express-async-handler");
const axios = require("axios");

const getUserByEmail = asyncHandler(async (email) => {
  console.log("\n ---------- Get User By Email ---------- \n");

  try {
    const response = await axios.get(`${process.env.BASE_URL}/users/user`, {
      data: { email: email },
    });

    console.log(`response.status : ${response.status}`);
    console.log(`response.data : ${response.data}`);

    console.log(`--------------------------\n`);
    return response;
  } catch (error) {
    console.error(`Error fetching user by email: ${error.message}`);
    return error;
  }
});

module.exports = getUserByEmail;
