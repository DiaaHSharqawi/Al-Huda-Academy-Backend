"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkInsert("genders", [
        {
          id: 1,
          name_ar: "ذكر",
          name_en: "male",
        },
        {
          id: 2,
          name_ar: "أنثى",
          name_en: "female",
        },
      ]);
    } catch (error) {
      console.error("Error inserting data into genders table:", error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkDelete("genders", null, {});
    } catch (error) {
      console.error("Error deleting data from genders table:", error);
    }
  },
};
