var express = require('express');
var router = express.Router();

const categoryController = require('../controllers/categoryControllers');

router.post('/add',categoryController.add);

module.exports = router;