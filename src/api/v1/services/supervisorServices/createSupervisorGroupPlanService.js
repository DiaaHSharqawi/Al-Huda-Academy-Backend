const db = require("./../../../../../models/index.js");
const { Op } = require("sequelize");

const createSupervisorGroupPlanService = async (
  groupPlanData,
  groupDetails
) => {
  console.log("===== createSupervisorGroupPlanService =====");

  console.log("groupPlanData", groupPlanData);
  console.log("groupDetails", groupDetails);

  console.log(
    " groupPlanData.dayDate.split(T)[0]",
    groupPlanData.dayDate.split("T")[0]
  );

  const groupPlan = await db.GroupPlan.findOne({
    where: {
      groupId: groupDetails.groupId,
      dayDate: {
        [db.Sequelize.Op.eq]: groupPlanData.dayDate.split("T")[0],
      },
    },
  });

  console.log("groupPlan---->", groupPlan);

  if (groupPlan) {
    const error = new Error("Group plan already exists");
    error.statusCode = 400;
    throw error;
  }

  const pendingGroupPlanStatus = await db.GroupPlanStatus.findOne({
    where: {
      name_en: "pending",
    },
  });

  const createdGroupPlan = await db.GroupPlan.create({
    groupId: groupDetails.groupId,
    dayDate: groupPlanData.dayDate,
    group_plan_status_id: pendingGroupPlanStatus.id,
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
