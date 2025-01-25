const asyncHandler = require("express-async-handler");

const deleteSupervisorGroupPlanService = require("../../../../services/supervisorServices/groupServices/groupPlanServices/deleteSupervisorGroupPlanService.js");

const deleteSupervisorGroupPlanController = asyncHandler(async (req, res) => {
  console.log("\n\n===== deleteSupervisorGroupPlanController =====\n");

  const groupPlanData = req.body;

  const { groupDetails } = req.data;

  const { groupPlanDetails } = req.data;

  console.log("groupPlanData", groupPlanData);

  console.log("groupDetails", groupDetails);

  await deleteSupervisorGroupPlanService(groupPlanDetails, groupDetails);

  res.status(200).json({
    success: true,
    message: req.t("Group plan deleted successfully"),
  });
});

module.exports = deleteSupervisorGroupPlanController;
