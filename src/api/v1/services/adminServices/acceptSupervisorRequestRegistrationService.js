const db = require("../../../../../models/index.js");

const sendNotificationsUtil = require("../../utils/notifications/sendNotificationsUtil.js");

const acceptSupervisorRequestRegistrationService = async (
  supervisorId,
  acceptSupervisorRequestRegistrationData
) => {
  const { accountStatusId } = acceptSupervisorRequestRegistrationData;

  console.log("acceptSupervisorRequestRegistrationService");
  console.log(supervisorId, accountStatusId);

  const supervisor = await db.Supervisor.findOne({
    where: { id: supervisorId },
    include: [
      {
        model: db.User,
        include: [
          {
            model: db.AccountStatus,
          },
        ],
      },
    ],
    required: false,
  });

  console.log("supervisor", supervisor);

  if (!supervisor) {
    const error = new Error("Supervisor not found");
    error.statusCode = 404;
    throw error;
  }

  console.log(supervisor.User.AccountStatus.englishName);
  if (supervisor.User.AccountStatus.englishName !== "under review") {
    const error = new Error("supervisor account status is not under review");
    error.statusCode = 404;
    throw error;
  }

  const accountStatus = await db.AccountStatus.findByPk(accountStatusId);
  if (!accountStatus) {
    const error = new Error("Account status not found");
    error.statusCode = 404;
    throw error;
  }

  if (accountStatus.englishName !== "active") {
    const error = new Error("Account status is not active");
    error.statusCode = 400;
    throw error;
  }

  console.log("supervisor.User.id", supervisor.User.id);
  console.log("accountStatusId", accountStatusId);

  await db.User.update(
    {
      accountStatusId: accountStatusId,
    },
    {
      where: { id: supervisor.User.id },
    }
  );

  const acceptSupervisorRequestRegistrationNotificationMessage = {
    title: "تم قبول طلب التسجيل",
    message: "تم قبول طلب تسجيلك كمشرف لتحفيظ القرآن الكريم",
    externalIds: supervisor.userId,
  };

  const sendNotificationsResponse = await sendNotificationsUtil(
    acceptSupervisorRequestRegistrationNotificationMessage
  );

  if (sendNotificationsResponse.status !== 200) {
    const error = new Error(
      `Failed to send notification, ${sendNotificationsResponse?.response?.data?.message}`
    );
    error.statusCode = sendNotificationsResponse.status;
    throw error;
  }
};

module.exports = acceptSupervisorRequestRegistrationService;
