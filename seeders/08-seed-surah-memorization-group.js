"use strict";

/** @type {import('sequelize-cli').Migration} */

const surahMemorizationGroup = [
  {
    surahId: 1, // Al-Fatihah
    groupId: 5,
  },
  {
    surahId: 2, // Al-Baqarah
    groupId: 6,
  },
  {
    surahId: 3, // Al-Imran
    groupId: 7,
  },
  {
    surahId: 4, // An-Nisa
    groupId: 8,
  },
  {
    surahId: 5, // Al-Maidah
    groupId: 9,
  },
  {
    surahId: 6, // Al-An'am
    groupId: 5,
  },
  {
    surahId: 7, // Al-A'raf
    groupId: 6,
  },
  {
    surahId: 8, // Al-Anfal
    groupId: 7,
  },
  {
    surahId: 9, // At-Tawbah
    groupId: 8,
  },
  {
    surahId: 10, // Yunus
    groupId: 9,
  },
  {
    surahId: 11, // Hud
    groupId: 5,
  },
  {
    surahId: 12, // Yusuf
    groupId: 6,
  },
  {
    surahId: 13, // Ar-Ra'd
    groupId: 7,
  },
  {
    surahId: 14, // Ibrahim
    groupId: 8,
  },
  {
    surahId: 15, // Al-Hijr
    groupId: 9,
  },
  {
    surahId: 16, // An-Nahl
    groupId: 5,
  },
  {
    surahId: 17, // Al-Isra
    groupId: 6,
  },
  {
    surahId: 18, // Al-Kahf
    groupId: 7,
  },
  {
    surahId: 19, // Maryam
    groupId: 8,
  },
  {
    surahId: 20, // Ta-Ha
    groupId: 9,
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
