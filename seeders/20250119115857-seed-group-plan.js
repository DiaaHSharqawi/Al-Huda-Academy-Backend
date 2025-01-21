"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkInsert("group_plan", [
        {
          id: 1,
          groupId: 1,
          dayDate: 0,
          dayDate: new Date("2025-01-19"),
          group_plan_status_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
      console.log("Seed data successfully inserted into group_plan table.");
    } catch (error) {
      console.error("Error inserting seed data into group_plan table:", error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkDelete("group_plan", null, {});
      console.log("Seed data successfully removed from group_plan table.");
    } catch (error) {
      console.error("Error removing seed data from group_plan table:", error);
    }
  },
};
