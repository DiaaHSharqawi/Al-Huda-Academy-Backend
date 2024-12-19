const asyncHandler = require("express-async-handler");
const getMemorizationGroupService = require("../../services/memorizationGroupServices/getMemorizationGroupService");

const getMemorizationGroupController = asyncHandler(async (req, res) => {
  const getMemorizationGroupServiceData = req.query;
  console.log("getMemorizationGroupServiceData");
  console.dir(getMemorizationGroupServiceData, { depth: null });

  const memorizationGroup = await getMemorizationGroupService(
    getMemorizationGroupServiceData
  );
  console.log("memorizationGroup");
  console.dir(memorizationGroup, { depth: null });

  res.status(200).json({
    success: true,
    message: "Memorization Group ",
    memorizationGroup,
  });
});
module.exports = getMemorizationGroupController;
