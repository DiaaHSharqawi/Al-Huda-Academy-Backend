const asyncHandler = require("express-async-handler");
const rejectGroupJoinRequestService = require("../../services/supervisorServices/rejectGroupJoinRequestService");

const rejectGroupJoinRequestController = asyncHandler(async (req, res) => {
  console.log("\n------ rejectGroupJoinRequestController ------\n");

  const { supervisorDetails, groupDetails, participantDetails } = req.data;

  const responseMessage = req.body;

  await rejectGroupJoinRequestService(
    supervisorDetails,
    groupDetails,
    participantDetails,
    responseMessage
  );

  res.status(200).json({
    success: true,
    message: "Group Join Request Rejected",
  });
});

module.exports = rejectGroupJoinRequestController;
