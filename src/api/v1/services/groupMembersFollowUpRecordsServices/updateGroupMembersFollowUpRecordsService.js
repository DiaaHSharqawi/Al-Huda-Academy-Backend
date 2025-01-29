const db = require("../../../../../models/index.js");

const updateGroupMembersFollowUpRecordsService = async (
  groupMembersFollowUpRecordsData,
  groupMembersFollowUpRecordDetails,
  groupMemberDetails
) => {
  console.log("====== updateGroupMembersFollowUpRecordsService ======");

  const { recordId } = groupMembersFollowUpRecordDetails;

  console.log("recordId: ", recordId);

  console.log(
    "groupMembersFollowUpRecordDetails",
    groupMembersFollowUpRecordDetails
  );

  console.log(
    "groupMembersFollowUpRecordsData: ",
    groupMembersFollowUpRecordsData
  );

  console.log("Record found, updating...");

  const [updatedRows] = await db.GroupMembersFollowUpRecord.update(
    {
      ...groupMembersFollowUpRecordsData,
    },
    { where: { id: recordId } }
  );

  if (updatedRows === 0) {
    console.warn("No records were updated. Check the ID or data.");
  } else {
    console.log(`Updated ${updatedRows} record(s) successfully.`);
  }

  console.log("Update successful");
};

module.exports = updateGroupMembersFollowUpRecordsService;
