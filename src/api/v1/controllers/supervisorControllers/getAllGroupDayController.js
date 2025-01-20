const asyncHandler = require("express-async-handler");

const getAllGroupDayService = require("./../../services/supervisorServices/getAllGroupDayService.js");

const getAllGroupDayController = asyncHandler(async (req, res) => {
  console.log("\n\n===== getAllGroupDayController =====\n");

  const { groupDetails } = req.data;

  console.log("groupDetails", groupDetails);

  const supervisorGroupDays = await getAllGroupDayService(groupDetails);

  res.status(200).json({
    success: true,
    message: req.t("Group days found successfully"),
    supervisorGroupDays: supervisorGroupDays,
  });
});

module.exports = getAllGroupDayController;
