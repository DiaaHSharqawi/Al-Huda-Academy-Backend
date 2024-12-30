"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("participant_level", [
      {
        participant_level_en: "junior",
        participant_level_ar: "مبتدئ",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        participant_level_en: "average",
        participant_level_ar: "متوسط",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        participant_level_en: "advanced",
        participant_level_ar: "متقدم",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        participant_level_en: "junior-average",
        participant_level_ar: "مبتدئ-متوسط",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        participant_level_en: "average-advanced",
        participant_level_ar: "متوسط-متقدم",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("participant_level", null, {});
  },
};
