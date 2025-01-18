const asyncHandler = require("express-async-handler");

const getAllGroupMembersService = require("../../services/supervisorServices/getAllGroupMembersService.js");

const getAllGroupMembersController = asyncHandler(async (req, res) => {
  console.log("\n------ getAllGroupMembersController ------\n");

  const groupId = req.params.groupId;

  const searchParams = req.query;

  console.log("groupId", groupId);

  const { groupMembers, groupMembersMetaData } =
    await getAllGroupMembersService(groupId, searchParams);

  res.status(200).json({
    success: true,
    message: "Group members fetched successfully",
    groupMembers: groupMembers,
    groupMembersMetaData: groupMembersMetaData,
  });
});

module.exports = getAllGroupMembersController;
