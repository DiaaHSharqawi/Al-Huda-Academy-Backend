"use strict";

/** @type {import('sequelize-cli').Migration} */

const surahMemorizationGroup = [
  {
    surahId: 1, // Al-Fatihah
    groupId: 1,
  },
  {
    surahId: 1, // Al-Fatihah
    groupId: 2,
  },
  {
    surahId: 2, // Al-Baqarah
    groupId: 1,
  },
  {
    surahId: 3, // Al-Imran
    groupId: 3,
  },
  {
    surahId: 3, // Al-Imran
    groupId: 1,
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkInsert(
        "surah_memorization_group",
        surahMemorizationGroup
      );
    } catch (error) {
      console.error(
        "Error inserting data into surah_memorization_group:",
        error
      );
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkDelete("surah_memorization_group", null, {});
    } catch (error) {
      console.error(
        "Error deleting data from surah_memorization_group:",
        error
      );
    }
  },
};
