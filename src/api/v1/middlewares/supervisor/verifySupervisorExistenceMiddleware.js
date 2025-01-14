const asyncHandler = require("express-async-handler");
const tokenUtils = require("../../utils/token/tokenUtils.js");

require("dotenv").config();

const db = require("../../../../../models/index.js");

const verifySupervisorExistenceMiddleware = asyncHandler(
  async (req, res, next) => {
    console.log("\n------ verifySupervisorExistenceMiddleware ------\n");

    const decodedToken = tokenUtils.decodeToken(
      req.headers.authorization.split(" ")[1],
      process.env.ACCESS_TOKEN_SECRET
    );

    const supervisorId = decodedToken.UserInfo.memberId;
    const userId = decodedToken.UserInfo.id;

    const supervisorDetails = await db.Supervisor.findOne({
      where: {
        id: supervisorId,
        userId: userId,
      },
    });

    if (!supervisorDetails) {
      const error = new Error("Supervisor not found");
      error.statusCode = 404;
      throw error;
    }
    req.data = req.data || {};

    req.data.supervisorDetails = {
      supervisorId: supervisorDetails.id,
      userId: supervisorDetails.userId,
    };

    console.log("req.data.supervisorDetails", req.data.supervisorDetails);

    console.log("\n------ End of verifySupervisorExistenceMiddleware ------\n");

    next();
  }
);

module.exports = verifySupervisorExistenceMiddleware;
