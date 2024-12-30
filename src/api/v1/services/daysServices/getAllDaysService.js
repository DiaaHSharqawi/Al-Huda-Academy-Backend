const db = require("./../../../../../models/index.js");

const getAllDaysService = async () => {
  const days = await db.Day.findAll();

  if (!days) {
    const error = new Error("No days found");
    error.status = 404;
    throw error;
  }

  return days;
};

module.exports = getAllDaysService;
