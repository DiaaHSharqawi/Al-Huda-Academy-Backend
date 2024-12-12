const asyncHandler = require("express-async-handler");
const getMemorizationGroupByGroupNameService = require("./../../services/memorizationGroupService/getMemorizationGroupByGroupNameService");

const getMemorizationGroupByGroupNameController = asyncHandler(
  async (req, res) => {
    const getMemorizationGroupByGroupNameData = req.body;
    console.log("getMemorizationGroupByGroupNameController");

    console.log("getMemorizationGroupByGroupNameData :");
    console.dir(getMemorizationGroupByGroupNameData, { depth: null });

    const memorizationGroup = await getMemorizationGroupByGroupNameService(
      getMemorizationGroupByGroupNameData
    );

    res.status(200).json({
      success: true,
      message: req.t(
        "memorizationGroup.get_memorization_group_by_group_name_successful"
      ),
      data: memorizationGroup,
    });
  }
);

module.exports = getMemorizationGroupByGroupNameController;
