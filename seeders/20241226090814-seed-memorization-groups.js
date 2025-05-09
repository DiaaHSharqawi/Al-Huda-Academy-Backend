"use strict";

/** @type {import('sequelize-cli').Migration} */
const groups = [
  {
    group_name: "مجموعة عمر بن الخطاب",
    group_description: "مجموعة مخصصة لحفظ القرآن الكريم.",
    capacity: 15,
    start_time: "08:00:00",
    end_time: "10:00:00",
    group_status_id: 1,
    group_goal_id: 1,
    gender_id: 1,
    supervisor_id: 1,
    teaching_method_id: 2,
    group_completion_rate_id: 1,
    createdAt: new Date(),
  },
  {
    group_name: "مجموعة أبو بكر الصديق",
    group_description: "مجموعة مخصصة لمراجعة القرآن الكريم.",
    capacity: 10,
    start_time: "18:00:00",
    end_time: "20:00:00",
    group_status_id: 2,
    group_goal_id: 2,
    gender_id: 2,
    supervisor_id: 2,
    teaching_method_id: 2,
    group_completion_rate_id: 2,
    createdAt: new Date(),
  },
  {
    group_name: "مجموعة علي بن أبي طالب",
    group_description: "مجموعة مخصصة لحفظ القرآن الكريم لجميع المستويات.",
    capacity: 25,
    start_time: "14:00:00",
    end_time: "16:00:00",
    group_status_id: 3,
    group_goal_id: 1,
    gender_id: 2,
    supervisor_id: 3,
    teaching_method_id: 2,
    group_completion_rate_id: 3,
    createdAt: new Date(),
  },
  {
    group_name: "مجموعة عثمان بن عفان",
    group_description: "مجموعة مخصصة لحفظ القرآن الكريم.",
    capacity: 20,
    start_time: "09:00:00",
    end_time: "11:00:00",
    group_status_id: 4,
    group_goal_id: 1,
    gender_id: 1,
    supervisor_id: 1,
    teaching_method_id: 2,
    group_completion_rate_id: 4,
    createdAt: new Date(),
  },
  {
    group_name: "مجموعة خالد بن الوليد",
    group_description: "مجموعة مخصصة لمراجعة القرآن الكريم.",
    capacity: 12,
    start_time: "17:00:00",
    end_time: "19:00:00",
    group_status_id: 5,
    group_goal_id: 3,
    gender_id: 1,
    supervisor_id: 2,
    teaching_method_id: 4,
    group_completion_rate_id: 5,
    createdAt: new Date(),
  },
  {
    group_name: "مجموعة سعد بن أبي وقاص",
    group_description: "مجموعة مخصصة لحفظ القرآن الكريم.",
    capacity: 18,
    start_time: "10:00:00",
    end_time: "12:00:00",
    group_status_id: 6,
    group_goal_id: 1,
    gender_id: 2,
    supervisor_id: 3,
    teaching_method_id: 4,
    group_completion_rate_id: 6,
    createdAt: new Date(),
  },
  {
    group_name: "مجموعة عبد الله بن مسعود - مراجعة",
    group_description: "مجموعة مخصصة لمراجعة القرآن الكريم.",
    capacity: 14,
    start_time: "16:00:00",
    end_time: "18:00:00",
    group_status_id: 1,
    group_goal_id: 3,
    gender_id: 2,
    supervisor_id: 1,
    teaching_method_id: 4,
    group_completion_rate_id: 7,
    createdAt: new Date(),
  },
  {
    group_name: "مجموعة عبد الرحمن بن عوف",
    group_description: "مجموعة مخصصة لحفظ القرآن الكريم.",
    capacity: 22,
    start_time: "11:00:00",
    end_time: "13:00:00",
    group_status_id: 2,
    group_goal_id: 1,
    gender_id: 1,
    supervisor_id: 2,
    teaching_method_id: 4,
    group_completion_rate_id: 1,
    createdAt: new Date(),
  },
  {
    group_name: "مجموعة طلحة بن عبيد الله - مراجعة",
    group_description: "مجموعة مخصصة لمراجعة القرآن الكريم.",
    capacity: 16,
    start_time: "15:00:00",
    end_time: "17:00:00",
    group_status_id: 3,
    group_goal_id: 3,
    gender_id: 2,
    supervisor_id: 3,
    teaching_method_id: 4,
    group_completion_rate_id: 2,
    createdAt: new Date(),
  },
  {
    group_name: "مجموعة الزبير بن العوام",
    group_description: "مجموعة مخصصة لحفظ القرآن الكريم.",
    capacity: 20,
    start_time: "12:00:00",
    end_time: "14:00:00",
    group_status_id: 4,
    group_goal_id: 1,
    gender_id: 1,
    supervisor_id: 1,
    teaching_method_id: 5,
    group_completion_rate_id: 3,
    createdAt: new Date(),
  },
  {
    group_name: "مجموعة أبو عبيدة بن الجراح",
    group_description: "مجموعة مخصصة لمراجعة القرآن الكريم.",
    capacity: 15,
    start_time: "13:00:00",
    end_time: "15:00:00",
    group_status_id: 5,
    group_goal_id: 3,
    gender_id: 2,
    supervisor_id: 2,
    teaching_method_id: 5,
    group_completion_rate_id: 4,
    createdAt: new Date(),
  },
  {
    group_name: "مجموعة عبد الله بن عباس",
    group_description: "مجموعة مخصصة لحفظ القرآن الكريم.",
    capacity: 18,
    start_time: "14:00:00",
    end_time: "16:00:00",
    group_status_id: 5,
    group_goal_id: 1,
    gender_id: 1,
    supervisor_id: 3,
    teaching_method_id: 5,
    group_completion_rate_id: 5,
    createdAt: new Date(),
  },
  {
    group_name: "مجموعة عبد الله بن احمد - مراجعة",
    group_description: "مجموعة مخصصة لمراجعة القرآن الكريم.",
    capacity: 12,
    start_time: "17:00:00",
    end_time: "19:00:00",
    group_status_id: 5,
    group_goal_id: 3,
    gender_id: 2,
    supervisor_id: 1,
    teaching_method_id: 5,
    group_completion_rate_id: 6,
    createdAt: new Date(),
  },
  {
    group_name: "مجموعة عبد الله بن الزبير",
    group_description: "مجموعة مخصصة لحفظ القرآن الكريم.",
    capacity: 20,
    start_time: "08:00:00",
    end_time: "10:00:00",
    group_status_id: 5,
    group_goal_id: 1,
    gender_id: 1,
    supervisor_id: 2,
    teaching_method_id: 5,
    group_completion_rate_id: 7,
    createdAt: new Date(),
  },
];

const generateGroupsWithTimestamps = (baseDate) => {
  return groups.map((group, index) => ({
    ...group,
    createdAt: new Date(baseDate.getTime() + index * 1000), // 1 second apart
  }));
};
module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      const baseDate = new Date(); // Start from now
      const updatedGroups = generateGroupsWithTimestamps(baseDate);

      await queryInterface.bulkInsert("memorization_group", updatedGroups);
    } catch (error) {
      console.error("Error seeding memorization_group", error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkDelete("memorization_group", null, {});
    } catch (error) {
      console.error("Error deleting from memorization_group", error);
    }
  },
};
