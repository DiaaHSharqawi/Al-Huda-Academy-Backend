const asyncHandler = require("express-async-handler");

const getParticipantGroupDashboardService = require("./../../../services/participantServices/groupServices/getParticipantGroupDashboardService.js");

const getParticipantGroupDashboardController = asyncHandler(
  async (req, res) => {
    console.log("\n------ getParticipantGroupDashboardController ------\n");

    console.log("req.params", req.params);

    const { participantDetails } = req.data;

    const { groupDetails } = req.data;

    const groupDashboard = await getParticipantGroupDashboardService(
      participantDetails,
      groupDetails
    );

    console.log("groupDashboard", groupDashboard);

    res.status(200).json({
      success: true,
      message: "Participant group dashboard fetched successfully",
      groupDashboard,
    });
  }
);

module.exports = getParticipantGroupDashboardController;
