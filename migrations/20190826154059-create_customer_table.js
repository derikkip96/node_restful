'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("customers", {
      customerid: {
        type: Sequelize.STRING(300),
        allowNull: false,
        primaryKey: true,
      },
    
      name: Sequelize.STRING(300),
    
      phone: {
        type: Sequelize.STRING(20),
        allowNull: true,
        },
        email: Sequelize.STRING(255),
    
      // password: Sequelize.STRING(255),
    
      avatar: Sequelize.STRING(300),    

    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("customers");    
  }
};
