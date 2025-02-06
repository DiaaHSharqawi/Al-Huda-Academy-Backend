const asyncHandler = require("express-async-handler");

const updateGroupMembersFollowUpRecordsService = require("../../../../services/groupMembersFollowUpRecordsServices/updateGroupMembersFollowUpRecordsService.js");

const updateGroupMembersFollowUpRecordsController = asyncHandler(
  async (req, res) => {
    console.log(
      "\n------ updateGroupMembersFollowUpRecordsController ------\n"
    );

    const groupMembersFollowUpRecordsData = req.body;
    const { groupMembersFollowUpRecordDetails } = req.data;

    const { groupMemberDetails } = req.data;

    console.log(
      "groupMembersFollowUpRecordsData: ",
      groupMembersFollowUpRecordsData
    );

    await updateGroupMembersFollowUpRecordsService(
      groupMembersFollowUpRecordsData,
      groupMembersFollowUpRecordDetails,
      groupMemberDetails
    );

    res.status(200).json({
      success: true,
      message: "Group members follow-up records updated successfully",
    });
  }
);

module.exports = updateGroupMembersFollowUpRecordsController;
