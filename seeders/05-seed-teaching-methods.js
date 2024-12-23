"use strict";

/** @type {import('sequelize-cli').Migration} */

const methods = [
  {
    methodNameArabic: "كامل القرآن",
    methodNameEnglish: "Memorization of the Complete Quran",
    descriptionArabic: "تقنية لحفظ القرآن كاملاً.",
    descriptionEnglish: "Technique for memorizing the entire Quran.",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    methodNameArabic: "أجزاء من القرآن",
    methodNameEnglish: "Memorization of Parts of the Quran",
    descriptionArabic: "طريقة لحفظ أجزاء محددة.",
    descriptionEnglish: "Method for memorizing specific parts.",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    methodNameArabic: "مقتطفات من القرآن",
    methodNameEnglish: "Extracts from the Quran",
    descriptionArabic: "استراتيجيات لحفظ مقتطفات.",
    descriptionEnglish: "Strategies for memorizing extracts.",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkInsert("teaching_methods", methods);
    } catch (error) {
      console.error("Error inserting teaching methods: ", error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkDelete("teaching_methods", null, {});
    } catch (error) {
      console.error("Error deleting teaching methods: ", error);
    }
  },
};
