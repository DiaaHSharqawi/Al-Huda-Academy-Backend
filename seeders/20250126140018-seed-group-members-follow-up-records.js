"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface) => {
    try {
      await queryInterface.bulkInsert("group_members_follow_up_records", [
        {
          group_member_id: 1,
          group_plan_id: 1,
          grade_of_memorization: 85,
          grade_of_review: 90,
          attendance_status_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          group_member_id: 2,
          group_plan_id: 1,
          grade_of_memorization: 75,
          grade_of_review: 80,
          attendance_status_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    } catch (error) {
      console.error("Error seeding data:", error);
    }
  },

  down: async (queryInterface) => {
    try {
      await queryInterface.bulkDelete(
        "group_members_follow_up_records",
        null,
        {}
      );
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  },
};
