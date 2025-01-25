const asyncHandler = require("express-async-handler");

const updateSupervisorGroupPlanService = require("../../../../services/supervisorServices/groupServices/groupPlanServices/updateSupervisorGroupPlanService.js");

const updateSupervisorGroupPlanController = asyncHandler(async (req, res) => {
  console.log("\n\n===== updateSupervisorGroupPlanController =====\n");

  const groupPlanData = req.body;

  const { groupDetails } = req.data;

  const { groupPlanDetails } = req.data;

  console.log("groupPlanData", groupPlanData);

  console.log("groupDetails", groupDetails);

  await updateSupervisorGroupPlanService(
    groupPlanDetails,
    groupPlanData,
    groupDetails
  );

  res.status(200).json({
    success: true,
    message: req.t("Group plan updated successfully"),
  });
});

module.exports = updateSupervisorGroupPlanController;
