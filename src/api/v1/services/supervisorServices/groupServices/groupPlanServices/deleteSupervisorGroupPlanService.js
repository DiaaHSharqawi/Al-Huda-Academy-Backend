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

  if (!existingGroupPlan) {
    console.log("GroupPlan not found, skipping deletion.");
    return;
  }

  const transaction = await db.sequelize.transaction();
  try {
    // Delete dependent records first to prevent FK constraint errors
    await db.GroupMembersFollowUpRecord.destroy({
      where: { group_plan_id: groupPlanId },
      transaction,
    });

    await db.ContentToMemorize.destroy({
      where: { groupPlanId },
      transaction,
    });

    await db.ContentToReview.destroy({
      where: { groupPlanId },
      transaction,
    });

    // Now delete the group plan
    await existingGroupPlan.destroy({ transaction });

    await transaction.commit();

    console.log("===== End of deleteSupervisorGroupPlanService =====");
  } catch (error) {
    await transaction.rollback();
    console.error("Error deleting GroupPlan:", error);
    throw error;
  }
};

module.exports = deleteSupervisorGroupPlanService;
