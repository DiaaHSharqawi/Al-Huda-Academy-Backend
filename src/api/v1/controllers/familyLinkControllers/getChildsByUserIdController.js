const asyncHandler = require("express-async-handler");
const getChildsByParentIdService = require("./../../services/familyLinkServices/getChildsByParentIdService");

const getChildsByUserIdController = asyncHandler(async (req, res) => {
  const getChildsByUserIdControllerData = req.body;

  const childs = await getChildsByParentIdService(
    getChildsByUserIdControllerData
  );
  res.status(200).json({
    success: true,
    message: "data fetched successfully",
    familyLink: childs,
  });
});

module.exports = getChildsByUserIdController;
