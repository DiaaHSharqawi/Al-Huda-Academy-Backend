"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkInsert(
        "group_member",
        [
          {
            group_id: 1,
            participant_id: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            group_id: 1,
            participant_id: 2,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {}
      );
    } catch (error) {
      console.error("Error seeding data:", error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkDelete("group_member", null, {});
    } catch (error) {
      console.error("Error removing seed data:", error);
    }
  },
};
