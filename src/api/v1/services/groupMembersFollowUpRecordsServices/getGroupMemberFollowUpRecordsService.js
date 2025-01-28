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

  const { dayDate } = searchParams;

  const dayDateToUse = dayDate || newestDayDate;

  const groupMemberFollowUpRecords =
    (await db.GroupMembersFollowUpRecord.findOne({
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
        // Sort ContentToMemorize and ContentToReview by Surah.id
        [db.GroupPlan, db.ContentToMemorize, db.Surah, "id", "ASC"],
        [db.GroupPlan, db.ContentToReview, db.Surah, "id", "ASC"],
      ],
    })) || [];

  const groupPlans = await db.GroupPlan.findAll({
    where: { groupId },
  });

  if (!groupPlans || groupPlans.length === 0) {
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
    totalGroupPlans: groupPlans.length,
    newestDayDate,
    navigation: {
      previous: previousDayDate,
      next: nextDayDate,
    },
  };

  console.log("\n------ End of getGroupMemberFollowUpRecordsService ------\n");

  return { groupMemberFollowUpRecordsMetadata, groupMemberFollowUpRecords };
};

module.exports = getGroupMemberFollowUpRecordsService;
