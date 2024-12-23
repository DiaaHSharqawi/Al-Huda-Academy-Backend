"use strict";

/** @type {import('sequelize-cli').Migration} */

const parts = [
  { arabic_part: "جزء 1 (الم)", english_part: "Chapter 1 (Alaf Lam Meem)" },
  { arabic_part: "جزء 2 ( سَيَقُولُ)", english_part: "Chapter 2 (Sayaqool)" },
  {
    arabic_part: "جزء 3 ( تِلۡكَ ٱلرُّسُلُ)",
    english_part: "Chapter 3 (Tilkal Rusull)",
  },
  {
    arabic_part: "جزء 4 (لَن تَنَالُو)",
    english_part: "Chapter 4 (Lan Tana Loo)",
  },
  {
    arabic_part: "جزء 5 (وَٱلۡمُحۡصَنَـٰتُ)",
    english_part: "Chapter 5 (Wal Mohsanat)",
  },
  {
    arabic_part: "جزء 6 ( لَّا يُحِبُّ ٱللَّهُ)",
    english_part: "Chapter 6 (La Yuhibbullah La)",
  },
  {
    arabic_part: "جزء 7 ( وَإِذَا سَمِعُو)",
    english_part: "Chapter 7 (Wa Iza Samiu)",
  },
  {
    arabic_part: "جزء 8 ( وَلَوۡ أَنَّنَا)",
    english_part: "Chapter 8 (Wa Lau Annana)",
  },
  {
    arabic_part: "جزء 9 ( قَالَ ٱلۡمَلَأُ)",
    english_part: "Chapter 9 (Qalal Malao)",
  },
  {
    arabic_part: "جزء 10 ( وَٱعۡلَمُوٓا)",
    english_part: "Chapter 10 (Wa A'lamu)",
  },
  {
    arabic_part: "جزء 11 (يَعۡتَذِرُونَ)",
    english_part: "Chapter 11 (Yatazeroon)",
  },
  {
    arabic_part: "جزء 12 ( وَمَا مِن دَآبَّةٍ۬)",
    english_part: "Chapter 12 (Wa Mamin Da'abat)",
  },
  {
    arabic_part: "جزء 13 ( وَمَآ أُبَرِّئُ)",
    english_part: "Chapter 13 (Wa Ma Ubrioo)",
  },
  { arabic_part: "جزء 14 (رُّبَمَا)", english_part: "Chapter 14 (Rubama)" },
  {
    arabic_part: "جزء 15 (سُبۡحَـٰنَ ٱلَّذِىٓ)",
    english_part: "Chapter 15 (Subhanallazee)",
  },
  {
    arabic_part: "جزء 16 (قَالَ أَلَمۡ)",
    english_part: "Chapter 16 (Qal Alam)",
  },
  { arabic_part: "جزء 17 (ٱقۡتَرَبَ)", english_part: "Chapter 17 (Aqtarabo)" },
  {
    arabic_part: "جزء 18 (قَدۡ أَفۡلَحَ)",
    english_part: "Chapter 18 (Qadd Aflaha)",
  },
  {
    arabic_part: "جزء 19 ( وَقَالَ ٱلَّذِينَ)",
    english_part: "Chapter 19 (Wa Qalallazina)",
  },
  {
    arabic_part: "جزء 20 (أَمَّنۡ خَلَقَ)",
    english_part: "Chapter 20 (A'man Khalaq)",
  },
  {
    arabic_part: "جزء 21 (ٱتۡلُ مَآ أُوحِىَ)",
    english_part: "Chapter 21 (Utlu Ma Oohi)",
  },
  {
    arabic_part: "جزء 22 ( وَمَن يَقۡنُتۡ)",
    english_part: "Chapter 22 (Wa Manyaqnut)",
  },
  { arabic_part: "جزء 23 (وَمَا لِىَ)", english_part: "Chapter 23 (Wa Mali)" },
  {
    arabic_part: "جزء 24 (فَمَنۡ أَظۡلَمُ)",
    english_part: "Chapter 24 (Faman Azlam)",
  },
  {
    arabic_part: "جزء 25 (إِلَيۡهِ يُرَدُّ)",
    english_part: "Chapter 25 (Elahe Yuruddo)",
  },
  { arabic_part: "جزء 26 (حمٓ)", english_part: "Chapter 26 (Ha'a Meem)" },
  {
    arabic_part: "جزء 27 (قَالَ فَمَا خَطۡبُكُمۡ)",
    english_part: "Chapter 27 (Qala Fama Khatbukum)",
  },
  {
    arabic_part: "جزء 28 (قَدۡ سَمِعَ ٱللَّهُ)",
    english_part: "Chapter 28 (Qadd Sami Allah)",
  },
  {
    arabic_part: "جزء 29 (تَبَـٰرَكَ ٱلَّذِى)",
    english_part: "Chapter 29 (Tabarakallazi)",
  },
  {
    arabic_part: "جزء 30 (عَمَّ يَتَسَآءَلُونَ)",
    english_part: "Chapter 30 (Amma Yatasa'aloon)",
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkInsert("Juza", parts, {});
    } catch (error) {
      console.error("Error inserting data: ", error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkDelete("Juza", null, {});
    } catch (error) {
      console.error("Error deleting data: ", error);
    }
  },
};
