const asyncHandler = require("express-async-handler");

const getAllGroupMembersService = require("../../services/supervisorServices/getAllGroupMembersService.js");

const getAllGroupMembersController = asyncHandler(async (req, res) => {
  console.log("\n------ getAllGroupMembersController ------\n");

  const { groupDetails } = req.data;

  const { groupId } = groupDetails;

  const searchParams = req.query;

  console.log("groupId", groupId);

  const { groupMembers, groupMembersMetaData, groupMemberGroupIds } =
    await getAllGroupMembersService(groupId, searchParams);

  res.status(200).json({
    success: true,
    message: "Group members fetched successfully",
    groupMembers: groupMembers,
    groupMembersMetaData: groupMembersMetaData,
    groupMemberGroupIds,
  });
});

module.exports = getAllGroupMembersController;
