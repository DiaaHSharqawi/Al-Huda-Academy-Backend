const db = require("./../../../../../../models/index.js");
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
const getAllParticipantGroupsService = async (
  getAllParticipantGroupsData,
  searchParams = {}
) => {
  console.log("\n------ getAllParticipantGroupsService ------\n");

  console.log("getAllParticipantGroupsData", getAllParticipantGroupsData);

  const page = parseInt(searchParams.page, 10) || 1;
  const limit = parseInt(searchParams.limit, 10) || 10;
  const offset = (page - 1) * limit;

  console.log("page, limit, offset:", page, limit, offset);

  const { participantId } = getAllParticipantGroupsData;

  const participantDetails = await db.Participant.findByPk(participantId);

  if (!participantDetails) {
    const error = new Error("participant not found");
    error.statusCode = 404;
    throw error;
  }

  const whereClause = buildWhereClause(searchParams);

  console.log("whereClause:", whereClause);

  const totalNumberOfParticipantGroups = await db.GroupMembers.count({
    where: {
      participant_id: participantId,
    },
    include: [
      {
        model: db.MemorizationGroup,
        where: {
          ...whereClause,
        },
      },
    ],
  });

  const totalPages = Math.ceil(totalNumberOfParticipantGroups / limit);

  if (page > totalPages && totalPages > 0) {
    throw new Error("Page number exceeds total available pages.");
  }

  const participantGroups = await db.GroupMembers.findAll({
    where: {
      participant_id: participantId,
    },
    include: [
      {
        model: db.MemorizationGroup,
        where: {
          ...whereClause,
        },
      },
    ],
    offset: offset,
    limit: limit,
  });

  if (!participantGroups) {
    const error = new Error("No groups found");
    error.statusCode = 404;
    throw error;
  }

  return {
    participantGroups,
    participantGroupsMetaData: {
      currentPage: page,
      totalPages: totalPages,
      totalRecords: totalNumberOfParticipantGroups,
    },
  };
};

module.exports = getAllParticipantGroupsService;
