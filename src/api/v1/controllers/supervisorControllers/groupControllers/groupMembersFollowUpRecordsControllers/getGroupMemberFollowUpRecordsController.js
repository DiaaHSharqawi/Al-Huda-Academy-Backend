const asyncHandler = require("express-async-handler");

const getGroupMemberFollowUpRecordsService = require("../../../../services/groupMembersFollowUpRecordsServices/getGroupMemberFollowUpRecordsService.js");

const getGroupMemberFollowUpRecordsController = asyncHandler(
  async (req, res) => {
    console.log("\n------ getGroupMemberFollowUpRecordsController ------\n");

    const { groupMemberDetails } = req.data;
    const { groupDetails } = req.data;

    const searchParams = req.query;

    const {
      groupPlan,
      groupMemberFollowUpRecordsMetadata,
      groupMemberFollowUpRecords,
    } = await getGroupMemberFollowUpRecordsService(
      groupDetails,
      groupMemberDetails,
      searchParams
    );

    res.status(200).json({
      success: true,
      message: "Group member follow-up records retrieved successfully",
      groupPlan: groupPlan,
      groupMemberFollowUpRecords: groupMemberFollowUpRecords,
      groupMemberFollowUpRecordsMetadata: groupMemberFollowUpRecordsMetadata,
    });

    console.log(
      "\n------ End of getGroupMemberFollowUpRecordsController ------\n"
    );
  }
);

module.exports = getGroupMemberFollowUpRecordsController;
