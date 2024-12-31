const { model } = require("mongoose");
const db = require("./../../../../../models/index.js");

const Sequelize = require("sequelize");
const getMemorizationGroupByGroupIdService = async (
  getMemorizationGroupByGroupIdServiceData
) => {
  const { id } = getMemorizationGroupByGroupIdServiceData;

  console.log("id:", id);

  let surahs = [];
  let juzas = [];
  let extracts = [];

  const memorizationGroups = await db.MemorizationGroup.findOne({
    where: {
      id: id,
    },
    include: [
      {
        model: db.Gender,
      },
      {
        model: db.Day,
        through: {
          model: db.DayMemorizationGroup,
        },
      },
      {
        model: db.GroupStatus,
      },
      {
        model: db.Day,
        through: {
          model: db.DayMemorizationGroup,
        },
      },
      {
        model: db.ParticipantLevel,
      },
      {
        model: db.GroupGoal,
      },
      {
        model: db.Language,
        through: {
          model: db.GroupLanguage,
        },
      },
      {
        model: db.TeachingMethods,
      },
      {
        model: db.Supervisor,
      },
    ],
    logging: console.log,
  });

  console.log("memorizationGroups:", memorizationGroups);
  if (!memorizationGroups) {
    const error = new Error("Memorization group not found.");
    error.statusCode = 404;
    throw error;
  }

  if (
    memorizationGroups.TeachingMethod.id === "1" ||
    memorizationGroups.TeachingMethod.id == "4"
  ) {
    console.log("Memorization of Surahs of the Quran");
    console.log("id:", id);
    surahs = await db.SurahMemorizationGroup.findAll({
      where: {
        groupId: id,
      },
      include: [
        {
          model: db.Surah,
        },
      ],
    });
    console.log("surahs:", surahs);
    //memorizationGroups.setDataValue("surahs", surahs);
  } else if (
    memorizationGroups.TeachingMethod.id == "2" ||
    memorizationGroups.TeachingMethod.id == "4"
  ) {
    console.log("Memorization of Parts of the Quran");
    juzas = await db.JuzaMemorizationGroup.findAll({
      where: {
        groupId: id,
      },
      include: [
        {
          model: db.Juza,
        },
      ],
    });
  } else if (memorizationGroups.TeachingMethod.id == "5") {
    extracts = await db.ExtractsFromQuranMemorizationGroup.findAll({
      where: {
        groupId: id,
      },

      include: [
        {
          model: db.Surah,
        },
      ],
    });
    console.log("extracts:", extracts);
  }

  memorizationGroups.setDataValue("surahs", surahs);
  memorizationGroups.setDataValue("juzas", juzas);
  memorizationGroups.setDataValue("extracts", extracts);

  return memorizationGroups;
};
module.exports = getMemorizationGroupByGroupIdService;
