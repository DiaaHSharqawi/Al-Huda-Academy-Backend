const asyncHandler = require("express-async-handler");
const rejectSupervisorRequestRegistrationService = require("./../../services/adminServices/rejectSupervisorRequestRegistrationService.js");

const rejectSupervisorRequestRegistrationController = asyncHandler(
  async (req, res) => {
    console.log("rejectSupervisorRequestRegistrationController");
    const { supervisorId } = req.params;
    const rejectSupervisorRequestRegistrationData = req.body;

    console.log("rejectSupervisorRequestRegistrationData");
    console.log(supervisorId, rejectSupervisorRequestRegistrationData);

    await rejectSupervisorRequestRegistrationService(
      supervisorId,
      rejectSupervisorRequestRegistrationData
    );

    res.status(200).json({
      success: true,
      message: "Supervisor request registration rejected successfully",
    });
  }
);

module.exports = rejectSupervisorRequestRegistrationController;
