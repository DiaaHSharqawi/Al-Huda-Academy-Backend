const db = require("./../../../../../models/index.js");

const getAllGroupPlansService = async () => {
  console.log("===== getSupervisorGroupPlanService =====");

  const groupPlans = await db.GroupPlanStatus.findAll({});

  if (!groupPlans) {
    const error = new Error("Group plans not found");
    error.statusCode = 404;
    throw error;
  }

  console.log("===== End of getSupervisorGroupPlanService =====");

  return groupPlans;
};

module.exports = getAllGroupPlansService;
