const Product = require('./../models/Product');
const Category = require('./../models/Category');
const { validationResult } = require('express-validator');


//creating product
exports.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    try{
      const product = await   Product.create({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        category_id: req.body.category_id,
        is_featured: req.body.is_featured
      });
      return res.status(201).json(product);
    }catch(error){
      return handleError(res, 500, error.message);
    }        
  }
//getting all products
exports.index = async (req,res) => {
  try{
    const product = await Product.findAll();
    return res.status(200).json(product);
  }catch(error){
    return handleError(res, 500, error.message);
  }
}

/*update function */
exports.edit = async (req, res) =>{
  try{
    const product = await Product.update({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      quantity: req.body.quantity,
      category_id: req.body.category_id,
      is_featured: req.body.is_featured
    },{
      where:{
        id:req.params.id
      }
    });    
    return res.status(201).json({
      success:true,
      message:"updated successful"
    });
  }catch(error){
    return handleError(res, 500, error.message);
  }
}
/*delete */
exports.delete = async (req,res) =>{
  try{
    const product = await   Product.destroy(
      {where:{
        id:req.params.id
      }
    });
    return res.json({
      success:true,
      message:"deleted succesful"
    }); 
  }catch(error){
    return handleError(res, 500, error.message);
  }
}


//geting individual product
exports.detail = async (req, res) => {
  try{
    const product = await Product.findAll({
      where:{
        id:req.params.id
      }
    });
    return res.status(200).json(product);
  }catch(error){
    return handleError(res, 500, error.message);
  }
}
//show products by category
exports.productCategory = async (req, res) => {
  try{
    const product = await   Product.findAll({
      where:{
        category_id:req.params.id        
      },
      include:[{
        model:Category
      }]
    } );
    return res.status(200).json(product);
  }catch(error){
    return handleError(res, 500, error.message);
  }
}

function handleError(res, code, message) {
  res.status(code).json({
    errors: [
      {
        msg: message,
      },
    ],
  });
}
    

