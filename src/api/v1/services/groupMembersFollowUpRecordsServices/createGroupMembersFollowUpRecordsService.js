const db = require("../../../../../models/index.js");

const createGroupMembersFollowUpRecordsService = async (
  groupMembersFollowUpRecordsData,
  groupDetails,
  groupMemberDetails
) => {
  console.log("====== createGroupMembersFollowUpRecordsService ======");

  const { groupId } = groupDetails;
  const { groupMemberId } = groupMemberDetails;

  const { group_plan_id } = groupMembersFollowUpRecordsData;

  console.log(
    "groupMembersFollowUpRecordsData: ",
    groupMembersFollowUpRecordsData
  );
  console.log("groupDetails: ", groupDetails);
  console.log("groupMemberDetails: ", groupMemberDetails);

  console.log("groupId: ", groupId);
  console.log("groupMemberId: ", groupMemberId);
  console.log("group_plan_id: ", group_plan_id);

  const groupMembersFollowUpRecords =
    await db.GroupMembersFollowUpRecord.findOne({
      where: {
        group_member_id: groupMemberId,
        group_plan_id: group_plan_id,
      },
    });

  if (groupMembersFollowUpRecords) {
    const error = new Error("Group members follow-up records already exists");
    error.statusCode = 409;
    throw error;
  }

  console.log("not found");

  const groupMembersFollowUpRecordsCreateResult =
    await db.GroupMembersFollowUpRecord.create({
      ...groupMembersFollowUpRecordsData,
      group_member_id: groupMemberId,
      groupId: groupId,
    });

  if (!groupMembersFollowUpRecordsCreateResult) {
    const error = new Error(
      "Group members follow-up records could not be created"
    );
    error.statusCode = 500;
    throw error;
  }
};

module.exports = createGroupMembersFollowUpRecordsService;
