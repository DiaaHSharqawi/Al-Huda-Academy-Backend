const asyncHandler = require("express-async-handler");

require("dotenv").config();

const db = require("../../../../../models/index.js");

const verifyGroupMemberExistenceMiddleware = asyncHandler(
  async (req, res, next) => {
    console.log("\n------ verifyGroupMemberExistenceMiddleware ------\n");

    let memberId = req.params.memberId;

    const groupMemberDetails = await db.GroupMembers.findOne({
      where: {
        id: memberId,
      },
    });

    if (!groupMemberDetails) {
      const error = new Error("Group member not found");
      error.statusCode = 404;
      throw error;
    }

    req.data = req.data || {};

    req.data.groupMemberDetails = {
      groupMemberId: groupMemberDetails.id,
    };

    console.log("req.data.groupMemberDetails", req.data.groupMemberDetails);

    console.log(
      "\n------ End of verifyGroupMemberExistenceMiddleware ------\n"
    );

    next();
  }
);

module.exports = verifyGroupMemberExistenceMiddleware;
