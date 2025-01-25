const asyncHandler = require("express-async-handler");
const acceptGroupJoinRequestService = require("./../../../../services/supervisorServices/groupServices/groupJoinRequestServices/acceptGroupJoinRequestService");

const acceptGroupJoinRequestController = asyncHandler(async (req, res) => {
  console.log("\n------ acceptGroupJoinRequestController ------\n");

  const { supervisorDetails, groupDetails, participantDetails } = req.data;

  await acceptGroupJoinRequestService(
    supervisorDetails,
    groupDetails,
    participantDetails
  );

  res.status(200).json({
    success: true,
    message: "Group Join Request Accepted",
  });
});

module.exports = acceptGroupJoinRequestController;
