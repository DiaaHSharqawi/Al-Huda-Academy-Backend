const db = require("./../../../../../models");

const getAllGroupDetailsService = async () => {
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

  return memorizationGroups;
};

module.exports = getAllGroupDetailsService;
