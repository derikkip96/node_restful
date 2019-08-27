const express = require('express');
const Customer = require('./../models/Customer');
const router = express.Router();

const bcrypt = require('bcrypt');

const { check, validationResult } = require('express-validator');


router.post(
    '/',
    [
        check('name').not().isEmpty(),
        check('password').not().isEmpty().isLength({ min: 5 }),
        check('phone').not().isEmpty().isMobilePhone(),
        check('email').isEmail().normalizeEmail(),
        check('passwordConfirmation').custom((value, { req }) => {
            if (value !== req.body.password) {
              throw new Error('Password confirmation does not match password');
            }
            return true;
        })
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
          }
          let hashedPassword = bcrypt.hashSync(req.body.password,10);
        
          Customer.create({
            customerid: req.body.customerid,
            name: req.body.username,
            password: hashedPassword,
            phone: req.body.phone,
            email: req.body.email
          })
          .then(customer => res.json(customer))
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
    
