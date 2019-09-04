const SequelizeSlugify = require('sequelize-slugify');
const Sequelize = require('sequelize');
const Product = require('./Product');

class Category extends Sequelize.Model {}

Category.init({
  id: {
		type: Sequelize.INTEGER,
    autoIncrement: true,
		primaryKey: true,
	},
	name: { 
    type: Sequelize.STRING(200)
  },
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
  }
}, {
  hooks: {
    beforeCreate: () => SequelizeSlugify.slugifyModel(Category, {
      source: ['name'],
      slugOptions: { lower: true },
      overwrite: false,
      column: 'slug'
  })
  },
  sequelize,
  modelName: 'category'
})

// Category.hasMany(Product, {as: 'product', foreignKey: 'category_id'})

// const Category = sequelize.define('category', {
// 	id: {
// 		type: Sequelize.INTEGER,
//     autoIncrement: true,
// 		primaryKey: true,
// 	},
// 	name: Sequelize.STRING(200),

// 	description: {
// 		type: Sequelize.TEXT,
// 		allowNull: true,
//     },
//   slug: {
//       type: Sequelize.STRING,
//       unique: true
//   },
// 	avatar: Sequelize.STRING(300),
// 	createdAt:{
//         type:Sequelize.DATE,
//         field: 'created_at'

//   },
//   updatedAt:{
//     type:Sequelize.DATE,
//     field: 'updated_at'

//   },     
// });
// SequelizeSlugify.slugifyModel(Category, {
//     source: ['name'],
//     slugOptions: { lower: true },
//     overwrite: false,
//     column: 'slug'
// });
// Category.associate = (models) =>{
//   Category.hasMany(models.Product);
// };

module.exports = Category;
