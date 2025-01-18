const asyncHandler = require("express-async-handler");

const getAllSupervisorRequestRegistrationService = require("./../../services/adminServices/getAllSupervisorRequestRegistrationService.js");

const getAllSupervisorRequestRegistrationController = asyncHandler(
  async (req, res) => {
    console.log(
      `\n ---------- Supervisor Request Registration Controller ---------- \n`
    );

    const supervisorRequestsRegistrationData = req.query;

    const {
      supervisorRequestsRegistration,
      supervisorRequestsRegistrationMetaData,
    } = await getAllSupervisorRequestRegistrationService(
      supervisorRequestsRegistrationData
    );

    res.status(200).json({
      success: true,
      message: `Successfully retrieved supervisor request registration`,
      supervisorRequestsRegistration: supervisorRequestsRegistration,
      supervisorRequestsRegistrationMetaData:
        supervisorRequestsRegistrationMetaData,
    });
  }
);

module.exports = getAllSupervisorRequestRegistrationController;
