const asyncHandler = require("express-async-handler");

const getAllGroupStatusService = require("./../../services/groupStatusServices/getAllGroupStatusService");

const getAllGroupStatusController = asyncHandler(async (req, res) => {
  console.log(`\n ---------- Get All Group Status Controller ---------- \n`);

  const groupStatus = await getAllGroupStatusService();

  res.status(200).json({
    success: true,
    message: `Successfully retrieved group status`,
    groupStatus: groupStatus,
  });
});

module.exports = getAllGroupStatusController;
