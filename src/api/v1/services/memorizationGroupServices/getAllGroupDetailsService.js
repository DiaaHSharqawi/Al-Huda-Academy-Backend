const db = require("./../../../../../models");

const getAllGroupDetailsService = async () => {
  /*
  const memorizationGroups = await db.MemorizationGroup.findAll({
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
        model: db.QuranMemorizingAmount,
      },
      {
        model: db.Language,
        through: {
          model: db.GroupLanguage,
          attributes: [],
        },
      },
    ],

    required: false,
  });

  if (!memorizationGroups) {
    const error = new Error("No memorization groups found");
    error.statusCode = 404;
    throw error;
  }
*/

  const ajzaaMemorizationGroups = await db.JuzaMemorizationGroup.findAll({
    include: [
      {
        model: db.MemorizationGroup,
        attributes: ["gender_id", "group_completion_rate_id"],
      },
    ],
  });

  const surahsMemorizationGroups = await db.SurahMemorizationGroup.findAll({
    include: [
      {
        model: db.MemorizationGroup,
        attributes: ["gender_id", "group_completion_rate_id"],
      },
    ],
  });

  const extractFromQuranMemorizationGroups =
    await db.ExtractsFromQuranMemorizationGroup.findAll({
      include: [
        {
          model: db.MemorizationGroup,
          attributes: ["gender_id", "group_completion_rate_id"],
        },
      ],
    });

  return {
    ajzaaMemorizationGroups,
    surahsMemorizationGroups,
    extractFromQuranMemorizationGroups,
  };
};

module.exports = getAllGroupDetailsService;
