const db = require("./../../../../../models");

const getAllGroupDetailsService = async () => {
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
