'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      /* username: {
        allowNull: false,
        type: Sequelize.STRING
      }, */
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      naissance: {
        allowNull: false,
        type: Sequelize.STRING
      },
      tel: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Prenom: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Nom: {
        allowNull: false,
        type: Sequelize.STRING
      },
      isAdmin: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};