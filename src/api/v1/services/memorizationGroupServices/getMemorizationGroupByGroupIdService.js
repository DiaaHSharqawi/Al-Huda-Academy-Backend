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
        model: db.TeachingMethods,
        attributes: ["id", "methodNameArabic", "methodNameEnglish"],
      },
      {
        model: db.Supervisor,
        attributes: ["id", "fullName"],
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
    memorizationGroups.TeachingMethod.methodNameArabic ==
      "القرآن-تقسيمة-السور" ||
    memorizationGroups.TeachingMethod.methodNameEnglish ==
      "Memorization of Parts of the Quran-Surah"
  ) {
    surahs = await db.SurahMemorizationGroup.findAll({
      where: {
        groupId: id,
      },
      attributes: [
        [Sequelize.col("Surah.id"), "id"],
        [Sequelize.col("Surah.name"), "name"],
        [Sequelize.col("Surah.englishName"), "englishName"],
      ],
      include: [
        {
          model: db.Surah,
          attributes: [],
        },
      ],
    });

    memorizationGroups.setDataValue("surahs", surahs);
  } else if (
    memorizationGroups.TeachingMethod.methodNameArabic ==
      "أجزاء من القرآن-تقسيمة-الاجزاء" ||
    memorizationGroups.TeachingMethod.methodNameEnglish ==
      "Memorization of Parts of the Quran-Juz"
  ) {
    console.log("Memorization of Parts of the Quran");
    juzas = await db.JuzaMemorizationGroup.findAll({
      where: {
        groupId: id,
      },
      attributes: [
        [Sequelize.col("Juza.id"), "id"],
        [Sequelize.col("Juza.arabic_part"), "arabic_part"],
        [Sequelize.col("Juza.english_part"), "english_part"],
      ],
      include: [
        {
          model: db.Juza,
          attributes: [],
        },
      ],
    });
  } else if (
    memorizationGroups.TeachingMethod.methodNameArabic == "مقتطفات من القرآن" ||
    memorizationGroups.TeachingMethod.methodNameEnglish ==
      "Extracts from the Quran"
  ) {
    extracts = await db.ExtractsFromQuranMemorizationGroup.findAll({
      where: {
        groupId: id,
      },
      attributes: [
        "ayat",

        [Sequelize.col("Surah.id"), "surahId"],
        [Sequelize.col("Surah.name"), "surahName"],
        [Sequelize.col("Surah.englishName"), "surahEnglishName"],
      ],
      include: [
        {
          model: db.Surah,
          attributes: [],
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
