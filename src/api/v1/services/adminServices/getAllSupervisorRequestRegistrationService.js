const db = require("../../../../../models/index.js");

const getAllSupervisorRequestRegistrationService = async (
  searchParams = {}
) => {
  console.log(
    `\n ---------- Supervisor Request Registration Service ---------- \n`
  );

  console.log("searchParams 1:", searchParams);

  const page = parseInt(searchParams.page, 10) || 1;
  const limit = parseInt(searchParams.limit, 10) || 10;
  const offset = (page - 1) * limit;

  const supervisorWhere = {};

  const totalNumberOfSupervisorRequestsRegistration = await db.Supervisor.count(
    {
      include: [
        {
          model: db.User,
          include: [
            {
              model: db.AccountStatus,
              where: {
                englishName: "pending",
              },
            },
          ],
          required: true,
        },
      ],
    }
  );

  const totalPages = Math.ceil(
    totalNumberOfSupervisorRequestsRegistration / limit
  );

  if (page > totalPages && totalPages > 0) {
    throw new Error("Page number exceeds total available pages.");
  }

  console.log("searchParams.sortOrder :", searchParams.sortOrder);

  const sortOrder = (searchParams.sortOrder || "ASC").toUpperCase();
  console.log("sortOrder:", sortOrder);

  const supervisorRequestsRegistration = await db.Supervisor.findAll({
    attributes: ["id", "fullName", "details", "profileImage"],
    include: [
      {
        model: db.User,
        attributes: ["email"],
        include: [
          {
            model: db.AccountStatus,
            where: {
              englishName: "pending",
            },
          },
        ],
        required: true,
      },
    ],
    offset: offset,
    limit: limit,
    order: [["createdAt", sortOrder]],
  });

  if (
    !supervisorRequestsRegistration ||
    supervisorRequestsRegistration.length === 0
  ) {
    const error = new Error(`No supervisor request registration found`);
    error.statusCode = 404;
    throw error;
  }

  return {
    supervisorRequestsRegistration,
    supervisorRequestsRegistrationMetaData: {
      currentPage: page,
      totalPages: totalPages,
      totalRecords: totalNumberOfSupervisorRequestsRegistration,
    },
  };
};

module.exports = getAllSupervisorRequestRegistrationService;
