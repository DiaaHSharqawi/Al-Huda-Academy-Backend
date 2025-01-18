const asyncHandler = require("express-async-handler");

const getSupervisorGroupDashboardService = require("./../../services/supervisorServices/getSupervisorGroupDashboardService");

const getSupervisorGroupDashboardController = asyncHandler(
  async (req, res, next) => {
    console.log("\n------ getSupervisorGroupDashboardController ------\n");

    const groupId = req.params.groupId;

    const groupDashboard = await getSupervisorGroupDashboardService(groupId);

    res.status(200).json({
      success: true,
      message: "Group dashboard fetched successfully",
      groupDashboard: groupDashboard,
    });
  }
);

module.exports = getSupervisorGroupDashboardController;
