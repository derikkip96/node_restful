const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
const sequelize = new Sequelize('nodeeccom', 'root', 'password', {
  host: 'localhost',
  port:3306,
  dialect: 'mysql'
});

module.exports=sequelize;
global.sequelize=sequelize;
