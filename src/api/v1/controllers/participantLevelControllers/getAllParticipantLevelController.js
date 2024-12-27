const asyncHandler = require("express-async-handler");
const getParticipantLevelService = require("../../services/participantLevelServices/getAllParticipantLevelService");

const getAllParticipantLevelController = asyncHandler(async (req, res) => {
  const participantLevels = await getParticipantLevelService();

  res.status(200).json({
    success: true,
    message: "Participant levels fetched successfully",
    participantLevels: participantLevels,
  });
});

module.exports = getAllParticipantLevelController;
