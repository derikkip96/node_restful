const express = require('express');
const router = express.Router();
const CustomerCtrl = require('./../controllers/customerControllers');
const { check, validationResult } = require('express-validator');
const validation = [
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
];
router.post('/create',validation,CustomerCtrl.createCustomer);
router.get('/all',CustomerCtrl.all);
router.post('/login',CustomerCtrl.login);

module.exports = router;