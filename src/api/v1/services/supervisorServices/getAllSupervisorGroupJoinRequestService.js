const db = require("./../../../../../models/index.js");

const getAllSupervisorGroupJoinRequestService = async (groupId) => {
  console.log("\n------ getAllSupervisorGroupJoinRequestService ------\n");

  const pendingJoinRequestStatus = await db.GroupJoinRequestStatus.findOne({
    where: {
      name_english: "pending",
    },
  });

  if (!pendingJoinRequestStatus) {
    const error = new Error("Pending status not found");
    error.statusCode = 404;
    throw error;
  }

  const groupJoinRequests = await db.GroupJoinRequest.findAll({
    where: {
      group_id: groupId,
      join_request_status_id: pendingJoinRequestStatus.id,
    },
    include: [
      {
        model: db.Participant,
        attributes: ["fullName", "profileImage"],
      },
    ],
  });

  if (!groupJoinRequests) {
    const error = new Error("No join requests found");
    error.statusCode = 404;
    throw error;
  }

  return groupJoinRequests;
};

module.exports = getAllSupervisorGroupJoinRequestService;
