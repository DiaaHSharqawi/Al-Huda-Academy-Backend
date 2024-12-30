const asyncHandler = require("express-async-handler");
const getAllDaysService = require("./../../services/daysServices/getAllDaysService");

const getAllDaysController = asyncHandler(async (req, res) => {
  const days = await getAllDaysService();

  res.status(200).json({
    success: true,
    message: "days fetched successfully",
    days: days,
  });
});

module.exports = getAllDaysController;
