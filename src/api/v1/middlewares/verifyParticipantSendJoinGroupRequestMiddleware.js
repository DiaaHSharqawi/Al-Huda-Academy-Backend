const asyncHandler = require("express-async-handler");
const tokenUtils = require("../utils/token/tokenUtils.js");

require("dotenv").config();

const db = require("../../../../models/index.js");

const verifyParticipantSendJoinGroupRequest = asyncHandler(
  async (req, res, next) => {
    console.log("\n------ verifyParticipantSendJoinGroupRequest ------\n");

    const decodedToken = tokenUtils.decodeToken(
      req.headers.authorization.split(" ")[1],
      process.env.ACCESS_TOKEN_SECRET
    );

    console.dir(decodedToken, { depth: null });

    const userId = decodedToken.UserInfo.id;

    const participantId = decodedToken.UserInfo.memberId;

    console.log("userId", userId);
    console.log("participantId", participantId);

    const participantDetails = await db.Participant.findOne({
      where: {
        id: participantId,
        userId: userId,
      },
    });
    if (!participantDetails) {
      const error = new Error("Participant not found");
      error.statusCode = 404;
      throw error;
    }

    console.log(
      "\n------ End of verifyParticipantSendJoinGroupRequest ------\n"
    );
    next();
  }
);

module.exports = verifyParticipantSendJoinGroupRequest;
