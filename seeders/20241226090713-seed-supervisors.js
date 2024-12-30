"use strict";

/** @type {import('sequelize-cli').Migration} */

const supervisors = [
  {
    fullName: "محمد أحمد",
    dateOfBirth: "1985-06-15",
    phone: "00966555555555",
    city: "الرياض",
    country: "المملكة العربية السعودية",
    gender_id: 1,
    numberOfMemorizedParts: 30,
    numberOfMemorizedSurahs: 114,
    details: "مشرف ذو خبرة طويلة في تعليم القرآن الكريم وإدارة مجموعات الحفظ.",
    profileImage: "mohamed_ahmed.jpg",
    userId: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    fullName: "عائشة عبدالله",
    dateOfBirth: "1990-03-22",
    phone: "00966566666666",
    city: "جدة",
    country: "المملكة العربية السعودية",
    gender_id: 2,
    numberOfMemorizedParts: 25,
    numberOfMemorizedSurahs: 90,
    details: "مشرفة متخصصة في تعليم التلاوة والتجويد للطالبات.",
    profileImage: "aisha_abdullah.jpg",
    userId: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    fullName: "خالد يوسف",
    dateOfBirth: "1980-11-10",
    phone: "00966577777777",
    city: "الدمام",
    country: "المملكة العربية السعودية",
    gender_id: 1,
    numberOfMemorizedParts: 20,
    numberOfMemorizedSurahs: 85,
    details: "مشرف يتميز بأسلوبه المبتكر في تعليم الطلاب وتحفيزهم.",
    profileImage: "khaled_youssef.jpg",
    userId: 6,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkInsert("Supervisors", supervisors);
    } catch (error) {
      console.error("Error inserting supervisors: ", error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkDelete("Supervisors", null, {});
    } catch (error) {
      console.error("Error deleting supervisors: ", error);
    }
  },
};
