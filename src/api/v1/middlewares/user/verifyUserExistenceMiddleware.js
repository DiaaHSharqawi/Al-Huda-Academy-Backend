const asyncHandler = require("express-async-handler");
const tokenUtils = require("../../utils/token/tokenUtils.js");

require("dotenv").config();

const db = require("../../../../../models/index.js");

const verifyUserExistenceMiddleware = asyncHandler(async (req, res, next) => {
  console.log("\n------ verifyUserExistenceMiddleware ------\n");

  const decodedToken = tokenUtils.decodeToken(
    req.headers.authorization.split(" ")[1],
    process.env.ACCESS_TOKEN_SECRET
  );

  const userId = decodedToken.UserInfo.id;

  const userDetails = await db.User.findOne({
    where: {
      id: userId,
    },
  });

  if (!userDetails) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }
  req.data = req.data || {};

  req.data.userDetails = {
    userId: userDetails.id,
  };

  console.log("req.data.userDetails", req.data.userDetails);

  console.log("\n------ End of verifyUserExistenceMiddleware ------\n");

  next();
});

module.exports = verifyUserExistenceMiddleware;
