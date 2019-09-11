const Customer = require('./../models/Customer');
const bcrypt = require('bcrypt');
let config = require('./../config/sckey');

const { validationResult } = require('express-validator');

exports.createCustomer = async (req,res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    let hashedPassword = bcrypt.hashSync(req.body.password,10);
    try{
      const cust  = await Customer.create({
        name: req.body.name,
        password: hashedPassword,
        phone: req.body.phone,
        email: req.body.email
      });
      return res.status(201).json(cust);
    }catch(error){
      return handleError(res, 500, error.message);
    }
  }
exports.all = async (req,res) => {
  try{
    const cust = await Customer.findAll();
    return res.status(200).json(cust); 
  }catch(error){
    return handleError(res, 402, error.message);
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
// trying authentication
const jwt = require('jsonwebtoken');
exports.login = (req, res, next) => {
  Customer.findOne({ email: req.body.email }).then(
    (customer) => {
      if (!customer) {
        return res.status(401).json({
          error: new Error('User not found!')
        });
      }
      bcrypt.compare(req.body.password, customer.password).then(
        (valid) => {
          if (!valid) {
            return res.status(401).json({
              error: new Error('Incorrect password!')
            });
          }
          const token = jwt.sign(
            { id: customer.id },
            config.secret,
            { expiresIn: '24h' });
          res.status(200).json({
            id: customer.id,
            token: token
          });
        }
      ).catch(
        (err) => {
          res.status(500).json({
            error: err+""
          });
        }
      );
    }
  ).catch(
    (err) => {
      res.status(500).json({
        error: err
      });
    }
  );
}