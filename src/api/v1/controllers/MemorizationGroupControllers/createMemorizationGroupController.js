const asyncHandler = require("express-async-handler");

const createMemorizationGroupService = require("./../../services/memorizationGroupService/createMemorizationGroupService");

const createMemorizationGroupController = asyncHandler(async (req, res) => {
  const createMemorizationGroupData = req.body;
  console.log("createMemorizationGroupController");

  console.log("createMemorizationGroupData :");
  console.dir(createMemorizationGroupData, { depth: null });

  const memorizationGroup = await createMemorizationGroupService(
    createMemorizationGroupData
  );
  res.status(201).json({
    success: true,
    message: req.t("memorizationGroup.create_memorization_group_successful"),
    data: memorizationGroup,
  });
});
module.exports = createMemorizationGroupController;
