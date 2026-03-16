const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');

router.post('/products', productController.getProducts);
router.get('/products', productController.getAllProduct);

module.exports = router;
