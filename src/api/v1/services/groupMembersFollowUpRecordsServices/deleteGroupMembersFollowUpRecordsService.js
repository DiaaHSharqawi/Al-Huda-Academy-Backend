const db = require("../../../../../models/index.js");

const deleteGroupMembersFollowUpRecordsService = async (
  groupMembersFollowUpRecordDetails
) => {
  console.log("====== deleteGroupMembersFollowUpRecordsService ======");

  const { recordId } = groupMembersFollowUpRecordDetails;

  console.log("recordId: ", recordId);

  console.log(
    "groupMembersFollowUpRecordDetails",
    groupMembersFollowUpRecordDetails
  );

  console.log("Record found, deleting...");

  const deletedRows = await db.GroupMembersFollowUpRecord.destroy({
    where: { id: recordId },
  });

  if (deletedRows === 0) {
    console.warn("No records were deleted. Check the ID.");
  } else {
    console.log(`Deleted ${deletedRows} record(s) successfully.`);
  }

  console.log("Delete successful");
};

module.exports = deleteGroupMembersFollowUpRecordsService;
