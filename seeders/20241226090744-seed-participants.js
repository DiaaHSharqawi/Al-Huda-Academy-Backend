"use strict";

/** @type {import('sequelize-cli').Migration} */
// seeders/20231218-seed-participants.js

const participants = [
  {
    fullName: "أحمد علي",
    dateOfBirth: new Date("1990-01-01"),
    phone: "0123456789",
    city: "القاهرة",
    country: "مصر",
    gender_id: 1,
    details: "مشارك نشط في الفعاليات.",
    profileImage: "path/to/profile/image1.jpg",
    userId: 1,
    quranMemorizingAmountsId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    fullName: "فاطمة الزهراء",
    dateOfBirth: new Date("1995-05-15"),
    phone: "0987654321",
    city: "الاسكندرية",
    country: "مصر",
    gender_id: 2,
    details: "تتمتع بخبرة في العمل الجماعي.",
    profileImage: "path/to/profile/image2.jpg",
    userId: 2,
    quranMemorizingAmountsId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    fullName: "علي بن محمد",
    dateOfBirth: new Date("1988-07-20"),
    phone: "0555555555",
    city: "الرياض",
    country: "السعودية",
    gender_id: 1,
    details: "شارك في عدة مشاريع.",
    profileImage: "path/to/profile/image3.jpg",
    userId: 3,
    quranMemorizingAmountsId: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    fullName: "خالد بن سعيد",
    dateOfBirth: new Date("1985-11-30"),
    phone: "0666666666",
    city: "جدة",
    country: "السعودية",
    gender_id: 1,
    details: "مشارك في الفعاليات الثقافية.",
    profileImage: "path/to/profile/image4.jpg",
    userId: 4,
    quranMemorizingAmountsId: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    fullName: "عائشة بنت أبي بكر",
    dateOfBirth: new Date("1992-03-10"),
    phone: "0777777777",
    city: "مكة",
    country: "السعودية",
    gender_id: 2,
    details: "تتمتع بخبرة في التعليم.",
    profileImage: "path/to/profile/image5.jpg",
    userId: 5,
    quranMemorizingAmountsId: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkInsert("Participants", participants);
    } catch (error) {
      console.error("Error inserting participants: ", error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkDelete("Participants", null, {});
    } catch (error) {
      console.error("Error deleting participants: ", error);
    }
  },
};
