"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkInsert("group_plan_status", [
        {
          id: 1,
          name_ar: "قيد الانتظار",
          name_en: "pending",
        },
        {
          id: 2,
          name_ar: "مكتمل",
          name_en: "completed",
        },
        {
          id: 3,
          name_ar: "ملغى",
          name_en: "cancelled",
        },
        {
          id: 4,
          name_ar: "مؤجل",
          name_en: "deferred",
        },
      ]);
      console.log("Data inserted successfully into group_plan_status.");
    } catch (error) {
      console.error("Error inserting data into group_plan_status:", error);
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkDelete("group_plan_status", null, {});
      console.log("Data removed successfully from group_plan_status.");
    } catch (error) {
      console.error("Error removing data from group_plan_status:", error);
      throw error;
    }
  },
};
