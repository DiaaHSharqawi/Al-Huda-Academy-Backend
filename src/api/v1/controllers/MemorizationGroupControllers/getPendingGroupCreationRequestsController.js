const asyncHandler = require("express-async-handler");

const getPendingGroupCreationRequestsService = require("./../../services/memorizationGroupServices/getPendingGroupCreationRequestsService");

const getPendingGroupCreationRequestsController = asyncHandler(
  async (req, res) => {
    const getPendingGroupCreationRequestsData = req.body;
    console.log("getPendingGroupCreationRequestsController");

    console.log("getPendingGroupCreationRequestsData :");
    console.dir(getPendingGroupCreationRequestsData, { depth: null });

    const pendingGroupCreationRequests =
      await getPendingGroupCreationRequestsService(
        getPendingGroupCreationRequestsData
      );
    res.status(200).json({
      success: true,
      message: req.t("memorizationGroup.get_pending_group_creation_requests"),
      data: pendingGroupCreationRequests,
    });
  }
);
module.exports = getPendingGroupCreationRequestsController;
