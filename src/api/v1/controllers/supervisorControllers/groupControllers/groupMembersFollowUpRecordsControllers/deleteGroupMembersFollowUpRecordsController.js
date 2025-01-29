const asyncHandler = require("express-async-handler");

const deleteGroupMembersFollowUpRecordsService = require("../../../../services/groupMembersFollowUpRecordsServices/deleteGroupMembersFollowUpRecordsService.js");

const deleteGroupMembersFollowUpRecordsController = asyncHandler(
  async (req, res) => {
    console.log(
      "\n------ deleteGroupMembersFollowUpRecordsController ------\n"
    );

    const { groupMembersFollowUpRecordDetails } = req.data;

    console.log(
      "groupMembersFollowUpRecordDetails: ",
      groupMembersFollowUpRecordDetails
    );

    await deleteGroupMembersFollowUpRecordsService(
      groupMembersFollowUpRecordDetails
    );

    res.status(200).json({
      success: true,
      message: "Group members follow-up records deleted successfully",
    });
  }
);

module.exports = deleteGroupMembersFollowUpRecordsController;
