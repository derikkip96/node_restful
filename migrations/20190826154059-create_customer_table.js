'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("customers", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    
      name: Sequelize.STRING(300),
    
      phone: {
        type: Sequelize.STRING(20),
        allowNull: true,
        },
        email: Sequelize.STRING(255),
    
      password: Sequelize.STRING(255),
      createdAt:{
        type:Sequelize.DATE,
        field: 'created_at'

      },
      updatedAt:{
        type:Sequelize.DATE,
        field: 'updated_at'

      },
    
      avatar: Sequelize.STRING(300),    

    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("customers");    
  }
};
