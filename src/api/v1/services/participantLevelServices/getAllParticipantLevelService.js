const db = require("../../../../../models/index");

const getAllParticipantLevelService = async () => {
  const participantLevels = await db.ParticipantLevel.findAll();

  if (!participantLevels) {
    const error = new Error("No participant levels found");
    error.status = 404;
    throw error;
  }

  return participantLevels;
};

module.exports = getAllParticipantLevelService;
