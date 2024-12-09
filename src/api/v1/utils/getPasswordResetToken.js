const axios = require("axios");

const getPasswordResetToken = async (email) => {
  console.log(`getPasswordResetToken`);

  try {
    const resetPasswordTokenResponse = await axios.post(
      `${process.env.BASE_URL}/auth/get-password-reset-code`,
      {
        email: email,
      }
    );
    console.log(resetPasswordTokenResponse.data);
    return resetPasswordTokenResponse;
  } catch (error) {
    console.error(`Error getting password reset token: ${error.message}`);
    return error;
  }
};

module.exports = getPasswordResetToken;
