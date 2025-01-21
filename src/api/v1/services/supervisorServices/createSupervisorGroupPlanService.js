const db = require("./../../../../../models/index.js");

const createSupervisorGroupPlanService = async (
  groupPlanData,
  groupDetails
) => {
  console.log("===== createSupervisorGroupPlanService =====");

  console.log("groupPlanData", groupPlanData);
  console.log("groupDetails", groupDetails);

  const groupPlan = await db.GroupWeeklyPlan.findOne({
    where: {
      id: groupDetails.groupId,
      weekNumber: groupPlanData.weekNumber,
    },
  });

  if (groupPlan) {
    const error = new Error("Group plan already exists");
    error.statusCode = 400;
    throw error;
  }

  const pendingGroupWeeklyPlanStatus = await db.GroupWeeklyPlanStatus.findOne({
    where: {
      status: "pending",
    },
  });

  const createdGroupPlan = await db.GroupWeeklyPlan.create({
    groupId: groupDetails.groupId,
    weekNumber: groupPlanData.weekNumber,
    startWeekDayDate: groupPlanData.startWeekDayDate,
  });

  if (!createdGroupPlan) {
    const error = new Error("Group plan not created");
    error.statusCode = 500;
    throw error;
  }

  console.log("===== End of createSupervisorGroupPlanService =====");
  return;
};

module.exports = createSupervisorGroupPlanService;
