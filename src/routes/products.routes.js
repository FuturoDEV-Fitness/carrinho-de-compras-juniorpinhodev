const express = require('express');
const router = express.Router();
const { createProduct } = require('../controllers/ProductController');

router.post('/products', createProduct);

module.exports = router;
