const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');
const ProductCtrl = require('../controllers/productControllers');
const auth = require('./../utils/handler');
const { check} = require('express-validator');
const validation = [
    check('name').not().isEmpty(),
    check('description').isLength({ min: 30 }),
    check('price').not().isEmpty().isNumeric(),
    check('quantity').not().isEmpty().isNumeric(),
    check('category_id').not().isEmpty(),
];
router.post('/create',auth,multer,validation,ProductCtrl.create);
router.get('/all',auth,ProductCtrl.index);
router.put('/update/:id', auth,validation, ProductCtrl.edit);
router.get('/category/:id',auth,ProductCtrl.productCategory);
router.get('/detail/:id',auth,ProductCtrl.detail);
router.delete('/delete/:id',auth,ProductCtrl.delete);

module.exports =router;