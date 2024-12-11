const db = require("../../../../../models/index.js");

const getSupervisorByUserIdService = async (
  getSupervisorByUserIdServiceData
) => {
  const { userId } = getSupervisorByUserIdServiceData;
  const supervisorData = await db.Supervisor.findOne({
    where: {
      userId: userId,
    },
  });

  if (!supervisorData) {
    const error = new Error("Supervisor not found");
    error.status = 404;
    throw error;
  }

  return supervisorData;
};

module.exports = getSupervisorByUserIdService;
