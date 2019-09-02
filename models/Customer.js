const Sequelize = require('sequelize');
const Customer = sequelize.define('customer', {
	id: {
		type: Sequelize.INTEGER,
        autoIncrement: true,
		primaryKey: true,
	},
	name: Sequelize.STRING(200),

	phone: {
		type: Sequelize.STRING(20),
		allowNull: true,
    },
    email: Sequelize.STRING(255),

	password: Sequelize.STRING(255),

	avatar: Sequelize.STRING(300),
	createdAt:{
        type:Sequelize.DATE,
        field: 'created_at'

      },
      updatedAt:{
        type:Sequelize.DATE,
        field: 'updated_at'

      },
	// accesstoken: Sequelize.STRING(2664)   
});
module.exports = Customer;
