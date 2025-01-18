"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("participant_ajzaa", [
      {
        participant_id: 1,
        juza_id: 1,
      },
      {
        participant_id: 1,
        juza_id: 2,
      },
      {
        participant_id: 2,
        juza_id: 1,
      },
      {
        participant_id: 2,
        juza_id: 3,
      },
      {
        participant_id: 3,
        juza_id: 2,
      },
      {
        participant_id: 3,
        juza_id: 3,
      },
      {
        participant_id: 4,
        juza_id: 1,
      },
      {
        participant_id: 5,
        juza_id: 2,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("participant_ajzaa", null, {});
  },
};
