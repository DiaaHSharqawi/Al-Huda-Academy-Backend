const asyncHandler = require("express-async-handler");

const getSupervisorGroupPlanDetailsService = require("../../services/supervisorServices/getSupervisorGroupPlanDetailsService.js");

const getSupervisorGroupPlanDetailsController = asyncHandler(
  async (req, res) => {
    const groupPlanDetailsData = req.data.groupPlan;

    const groupPlanDetails = await getSupervisorGroupPlanDetailsService(
      groupPlanDetailsData
    );

    res.status(200).json({
      success: true,
      message: req.t("Group plan details retrieved successfully"),
      groupPlanDetails: groupPlanDetails,
    });
  }
);

module.exports = getSupervisorGroupPlanDetailsController;
