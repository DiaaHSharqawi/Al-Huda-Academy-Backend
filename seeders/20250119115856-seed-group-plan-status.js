"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkInsert("group_plan_status", [
        {
          id: 1,
          name_ar: "قادمة",
          name_en: "upcoming",
        },
        {
          id: 2,
          name_ar: "ماضية",
          name_en: "past",
        },
        {
          id: 3,
          name_ar: "مكتملة",
          name_en: "completed",
        },
        {
          id: 4,
          name_ar: "ملغية",
          name_en: "cancelled",
        },
        {
          id: 5,
          name_ar: "مؤجلة",
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
