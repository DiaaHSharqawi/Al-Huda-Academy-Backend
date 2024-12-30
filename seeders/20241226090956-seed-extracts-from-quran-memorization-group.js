"use strict";

/** @type {import('sequelize-cli').Migration} */

const extractsFromQuranMemorizationGroup = [
  {
    surahId: 1,
    ayat: "1-7,10-12,15-18",
    groupId: 10,
  },
  {
    surahId: 2,
    ayat: "1-7,10-12,20-25",
    groupId: 11,
  },
  {
    surahId: 3,
    ayat: "1-7,10-12,30-35",
    groupId: 12,
  },
  {
    surahId: 4,
    ayat: "1-7,10-12,40-45",
    groupId: 13,
  },
  {
    surahId: 5,
    ayat: "1-7,10-12,50-55",
    groupId: 14,
  },
  {
    surahId: 6,
    ayat: "1-7,10-12,60-65",
    groupId: 10,
  },
  {
    surahId: 7,
    ayat: "1-7,10-12,70-75",
    groupId: 11,
  },
  {
    surahId: 8,
    ayat: "1-7,10-12,80-85",
    groupId: 12,
  },
  {
    surahId: 9,
    ayat: "1-7,10-12,90-95",
    groupId: 13,
  },
  {
    surahId: 10,
    ayat: "1-7,10-12,100-105",
    groupId: 13,
  },
  {
    surahId: 11,
    ayat: "1-7,10-12,110-115",
    groupId: 10,
  },
  {
    surahId: 12,
    ayat: "1-7,10-12,120-125",
    groupId: 11,
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      return await queryInterface.bulkInsert(
        "extracts_from_quran_memorization_group",
        extractsFromQuranMemorizationGroup
      );
    } catch (error) {
      console.error("Error inserting data: ", error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      return await queryInterface.bulkDelete(
        "extracts_from_quran_memorization_group",
        null,
        {}
      );
    } catch (error) {
      console.error("Error deleting data: ", error);
    }
  },
};
