"use strict";

/** @type {import('sequelize-cli').Migration} */
// seeders/20231218-seed-participants.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const participants = [
      {
        fullName: "أحمد علي",
        dateOfBirth: new Date("1990-01-01"),
        phone: "0123456789",
        city: "القاهرة",
        country: "مصر",
        gender: "ذكر",
        details: "مشارك نشط في الفعاليات.",
        profileImage: "path/to/profile/image1.jpg",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullName: "فاطمة الزهراء",
        dateOfBirth: new Date("1995-05-15"),
        phone: "0987654321",
        city: "الاسكندرية",
        country: "مصر",
        gender: "أنثى",
        details: "تتمتع بخبرة في العمل الجماعي.",
        profileImage: "path/to/profile/image2.jpg",
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullName: "علي بن محمد",
        dateOfBirth: new Date("1988-07-20"),
        phone: "0555555555",
        city: "الرياض",
        country: "السعودية",
        gender: "ذكر",
        details: "شارك في عدة مشاريع.",
        profileImage: "path/to/profile/image3.jpg",
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullName: "سارة سعيد",
        dateOfBirth: new Date("1993-12-12"),
        phone: "0666666666",
        city: "الدوحة",
        country: "قطر",
        gender: "أنثى",
        details: "لديها مهارات قيادية ممتازة.",
        profileImage: "path/to/profile/image4.jpg",
        userId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("Participants", participants);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Participants", null, {});
  },
};
