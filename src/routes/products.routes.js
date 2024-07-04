const express = require('express');
const router = express.Router();
const { createProduct, getAllProducts } = require('../controllers/ProductController');

router.post('/products', createProduct); //esta rota cria um produto

router.get('/products', getAllProducts); //esta rota lista todos os produtos

module.exports = router;
