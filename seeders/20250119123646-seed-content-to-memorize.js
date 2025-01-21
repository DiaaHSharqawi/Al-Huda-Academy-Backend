"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkInsert("content_to_memorize", [
        {
          id: 1,
          groupPlanId: 1,
          surahId: 1,
          startAyah: 1,
          endAyah: 10,
          dayDate: new Date("2025-01-22"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          groupPlanId: 1,
          surahId: 2,
          startAyah: 50,
          endAyah: 60,
          dayDate: new Date("2025-01-22"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
      console.log("Data seeded successfully.");
    } catch (error) {
      console.error("Error seeding data:", error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkDelete("content_to_memorize", null, {});
      console.log("Data reverted successfully.");
    } catch (error) {
      console.error("Error reverting data:", error);
    }
  },
};
