const db = require("../../../../../models/index.js");

const getSupervisorRequestRegistrationDetailsService = async (
  supervisorRequestRegistrationDetailsData
) => {
  console.log(
    `\n ---------- Supervisor Request Registration Details Service ---------- \n`
  );

  console.log(
    "supervisorRequestRegistrationDetailsData 1:",
    supervisorRequestRegistrationDetailsData
  );

  const { supervisorId } = supervisorRequestRegistrationDetailsData;

  const supervisorRequestsRegistration = await db.Supervisor.findOne({
    where: {
      id: supervisorId,
    },
    include: [
      {
        model: db.User,
        attributes: ["email", "isActive", "createdAt"],
      },
      {
        model: db.Juza,
        through: { attributes: [] },
      },
      {
        model: db.SupervisorCertificate,
      },
      {
        model: db.Gender,
      },
    ],
    required: false,
  });

  if (!supervisorRequestsRegistration) {
    const error = new Error("Supervisor request registration not found");
    error.statusCode = 404;
    throw error;
  }

  console.log("supervisorRequestsRegistration:");
  console.dir(supervisorRequestsRegistration, { depth: 1 });

  return supervisorRequestsRegistration;
};

module.exports = getSupervisorRequestRegistrationDetailsService;
