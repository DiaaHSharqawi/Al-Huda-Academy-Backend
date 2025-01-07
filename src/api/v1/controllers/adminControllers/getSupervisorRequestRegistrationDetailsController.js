const asyncHandler = require("express-async-handler");
const getSupervisorRequestRegistrationDetailsService = require("./../../services/adminServices/getSupervisorRequestRegistrationDetailsService.js");

const getSupervisorRequestRegistrationDetailsController = asyncHandler(
  async (req, res) => {
    console.log(
      `\n ---------- Supervisor Request Registration Details Controller ---------- \n`
    );

    const supervisorRequestRegistrationDetailsData = req.params;

    const supervisorRequestRegistrationDetails =
      await getSupervisorRequestRegistrationDetailsService(
        supervisorRequestRegistrationDetailsData
      );

    res.status(200).json({
      success: true,
      message: `Successfully retrieved supervisor request registration details`,
      supervisorRequestRegistrationDetails:
        supervisorRequestRegistrationDetails,
    });
  }
);

module.exports = getSupervisorRequestRegistrationDetailsController;
