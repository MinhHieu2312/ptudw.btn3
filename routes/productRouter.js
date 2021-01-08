let express = require('express');
let router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.index);
router.get('/category', productController.category);
router.get('/category/:categoryID', productController.categorybyid);
router.get('/category/:categoryID/:productID', productController.detailproduct);

module.exports = router;