module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'products', // name of Source model
      'category_id', // name of the key we're adding 
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'categories', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'products', // name of Source model
      'category_id' // key we want to remove
    );
  }
};