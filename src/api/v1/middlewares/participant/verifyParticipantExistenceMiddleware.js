const asyncHandler = require("express-async-handler");
const tokenUtils = require("../../utils/token/tokenUtils.js");

require("dotenv").config();

const db = require("../../../../../models/index.js");

const verifyParticipantExistenceMiddleware = asyncHandler(
  async (req, res, next) => {
    console.log("\n------ verifyParticipantExistenceMiddleware ------\n");

    let participantId = req.params.participantId;

    if (!participantId) {
      console.log("req.headers.authorization", req.headers.authorization);

      const decodedToken = tokenUtils.decodeToken(
        req.headers.authorization.split(" ")[1],
        process.env.ACCESS_TOKEN_SECRET
      );

      console.log("decodedToken", decodedToken);

      participantId = decodedToken.UserInfo.memberId;
    }
    console.log("participantId", participantId);

    const participantDetails = await db.Participant.findByPk(participantId);

    if (!participantDetails) {
      const error = new Error("Participant not found");
      error.statusCode = 404;
      throw error;
    }

    console.log("participantDetails", participantDetails);

    req.data = req.data || {};

    req.data.participantDetails = {
      participantId: participantDetails.id,
      userId: participantDetails.userId,
      gender_id: participantDetails.gender_id,
      quranMemorizingAmountsId: participantDetails.quranMemorizingAmountsId,
    };

    console.log("req.participantDetails", req.participantDetails);

    console.log(
      "\n------ End of verifyParticipantExistenceMiddleware ------\n"
    );

    next();
  }
);

module.exports = verifyParticipantExistenceMiddleware;
