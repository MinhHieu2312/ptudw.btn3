const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

/* GET list of cat. */
router.get('/', categoryController.index);  //index is a func exported from catController


module.exports = router;