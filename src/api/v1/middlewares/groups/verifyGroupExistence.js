const asyncHandler = require("express-async-handler");

require("dotenv").config();

const db = require("./../../../../../models/index.js");

const verifyGroupExistenceMiddleware = asyncHandler(async (req, res, next) => {
  console.log("\n------ verifyGroupExistenceMiddleware ------\n");

  const groupId = req.params.groupId;

  console.log("groupId", groupId);

  const groupDetails = await db.MemorizationGroup.findByPk(groupId);

  if (!groupDetails) {
    const error = new Error("Group not found");
    error.statusCode = 404;
    throw error;
  }

  console.log("groupDetails", groupDetails);

  req.data = req.data || {};

  req.data.groupDetails = {
    groupId: groupDetails.id,
    supervisorId: groupDetails.supervisor_id,
    groupName: groupDetails.group_name,
  };

  console.log("req.data.groupDetails", req.data.groupDetails);

  console.log("\n------ End of verifyGroupExistenceMiddleware ------\n");

  next();
});

module.exports = verifyGroupExistenceMiddleware;
