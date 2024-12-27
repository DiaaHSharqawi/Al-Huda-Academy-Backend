"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkInsert("group_goal", [
        {
          group_goal_ar: "تحفيظ", // Memorization
          group_goal_eng: "memorization",
        },
        {
          group_goal_ar: "تلاوة", // Recitation
          group_goal_eng: "recitation",
        },
        {
          group_goal_ar: "مراجعة", // Revision
          group_goal_eng: "revision",
        },
      ]);
    } catch (error) {
      console.error("Error inserting data into group_goal:", error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkDelete("group_goal", null, {});
    } catch (error) {
      console.error("Error deleting data from group_goal:", error);
    }
  },
};
