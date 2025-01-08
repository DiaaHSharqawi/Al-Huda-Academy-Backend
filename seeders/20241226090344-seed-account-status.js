"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkInsert("account_status", [
        {
          englishName: "pending",
          arabicName: "معلق",
        },
        {
          englishName: "active",
          arabicName: "نشط",
        },
        {
          englishName: "suspended",
          arabicName: "موقوف",
        },
        {
          englishName: "deactivated",
          arabicName: "غير نشط",
        },
        {
          englishName: "deleted",
          arabicName: "محذوف",
        },
      ]);
    } catch (error) {
      console.error("Error inserting data into AccountStatuses:", error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkDelete("account_status", null, {});
    } catch (error) {
      console.error("Error deleting data from AccountStatuses:", error);
    }
  },
};
