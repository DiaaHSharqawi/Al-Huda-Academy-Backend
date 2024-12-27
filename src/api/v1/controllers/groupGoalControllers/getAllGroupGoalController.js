const asyncHandler = require("express-async-handler");
const getAllGroupGoalService = require("./../../services/groupGoalServices/getAllGroupGoalService");

const getAllGroupGoalController = asyncHandler(async (req, res) => {
  const groupGoals = await getAllGroupGoalService();

  res.status(200).json({
    success: true,
    message: "Group goals fetched successfully",
    groupGoals: groupGoals,
  });
});

module.exports = getAllGroupGoalController;
