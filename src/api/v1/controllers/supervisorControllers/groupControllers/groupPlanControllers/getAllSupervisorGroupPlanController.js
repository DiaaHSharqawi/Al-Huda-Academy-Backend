const asyncHandler = require("express-async-handler");

const getAllSupervisorGroupPlanService = require("../../../../services/supervisorServices/groupServices/groupPlanServices/getAllSupervisorGroupPlanService.js");

const getAllSupervisorGroupPlanController = asyncHandler(async (req, res) => {
  console.log("\n\n===== getSupervisorGroupPlanController =====\n");

  const { groupDetails } = req.data;

  const groupPlanSearchParams = req.query;

  const { groupPlan, groupPlanMetaData } =
    await getAllSupervisorGroupPlanService(groupDetails, groupPlanSearchParams);

  res.status(200).json({
    success: true,
    message: req.t("Group plan retrieved successfully"),
    groupPlan: groupPlan,
    groupPlanMetaData: groupPlanMetaData,
  });
});

module.exports = getAllSupervisorGroupPlanController;
