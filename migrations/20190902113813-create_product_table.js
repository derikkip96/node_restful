'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("products", {
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
      category_id:{
        type: Sequelize.INTEGER,
        references: {
          model: 'categories', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },     
      slug: {
        type: Sequelize.STRING,
        unique: true
        },
      price:{
          type: Sequelize.DECIMAL
      },
      quantity:Sequelize.INTEGER,
      is_featured:{
          type:Sequelize.BOOLEAN,
          defaultValue: false,
          allowNull: false,
          set: function(value) {
              if (value === 'true') value = true;
              if (value === 'false') value = false;
              this.setDataValue('is_featured', value);
            }
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
    return queryInterface.dropTable('products');
  }
};
