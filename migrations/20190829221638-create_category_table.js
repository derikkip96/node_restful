'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("categories", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: Sequelize.STRING(200),
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
        },
      slug: {
          type: Sequelize.STRING,
          unique: true
      },
      avatar: Sequelize.STRING(300),
      createdAt:{
            type:Sequelize.DATE,
            field: 'created_at'    
          },
          updatedAt:{
            type:Sequelize.DATE,
            field: 'updated_at'
          },
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('categories');
  }
};
