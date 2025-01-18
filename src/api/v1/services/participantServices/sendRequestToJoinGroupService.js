const db = require("./../../../../..//models/index.js");

const sendRequestToJoinGroupService = async (groupId, participantId) => {
  console.log("sendRequestToJoinGroupService");
  console.log("groupId", groupId);
  console.log("participantId", participantId);

  const groupDetails = await db.MemorizationGroup.findOne({
    where: {
      id: groupId,
    },
  });

  if (!groupDetails) {
    const error = new Error("Group not found");
    error.statusCode = 404;
    throw error;
  }

  console.log("participantId", participantId);

  const isRequestAlreadySent = await db.GroupJoinRequest.findOne({
    where: {
      group_id: groupId,
      participant_id: participantId,
    },
  });

  if (isRequestAlreadySent) {
    const error = new Error("Request already sent");
    error.statusCode = 409;
    throw error;
  }

  const pendingJoinRequestStatus = await db.GroupJoinRequestStatus.findOne({
    where: {
      name_english: "pending",
    },
  });

  if (!pendingJoinRequestStatus) {
    const error = new Error("pending Join Request Status not found");
    error.statusCode = 404;
    throw error;
  }

  console.log("pendingJoinRequestStatus", pendingJoinRequestStatus);
  console.dir(
    {
      group_id: groupId,
      participant_id: participantId,
      join_request_status_id: pendingJoinRequestStatus.id,
    },
    { depth: null }
  );

  try {
    await db.GroupJoinRequest.create({
      group_id: groupId,
      participant_id: participantId,
      join_request_status_id: pendingJoinRequestStatus.id,
    });
  } catch (error) {
    console.error("Error creating GroupJoinRequest:", error);
    throw new Error("Failed to send request to join group");
  }
};

module.exports = sendRequestToJoinGroupService;
