const asyncHandler = require("express-async-handler");
const axios = require("axios");

const acceptSupervisorRequestRegistrationService = require("./../../services/adminServices/acceptSupervisorRequestRegistrationService.js");

const acceptSupervisorRequestRegistrationController = asyncHandler(
  async (req, res) => {
    console.log("acceptSupervisorRequestRegistrationController");

    const { supervisorId } = req.params;
    const acceptSupervisorRequestRegistrationData = req.body;

    console.log("acceptSupervisorRequestRegistrationData");
    console.log(supervisorId, acceptSupervisorRequestRegistrationData);

    await acceptSupervisorRequestRegistrationService(
      supervisorId,
      acceptSupervisorRequestRegistrationData
    );

    res.status(200).json({
      success: true,
      message: "Supervisor request registration accepted successfully",
    });
  }
);
module.exports = acceptSupervisorRequestRegistrationController;
