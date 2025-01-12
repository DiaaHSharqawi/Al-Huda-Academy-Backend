const asyncHandler = require("express-async-handler");
const getAllSupervisorGroupJoinRequestService = require("./../../services/supervisorServices/getAllSupervisorGroupJoinRequestService");

const getAllSupervisorGroupJoinRequestController = asyncHandler(
  async (req, res) => {
    const groupId = req.params.groupId;

    const groupJoinRequests = await getAllSupervisorGroupJoinRequestService(
      groupId
    );

    res.status(200).json({
      success: true,
      message: "Group join requests retrieved successfully",
      groupJoinRequests,
    });
  }
);

module.exports = getAllSupervisorGroupJoinRequestController;
