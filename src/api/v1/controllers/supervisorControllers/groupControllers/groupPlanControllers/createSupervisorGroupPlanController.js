const asyncHandler = require("express-async-handler");

const createSupervisorGroupPlanService = require("../../../../services/supervisorServices/groupServices/groupPlanServices/createSupervisorGroupPlanService.js");

const createSupervisorGroupPlanController = asyncHandler(async (req, res) => {
  console.log("\n\n===== createSupervisorGroupPlanController =====\n");

  const groupPlanData = req.body;
  const { groupDetails } = req.data;

  console.log("groupPlanData", groupPlanData);

  console.log("groupDetails", groupDetails);

  await createSupervisorGroupPlanService(groupPlanData, groupDetails);

  res.status(200).json({
    success: true,
    message: req.t("Group plan created successfully"),
  });
});

module.exports = createSupervisorGroupPlanController;
