const db = require("../../../../../../../models/index.js");
const { Op } = require("sequelize");

const updateSupervisorGroupPlanService = async (
  groupPlanDetails,
  groupPlanData,
  groupDetails
) => {
  console.log("===== updateSupervisorGroupPlanService =====");

  console.log("groupPlanDetails", groupPlanDetails);
  console.log("groupPlanData", groupPlanData);
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
    await existingGroupPlan.update(
      {
        dayDate: groupPlanData.dayDate ?? existingGroupPlan.dayDate,
        note: groupPlanData.note ?? existingGroupPlan.note,
      },
      { transaction }
    );

    if (existingGroupPlan.dayDate === groupDetails.dayDate) {
      const error = new Error("cannot update group plan for existing day plan");
      error.statusCode = 400;
      throw error;
    }

    if (groupPlanData.contentToMemorize) {
      await db.ContentToMemorize.destroy({
        where: { groupPlanId: groupPlanId },
        transaction,
      });

      await db.ContentToMemorize.bulkCreate(
        groupPlanData.contentToMemorize.map((content) => ({
          ...content,
          groupPlanId,
        })),
        { transaction }
      );
    }

    if (groupPlanData.contentToReview) {
      await db.ContentToReview.destroy({
        where: { groupPlanId: groupPlanId },
        transaction,
      });

      await db.ContentToReview.bulkCreate(
        groupPlanData.contentToReview.map((content) => ({
          ...content,
          groupPlanId,
        })),
        { transaction }
      );
    }

    await transaction.commit();
    console.log("===== End of updateSupervisorGroupPlanService =====");
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

module.exports = updateSupervisorGroupPlanService;
