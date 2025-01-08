const asyncHandler = require("express-async-handler");

const getAllAccountStatusService = require("./../../services/accountStatusServices/getAllAccountStatusService.js");

const getAllAccountStatusController = asyncHandler(async (req, res) => {
  console.log("getAllAccountStatusController");

  const accountStatuses = await getAllAccountStatusService();

  res.status(200).json({
    success: true,
    message: "Account statuses found successfully",
    accountStatuses: accountStatuses,
  });

  ``;
});

module.exports = getAllAccountStatusController;
