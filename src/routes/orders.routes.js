const express = require('express');
const router = express.Router();
const { createOrder } = require('../controllers/OrderController');


router.post('/orders', createOrder); // esta rota cria um pedido

module.exports = router;
