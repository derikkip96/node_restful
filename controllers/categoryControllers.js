const Category = require('./../models/Category');
const { validationResult } = require('express-validator');


exports.add = async (req, res) => {
  try{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }        
      const cat = await Category.create({
        name: req.body.name,
        description: req.body.description
      });
      return res.status(201).json(cat);
  }catch(error){
    return handleError(res, 500, error.message);
  }
}
      //getting all categories
exports.index = async (req, res) => {
  try{
    const cat = await Category.findAll();
    return res.json(cat);
  }catch(error){
    return handleError(res, 500, error.message);
  }
  }
exports.edit = async (req,res) => {
  try{
    const cat = await Category.update({
      name: req.body.name,
      description: req.body.description
    },{
      where:{
        id:req.params.id
      }
    });
    return res.json(cat); 
  }catch(error){
    return handleError(res, 500, error.message)
  }
}
exports.delete = async (req, res) => {
  try{
    const cat =   Category.destroy(
      {where:{
        id:req.params.id
      }
    });
    return  res.status(200).send({
      success: true,
      message: "category deleted successfully."
  });
  }catch(error){
    return handleError(res, 500, error.message) 
  }
}
//error handling function
function handleError(res, code, message) {
  res.status(code).json({
    errors: [
      {
        msg: message,
      },
    ],
  });
}

    

