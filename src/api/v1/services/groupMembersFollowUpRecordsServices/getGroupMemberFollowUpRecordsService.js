const db = require("../../../../../models");

const getGroupMemberFollowUpRecordsService = async (
  groupDetails,
  groupMemberDetails,
  searchParams = {}
) => {
  console.log("\n------ getGroupMemberFollowUpRecordsService ------\n");

  const { groupId } = groupDetails;
  const { groupMemberId } = groupMemberDetails;

  console.log("groupId", groupId);
  console.log("groupMemberId", groupMemberId);

  const newestDayDate = await db.GroupPlan.max("dayDate", {
    where: { groupId },
  });

  if (!newestDayDate) {
    const error = new Error("No valid dayDate found for this group");
    error.statusCode = 404;
    throw error;
  }

  console.log("Newest dayDate:", newestDayDate);

  console.log("searchParams", searchParams);

  const { dayDate } = searchParams;

  const dayDateToUse = dayDate ?? newestDayDate;

  console.log("dayDateToUse", dayDateToUse);

  const groupMemberFollowUpRecords =
    await db.GroupMembersFollowUpRecord.findOne({
      where: { group_member_id: groupMemberId },
      include: [
        { model: db.AttendanceStatus },
        {
          model: db.GroupPlan,
          where: { dayDate: dayDateToUse },
          include: [
            {
              model: db.ContentToMemorize,
              include: [{ model: db.Surah }],
            },
            {
              model: db.ContentToReview,
              include: [{ model: db.Surah }],
            },
          ],
        },
      ],
      order: [
        [db.GroupPlan, db.ContentToMemorize, db.Surah, "id", "ASC"],
        [db.GroupPlan, db.ContentToReview, db.Surah, "id", "ASC"],
      ],
    });

  const groupPlan = await db.GroupPlan.findOne({
    where: { groupId, dayDate: dayDateToUse },
    include: [
      {
        model: db.ContentToMemorize,
        include: [{ model: db.Surah }],
      },
      {
        model: db.ContentToReview,
        include: [{ model: db.Surah }],
      },
    ],
  });

  if (!groupPlan || groupPlan.length === 0) {
    const error = new Error("Group plans not found");
    error.statusCode = 404;
    throw error;
  }

  const previousDayDate = await db.GroupPlan.max("dayDate", {
    where: {
      groupId,
      dayDate: { [db.Sequelize.Op.lt]: dayDateToUse },
    },
  });

  const nextDayDate = await db.GroupPlan.min("dayDate", {
    where: {
      groupId,
      dayDate: { [db.Sequelize.Op.gt]: dayDateToUse },
    },
  });

  const groupMemberFollowUpRecordsMetadata = {
    totalGroupPlans: groupPlan.length,
    dayDateToUse: dayDateToUse,
    navigation: {
      previous: previousDayDate
        ? new Date(previousDayDate).toISOString()
        : null,
      next: nextDayDate ? new Date(nextDayDate) : null,
    },
  };

  console.log("\n------ End of getGroupMemberFollowUpRecordsService ------\n");

  return {
    groupMemberFollowUpRecordsMetadata,
    groupMemberFollowUpRecords,
    groupPlan,
  };
};

module.exports = getGroupMemberFollowUpRecordsService;
