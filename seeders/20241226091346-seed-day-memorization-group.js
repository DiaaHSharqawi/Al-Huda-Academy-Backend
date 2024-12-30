"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("day_memorization_group", [
      {
      day_id: 1,
      group_id: 1,
      },
      {
      day_id: 2,
      group_id: 1,
      },
      {
      day_id: 1,
      group_id: 2,
      },
      {
      day_id: 2,
      group_id: 2,
      },
      {
      day_id: 3,
      group_id: 2,
      },
      {
      day_id: 1,
      group_id: 3,
      },
      {
      day_id: 2,
      group_id: 3,
      },
      {
      day_id: 1,
      group_id: 4,
      },
      {
      day_id: 2,
      group_id: 4,
      },
      {
      day_id: 3,
      group_id: 4,
      },
      {
      day_id: 1,
      group_id: 5,
      },
      {
      day_id: 2,
      group_id: 5,
      },
      {
      day_id: 1,
      group_id: 6,
      },
      {
      day_id: 2,
      group_id: 6,
      },
      {
      day_id: 3,
      group_id: 6,
      },
      {
      day_id: 1,
      group_id: 7,
      },
      {
      day_id: 2,
      group_id: 7,
      },
      {
      day_id: 1,
      group_id: 8,
      },
      {
      day_id: 2,
      group_id: 8,
      },
      {
      day_id: 3,
      group_id: 8,
      },
      {
      day_id: 1,
      group_id: 9,
      },
      {
      day_id: 2,
      group_id: 9,
      },
      {
      day_id: 1,
      group_id: 10,
      },
      {
      day_id: 2,
      group_id: 10,
      },
      {
      day_id: 3,
      group_id: 10,
      },
      {
      day_id: 1,
      group_id: 11,
      },
      {
      day_id: 2,
      group_id: 11,
      },
      {
      day_id: 1,
      group_id: 12,
      },
      {
      day_id: 2,
      group_id: 12,
      },
      {
      day_id: 3,
      group_id: 12,
      },
      {
      day_id: 1,
      group_id: 13,
      },
      {
      day_id: 2,
      group_id: 13,
      },
      {
      day_id: 1,
      group_id: 14,
      },
      {
      day_id: 2,
      group_id: 14,
      },
      {
      day_id: 3,
      group_id: 14,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("day_memorization_group", null, {});
  },
};
