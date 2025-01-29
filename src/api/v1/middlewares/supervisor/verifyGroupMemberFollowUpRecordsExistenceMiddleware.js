const asyncHandler = require("express-async-handler");

require("dotenv").config();

const db = require("../../../../../models/index.js");

const verifyGroupMemberFollowUpRecordsExistenceMiddleware = asyncHandler(
  async (req, res, next) => {
    console.log(
      "\n------ verifyGroupMemberFollowUpRecordsExistenceMiddleware ------\n"
    );

    let recordId = req.params.recordId;

    const groupMembersFollowUpRecordDetails =
      await db.GroupMembersFollowUpRecord.findOne({
        where: {
          id: recordId,
        },
      });

    if (!groupMembersFollowUpRecordDetails) {
      const error = new Error("Group member follow-up record not found");
      error.statusCode = 404;
      throw error;
    }

    req.data = req.data || {};

    req.data.groupMembersFollowUpRecordDetails = {
      recordId: groupMembersFollowUpRecordDetails.id,
      groupPlanId: groupMembersFollowUpRecordDetails.group_plan_id,
    };

    console.log(
      "req.data.groupMembersFollowUpRecordDetails",
      req.data.groupMembersFollowUpRecordDetails
    );

    console.log(
      "\n------ End of verifyGroupMemberFollowUpRecordsExistenceMiddleware ------\n"
    );

    next();
  }
);

module.exports = verifyGroupMemberFollowUpRecordsExistenceMiddleware;
