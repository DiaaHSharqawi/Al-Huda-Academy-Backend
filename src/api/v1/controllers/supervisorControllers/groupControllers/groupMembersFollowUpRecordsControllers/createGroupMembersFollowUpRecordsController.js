const asyncHandler = require("express-async-handler");

const createGroupMembersFollowUpRecordsService = require("../../../../services/groupMembersFollowUpRecordsServices/createGroupMembersFollowUpRecordsService.js");

const createGroupMembersFollowUpRecordsController = asyncHandler(
  async (req, res) => {
    console.log(
      "\n------ createGroupMembersFollowUpRecordsController ------\n"
    );

    const { groupMemberDetails } = req.data;

    const { groupDetails } = req.data;

    console.log("groupMemberDetails: ", groupMemberDetails);
    console.log("groupDetails: ", groupDetails);

    const groupMembersFollowUpRecordsData = req.body;

    console.log(
      "groupMembersFollowUpRecordsData: ",
      groupMembersFollowUpRecordsData
    );

    await createGroupMembersFollowUpRecordsService(
      groupMembersFollowUpRecordsData,
      groupDetails,
      groupMemberDetails
    );

    res.status(200).json({
      success: true,
      message: "Group members follow-up records created successfully",
    });
  }
);

module.exports = createGroupMembersFollowUpRecordsController;
