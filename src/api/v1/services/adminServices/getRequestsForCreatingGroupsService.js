const db = require("../../../../../models/index.js");

const buildWhereClause = async (searchParams) => {
  const whereClause = {};

  if (searchParams.participants_level_id) {
    console.log(
      "searchParams.participants_level_id:",
      searchParams.participants_level_id
    );
    whereClause.participants_level_id = searchParams.participants_level_id;
  }

  if (searchParams.gender_id) {
    whereClause.gender_id = searchParams.gender_id;
  }

  if (searchParams.group_goal_id) {
    whereClause.group_goal_id = searchParams.group_goal_id;
  }

  return whereClause;
};
const getRequestsForCreatingGroupsService = async (searchParams) => {
  console.log("searchParams:", searchParams);

  const whereClause = await buildWhereClause(searchParams);

  console.log("whereClause:", whereClause);

  const page = parseInt(searchParams.page, 10) || 1;
  const limit = parseInt(searchParams.limit, 10) || 3;
  const offset = (page - 1) * limit;

  const totalNumberOfRequestsForCreatingGroups =
    await db.MemorizationGroup.count({
      where: whereClause,
    });
  const totalPages = Math.ceil(totalNumberOfRequestsForCreatingGroups / limit);

  if (page > totalPages) {
    const error = new Error("Page number exceeds total available pages.");
    error.statusCode = 400;
    throw error;
  }

  const sortOrder = (searchParams.sortOrder || "ASC").toUpperCase();

  const PENDING_STATUS_ID = 5; // pending status ID
  const requestsForCreatingGroups = await db.MemorizationGroup.findAll({
    where: {
      group_status_id: PENDING_STATUS_ID,
      ...whereClause,
    },
    include: [
      {
        model: db.Supervisor,
      },
    ],
    raw: true,
    nest: true,
    limit,
    offset,
    required: false,

    order: [["createdAt", sortOrder]],
  });

  // console.log("requestsForCreatingGroups:", requestsForCreatingGroups);
  if (!requestsForCreatingGroups) {
    const error = new Error("No requests found");
    error.statusCode = 404;
    throw error;
  }

  return {
    requestsForCreatingGroups,
    metaData: {
      totalNumberOfRequestsForCreatingGroups,
      totalPages,
      page,
      limit,
    },
  };
};

module.exports = getRequestsForCreatingGroupsService;
