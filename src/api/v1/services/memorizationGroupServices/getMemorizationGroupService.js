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
  if (searchParams.gender_id) {
    whereClause.gender_id = searchParams.gender_id;
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
  if (searchParams.group_goal_id) {
    whereClause.group_goal_id = searchParams.group_goal_id;
  }
  if (searchParams.day_ids) {
    searchParams.day_ids = JSON.parse(searchParams.day_ids);

    if (Array.isArray(searchParams.day_ids)) {
      console.log("searchParams.day_ids:", searchParams.day_ids);
      const dayGroups = await db.DayMemorizationGroup.findAll({
        where: {
          day_id: {
            [Op.in]: searchParams.day_ids,
          },
        },
        attributes: ["group_id"],
        group: ["group_id"],
      });
      console.log("dayGroups:", dayGroups);

      if (dayGroups.length > 0) {
        whereClause.id = {
          [Op.in]: dayGroups.map((group) => group.group_id),
        };
      }
    } else {
      const error = new Error("Invalid days format. Ensure it's an array.");
      error.statusCode = 400;
      throw error;
    }
  }

  if (searchParams.teaching_method_id) {
    const teachingMethodId = searchParams.teaching_method_id;
    if (teachingMethodId === "1") {
      // all of the surahs
      console.log("searchParams.surah_ids:", searchParams.surah_ids);
      // all of the surahs

      const allSurahIds = Array.from({ length: 114 }, (_, i) => i + 1);
      console.log("allSurahIds:", allSurahIds);

      const surahGroups = await db.SurahMemorizationGroup.findAll({
        attributes: ["groupId"],
        where: {
          surahId: {
            [Op.in]: allSurahIds,
          },
        },
        group: ["groupId"],
        having: db.sequelize.where(
          db.sequelize.fn("COUNT", db.sequelize.col("surahId")),
          allSurahIds.length
        ),
      });

      if (surahGroups.length > 0) {
        whereClause.id = {
          [Op.in]: surahGroups.map((group) => group.groupId),
        };
      }
    } else if (teachingMethodId === "2") {
      // all of juzaa
      console.log("searchParams.juza_ids:", searchParams.juza_ids);
      // all of the juzas
      const allJuzaIds = Array.from({ length: 30 }, (_, i) => i + 1);
      console.log("allJuzaIds:", allJuzaIds);

      const juzaGroups = await db.JuzaMemorizationGroup.findAll({
        attributes: ["groupId"],
        where: {
          juzaId: {
            [Op.in]: allJuzaIds,
          },
        },
        group: ["groupId"],
        having: db.sequelize.where(
          db.sequelize.fn("COUNT", db.sequelize.col("juzaId")),
          allJuzaIds.length
        ),
      });
      if (juzaGroups.length > 0) {
        whereClause.id = {
          [Op.in]: juzaGroups.map((group) => group.groupId),
        };
      }
    } else if (teachingMethodId === "3") {
      if (typeof searchParams.juza_ids === "string") {
        searchParams.juza_ids = JSON.parse(searchParams.juza_ids);
      }
      if (!Array.isArray(searchParams.juza_ids)) {
        const error = new Error(
          "Invalid juza_ids format. Ensure it's an array."
        );
        error.statusCode = 400;
        throw error;
      }
      const juzaGroups = await db.JuzaMemorizationGroup.findAll({
        where: {
          juzaId: {
            [Op.in]: searchParams.juza_ids,
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
    } else if (teachingMethodId === "4") {
      if (typeof searchParams.surah_ids === "string") {
        searchParams.surah_ids = JSON.parse(searchParams.surah_ids);
      }
      if (!Array.isArray(searchParams.surah_ids)) {
        const error = new Error("Invalid surahs format. Ensure it's an array.");
        error.statusCode = 400;
        throw error;
      }

      const surahGroups = await db.SurahMemorizationGroup.findAll({
        where: {
          surahId: {
            [Op.in]: searchParams.surah_ids,
          },
        },
        attributes: ["groupId"],
        group: ["groupId"],
      });
      console.log("surahGroups:", surahGroups);
      if (surahGroups.length > 0) {
        whereClause.id = {
          [Op.in]: surahGroups.map((group) => group.groupId),
        };
      }
    } else if (teachingMethodId === "5") {
      console.log("searchParams.extract_ids:", searchParams.extract_ids);

      if (typeof searchParams.extract_ids === "string") {
        searchParams.extract_ids = JSON.parse(searchParams.extract_ids);
      }
      if (!Array.isArray(searchParams.extract_ids)) {
        const error = new Error(
          "Invalid extract_ids format. Ensure it's an array."
        );
        error.statusCode = 400;
        throw error;
      }
      const extractGroups = await db.ExtractsFromQuranMemorizationGroup.findAll(
        {
          attributes: ["groupId"],
          group: ["groupId"],
        }
      );
      console.log("extractGroups:", extractGroups);
      if (extractGroups.length > 0) {
        whereClause.id = {
          [Op.in]: extractGroups.map((group) => group.groupId),
        };
      }
    }
  }

  if (searchParams.language_id) {
    console.log("searchParams.language_id:", searchParams.language_id);
    const languageGroups = await db.GroupLanguage.findAll({
      where: {
        language_id: searchParams.language_id,
      },
      attributes: ["group_id"],
      // group: ["group_id"],
    });

    console.log(
      "languageGroups:",
      languageGroups.map((languageGroup) => languageGroup.group_id)
    );
    if (languageGroups.length > 0) {
      whereClause.id = {
        [Op.in]: languageGroups.map((languageGroup) => languageGroup.group_id),
      };
    }
  }
  return whereClause;
};

const searchMemorizationGroupService = async (searchParams) => {
  console.log("searchParams:", searchParams);

  const whereClause = await buildWhereClause(searchParams);

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
    include: [
      {
        model: db.Gender,
      },
      {
        model: db.Day,
        through: {
          model: db.DayMemorizationGroup,
          attributes: [],
        },
      },
      {
        model: db.GroupStatus,
      },
      {
        model: db.Day,
        through: {
          model: db.DayMemorizationGroup,
          attributes: [],
        },
      },

      {
        model: db.GroupGoal,
      },
      {
        model: db.Language,
        through: {
          model: db.GroupLanguage,
          attributes: [],
        },
      },
    ],
    limit,
    offset,
    required: false,
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
