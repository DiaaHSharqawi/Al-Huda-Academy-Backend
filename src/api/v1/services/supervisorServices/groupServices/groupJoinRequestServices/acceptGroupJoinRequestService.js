const db = require("./../../../../../../../models/index.js");
const sendNotificationsUtil = require("./../../../../utils/notifications/sendNotificationsUtil.js");

const acceptGroupJoinRequestService = async (
  supervisorDetails,
  groupDetails,
  participantDetails
) => {
  console.log("----- acceptGroupJoinRequestService -----");

  const { groupId } = groupDetails;
  const { supervisorId } = supervisorDetails;
  const { participantId } = participantDetails;

  const participantMemberDetails = await db.GroupMembers.findOne({
    where: { group_id: groupId, participant_id: participantId },
  });

  if (participantMemberDetails) {
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

  const approvedJoinRequestStatus = await db.GroupJoinRequestStatus.findOne({
    where: { name_english: "approved" },
  });

  console.log("approvedJoinRequestStatus", approvedJoinRequestStatus);

  if (!approvedJoinRequestStatus) {
    const error = new Error("Join request status not found");
    error.statusCode = 404;
    throw error;
  }

  if (joinRequest.join_request_status_id === approvedJoinRequestStatus.id) {
    const error = new Error("Join request already approved");
    error.statusCode = 409;
    throw error;
  }

  const transaction = await db.sequelize.transaction();

  try {
    joinRequest.join_request_status_id = approvedJoinRequestStatus.id;
    await joinRequest.save({ transaction });

    console.log("joinRequest", joinRequest);

    await db.GroupMembers.create(
      {
        group_id: groupId,
        supervisor_id: supervisorId,
        participant_id: participantId,
      },
      { transaction }
    );

    await transaction.commit();
    console.log("----- End of acceptGroupJoinRequestService -----");
  } catch (error) {
    console.log("acceptGroupJoinRequestService error", error);
    await transaction.rollback();
    throw error;
  }

  const acceptGroupJoinRequestNotificationMessage = {
    title: `تم قبول طلب الانضمام لـ ${groupDetails.groupName}`,
    message: "تمت الموافقة على طلب الانضمام لمجموعة تحفيظ القرآن الكريم",
    externalIds: [participantDetails.userId.toString()],
  };

  const sendNotificationsResponse = await sendNotificationsUtil(
    acceptGroupJoinRequestNotificationMessage
  );

  if (sendNotificationsResponse.status !== 200) {
    const error = new Error(
      `Failed to send notification, ${sendNotificationsResponse?.response?.data?.message}`
    );
    error.statusCode = sendNotificationsResponse.status;
    throw error;
  }
};

module.exports = acceptGroupJoinRequestService;
