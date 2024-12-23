"use strict";

/** @type {import('sequelize-cli').Migration} */

const juzaMemorizationGroup = [
  {
    juzaId: 1,
    groupId: 5,
  },
  {
    juzaId: 1,
    groupId: 6,
  },
  {
    juzaId: 2,
    groupId: 7,
  },
  {
    juzaId: 2,
    groupId: 8,
  },
  {
    juzaId: 3,
    groupId: 9,
  },
  {
    juzaId: 3,
    groupId: 10,
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
