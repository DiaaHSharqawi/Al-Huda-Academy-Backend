const db = require("./../../../../../models/index.js");
const getSupervisorBySupervisorIdService = async (
  getSupervisorBySupervisorIdServiceData
) => {
  console.log("getSupervisorBySupervisorIdServiceData");
  console.dir(getSupervisorBySupervisorIdServiceData, { depth: null });

  const { supervisorId } = getSupervisorBySupervisorIdServiceData;
  console.log("supervisorId");

  const supervisorDetails = await db.Supervisor.findOne({
    where: { id: supervisorId },
  });

  if (!supervisorDetails) {
    const error = new Error("Supervisor not found");
    error.statusCode = 404;
    throw error;
  }

  return supervisorDetails;
};

module.exports = getSupervisorBySupervisorIdService;
