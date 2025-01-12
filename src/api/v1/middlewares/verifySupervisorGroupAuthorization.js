const asyncHandler = require("express-async-handler");
const tokenUtils = require(".//../utils/token/tokenUtils.js");

require("dotenv").config();

const db = require("../../../../models/index.js");

const verifySupervisorGroupAuthorization = asyncHandler(
  async (req, res, next) => {
    console.log("\n------ verifySupervisorGroupAuthorization ------\n");

    const groupId = req.params.groupId;

    const groupDetails = await db.MemorizationGroup.findByPk(groupId);

    if (!groupDetails) {
      const error = new Error("Group not found");
      error.statusCode = 404;
      throw error;
    }

    console.log("groupDetails", groupDetails);

    const decodedToken = tokenUtils.decodeToken(
      req.headers.authorization.split(" ")[1],
      process.env.ACCESS_TOKEN_SECRET
    );

    const supervisorId = decodedToken.UserInfo.memberId;

    console.log("supervisorId", supervisorId);

    if (groupDetails.supervisor_id !== supervisorId) {
      const error = new Error("Supervisor is not the owner of the group");
      error.statusCode = 403;
      throw error;
    }

    next();
  }
);

module.exports = verifySupervisorGroupAuthorization;
