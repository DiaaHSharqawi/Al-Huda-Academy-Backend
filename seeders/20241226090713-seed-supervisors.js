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
    details: "مشرف ذو خبرة طويلة في تعليم القرآن الكريم وإدارة مجموعات الحفظ.",
    profileImage:
      "https://res.cloudinary.com/dvqxt060a/image/upload/v1736076591/uploads/epev7yrytqvkjgutcelq.png",
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
    details: "مشرفة متخصصة في تعليم التلاوة والتجويد للطالبات.",
    profileImage:
      "https://res.cloudinary.com/dvqxt060a/image/upload/v1736067710/uploads/tsxpj5edkvamesyn9l5q.png",
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
    details: "مشرف يتميز بأسلوبه المبتكر في تعليم الطلاب وتحفيزهم.",
    profileImage:
      "https://res.cloudinary.com/dvqxt060a/image/upload/v1736076591/uploads/epev7yrytqvkjgutcelq.png",
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
