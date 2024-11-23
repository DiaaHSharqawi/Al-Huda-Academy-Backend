import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const tokenUtils = {
  generateAccessToken: (dataToEncrypt) => {
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    const accessTokenExpiration = process.env.ACCESS_TOKEN_SECRET_EXPIRATION;
    const accessToken = jwt.sign(
      {
        UserInfo: {
          id: dataToEncrypt.id,
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
          id: dataToEncrypt.id,
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

export default tokenUtils;
