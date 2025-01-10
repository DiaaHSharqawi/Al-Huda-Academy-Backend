"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      return await queryInterface.bulkInsert("group_join_request_status", [
        { id: 1, name_english: "pending", name_arabic: "قيد الانتظار" },
        { id: 2, name_english: "approved", name_arabic: "تمت الموافقة" },
        { id: 3, name_english: "rejected", name_arabic: "مرفوض" },
      ]);
    } catch (error) {
      console.error("Error during bulk insert:", error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      return await queryInterface.bulkDelete(
        "group_join_request_status",
        null,
        {}
      );
    } catch (error) {
      console.error("Error during bulk delete:", error);
    }
  },
};
