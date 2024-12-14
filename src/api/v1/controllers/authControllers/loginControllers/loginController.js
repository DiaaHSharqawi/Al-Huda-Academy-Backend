const asyncHandler = require("express-async-handler");

const loginService = require("../../../services/authServices/loginServices/loginService");

const tokenUtils = require("../../../utils/tokenUtils");
const convertTimeToMilliseconds = require("../../../utils/millisecondsConverter");

const loginController = asyncHandler(async (req, res) => {
  console.info("Login Controller");

  const userLoginData = req.body;

  console.log("user login data");
  console.dir(userLoginData, { depth: null });

  const loginResult = await loginService(userLoginData);

  console.log("Login result !");
  console.dir(loginResult, { depth: null });

  const dataToEncrypt = {
    userId: loginResult.id,
    memberId: loginResult.memberId,
    email: loginResult.email,
    fullName: loginResult.fullName,
    role: loginResult.role,
  };
  console.log("dataToEncrypt");
  console.dir(dataToEncrypt, { depth: null });

  const accessToken = tokenUtils.generateAccessToken(dataToEncrypt);
  const refreshToken = tokenUtils.generateRefreshToken(dataToEncrypt);
  const refreshTokenExpiration = process.env.REFRESH_TOKEN_SECRET_EXPIRATION;

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: convertTimeToMilliseconds(refreshTokenExpiration),
  });

  res.status(200).json({
    success: true,
    message: req.t("login.login_successful"),
    data: { accessToken, refreshToken },
  });
});
module.exports = loginController;
