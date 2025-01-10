const asyncHandler = require("express-async-handler");
const getAllSupervisorGroupJoinRequestService = require("./../../services/supervisorServices/getAllSupervisorGroupJoinRequestService");

const getAllSupervisorGroupJoinRequestController = asyncHandler(
  async (req, res) => {
    const getAllSupervisorGroupJoinRequestData = req.body;

    console.log(
      "getAllSupervisorGroupJoinRequestData",
      getAllSupervisorGroupJoinRequestData
    );

    const groupId = req.params.groupId;

    const groupJoinRequests = await getAllSupervisorGroupJoinRequestService(
      groupId,
      getAllSupervisorGroupJoinRequestData
    );

    res.status(200).json({
      success: true,
      message: "Group join requests retrieved successfully",
      groupJoinRequests,
    });
  }
);

module.exports = getAllSupervisorGroupJoinRequestController;
