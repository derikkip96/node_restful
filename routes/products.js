const express = require('express');
const router = express.Router();
const ProductCtrl = require('./../controllers/productControllers');
const { check} = require('express-validator');
const validation = [
    check('name').not().isEmpty(),
    check('description').isLength({ min: 30 }),
    check('price').not().isEmpty().isNumeric(),
    check('quantity').not().isEmpty().isNumeric(),
    check('category_id').not().isEmpty(),
];

router.post('/create',validation,ProductCtrl.create);
router.get('/all',ProductCtrl.index);
router.put('/update/:id',ProductCtrl.edit);
router.get('/category/:id',ProductCtrl.productCategory);
router.get('/detail/:id',ProductCtrl.detail);
router.delete('/delete/:id',ProductCtrl.delete);

module.exports =router;