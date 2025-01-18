"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "supervisor_certificates",
      [
        {
          certificateImage:
            "https://khamsat.hsoubcdn.com/images/services/3709485/698916228a7e2a1eb23803024a7fa671.jpg",
          supervisorId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          certificateImage:
            "https://i.pinimg.com/736x/19/23/29/192329c49b5dd2b381a8c757b6e52284.jpg",
          supervisorId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          certificateImage:
            "https://i.pinimg.com/736x/19/23/29/192329c49b5dd2b381a8c757b6e52284.jpg",
          supervisorId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          certificateImage:
            "https://khamsat.hsoubcdn.com/images/services/3709485/698916228a7e2a1eb23803024a7fa671.jpg",
          supervisorId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          certificateImage:
            "https://i.pinimg.com/736x/19/23/29/192329c49b5dd2b381a8c757b6e52284.jpg",
          supervisorId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          certificateImage:
            "https://i.pinimg.com/originals/a4/46/28/a446288254a23e0a4b9d56c48e373003.jpg",
          supervisorId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("supervisor_certificates", null, {});
  },
};
