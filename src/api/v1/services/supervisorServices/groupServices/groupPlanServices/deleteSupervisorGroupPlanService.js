const db = require("../../../../../../../models/index.js");

const deleteSupervisorGroupPlanService = async (
  groupPlanDetails,
  groupDetails
) => {
  console.log("===== deleteSupervisorGroupPlanService =====");

  console.log("groupPlanDetails", groupPlanDetails);
  console.log("groupDetails", groupDetails);

  const { groupPlanId } = groupPlanDetails;
  const { groupId } = groupDetails;

  console.log("groupPlanId", groupPlanId);
  console.log("groupId", groupId);

  const existingGroupPlan = await db.GroupPlan.findOne({
    where: {
      groupId: groupId,
      id: groupPlanId,
    },
  });

  const transaction = await db.sequelize.transaction();
  try {
    if (existingGroupPlan) {
      await db.ContentToMemorize.destroy({
        where: { groupPlanId },
        transaction,
      });

      await db.ContentToReview.destroy({
        where: { groupPlanId },
        transaction,
      });

      await existingGroupPlan.destroy({ transaction });
    }

    await transaction.commit();

    console.log("===== End of deleteSupervisorGroupPlanService =====");
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

module.exports = deleteSupervisorGroupPlanService;
