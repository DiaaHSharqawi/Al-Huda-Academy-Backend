const asyncHandler = require("express-async-handler");
const getMemorizationGroupByGroupIdService = require("./../../services/memorizationGroupServices/getMemorizationGroupByGroupIdService");

const getMemorizationGroupByGroupIdController = asyncHandler(
  async (req, res) => {
    console.log("getMemorizationGroupByGroupIdController");
    console.log(req.params);
    const getMemorizationGroupByGroupIdServiceData = req.params; // something/id

    console.log("getMemorizationGroupByGroupIdServiceData");

    console.dir(getMemorizationGroupByGroupIdServiceData, { depth: null });

    const memorizationGroup = await getMemorizationGroupByGroupIdService(
      getMemorizationGroupByGroupIdServiceData
    );
    console.log("memorizationGroup");
    // console.dir(memorizationGroup, { depth: null });

    res.status(200).json({
      success: true,
      message: "Memorization Group ",
      memorizationGroup,
    });
  }
);
module.exports = getMemorizationGroupByGroupIdController;
