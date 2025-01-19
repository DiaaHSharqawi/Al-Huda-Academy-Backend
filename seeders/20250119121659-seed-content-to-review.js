"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkInsert("content_to_review", [
        {
          id: 1,
          groupWeeklyPlanId: 1,
          surahId: 2,
          startAyah: 1,
          endAyah: 5,
        },
        {
          id: 2,
          groupWeeklyPlanId: 1,
          surahId: 1,
          startAyah: 1,
          endAyah: 5,
        },
      ]);
      console.log("Data successfully seeded into content_to_review.");
    } catch (error) {
      console.error("Error while seeding content_to_review:", error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkDelete("content_to_review", null, {});
      console.log("Data successfully removed from content_to_review.");
    } catch (error) {
      console.error("Error while removing content_to_review:", error);
    }
  },
};
