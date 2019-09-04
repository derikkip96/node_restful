const express = require('express');
const Product = require('./../models/Product');
const Category = require('./../models/Category');
const router = express.Router();



const { check, validationResult } = require('express-validator');
router.post(
    '/create',
    [
        check('name').not().isEmpty(),
        check('description').isLength({ min: 30 }),
        check('price').not().isEmpty().isNumeric(),
        check('quantity').not().isEmpty().isNumeric(),
        check('category_id').not().isEmpty(),
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
          }        
          Product.create({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            quantity: req.body.quantity,
            category_id: req.body.category_id,
            is_featured: req.body.is_featured
          })
          .then(product => res.json(product))
          .catch(error => handleError(res, 500, error.message));
        });
router.get('/all', (req,res) =>{
  Product.findAll()
  .then(response => res.json(response))
  .catch(error => {
    res.status(error.status || 402);
    res.json({
      error: {
        message: error.message,
      },
    });
  });
});
// delete
router.delete(
  '/delete/:id',  
  (req,res) => {
    Product.destroy(
      {where:{
        id:req.params.id
      }
    }).then(res.json("deleted successful")).catch((err) => console.log("Error while searching user : ", err));
  }
);
//geting individual product
router.get('/detail/:id',(req,res) => {
  Product.findAll({
    where:{
      id:req.params.id
    }
  }).then(product => res.json(product)) .catch(error => {
    res.status(error.status || 402);
    res.json({
      error: {
        message: error.message,
      },
    });
  });
})
//show products by category
router.get('/category/:id', (req,res) =>{
  Product.findAll({
    where:{
      category_id:req.params.id        
    },
    include:[{
      model:Category,
      as:"category"
    }]
  } )
  .then(response => res.json(response))
  .catch(error => {
      res.status(error.status || 402);
      res.json({
        error: {
          message: error.message,
        },
      });
    }
  );
});
function handleError(res, code, message) {
  res.status(code).json({
    errors: [
      {
        msg: message,
      },
    ],
  });
}

module.exports = router;
    

