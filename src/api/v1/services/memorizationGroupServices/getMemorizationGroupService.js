const db = require("./../../../../../models/index.js");
const { Op } = require("sequelize");

const buildWhereClause = async (searchParams) => {
  const whereClause = {};

  if (searchParams.id) {
    whereClause.id = searchParams.id;
  }
  if (searchParams.groupName) {
    whereClause.group_name = {
      [Op.like]: `%${searchParams.groupName}%`,
    };
  }
  if (searchParams.group_status) {
    whereClause.group_status = searchParams.group_status;
  }
  if (searchParams.participants_gender) {
    whereClause.participants_gender = searchParams.participants_gender;
  }
  if (searchParams.participants_level) {
    whereClause.participants_level = searchParams.participants_level;
  }
  if (searchParams.start_time) {
    whereClause.start_time = { [Op.gte]: searchParams.start_time };
  }
  if (searchParams.end_time) {
    whereClause.end_time = { [Op.lte]: searchParams.end_time };
  }
  if (searchParams.capacity) {
    whereClause.capacity = searchParams.capacity;
  }
  if (searchParams.group_goal) {
    whereClause.group_goal = {
      [Op.like]: `%${searchParams.group_goal}%`,
    };
  }
  if (searchParams.days) {
    if (Array.isArray(searchParams.days)) {
      whereClause[Op.and] = searchParams.days.map((day) =>
        db.Sequelize.where(
          db.Sequelize.fn(
            "JSON_CONTAINS",
            db.Sequelize.col("days"),
            JSON.stringify(day)
          ),
          1
        )
      );
    } else {
      const error = new Error("Invalid days format. Ensure it's an array.");
      error.statusCode = 400;
      throw error;
    }
  }

  if (searchParams.surahs) {
    if (typeof searchParams.surahs === "string") {
      searchParams.surahs = JSON.parse(searchParams.surahs);
    }
    if (!Array.isArray(searchParams.surahs)) {
      const error = new Error("Invalid surahs format. Ensure it's an array.");
      error.statusCode = 400;
      throw error;
    }

    const surahGroups = await db.SurahMemorizationGroup.findAll({
      where: {
        surahId: {
          [Op.in]: searchParams.surahs,
        },
      },
      attributes: ["groupId"],
      group: ["groupId"],
    });

    if (surahGroups.length > 0) {
      whereClause.id = {
        [Op.in]: surahGroups.map((group) => group.groupId),
      };
    }
  }

  if (searchParams.juza) {
    console.log("searchParams.juza:", searchParams.juza);

    if (typeof searchParams.juza === "string") {
      searchParams.juza = JSON.parse(searchParams.juza);
    }
    if (!Array.isArray(searchParams.juza)) {
      const error = new Error("Invalid juza format. Ensure it's an array.");
      error.statusCode = 400;
      throw error;
    }
    const juzaGroups = await db.JuzaMemorizationGroup.findAll({
      where: {
        juzaId: {
          [Op.in]: searchParams.juza,
        },
      },
      attributes: ["groupId"],
      group: ["groupId"],
    });
    if (juzaGroups.length > 0) {
      whereClause.id = {
        [Op.in]: juzaGroups.map((group) => group.groupId),
      };
    }
  }
  return whereClause;
};

const searchMemorizationGroupService = async (searchParams) => {
  console.log("searchParams:", searchParams);

  const whereClause = await buildWhereClause(searchParams); // Await the promise here

  console.log("whereClause:", whereClause);

  const page = parseInt(searchParams.page, 10) || 1;
  const limit = parseInt(searchParams.limit, 10) || 10;
  const offset = (page - 1) * limit;

  const totalNumberOfMemorizationGroup = await db.MemorizationGroup.count({
    where: whereClause,
  });
  const totalPages = Math.ceil(totalNumberOfMemorizationGroup / limit);

  if (page > totalPages) {
    throw new Error("Page number exceeds total available pages.");
  }

  const memorizationGroups = await db.MemorizationGroup.findAll({
    where: whereClause,
    attributes: [
      "id",
      "group_name",
      "group_goal",
      "participants_gender",
      "participants_level",
      "days",
      "start_time",
      "end_time",
    ],
    limit,
    offset,
  });

  if (memorizationGroups.length === 0) {
    throw new Error("No memorization groups found matching the criteria.");
  }

  return {
    memorizationGroups,
    metaData: {
      totalNumberOfMemorizationGroup,
      totalPages,
      page,
      limit,
    },
  };
};

module.exports = searchMemorizationGroupService;
