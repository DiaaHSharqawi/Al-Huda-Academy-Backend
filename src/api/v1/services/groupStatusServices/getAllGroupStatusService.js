const db = require("../../../../../models/index.js");

const getAllGroupStatusService = async () => {
  const groupStatus = await db.GroupStatus.findAll({});

  if (!groupStatus) {
    const error = new Error("No group status found");
    error.statusCode = 404;
    throw error;
  }

  return groupStatus;
};

module.exports = getAllGroupStatusService;
