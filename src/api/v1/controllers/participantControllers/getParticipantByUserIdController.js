const asyncHandler = require("express-async-handler");
const getParticipantByUserIdService = require("./../../services/participantServices/getParticipantByUserIdService");

const getParticipantByUserIdController = asyncHandler(async (req, res) => {
  const getParticipantByUserIdData = req.body;

  console.log("getParticipantByUserIdController");

  console.log("getParticipantByUserIdData :");
  console.dir(getParticipantByUserIdData, { depth: null });

  const participant = await getParticipantByUserIdService(
    getParticipantByUserIdData
  );
  res.status(200).json({
    success: true,
    message: req.t("participant.get_participant_by_user_id"),
    participantDetails: participant,
  });
});

module.exports = getParticipantByUserIdController;
