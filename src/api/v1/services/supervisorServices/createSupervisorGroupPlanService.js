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
  const transaction = await db.sequelize.transaction();

  let groupPlanId;

  try {
    const createdGroupPlan = await db.GroupPlan.create(
      {
        groupId: groupDetails.groupId,
        dayDate: groupPlanData.dayDate,
        group_plan_status_id: pendingGroupPlanStatus.id,
        note: groupPlanData.note,
      },
      { transaction }
    );

    groupPlanId = createdGroupPlan.id;

    if (!createdGroupPlan) {
      const error = new Error("Group plan not created");
      error.statusCode = 500;
      throw error;
    }

    const surahIds = [
      ...new Set([
        ...groupPlanData.contentToMemorize.map((content) => content.surahId),
        ...groupPlanData.contentToReview.map((content) => content.surahId),
      ]),
    ];

    const surahs = await db.Surah.findAll({
      where: {
        id: {
          [Op.in]: surahIds,
        },
      },
    });

    if (surahs.length !== surahIds.length) {
      const error = new Error("Invalid surah id");
      error.statusCode = 400;
      throw error;
    }

    const contentToMemorize = groupPlanData.contentToMemorize.map(
      (content) => ({
        ...content,
        groupPlanId: groupPlanId,
      })
    );

    const contentToReview = groupPlanData.contentToReview.map((content) => ({
      ...content,
      groupPlanId: groupPlanId,
    }));

    console.log("contentToMemorize", contentToMemorize);
    console.log("contentToReview", contentToReview);

    if (contentToMemorize.length > 0) {
      await db.ContentToMemorize.bulkCreate(contentToMemorize, { transaction });
    }

    if (contentToReview.length > 0) {
      await db.ContentToReview.bulkCreate(contentToReview, { transaction });
    }

    await transaction.commit();
    console.log("===== End of createSupervisorGroupPlanService =====");
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

module.exports = createSupervisorGroupPlanService;
