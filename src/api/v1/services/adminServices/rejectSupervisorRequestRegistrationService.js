const db = require("./../../../../../models/index.js");

const rejectSupervisorRequestRegistrationService = async (
  supervisorId,
  rejectSupervisorRequestRegistrationData
) => {
  const { accountStatusId } = rejectSupervisorRequestRegistrationData;

  console.log("rejectSupervisorRequestRegistrationService");
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

  if (!supervisor) {
    const error = new Error("Supervisor not found");
    error.statusCode = 404;
    throw error;
  }

  console.log(supervisor.User.AccountStatus.englishName);

  if (supervisor.User.AccountStatus.englishName !== "pending") {
    const error = new Error("Account status is not pending");
    error.statusCode = 404;
    throw error;
  }

  const accountStatus = await db.AccountStatus.findByPk(accountStatusId);
  if (!accountStatus) {
    const error = new Error("Account status not found");
    error.statusCode = 404;
    throw error;
  }

  if (accountStatus.englishName !== "rejected") {
    const error = new Error("Account status is not rejected");
    error.statusCode = 400;
    throw error;
  }

  await db.User.update(
    {
      accountStatusId: accountStatusId,
    },
    {
      where: { id: supervisor.User.id },
    }
  );
};
module.exports = rejectSupervisorRequestRegistrationService;
