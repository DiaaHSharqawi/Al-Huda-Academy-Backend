"use strict";

/** @type {import('sequelize-cli').Migration} */

/*const parts = [
  {
    id: 1,
    arabic_part: "جزء 1 (الم)",
    english_part: "Chapter 1 (Alaf Lam Meem)",
  },
  {
    id: 2,
    arabic_part: "جزء 2 ( سَيَقُولُ)",
    english_part: "Chapter 2 (Sayaqool)",
  },
  {
    id: 3,
    arabic_part: "جزء 3 ( تِلۡكَ ٱلرُّسُلُ)",
    english_part: "Chapter 3 (Tilkal Rusull)",
  },
  {
    id: 4,
    arabic_part: "جزء 4 (لَن تَنَالُو)",
    english_part: "Chapter 4 (Lan Tana Loo)",
  },
  {
    id: 5,
    arabic_part: "جزء 5 (وَٱلۡمُحۡصَنَـٰتُ)",
    english_part: "Chapter 5 (Wal Mohsanat)",
  },
  {
    id: 6,
    arabic_part: "جزء 6 ( لَّا يُحِبُّ ٱللَّهُ)",
    english_part: "Chapter 6 (La Yuhibbullah La)",
  },
  {
    id: 7,
    arabic_part: "جزء 7 ( وَإِذَا سَمِعُو)",
    english_part: "Chapter 7 (Wa Iza Samiu)",
  },
  {
    id: 8,
    arabic_part: "جزء 8 ( وَلَوۡ أَنَّنَا)",
    english_part: "Chapter 8 (Wa Lau Annana)",
  },
  {
    id: 9,
    arabic_part: "جزء 9 ( قَالَ ٱلۡمَلَأُ)",
    english_part: "Chapter 9 (Qalal Malao)",
  },
  {
    id: 10,
    arabic_part: "جزء 10 ( وَٱعۡلَمُوٓا)",
    english_part: "Chapter 10 (Wa A'lamu)",
  },
  {
    id: 11,
    arabic_part: "جزء 11 (يَعۡتَذِرُونَ)",
    english_part: "Chapter 11 (Yatazeroon)",
  },
  {
    id: 12,
    arabic_part: "جزء 12 ( وَمَا مِن دَآبَّةٍ۬)",
    english_part: "Chapter 12 (Wa Mamin Da'abat)",
  },
  {
    id: 13,
    arabic_part: "جزء 13 ( وَمَآ أُبَرِّئُ)",
    english_part: "Chapter 13 (Wa Ma Ubrioo)",
  },
  {
    id: 14,
    arabic_part: "جزء 14 (رُّبَمَا)",
    english_part: "Chapter 14 (Rubama)",
  },
  {
    id: 15,
    arabic_part: "جزء 15 (سُبۡحَـٰنَ ٱلَّذِىٓ)",
    english_part: "Chapter 15 (Subhanallazee)",
  },
  {
    id: 16,
    arabic_part: "جزء 16 (قَالَ أَلَمۡ)",
    english_part: "Chapter 16 (Qal Alam)",
  },
  {
    id: 17,
    arabic_part: "جزء 17 (ٱقۡتَرَبَ)",
    english_part: "Chapter 17 (Aqtarabo)",
  },
  {
    id: 18,
    arabic_part: "جزء 18 (قَدۡ أَفۡلَحَ)",
    english_part: "Chapter 18 (Qadd Aflaha)",
  },
  {
    id: 19,
    arabic_part: "جزء 19 ( وَقَالَ ٱلَّذِينَ)",
    english_part: "Chapter 19 (Wa Qalallazina)",
  },
  {
    id: 20,
    arabic_part: "جزء 20 (أَمَّنۡ خَلَقَ)",
    english_part: "Chapter 20 (A'man Khalaq)",
  },
  {
    id: 21,
    arabic_part: "جزء 21 (ٱتۡلُ مَآ أُوحِىَ)",
    english_part: "Chapter 21 (Utlu Ma Oohi)",
  },
  {
    id: 22,
    arabic_part: "جزء 22 ( وَمَن يَقۡنُتۡ)",
    english_part: "Chapter 22 (Wa Manyaqnut)",
  },
  {
    id: 23,
    arabic_part: "جزء 23 (وَمَا لِىَ)",
    english_part: "Chapter 23 (Wa Mali)",
  },
  {
    id: 24,
    arabic_part: "جزء 24 (فَمَنۡ أَظۡلَمُ)",
    english_part: "Chapter 24 (Faman Azlam)",
  },
  {
    id: 25,
    arabic_part: "جزء 25 (إِلَيۡهِ يُرَدُّ)",
    english_part: "Chapter 25 (Elahe Yuruddo)",
  },
  {
    id: 26,
    arabic_part: "جزء 26 (حمٓ)",
    english_part: "Chapter 26 (Ha'a Meem)",
  },
  {
    id: 27,
    arabic_part: "جزء 27 (قَالَ فَمَا خَطۡبُكُمۡ)",
    english_part: "Chapter 27 (Qala Fama Khatbukum)",
  },
  {
    id: 28,
    arabic_part: "جزء 28 (قَدۡ سَمِعَ ٱللَّهُ)",
    english_part: "Chapter 28 (Qadd Sami Allah)",
  },
  {
    id: 29,
    arabic_part: "جزء 29 (تَبَـٰرَكَ ٱلَّذِى)",
    english_part: "Chapter 29 (Tabarakallazi)",
  },
  {
    id: 30,
    arabic_part: "جزء 30 (عَمَّ يَتَسَآءَلُونَ)",
    english_part: "Chapter 30 (Amma Yatasa'aloon)",
  },
];*/

