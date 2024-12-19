"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Users", [
      {
        email: "p1@gmail.com",
        password:
          "$2b$10$DjyPOPqdPUZIzZ.7cq0cze9bhrwVbD3cV0rKSnit3xmJ1NeVpYkX6",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        roleId: 1,
      },
      {
        email: "p2@gmail.com",
        password:
          "$2b$10$DjyPOPqdPUZIzZ.7cq0cze9bhrwVbD3cV0rKSnit3xmJ1NeVpYkX6",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        roleId: 1,
      },
      {
        email: "p3@gmail.com",
        password:
          "$2b$10$DjyPOPqdPUZIzZ.7cq0cze9bhrwVbD3cV0rKSnit3xmJ1NeVpYkX6",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        roleId: 1,
      },
      {
        email: "s1@gmail.com",
        password:
          "$2b$10$DjyPOPqdPUZIzZ.7cq0cze9bhrwVbD3cV0rKSnit3xmJ1NeVpYkX6",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        roleId: 2,
      },
      {
        email: "s2@gmail.com",
        password:
          "$2b$10$DjyPOPqdPUZIzZ.7cq0cze9bhrwVbD3cV0rKSnit3xmJ1NeVpYkX6",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        roleId: 2,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
