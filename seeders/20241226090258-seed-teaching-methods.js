"use strict";

/** @type {import('sequelize-cli').Migration} */

const methods = [
  {
    methodNameArabic: "كامل القرآن-سور",
    methodNameEnglish: "allOfQuranSurahs",
    descriptionArabic: "تقنية لحفظ القرآن كاملاً.",
    descriptionEnglish: "Technique for memorizing the entire Quran.",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    methodNameArabic: "كامل القرآن-اجزاء",
    methodNameEnglish: "allOfQuranjuzas",
    descriptionArabic: "تقنية لحفظ القرآن كاملاً.",
    descriptionEnglish: "Technique for memorizing the entire Quran.",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    methodNameArabic: "جزء من القرآن-اجزاء",
    methodNameEnglish: "juzasQuran",
    descriptionArabic: "طريقة لحفظ أجزاء محددة من القرآن.",
    descriptionEnglish: "Method for memorizing specific parts.",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    methodNameArabic: "جزء من القرآن-سور",
    methodNameEnglish: "surahsQuran",
    descriptionArabic: "طريقة لحفظ سور محددة.",
    descriptionEnglish: "Method for memorizing specific parts.",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    methodNameArabic: "مقتطفات من القرآن",
    methodNameEnglish: "extractsQuran",
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