const parts = [
  {
    id: 1,
    arabic_part: "جزء 1 (الم)",
    english_part: "Chapter 1 (Alaf Lam Meem)",
    start_surah: 1,
    start_ayah: 1,
    end_surah: 2,
    end_ayah: 141,
  },
  {
    id: 2,
    arabic_part: "جزء 2 ( سَيَقُولُ)",
    english_part: "Chapter 2 (Sayaqool)",
    start_surah: 2,
    start_ayah: 142,
    end_surah: 2,
    end_ayah: 252,
  },
  {
    id: 3,
    arabic_part: "جزء 3 ( تِلۡكَ ٱلرُّسُلُ)",
    english_part: "Chapter 3 (Tilkal Rusull)",
    start_surah: 2,
    start_ayah: 253,
    end_surah: 3,
    end_ayah: 92,
  },
  {
    id: 4,
    arabic_part: "جزء 4 (لَن تَنَالُو)",
    english_part: "Chapter 4 (Lan Tana Loo)",
    start_surah: 3,
    start_ayah: 93,
    end_surah: 4,
    end_ayah: 23,
  },
  {
    id: 5,
    arabic_part: "جزء 5 (وَٱلۡمُحۡصَنَـٰتُ)",
    english_part: "Chapter 5 (Wal Mohsanat)",
    start_surah: 4,
    start_ayah: 24,
    end_surah: 4,
    end_ayah: 147,
  },
  {
    id: 6,
    arabic_part: "جزء 6 ( لَّا يُحِبُّ ٱللَّهُ)",
    english_part: "Chapter 6 (La Yuhibbullah La)",
    start_surah: 4,
    start_ayah: 148,
    end_surah: 5,
    end_ayah: 81,
  },
  {
    id: 7,
    arabic_part: "جزء 7 ( وَإِذَا سَمِعُو)",
    english_part: "Chapter 7 (Wa Iza Samiu)",
    start_surah: 5,
    start_ayah: 82,
    end_surah: 6,
    end_ayah: 110,
  },
  {
    id: 8,
    arabic_part: "جزء 8 ( وَلَوۡ أَنَّنَا)",
    english_part: "Chapter 8 (Wa Lau Annana)",
    start_surah: 6,
    start_ayah: 111,
    end_surah: 7,
    end_ayah: 87,
  },
  {
    id: 9,
    arabic_part: "جزء 9 ( قَالَ ٱلۡمَلَأُ)",
    english_part: "Chapter 9 (Qalal Malao)",
    start_surah: 7,
    start_ayah: 88,
    end_surah: 8,
    end_ayah: 40,
  },
  {
    id: 10,
    arabic_part: "جزء 10 ( وَٱعۡلَمُوٓا)",
    english_part: "Chapter 10 (Wa A'lamu)",
    start_surah: 8,
    start_ayah: 41,
    end_surah: 9,
    end_ayah: 92,
  },
  {
    id: 11,
    arabic_part: "جزء 11 (يَعۡتَذِرُونَ)",
    english_part: "Chapter 11 (Yatazeroon)",
    start_surah: 9,
    start_ayah: 93,
    end_surah: 11,
    end_ayah: 5,
  },
  {
    id: 12,
    arabic_part: "جزء 12 ( وَمَا مِن دَآبَّةٍ۬)",
    english_part: "Chapter 12 (Wa Mamin Da'abat)",
    start_surah: 11,
    start_ayah: 6,
    end_surah: 12,
    end_ayah: 52,
  },
  {
    id: 13,
    arabic_part: "جزء 13 ( وَمَآ أُبَرِّئُ)",
    english_part: "Chapter 13 (Wa Ma Ubrioo)",
    start_surah: 12,
    start_ayah: 53,
    end_surah: 14,
    end_ayah: 52,
  },
  {
    id: 14,
    arabic_part: "جزء 14 (رُّبَمَا)",
    english_part: "Chapter 14 (Rubama)",
    start_surah: 15,
    start_ayah: 1,
    end_surah: 16,
    end_ayah: 50,
  },
  {
    id: 15,
    arabic_part: "جزء 15 (سُبۡحَـٰنَ ٱلَّذِىٓ)",
    english_part: "Chapter 15 (Subhanallazee)",
    start_surah: 17,
    start_ayah: 1,
    end_surah: 18,
    end_ayah: 74,
  },
  {
    id: 16,
    arabic_part: "جزء 16 (قَالَ أَلَمۡ)",
    english_part: "Chapter 16 (Qal Alam)",
    start_surah: 18,
    start_ayah: 75,
    end_surah: 20,
    end_ayah: 135,
  },
  {
    id: 17,
    arabic_part: "جزء 17 (ٱقۡتَرَبَ)",
    english_part: "Chapter 17 (Aqtarabo)",
    start_surah: 21,
    start_ayah: 1,
    end_surah: 22,
    end_ayah: 78,
  },
  {
    id: 18,
    arabic_part: "جزء 18 (قَدۡ أَفۡلَحَ)",
    english_part: "Chapter 18 (Qadd Aflaha)",
    start_surah: 23,
    start_ayah: 1,
    end_surah: 25,
    end_ayah: 20,
  },
  {
    id: 19,
    arabic_part: "جزء 19 ( وَقَالَ ٱلَّذِينَ)",
    english_part: "Chapter 19 (Wa Qalallazina)",
    start_surah: 25,
    start_ayah: 21,
    end_surah: 27,
    end_ayah: 55,
  },
  {
    id: 20,
    arabic_part: "جزء 20 (أَمَّنۡ خَلَقَ)",
    english_part: "Chapter 20 (A'man Khalaq)",
    start_surah: 27,
    start_ayah: 56,
    end_surah: 29,
    end_ayah: 45,
  },
  {
    id: 21,
    arabic_part: "جزء 21 (ٱتۡلُ مَآ أُوحِىَ)",
    english_part: "Chapter 21 (Utlu Ma Oohi)",
    start_surah: 29,
    start_ayah: 46,
    end_surah: 33,
    end_ayah: 30,
  },
  {
    id: 22,
    arabic_part: "جزء 22 ( وَمَن يَقۡنُتۡ)",
    english_part: "Chapter 22 (Wa Manyaqnut)",
    start_surah: 33,
    start_ayah: 31,
    end_surah: 36,
    end_ayah: 27,
  },
  {
    id: 23,
    arabic_part: "جزء 23 (وَمَا لِىَ)",
    english_part: "Chapter 23 (Wa Mali)",
    start_surah: 36,
    start_ayah: 28,
    end_surah: 39,
    end_ayah: 31,
  },
  {
    id: 24,
    arabic_part: "جزء 24 (فَمَنۡ أَظۡلَمُ)",
    english_part: "Chapter 24 (Faman Azlam)",
    start_surah: 39,
    start_ayah: 32,
    end_surah: 41,
    end_ayah: 46,
  },
  {
    id: 25,
    arabic_part: "جزء 25 (إِلَيۡهِ يُرَدُّ)",
    english_part: "Chapter 25 (Elahe Yuruddo)",
    start_surah: 41,
    start_ayah: 47,
    end_surah: 45,
    end_ayah: 37,
  },
  {
    id: 26,
    arabic_part: "جزء 26 (حمٓ)",
    english_part: "Chapter 26 (Ha'a Meem)",
    start_surah: 46,
    start_ayah: 1,
    end_surah: 51,
    end_ayah: 30,
  },
  {
    id: 27,
    arabic_part: "جزء 27 (قَالَ فَمَا خَطۡبُكُمۡ)",
    english_part: "Chapter 27 (Qala Fama Khatbukum)",
    start_surah: 51,
    start_ayah: 31,
    end_surah: 57,
    end_ayah: 29,
  },
  {
    id: 28,
    arabic_part: "جزء 28 (قَدۡ سَمِعَ ٱللَّهُ)",
    english_part: "Chapter 28 (Qadd Sami Allah)",
    start_surah: 58,
    start_ayah: 1,
    end_surah: 66,
    end_ayah: 12,
  },
  {
    id: 29,
    arabic_part: "جزء 29 (تَبَـٰرَكَ ٱلَّذِى)",
    english_part: "Chapter 29 (Tabarakallazee)",
    start_surah: 67,
    start_ayah: 1,
    end_surah: 77,
    end_ayah: 50,
  },
  {
    id: 30,
    arabic_part: "جزء 30 (عَمَّ)",
    english_part: "Chapter 30 (Amma)",
    start_surah: 78,
    start_ayah: 1,
    end_surah: 114,
    end_ayah: 6,
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
