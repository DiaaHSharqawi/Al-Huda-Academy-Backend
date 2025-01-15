const db = require("../../../../../models/index.js");
const sendNotificationsUtil = require("../../utils/notifications/sendNotificationsUtil.js");

const rejectGroupJoinRequestService = async (
  supervisorDetails,
  groupDetails,
  participantDetails,
  responseMessage
) => {
  console.log("----- rejectGroupJoinRequestService -----");

  const { groupId } = groupDetails;
  const { supervisorId } = supervisorDetails;
  const { participantId } = participantDetails;

  const participantMembership = await db.GroupMembership.findOne({
    where: { group_id: groupId, participant_id: participantId },
  });

  if (participantMembership) {
    const error = new Error("Participant already a member of the group");
    error.statusCode = 409;
    throw error;
  }

  const joinRequest = await db.GroupJoinRequest.findOne({
    where: { group_id: groupId, participant_id: participantId },
  });

  if (!joinRequest) {
    const error = new Error("Join request not found");
    error.statusCode = 404;
    throw error;
  }

  const pendingJoinRequestStatus = await db.GroupJoinRequestStatus.findOne({
    where: { name_english: "pending" },
  });

  console.log("pendingJoinRequestStatus", pendingJoinRequestStatus);

  if (!pendingJoinRequestStatus) {
    const error = new Error("Join request status not found");
    error.statusCode = 404;
    throw error;
  }

  if (joinRequest.join_request_status_id !== pendingJoinRequestStatus.id) {
    const error = new Error("Join request not pending");
    error.statusCode = 409;
    throw error;
  }

  const rejectedJoinRequestStatus = await db.GroupJoinRequestStatus.findOne({
    where: { name_english: "rejected" },
  });

  console.log("rejectedJoinRequestStatus", rejectedJoinRequestStatus);

  if (!rejectedJoinRequestStatus) {
    const error = new Error("Join request status not found");
    error.statusCode = 404;
    throw error;
  }

  if (joinRequest.join_request_status_id === rejectedJoinRequestStatus.id) {
    const error = new Error("Join request already rejected");
    error.statusCode = 409;
    throw error;
  }

  const transaction = await db.sequelize.transaction();

  try {
    joinRequest.join_request_status_id = rejectedJoinRequestStatus.id;
    await joinRequest.save({ transaction });

    console.log("joinRequest", joinRequest);

    await transaction.commit();
    console.log("----- End of rejectGroupJoinRequestService -----");
  } catch (error) {
    console.log("rejectGroupJoinRequestService error", error);
    await transaction.rollback();
    throw error;
  }

  const rejectGroupJoinRequestNotificationMessage = {
    title: `تم رفض طلب الانضمام للمجموعة ${groupDetails.groupName}`,
    message: `تم رفض طلب انضمامك لمجموعة تحفيظ القرآن الكريم ${responseMessage}`,
    externalIds: [participantDetails.userId.toString()],
  };

  console.log(
    "rejectGroupJoinRequestNotificationMessage",
    rejectGroupJoinRequestNotificationMessage
  );

  const sendNotificationsResponse = await sendNotificationsUtil(
    rejectGroupJoinRequestNotificationMessage
  );

  if (sendNotificationsResponse.status !== 200) {
    const error = new Error(
      `Failed to send notification, ${sendNotificationsResponse?.response?.data?.message}`
    );
    error.statusCode = sendNotificationsResponse.status;
    throw error;
  }
};

module.exports = rejectGroupJoinRequestService;
