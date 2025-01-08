const db = require("../../../../../models/index.js");

const getAllAccountStatusService = async () => {
  const accountStatuses = await db.AccountStatus.findAll();

  if (!accountStatuses) {
    const error = new Error("No account statuses found");
    error.statusCode = 404;
    throw error;
  }

  return accountStatuses;
};

module.exports = getAllAccountStatusService;
