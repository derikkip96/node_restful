const express = require('express');
const router = express.Router();
const ProductCtrl = require('./../controllers/productControllers');
const validateToken = require('./../utils/handler').validateAccessToken;
const { check} = require('express-validator');
const validation = [
    check('name').not().isEmpty(),
    check('description').isLength({ min: 30 }),
    check('price').not().isEmpty().isNumeric(),
    check('quantity').not().isEmpty().isNumeric(),
    check('category_id').not().isEmpty(),
];

router.post('/create',validateToken,validation,ProductCtrl.create);
router.get('/all',validateToken,ProductCtrl.index);
router.put('/update/:id',validateToken,ProductCtrl.edit);
router.get('/category/:id',validateToken,ProductCtrl.productCategory);
router.get('/detail/:id',validateToken,ProductCtrl.detail);
router.delete('/delete/:id',validateToken,ProductCtrl.delete);

module.exports =router;