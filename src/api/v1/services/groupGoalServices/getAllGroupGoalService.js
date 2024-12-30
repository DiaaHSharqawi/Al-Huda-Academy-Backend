const db = require("./../../../../../models/index.js");

const getAllGroupGoalService = () => {
  const groupGoals = db.GroupGoal.findAll();

  if (!groupGoals) {
    const error = new Error("No group goals found.");
    error.statusCode = 404;
    throw error;
  }

  return groupGoals;
};

module.exports = getAllGroupGoalService;
