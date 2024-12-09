const db = require("./../../../../../../models/index.js");

const getUserByEmail = require("./../../../utils/getUserByEmail");
const getresetPasswordTokenService = async (email) => {
  const getUserByEmailResponse = await getUserByEmail(email);

  if (getUserByEmailResponse.status === 404) {
    console.log(
      `faled to get user by email: ${getUserByEmailResponse?.response?.data?.message}`
    );

    const error = new Error(
      `Failed to send code, ${getUserByEmailResponse?.response?.data?.message}`
    );
    error.statusCode = 404;
    throw error;
  } else if (getUserByEmailResponse.status == 422) {
    console.log(`${getUserByEmailResponse?.response?.data?.message}`);
    const error = new Error(
      `Failed to register participant, ${getUserByEmailResponse?.response?.data?.message}`
    );
    error.statusCode = 422;
    throw error;
  }

  const userAccountId = getUserByEmailResponse.data.user.id;

  console.dir(getUserByEmailResponse, { depth: null });
  const resetPasswordCode = await db.PasswordResetCode.findOne({
    where: { userId: userAccountId },
  });

  if (!resetPasswordCode) {
    const error = new Error("Password reset code not found");
    error.statusCode = 404;
    throw error;
  }

  const resetPasswordToken = resetPasswordCode.token;
  console.log(`resetPasswordToken ---> : ${resetPasswordToken}`);

  return resetPasswordToken;
};
module.exports = getresetPasswordTokenService;
