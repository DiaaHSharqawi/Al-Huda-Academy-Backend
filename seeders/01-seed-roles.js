"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkInsert("Roles", [
        {
          id: 1,
          roleName: "participant",
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          roleName: "supervisor",
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          roleName: "admin",
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    } catch (error) {
      console.error("Error seeding roles:", error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkDelete("Roles", null, {});
    } catch (error) {
      console.error("Error deleting roles:", error);
    }
  },
};
