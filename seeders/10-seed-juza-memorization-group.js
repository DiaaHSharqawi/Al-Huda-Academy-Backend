"use strict";

/** @type {import('sequelize-cli').Migration} */

const juzaMemorizationGroup = [
  {
    juzaId: 1,
    groupId: 1,
  },
  {
    juzaId: 2,
    groupId: 1,
  },
  {
    juzaId: 3,
    groupId: 1,
  },
  {
    juzaId: 4,
    groupId: 1,
  },
  {
    juzaId: 5,
    groupId: 2,
  },
  {
    juzaId: 6,
    groupId: 2,
  },
  {
    juzaId: 7,
    groupId: 2,
  },
  {
    juzaId: 8,
    groupId: 2,
  },
  {
    juzaId: 9,
    groupId: 3,
  },
  {
    juzaId: 10,
    groupId: 3,
  },
  {
    juzaId: 11,
    groupId: 3,
  },
  {
    juzaId: 12,
    groupId: 3,
  },
  {
    juzaId: 13,
    groupId: 4,
  },
  {
    juzaId: 14,
    groupId: 4,
  },
  {
    juzaId: 15,
    groupId: 4,
  },
  {
    juzaId: 16,
    groupId: 4,
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkInsert(
        "juza_memorization_group",
        juzaMemorizationGroup
      );
    } catch (error) {
      console.error("Error inserting data: ", error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkDelete("juza_memorization_group", null, {});
    } catch (error) {
      console.error("Error deleting data: ", error);
    }
  },
};
