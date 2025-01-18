"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("supervisor_ajzaa", [
      {
        supervisor_id: 1,
        juza_id: 1,
      },
      {
        supervisor_id: 1,
        juza_id: 2,
      },
      {
        supervisor_id: 2,
        juza_id: 1,
      },
      {
        supervisor_id: 2,
        juza_id: 3,
      },
      {
        supervisor_id: 3,
        juza_id: 2,
      },
      {
        supervisor_id: 3,
        juza_id: 3,
      },
      {
        supervisor_id: 3,
        juza_id: 1,
      },
      {
        supervisor_id: 2,
        juza_id: 2,
      },
      {
        supervisor_id: 1,
        juza_id: 3,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("supervisor_ajzaa", null, {});
  },
};
