const db = require("../../../../../../../models/index.js");

const getAllSupervisorGroupPlanDatesService = async (groupDetails) => {
  console.log("===== getSupervisorGroupPlanService =====");

  const { groupId } = groupDetails;

  console.log("groupId", groupId);

  const groupPlan = await db.GroupPlan.findAll({
    where: {
      groupId: groupId,
    },

    order: [
      [db.Sequelize.fn("YEAR", db.Sequelize.col("dayDate")), "ASC"],
      [db.Sequelize.fn("MONTH", db.Sequelize.col("dayDate")), "ASC"],
      [db.Sequelize.fn("DAY", db.Sequelize.col("dayDate")), "ASC"],
    ],
  });

  if (!groupPlan) {
    const error = new Error("Group plan not found");
    error.statusCode = 404;
    throw error;
  }

  console.log("===== End getSupervisorGroupPlanService =====");

  return {
    groupPlanDates: groupPlan,
  };
};

module.exports = getAllSupervisorGroupPlanDatesService;
