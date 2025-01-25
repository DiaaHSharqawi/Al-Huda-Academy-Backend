const db = require("../../../../../models/index.js");

const { Op } = require("sequelize");

const getGroupContentService = async (groupDetails) => {
  const { groupId } = groupDetails;

  const juzaMemorizationGroup = await db.JuzaMemorizationGroup.findAll({
    where: {
      groupId: groupId,
    },

    include: [
      {
        model: db.Juza,
      },
    ],
  });

  console.log("juzaMemorizationGroup", juzaMemorizationGroup);

  let uniqueSurahIdArray;

  const uniqueSurahIds = new Set();

  juzaMemorizationGroup.forEach((item) => {
    const { start_surah, end_surah } = item.Juza;

    for (let surahId = start_surah; surahId <= end_surah; surahId++) {
      uniqueSurahIds.add(surahId);
    }
  });

  uniqueSurahIdArray = Array.from(uniqueSurahIds);

  console.log(
    `Unique Surah IDs for juzaMemorizationGroup  groupId ${groupId}:`,
    uniqueSurahIdArray
  );

  // -----------------------------------------------

  const surahMemorizationGroup = await db.SurahMemorizationGroup.findAll({
    where: {
      groupId: groupId,
    },
  });

  console.log("surahMemorizationGroup", surahMemorizationGroup);

  surahMemorizationGroupUniqueSurahIdArray = Array.from(
    surahMemorizationGroup.map((item) => item.surahId)
  );

  uniqueSurahIdArray =
    surahMemorizationGroupUniqueSurahIdArray.length > 0
      ? surahMemorizationGroupUniqueSurahIdArray
      : uniqueSurahIdArray;

  console.log(
    `Unique Surah IDs for surahMemorizationGroupUniqueSurahIdArray groupId ${groupId}:`,
    uniqueSurahIdArray
  );

  // -----------------------------------------------

  const extractsFromQuranMemorizationGroup =
    await db.ExtractsFromQuranMemorizationGroup.findAll({
      where: {
        groupId: groupId,
      },
    });

  console.log(
    "extractsFromQuranMemorizationGroup: ",
    extractsFromQuranMemorizationGroup
  );

  extractsFromQuranMemorizationGroupUniqueSurahIdArray = Array.from(
    extractsFromQuranMemorizationGroup.map((item) => item.surahId)
  );

  console.log(...extractsFromQuranMemorizationGroupUniqueSurahIdArray);

  uniqueSurahIdArray =
    extractsFromQuranMemorizationGroupUniqueSurahIdArray.length > 0
      ? extractsFromQuranMemorizationGroupUniqueSurahIdArray
      : uniqueSurahIdArray;

  console.log(
    `Unique Surah IDs for extractsFromQuranMemorizationGroupUniqueSurahIdArray groupId ${groupId}:,
    `,
    uniqueSurahIdArray
  );

  const groupSurahsId = await db.Surah.findAll({
    where: {
      id: {
        [Op.in]: uniqueSurahIdArray,
      },
    },
  });

  const modifiedGroupSurahsId = groupSurahsId.map((surah) => {
    let startAyah, endAyah;

    if (extractsFromQuranMemorizationGroup) {
      const extract = extractsFromQuranMemorizationGroup.find(
        (item) => item.surahId === surah.id
      );

      console.log("extract: " + JSON.stringify(extract));

      if (extract) {
        const numbers = extract.ayat.split(/[-,]/).map(Number);

        // Get the smallest and largest numbers
        startAyah = Math.min(...numbers);
        endAyah = Math.max(...numbers);
      }
    }

    return {
      ...surah.dataValues,
      start_ayah: startAyah ?? 1,
      end_ayah: endAyah ?? surah.numberOfAyahs,
    };
  });

  return modifiedGroupSurahsId;

  return groupSurahsId;
};

module.exports = getGroupContentService;
