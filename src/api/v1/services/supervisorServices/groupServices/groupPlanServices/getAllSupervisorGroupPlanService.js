const db = require("../../../../../../../models/index.js");

const getAllSupervisorGroupPlanService = async (
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

  let whereClause = {};

  if (searchParams.fromDate && searchParams.toDate) {
    whereClause = {
      ...whereClause,
      dayDate: {
        [db.Sequelize.Op.between]: [searchParams.fromDate, searchParams.toDate],
      },
    };
  }

  const totalNumberOfGroupPlan = await db.GroupPlan.count({
    where: {
      groupId: groupId,
      ...whereClause,
    },
  });

  const totalPages = Math.ceil(totalNumberOfGroupPlan / limit);

  if (page > totalPages) {
    const error = new Error("Page number exceeds total available pages.");
    error.statusCode = 400;
    throw error;
  }

  console.log("searchParams.sortOrder :", searchParams.sortOrder);

  const sortOrder = (searchParams.sortOrder || "DESC").toUpperCase();

  const groupPlan = await db.GroupPlan.findAll({
    where: {
      groupId: groupId,
      ...whereClause,
    },
    include: [
      {
        model: db.GroupPlanStatus,
      },
    ],
    limit,
    offset,
    order: [["dayDate", sortOrder]],
  });

  if (!groupPlan) {
    const error = new Error("Group plan not found");
    error.statusCode = 404;
    throw error;
  }

  console.log("===== End getSupervisorGroupPlanService =====");

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

module.exports = getAllSupervisorGroupPlanService;
