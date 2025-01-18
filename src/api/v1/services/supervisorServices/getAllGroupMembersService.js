const db = require("../../../../../models/index.js");
const { Op } = require("sequelize");

const buildParticipantsWhereClause = (searchParams) => {
  const whereClause = {};

  if (searchParams.fullName) {
    whereClause.fullName = {
      [Op.like]: `%${searchParams.fullName}%`,
    };
  }

  return whereClause;
};

const getAllGroupMembersService = async (groupId, searchParams = {}) => {
  console.log("\n------ getAllGroupMembersService ------\n");

  console.log("groupId", groupId);

  const participantsWhereClause = buildParticipantsWhereClause(searchParams);

  const page = parseInt(searchParams.page, 10) || 1;
  const limit = parseInt(searchParams.limit, 10) || 3;
  const offset = (page - 1) * limit;

  const totalNumberOfRecords = await db.GroupMembership.count({
    include: [
      {
        model: db.Participant,
        attributes: ["id", "fullName", "profileImage"],
        where: participantsWhereClause,
      },
    ],
  });

  const totalPages = Math.ceil(totalNumberOfRecords / limit);

  if (page > totalPages) {
    const error = new Error("Page number exceeds total available pages.");
    error.statusCode = 400;
    throw error;
  }

  const sortOrder = (searchParams.sortOrder || "ASC").toUpperCase();

  const groupMembers = await db.GroupMembership.findAll({
    where: {
      group_id: groupId,
    },
    include: [
      {
        model: db.Participant,
        attributes: ["id", "fullName", "profileImage"],
        where: participantsWhereClause,
      },
    ],
    limit: limit,
    offset: offset,
    order: [
      [
        db.Sequelize.literal(
          "CONVERT(`Participant`.`fullName` USING utf8mb4) COLLATE utf8mb4_unicode_ci"
        ),
        sortOrder,
      ],
    ],
  });

  if (!groupMembers) {
    const error = new Error("Group Membership not found");
    error.status = 404;
    throw error;
  }

  return {
    groupMembers,
    groupMembersMetaData: {
      totalNumberOfRecords,
      totalPages,
      page,
      limit,
    },
  };
};

module.exports = getAllGroupMembersService;
