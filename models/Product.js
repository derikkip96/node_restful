const SequelizeSlugify = require('sequelize-slugify');
const Sequelize = require('sequelize');
// module.exports = function(sequelize, DataTypes) {
// const models = require('./Category');
const Category = require('./../models/Category');
const Product = sequelize.define('product', {
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
  category_id:{
    type: Sequelize.INTEGER,
    references: {
      model: 'categories', // name of Target model
      key: 'id', // key in Target model that we're referencing
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  }, 
      // accesstoken: DataTypes.STRING(2664) 
    // slug model options
      
});
SequelizeSlugify.slugifyModel(Product, {
    source: ['name'],
    slugOptions: { lower: true },
    overwrite: false,
    column: 'slug'
});
Product.associate =  (models) => {
  Product.belongsTo(models.Category,{foreignKey:'category_id'});
}


module.exports = Product;
