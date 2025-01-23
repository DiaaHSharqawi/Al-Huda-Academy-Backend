const asyncHandler = require("express-async-handler");

const getGroupContentService = require("../../services/supervisorServices/getGroupContentService");

const getGroupContentController = asyncHandler(async (req, res) => {
  console.log("\n\n===== getGroupContentController =====\n");

  const { groupDetails } = req.data;

  const groupContent = await getGroupContentService(groupDetails);

  res.status(200).json({
    success: true,
    message: req.t("Group content retrieved successfully"),
    groupContent: groupContent,
  });
});

module.exports = getGroupContentController;
