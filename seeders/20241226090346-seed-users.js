"use strict";

/** @type {import('sequelize-cli').Migration} */

const users = [
  {
    email: "p1@gmail.com",
    password: "$2b$10$DjyPOPqdPUZIzZ.7cq0cze9bhrwVbD3cV0rKSnit3xmJ1NeVpYkX6",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    roleId: 1,
  },
  {
    email: "p2@gmail.com",
    password: "$2b$10$DjyPOPqdPUZIzZ.7cq0cze9bhrwVbD3cV0rKSnit3xmJ1NeVpYkX6",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    roleId: 1,
  },
  {
    email: "p3@gmail.com",
    password: "$2b$10$DjyPOPqdPUZIzZ.7cq0cze9bhrwVbD3cV0rKSnit3xmJ1NeVpYkX6",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    roleId: 1,
  },
  {
    email: "s1@gmail.com",
    password: "$2b$10$DjyPOPqdPUZIzZ.7cq0cze9bhrwVbD3cV0rKSnit3xmJ1NeVpYkX6",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    roleId: 2,
  },
  {
    email: "s2@gmail.com",
    password: "$2b$10$DjyPOPqdPUZIzZ.7cq0cze9bhrwVbD3cV0rKSnit3xmJ1NeVpYkX6",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    roleId: 2,
  },
  {
    email: "s3@gmail.com",
    password: "$2b$10$DjyPOPqdPUZIzZ.7cq0cze9bhrwVbD3cV0rKSnit3xmJ1NeVpYkX6",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    roleId: 2,
  },
  {
    email: "admin@gmail.com",
    password: "$2b$10$DjyPOPqdPUZIzZ.7cq0cze9bhrwVbD3cV0rKSnit3xmJ1NeVpYkX6",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    roleId: 3,
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkInsert("Users", users);
    } catch (error) {
      console.error("Error inserting users: ", error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkDelete("Users", null, {});
    } catch (error) {
      console.error("Error deleting users: ", error);
    }
  },
};
