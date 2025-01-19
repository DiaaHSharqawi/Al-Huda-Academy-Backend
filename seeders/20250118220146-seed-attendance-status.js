"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("attendance_status", [
      {
        name_ar: "حاضر",
        name_en: "present",
      },
      {
        name_ar: "متاخر",
        name_en: "late",
      },
      {
        name_ar: "غائب",
        name_en: "absent",
      },
      {
        name_ar: "غائب بعذر",
        name_en: "absent with excuse",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("attendance_status", null, {});
  },
};
