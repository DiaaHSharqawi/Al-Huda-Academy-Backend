const asyncHandler = require("express-async-handler");

const getAllGroupDetailsService = require("./../../services/memorizationGroupServices/getAllGroupDetailsService");

const getAllGroupDetailsController = asyncHandler(async (req, res) => {
  const allGroupDetails = await getAllGroupDetailsService();

  res.status(200).json({
    success: true,
    message: "All Group Details",
    allGroupDetails,
  });
});

module.exports = getAllGroupDetailsController;
