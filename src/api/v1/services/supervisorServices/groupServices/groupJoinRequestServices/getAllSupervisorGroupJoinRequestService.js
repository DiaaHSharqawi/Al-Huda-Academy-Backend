const db = require("./../../../../../../../models/index.js");
const { Op } = require("sequelize");

const getAllSupervisorGroupJoinRequestService = async (
  groupId,
  searchParams = {}
) => {
  console.log("\n------ getAllSupervisorGroupJoinRequestService ------\n");

  const pendingJoinRequestStatus = await db.GroupJoinRequestStatus.findOne({
    where: {
      name_english: "pending",
    },
  });

  if (!pendingJoinRequestStatus) {
    const error = new Error("Pending status not found");
    error.statusCode = 404;
    throw error;
  }

  const page = parseInt(searchParams.page, 10) || 1;
  const limit = parseInt(searchParams.limit, 10) || 10;
  const offset = (page - 1) * limit;

  console.log(`page: ${page}, limit: ${limit}, offset: ${offset}`);

  const groupJoinRequestsTotalNumber = await db.GroupJoinRequest.count({
    where: {
      group_id: groupId,
      join_request_status_id: pendingJoinRequestStatus.id,
    },
    include: [
      {
        model: db.Participant,
        attributes: ["fullName", "profileImage"],
        where: searchParams.fullName
          ? {
              fullName: {
                [Op.like]: `%${searchParams.fullName}%`,
              },
            }
          : null,
      },
    ],
  });

  const totalPages = Math.ceil(groupJoinRequestsTotalNumber / limit);

  console.log("page:", page);
  console.log("totalPages:", totalPages);

  if (page > totalPages && totalPages > 0) {
    const error = new Error("Page number exceeds total available pages.");
    error.statusCode = 400;
    throw error;
  }

  console.log("groupJoinRequestsTotalNumber:", groupJoinRequestsTotalNumber);

  const groupJoinRequests = await db.GroupJoinRequest.findAll({
    where: {
      group_id: groupId,
      join_request_status_id: pendingJoinRequestStatus.id,
    },
    include: [
      {
        model: db.Participant,
        attributes: ["fullName", "profileImage", "dateOfBirth"],
        where: searchParams.fullName
          ? {
              fullName: {
                [Op.like]: `%${searchParams.fullName}%`,
              },
            }
          : null,
        include: [
          {
            model: db.QuranMemorizingAmount,
          },
        ],
      },
    ],
    offset: offset,
    limit: limit,
  });

  if (!groupJoinRequests) {
    const error = new Error("No join requests found");
    error.statusCode = 404;
    throw error;
  }

  return {
    groupJoinRequests,
    groupJoinRequestsMetaData: {
      currentPage: page,
      totalPages: totalPages,
      totalRecords: groupJoinRequestsTotalNumber,
    },
  };
};

module.exports = getAllSupervisorGroupJoinRequestService;
