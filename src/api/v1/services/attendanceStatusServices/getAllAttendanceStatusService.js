const db = require("./../../../../../models/index.js");

const getAllAttendanceStatusService = async () => {
  const attendanceStatus = await db.AttendanceStatus.findAll({});

  if (!attendanceStatus) {
    const error = new Error("No attendance status found.");
    error.statusCode = 404;
    throw error;
  }

  return attendanceStatus;
};

module.exports = getAllAttendanceStatusService;
