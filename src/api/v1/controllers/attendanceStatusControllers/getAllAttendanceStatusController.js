const asyncHandler = require("express-async-handler");

const getAllAttendanceStatusService = require("../../services/attendanceStatusServices/getAllAttendanceStatusService.js");

const getAllAttendanceStatusController = asyncHandler(async (req, res) => {
  console.log("\n------ getAllAttendanceStatusController ------\n");

  const attendanceStatus = await getAllAttendanceStatusService();

  res.status(200).json({
    success: true,
    message: "Attendance status fetched successfully",
    attendanceStatus: attendanceStatus,
  });
});

module.exports = getAllAttendanceStatusController;
