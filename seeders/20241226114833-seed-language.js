"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Languages", [
      {
        name_ar: "العربية",
        name_en: "arabic",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name_ar: "الإنجليزية",
        name_en: "english",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Languages", null, {});
  },
};
