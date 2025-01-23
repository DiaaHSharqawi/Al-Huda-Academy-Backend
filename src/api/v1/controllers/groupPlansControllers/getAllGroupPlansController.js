const asyncHandler = require("express-async-handler");

const getAllGroupPlansService = require("../../services/groupPlansServices/getAllGroupPlansService.js");

const getAllGroupPlansController = asyncHandler(async (req, res) => {
  console.log("\n\n===== getAllGroupPlansController =====\n");

  const groupPlans = await getAllGroupPlansService();

  res.status(200).json({
    success: true,
    message: req.t("Group plans retrieved successfully"),
    groupPlans: groupPlans,
  });
});

module.exports = getAllGroupPlansController;
