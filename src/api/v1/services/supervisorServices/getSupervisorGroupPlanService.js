const db = require("./../../../../../models/index.js");

const getSupervisorGroupPlanService = async (
  groupDetails,
  searchParams = {}
) => {
  console.log("===== getSupervisorGroupPlanService =====");

  const { groupId } = groupDetails;

  console.log("groupId", groupId);

  const page = parseInt(searchParams.page, 10) || 1;
  const limit = parseInt(searchParams.limit, 10) || 10;
  const offset = (page - 1) * limit;

  console.log("page", page);
  console.log("limit", limit);
  console.log("offset", offset);

  const totalNumberOfGroupPlan = await db.GroupWeeklyPlan.count({
    where: {
      groupId: groupId,
    },
  });

  const totalPages = Math.ceil(totalNumberOfGroupPlan / limit);

  if (page > totalPages) {
    const error = new Error("Page number exceeds total available pages.");
    error.statusCode = 400;
    throw error;
  }

  console.log("searchParams.sortOrder :", searchParams.sortOrder);

  const sortOrder = (searchParams.sortOrder || "ASC").toUpperCase();

  const groupPlan = await db.GroupWeeklyPlan.findAll({
    where: {
      groupId: groupId,
    },
    limit,
    offset,
    order: [["createdAt", sortOrder]],
  });

  if (!groupPlan) {
    const error = new Error("Group plan not found");
    error.statusCode = 404;
    throw error;
  }

  return {
    groupPlan: groupPlan,
    groupPlanMetaData: {
      totalNumberOfGroupPlan,
      totalPages,
      page,
      limit,
    },
  };
};

module.exports = getSupervisorGroupPlanService;
