const jwt = require("jsonwebtoken");

const verifyJwtTokenMiddleware = async (req, res, next) => {
  const authenticateHeader =
    req.headers.authorization || req.headers.Authorization; // "Huda Token"

  const isTokenExist = authenticateHeader?.startsWith("AL_HUDA ");
  if (!isTokenExist) {
    return res.status(401).json({
      success: false,
      massage: "Unauthorized",
    });
  }
  const token = authenticateHeader.split(" ")[1]; // ["AL_HUDA ","Token"]

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err)
      return res.status(403).json({
        // you cant access this page ==> tokenInRequest != tokenInServer
        success: false,
        massage: "Forbidden",
      });
    // go to next Middleware :
    next();
  });
};

module.exports = verifyJwtTokenMiddleware;
