"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("quran_memorizing_amounts", [
      {
        amountArabic: "ربع وجه",
        amountEnglish: "Quarter Face",
      },
      {
        amountArabic: "نص وجه",
        amountEnglish: "Half Face",
      },
      {
        amountArabic: "وجه كامل",
        amountEnglish: "One Face",
      },
      {
        amountArabic: "وجهين",
        amountEnglish: "Two Faces",
      },
      {
        amountArabic: "3 أوجه",
        amountEnglish: "Three Faces",
      },
      {
        amountArabic: "4 أوجه",
        amountEnglish: "Four Faces",
      },
      {
        amountArabic: "5 أوجه",
        amountEnglish: "Five Faces",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("quran_memorizing_amounts", null, {});
  },
};
