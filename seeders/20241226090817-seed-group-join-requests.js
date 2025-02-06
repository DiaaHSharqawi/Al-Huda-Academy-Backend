"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      return await queryInterface.bulkInsert("group_join_requests", [
        {
          group_id: 1,
          participant_id: 1,
          join_request_status_id: 2,
          responseMessage: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          group_id: 1,
          participant_id: 2,
          join_request_status_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          group_id: 1,
          participant_id: 3,
          join_request_status_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    } catch (error) {
      console.error("Error in seeding GroupJoinRequests: ", error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      return await queryInterface.bulkDelete("group_join_requests", null, {});
    } catch (error) {
      console.error("Error in deleting GroupJoinRequests: ", error);
    }
  },
};
