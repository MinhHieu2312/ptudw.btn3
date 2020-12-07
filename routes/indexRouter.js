let express = require('express');
let router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.category);


module.exports = router;