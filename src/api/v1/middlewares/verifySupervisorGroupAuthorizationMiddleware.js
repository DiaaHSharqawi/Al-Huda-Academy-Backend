const asyncHandler = require("express-async-handler");
const tokenUtils = require("../utils/token/tokenUtils.js");

require("dotenv").config();

const db = require("../../../../models/index.js");

const verifySupervisorGroupAuthorizationMiddleware = asyncHandler(
  async (req, res, next) => {
    console.log(
      "\n------ verifySupervisorGroupAuthorizationMiddleware ------\n"
    );

    const { groupDetails, supervisorDetails } = req.data;

    console.log("groupDetails", groupDetails);
    console.log("supervisorDetails", supervisorDetails);

    if (groupDetails.supervisorId !== supervisorDetails.supervisorId) {
      const error = new Error("Supervisor is not the owner of the group");
      error.statusCode = 403;
      throw error;
    }

    next();
  }
);

module.exports = verifySupervisorGroupAuthorizationMiddleware;
