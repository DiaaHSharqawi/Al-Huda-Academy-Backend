const asyncHandler = require("express-async-handler");

const getAllSupervisorGroupPlanDatesService = require("./../../../../services/supervisorServices/groupServices/groupPlanServices/getAllSupervisorGroupPlanDatesService.js");

const getAllSupervisorGroupPlanDatesController = asyncHandler(
  async (req, res) => {
    console.log("\n\n===== getSupervisorGroupPlanController =====\n");

    const { groupDetails } = req.data;

    const { groupPlanDates } = await getAllSupervisorGroupPlanDatesService(
      groupDetails
    );

    res.status(200).json({
      success: true,
      message: req.t("Group plan retrieved successfully"),
      groupPlanDates: groupPlanDates,
    });
  }
);

module.exports = getAllSupervisorGroupPlanDatesController;
