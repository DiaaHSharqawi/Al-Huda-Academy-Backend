const asyncHandler = require("express-async-handler");
const getMemorizationGroupService = require("../../services/memorizationGroupServices/getMemorizationGroupService");

const getMemorizationGroupController = asyncHandler(async (req, res) => {
  const getMemorizationGroupServiceData = req.query;
  console.log("getMemorizationGroupServiceData");
  console.dir(getMemorizationGroupServiceData, { depth: null });

  const { memorizationGroups, metaData } = await getMemorizationGroupService(
    getMemorizationGroupServiceData
  );
  console.log("memorizationGroups");

  res.status(200).json({
    success: true,
    message: "Memorization Group ",
    memorizationGroups,
    metaData,
  });
});
module.exports = getMemorizationGroupController;
