const asyncHandler = require("express-async-handler");

const getRequestsForCreatingGroupsService = require("../../services/adminServices/getRequestsForCreatingGroupsService.js");

const getRequestsForCreatingGroupsController = asyncHandler(
  async (req, res) => {
    const getRequestsForCreatingGroupsData = req.query;

    const { requestsForCreatingGroups, metaData } =
      await getRequestsForCreatingGroupsService(
        getRequestsForCreatingGroupsData
      );

    res.status(200).json({
      success: true,
      requestsForCreatingGroups: requestsForCreatingGroups,
      metaData: metaData,
    });
  }
);

module.exports = getRequestsForCreatingGroupsController;
