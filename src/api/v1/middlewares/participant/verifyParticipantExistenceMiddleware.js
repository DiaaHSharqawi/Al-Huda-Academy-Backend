const asyncHandler = require("express-async-handler");
const tokenUtils = require("../../utils/token/tokenUtils.js");

require("dotenv").config();

const db = require("../../../../../models/index.js");

const verifyParticipantExistenceMiddleware = asyncHandler(
  async (req, res, next) => {
    console.log("\n------ verifyParticipantExistenceMiddleware ------\n");
    const participantId = req.params.participantId;
    console.log("participantId", participantId);

    const participantDetails = await db.Participant.findByPk(participantId);

    if (!participantDetails) {
      const error = new Error("Participant not found");
      error.statusCode = 404;
      throw error;
    }
    req.data = req.data || {};

    req.data.participantDetails = {
      participantId: participantDetails.id,
      userId: participantDetails.userId,
    };

    console.log("req.participantDetails", req.participantDetails);

    console.log(
      "\n------ End of verifyParticipantExistenceMiddleware ------\n"
    );

    next();
  }
);

module.exports = verifyParticipantExistenceMiddleware;
