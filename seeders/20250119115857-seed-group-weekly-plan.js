"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkInsert("group_weekly_plan", [
        {
          id: 1,
          groupId: 1,
          weekNumber: 0,
          startWeekDayDate: new Date("2025-01-19"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
      console.log(
        "Seed data successfully inserted into group_weekly_plan table."
      );
    } catch (error) {
      console.error(
        "Error inserting seed data into group_weekly_plan table:",
        error
      );
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkDelete("group_weekly_plan", null, {});
      console.log(
        "Seed data successfully removed from group_weekly_plan table."
      );
    } catch (error) {
      console.error(
        "Error removing seed data from group_weekly_plan table:",
        error
      );
    }
  },
};
