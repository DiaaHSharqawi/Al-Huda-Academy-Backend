const asyncHandler = require("express-async-handler");

const getAllSupervisorGroupsMeetingService = require("./../../../services/supervisorServices/groupServices/groupMeetingServices/getAllSupervisorGroupsMeetingService.js");

const getAllSupervisorGroupsMeetingController = asyncHandler(
  async (req, res) => {
    console.log("\n------ getAllSupervisorGroupsMeetingController ------\n");

    console.log("req.body:", req.body);

    const getAllSupervisorGroupsData = req.body;
    const searchParams = req.query;

    console.log("getAllSupervisorGroupsData", getAllSupervisorGroupsData);

    const { supervisorDetails } = req.data;

    const supervisorGroupsMeeting = await getAllSupervisorGroupsMeetingService(
      getAllSupervisorGroupsData,
      supervisorDetails,
      searchParams
    );

    res.status(200).json({
      success: true,
      message: "All supervisor groups fetched successfully",
      ...supervisorGroupsMeeting,
    });
  }
);

module.exports = getAllSupervisorGroupsMeetingController;
