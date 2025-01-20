const db = require("./../../../../../models/index.js");

const getAllGroupDayService = async (groupDetails) => {
  console.log("===== getAllGroupDayService =====");

  console.log("groupDetails", groupDetails);

  const { groupId } = groupDetails;

  const supervisorGroupDays = await db.DayMemorizationGroup.findAll({
    where: {
      group_id: groupId,
    },
  });

  console.log("supervisorGroupDays", supervisorGroupDays);

  if (!supervisorGroupDays) {
    const error = new Error("Group days not found");
    error.statusCode = 404;
    throw error;
  }
  console.log("===== End of getAllGroupDayService =====");

  return supervisorGroupDays;
};

module.exports = getAllGroupDayService;
