const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryControllers');
const { check, validationResult } = require('express-validator');
const validation = [
    check('name').not().isEmpty(),
    check('description').isLength({ min: 30 }),
];

router.post('/add',validation,categoryController.add);
router.get('/all',categoryController.index);
router.put('/edit/:id',validation,categoryController.edit);
router.delete('/delete/:id',categoryController.delete);

module.exports = router;