const express = require('express');
const router = express.Router();
const { createProduct, getAllProducts, getProductWithDetails } = require('../controllers/ProductController');

router.post('/products', createProduct); //esta rota cria um produto

router.get('/products', getAllProducts); //esta rota lista todos os produtos

router.get('/products/:id', getProductWithDetails); //esta rota gera produtos com detalhes

module.exports = router;
