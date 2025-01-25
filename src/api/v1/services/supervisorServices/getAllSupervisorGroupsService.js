const db = require("../../../../../models/index.js");
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
const getAllSupervisorGroupsService = async (
  getAllSupervisorGroupsData,
  searchParams = {}
) => {
  console.log("\n------ getAllSupervisorGroupsService ------\n");

  console.log("getAllSupervisorGroupsData", getAllSupervisorGroupsData);

  const page = parseInt(searchParams.page, 10) || 1;
  const limit = parseInt(searchParams.limit, 10) || 10;
  const offset = (page - 1) * limit;

  const { supervisorId, groupStatusId } = getAllSupervisorGroupsData;

  const groupStatus = await db.GroupStatus.findByPk(groupStatusId);

  if (!groupStatus) {
    const error = new Error("Group status not found");
    error.statusCode = 404;
    throw error;
  }

  if (groupStatus.status_name_en !== "active") {
    const error = new Error("Group status is not active");
    error.statusCode = 403;
    throw error;
  }

  const supervisorDetails = await db.Supervisor.findByPk(supervisorId);

  if (!supervisorDetails) {
    const error = new Error("Supervisor not found");
    error.statusCode = 404;
    throw error;
  }

  const whereClause = buildWhereClause(searchParams);

  console.log("whereClause:", whereClause);

  const totalNumberOfSupervisorGroups = await db.MemorizationGroup.count({
    where: {
      supervisor_id: supervisorId,
      group_status_id: groupStatusId,
      ...whereClause,
    },
  });

  const totalPages = Math.ceil(totalNumberOfSupervisorGroups / limit);

  if (page > totalPages && totalPages > 0) {
    throw new Error("Page number exceeds total available pages.");
  }

  const supervisorGroups = await db.MemorizationGroup.findAll({
    where: {
      supervisor_id: supervisorId,
      group_status_id: groupStatusId,
      ...whereClause,
    },
    attributes: ["id", "group_name", "group_description"],
    offset: offset,
    limit: limit,
  });

  if (!supervisorGroups) {
    const error = new Error("No groups found");
    error.statusCode = 404;
    throw error;
  }

  return {
    supervisorGroups,
    supervisorGroupsMetaData: {
      currentPage: page,
      totalPages: totalPages,
      totalRecords: totalNumberOfSupervisorGroups,
    },
  };
};

module.exports = getAllSupervisorGroupsService;
