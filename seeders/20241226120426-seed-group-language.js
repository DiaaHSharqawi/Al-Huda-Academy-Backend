"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkInsert("group_language", [
        {
          group_id: 1,
          language_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          group_id: 2,
          language_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          group_id: 3,
          language_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          group_id: 4,
          language_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          group_id: 5,
          language_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          group_id: 6,
          language_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          group_id: 7,
          language_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          group_id: 8,
          language_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          group_id: 9,
          language_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          group_id: 10,
          language_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          group_id: 11,
          language_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          group_id: 12,
          language_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          group_id: 13,
          language_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          group_id: 14,
          language_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    } catch (error) {
      console.error("Error inserting data into GroupLanguages:", error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkDelete("group_language", null, {});
    } catch (error) {
      console.error("Error deleting data from GroupLanguages:", error);
    }
  },
};
