const { or } = require("sequelize");
const db = require("./../../../../../models/index.js");

const getSupervisorGroupDashboardService = async (groupId) => {
  console.log("\n------ getSupervisorGroupDashboardService ------\n");

  const groupDetails = await db.MemorizationGroup.findByPk(groupId);

  if (!groupDetails) {
    const error = new Error("Group not found");
    error.statusCode = 404;
    throw error;
  }

  console.log("groupDetails", groupDetails);

  const pendingGroupJoinRequests = await db.GroupJoinRequestStatus.findOne({
    where: {
      name_english: "pending",
    },
  });

  console.log("pendingGroupJoinRequests", pendingGroupJoinRequests);

  if (!pendingGroupJoinRequests) {
    const error = new Error("Group join request status not found");
    error.statusCode = 404;
    throw error;
  }

  const groupJoinRequests = await db.GroupJoinRequest.findAll({
    where: {
      group_id: groupId,
      join_request_status_id: pendingGroupJoinRequests.id,
    },
    include: [
      {
        model: db.Participant,
        attributes: ["id", "fullName", "profileImage"],
      },
    ],
    limit: 5,
    order: [["createdAt", "DESC"]],
  });

  console.log("groupJoinRequests", groupJoinRequests);
  /*
  const groupMembers = await db.GroupMember.findAll({
    where: {
      group_id: groupId,
    },
  });

  console.log("groupMembers", groupMembers);*/

  const groupDashboard = {
    groupDetailsDashboard: groupDetails,
    groupJoinRequestsDashboard: groupJoinRequests,
  };

  return groupDashboard;
};

module.exports = getSupervisorGroupDashboardService;
