const asyncHandler = require("express-async-handler");
const getSupervisorBySupervisorIdService = require("../../services/supervisorServices/getSupervisorBySupervisorIdService");

const getSupervisorBySupervisorIdController = asyncHandler(async (req, res) => {
  const getSupervisorBySupervisorIdServiceData = req.body;
  console.log("getSupervisorBySupervisorIdServiceData");
  console.dir(getSupervisorBySupervisorIdServiceData, { depth: null });

  const supervisorDetails = await getSupervisorBySupervisorIdService(
    getSupervisorBySupervisorIdServiceData
  );
  console.log("supervisorDetails");
  console.dir(supervisorDetails, { depth: null });

  res.status(200).json({
    success: true,
    message: "Supervisor Details",
    supervisorDetails,
  });
});

module.exports = getSupervisorBySupervisorIdController;
