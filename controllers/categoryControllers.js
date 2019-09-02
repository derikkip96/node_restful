const express = require('express');
const Category = require('./../models/Category');
const router = express.Router();



const { check, validationResult } = require('express-validator');

// constadd = (req, res) => {
//       [
//         check('name').not().isEmpty(),
//         check('description').isLength({ min: 30 }),
//     ]
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(422).json({ errors: errors.array() });
//       }        
//       Category.create({
//         name: req.body.name,
//         description: req.body.description
//       })
//       .then(category => res.json(category))
//       .catch(error => handleError(res, 500, error.message));
//     }


router.post('/create',[
  check('name').not().isEmpty(),
  check('description').isLength({ min: 30 }),
],
(req,res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }        
    Category.create({
      name: req.body.name,
      description: req.body.description
    })
    .then(category => res.json(category))
    .catch(error => handleError(res, 500, error.message));

}
);
      //editting this router
router.get('/all',(req,res) => {
  Category.findAll()
  .then(response => res.json(response))
  .catch(error => handleError(res, 500, error.message));
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
    

