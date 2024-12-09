const getUserByEmail = require("./../../../utils/getUserByEmail.js");
const getPasswordResetToken = require("./../../../utils/getPasswordResetToken.js");

const bcrypt = require("bcrypt");
const db = require("./../../../../../../models/index.js");

const HASH_PASSWORD_SALT = parseInt(process.env.BCRYPT_SALT);

const resetPasswordService = async (resetPasswordData) => {
  const { verificationCode, email, newPassword } = resetPasswordData;

  const getUserByEmailResponse = await getUserByEmail(email);

  console.dir(getUserByEmailResponse, { depth: null });

  if (getUserByEmailResponse.status === 404) {
    const error = new Error(
      `${getUserByEmailResponse?.response?.data?.message}`
    );
    error.statusCode = 404;
    throw error;
  } else if (getUserByEmailResponse.status != 200) {
    console.log("reset password service  , failed to get user by email");
    console.log(`${getUserByEmailResponse?.response?.data?.message}`);
    const error = new Error(
      `${getUserByEmailResponse?.response?.data?.message}`
    );
    error.statusCode = getUserByEmailResponse.status;
    throw error;
  }

  const userAccount = getUserByEmailResponse.data.user;

  const getPasswordResetTokenResponse = await getPasswordResetToken(
    userAccount.email
  );

  console.dir(getPasswordResetTokenResponse, { depth: null });

  if (getPasswordResetTokenResponse.status !== 200) {
    const error = new Error(
      `${getPasswordResetTokenResponse?.response?.data?.message}`
    );
    error.statusCode = getPasswordResetTokenResponse.status;
    throw error;
  }

  console.log(
    `resetPasswordToken ---> : ${getPasswordResetTokenResponse.data.resetPasswordToken}`
  );

  console.log(`verificationCode ---> : ${verificationCode}`);

  const isValidToken = await bcrypt.compare(
    verificationCode,
    getPasswordResetTokenResponse.data.resetPasswordToken
  );

  console.log(`isValidToken ---> : ${isValidToken}`);

  if (!isValidToken) {
    const error = new Error("resetPassword.invalid_or_expired_code");
    error.statusCode = 400;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(newPassword, HASH_PASSWORD_SALT);

  const userToUpdate = await db.User.findByPk(userAccount.id);
  userToUpdate.password = hashedPassword;
  await userToUpdate.save();

  await db.PasswordResetCode.destroy({
    where: {
      userId: userAccount.id,
      token: getPasswordResetTokenResponse.data.resetPasswordToken,
    },
  });
};

module.exports = resetPasswordService;
