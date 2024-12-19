const db = require("./../../../../../models/index.js");

const getParticipantByUserIdService = async (getParticipantByUserIdData) => {
  const { userId } = getParticipantByUserIdData;

  console.log("getParticipantByUserIdService");
  console.log("getParticipantByUserIdData :");
  console.dir(getParticipantByUserIdData, { depth: null });

  const participant = await db.Participant.findOne({
    where: {
      userId: userId,
    },
  });

  if (!participant) {
    const error = new Error("Participant not found");
    error.statusCode = 404;
    throw error;
  }

  console.log("participant :");
  console.dir(participant, {
    depth: null,
  });
  return participant;
};

module.exports = getParticipantByUserIdService;
