let express = require('express');
let router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.category);

router.get('/:_id', productController.details);

module.exports = router;