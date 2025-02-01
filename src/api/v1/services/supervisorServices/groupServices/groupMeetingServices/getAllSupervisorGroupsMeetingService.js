const db = require("./../../../../../../../models/index.js");
const { Op } = require("sequelize");

const buildWhereClause = (searchParams) => {
  const whereClause = {};

  if (searchParams.id) {
    whereClause.id = searchParams.id;
  }

  if (searchParams.groupName) {
    whereClause.group_name = {
      [Op.like]: `%${searchParams.groupName}%`,
    };
  }

  return whereClause;
};
const getAllSupervisorGroupsMeetingService = async (
  getAllSupervisorGroupsData,
  supervisorDetails,
  searchParams = {}
) => {
  console.log("\n------ getAllSupervisorGroupsMeetingService ------\n");

  console.log("searchParams:", searchParams);

  console.log("getAllSupervisorGroupsData", getAllSupervisorGroupsData);

  const page = parseInt(searchParams.page, 10) || 1;
  const limit = parseInt(searchParams.limit, 10) || 10;
  const offset = (page - 1) * limit;

  const { supervisorId } = supervisorDetails;

  const activeGroupStatus = await db.GroupStatus.findOne({
    where: {
      status_name_en: "active",
    },
  });

  if (!activeGroupStatus) {
    const error = new Error("Group status not found");
    error.statusCode = 404;
    throw error;
  }

  const whereClause = buildWhereClause(searchParams);

  console.log("whereClause:", whereClause);

  const totalNumberOfSupervisorGroups = await db.MemorizationGroup.count({
    where: {
      supervisor_id: supervisorId,
      group_status_id: activeGroupStatus.id,
      ...whereClause,
    },
  });

  const totalPages = Math.ceil(totalNumberOfSupervisorGroups / limit);

  if (page > totalPages && totalPages > 0) {
    throw new Error("Page number exceeds total available pages.");
  }

  const activeGroupPlanStatus = await db.GroupPlanStatus.findOne({
    where: {
      name_en: "active",
    },
  });

  if (!activeGroupPlanStatus) {
    const error = new Error("Active group plan status not found");
    error.statusCode = 404;
    throw error;
  }

  const sortOrder = (searchParams.sortOrder || "ASC").toUpperCase();
  console.log("sortOrder:", sortOrder);
  const supervisorGroups = await db.MemorizationGroup.findAll({
    where: {
      supervisor_id: supervisorId,
      group_status_id: activeGroupStatus.id,
      ...whereClause,
    },
    include: [
      {
        model: db.Day,
        through: db.DayMemorizationGroup,
      },
      {
        model: db.GroupPlan,
        where: {
          group_plan_status_id: activeGroupPlanStatus.id,
          dayDate: {
            [Op.gte]: new Date(),
          },
        },
        order: [["dayDate", "DESC"]],
        limit: 1,
        required: false,
      },
    ],
    offset: offset,
    limit: limit,
    order: [["createdAt", sortOrder]],
  });

  if (!supervisorGroups) {
    const error = new Error("No groups found");
    error.statusCode = 404;
    throw error;
  }

  const supervisorGroupsMeeting = {
    supervisorGroups,
    supervisorGroupsMetaData: {
      limit: limit,
      currentPage: page,
      totalPages: totalPages,
      totalRecords: totalNumberOfSupervisorGroups,
    },
  };
  return supervisorGroupsMeeting;
};

module.exports = getAllSupervisorGroupsMeetingService;
