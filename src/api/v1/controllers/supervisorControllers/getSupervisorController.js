const asyncHandler = require("express-async-handler");
const getSupervisorByUserIdService = require("../../services/supervisorServices/getSupervisorByUserIdService");

const getSupervisorByUserIdController = asyncHandler(async (req, res) => {
  const getSupervisorByUserIdServiceData = req.body;
  console.log("getSupervisorByUserIdServiceData");
  console.dir(getSupervisorByUserIdServiceData, { depth: null });

  const supervisorDetails = await getSupervisorByUserIdService(
    getSupervisorByUserIdServiceData
  );

  console.log("supervisorDetails");
  console.dir(supervisorDetails, { depth: null });

  res.status(200).json({
    success: true,
    message: "Supervisor Details",
    supervisorDetails,
  });
});

module.exports = getSupervisorByUserIdController;
