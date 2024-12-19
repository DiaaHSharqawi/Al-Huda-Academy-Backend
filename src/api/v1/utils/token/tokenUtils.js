const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const tokenUtils = {
  generateAccessToken: (dataToEncrypt) => {
    console.log("dataToEncrypt");
    console.dir(dataToEncrypt, { depth: null });
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    const accessTokenExpiration = process.env.ACCESS_TOKEN_SECRET_EXPIRATION;
    const accessToken = jwt.sign(
      {
        UserInfo: {
          id: dataToEncrypt.userId,
          memberId: dataToEncrypt.memberId,
          email: dataToEncrypt.email,
          fullName: dataToEncrypt.fullName,
          role: dataToEncrypt.role,
        },
      },
      accessTokenSecret,
      {
        expiresIn: accessTokenExpiration,
      }
    );
    return accessToken;
  },

  generateRefreshToken: (dataToEncrypt) => {
    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
    const refreshTokenExpiration = process.env.REFRESH_TOKEN_SECRET_EXPIRATION;

    // Generate the refresh token
    const refreshToken = jwt.sign(
      {
        UserInfo: {
          id: dataToEncrypt.userId,
          memberId: dataToEncrypt.memberId,

          email: dataToEncrypt.email,
          fullName: dataToEncrypt.fullName,
          role: dataToEncrypt.role,
        },
      },
      refreshTokenSecret,
      {
        expiresIn: refreshTokenExpiration,
      }
    );

    return refreshToken;
  },
};

module.exports = tokenUtils;
