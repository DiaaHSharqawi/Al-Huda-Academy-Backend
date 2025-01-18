const asyncHandler = require("express-async-handler");
const getAllSupervisorGroupJoinRequestService = require("./../../services/supervisorServices/getAllSupervisorGroupJoinRequestService");

const getAllSupervisorGroupJoinRequestController = asyncHandler(
  async (req, res) => {
    const groupId = req.params.groupId;

    const getAllSupervisorGroupJoinRequestData = req.query;

    const { groupJoinRequests, groupJoinRequestsMetaData } =
      await getAllSupervisorGroupJoinRequestService(
        groupId,
        getAllSupervisorGroupJoinRequestData
      );

    res.status(200).json({
      success: true,
      message: "Group join requests retrieved successfully",
      groupJoinRequests: groupJoinRequests,
      groupJoinRequestsMetaData: groupJoinRequestsMetaData,
    });
  }
);

module.exports = getAllSupervisorGroupJoinRequestController;
