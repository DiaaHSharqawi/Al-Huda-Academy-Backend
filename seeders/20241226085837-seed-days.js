"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      "day",
      [
        { name_en: "Sunday", name_ar: "الأحد" },
        { name_en: "Monday", name_ar: "الإثنين" },
        { name_en: "Tuesday", name_ar: "الثلاثاء" },
        { name_en: "Wednesday", name_ar: "الأربعاء" },
        { name_en: "Thursday", name_ar: "الخميس" },
        { name_en: "Friday", name_ar: "الجمعة" },
        { name_en: "Saturday", name_ar: "السبت" },
      ],
      {}
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("day", null, {});
  },
};
