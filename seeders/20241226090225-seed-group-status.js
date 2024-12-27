"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const statuses = [
      {
        status_name_ar: "نشط",
        status_name_en: "active",
      },
      {
        status_name_ar: "غير نشط",
        status_name_en: "inactive",
      },
      {
        status_name_ar: "مكتمل",
        status_name_en: "completed",
      },
      {
        status_name_ar: "ملغى",
        status_name_en: "cancelled",
      },
      {
        status_name_ar: "قيد الانتظار",
        status_name_en: "pending",
      },
      {
        status_name_ar: "ممتلئ",
        status_name_en: "full",
      },
    ];

    try {
      await queryInterface.bulkInsert("group_status", statuses, {});
    } catch (error) {
      console.error("Error inserting group statuses: ", error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkDelete("GroupStatuses", null, {});
    } catch (error) {
      console.error("Error deleting group statuses: ", error);
    }
  },
};
